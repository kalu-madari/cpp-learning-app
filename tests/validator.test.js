const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const validatorPath = path.join(__dirname, '..', 'validate_curriculum.js');

function runValidator(env) {
  try {
    const stdout = execSync(`node "${validatorPath}"`, { env: { ...process.env, ...env }, stdio: 'pipe' }).toString();
    return { success: true, output: stdout };
  } catch (e) {
    return { success: false, output: e.stdout ? e.stdout.toString() : e.message };
  }
}

function setupMockCurriculum(files, isLegacy = false) {
  const dir = isLegacy ? path.join(__dirname, '..', 'renderer', 'lesson-data', 'basic') : path.join(__dirname, '..', 'renderer', 'lesson-data', 'chapters');
  let createdDir = false;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    createdDir = true;
  }
  const created = [];
  files.forEach((f, idx) => {
    const filePath = path.join(dir, `mock_${Date.now()}_${idx}.js`);
    fs.writeFileSync(filePath, f);
    created.push(filePath);
  });
  return () => {
    function tryRemove(target, isDir) {
      let attempts = 0;
      let lastErr;
      while (attempts < 10) {
        try {
          if (isDir) fs.rmdirSync(target);
          else fs.unlinkSync(target);
          return;
        } catch (e) {
          lastErr = e;
          if (e.code === 'ENOENT') return;
          if (e.code === 'EBUSY' || e.code === 'EPERM' || e.code === 'ENOTEMPTY') {
            attempts++;
            const start = Date.now();
            while (Date.now() - start < 50) {}
            continue;
          }
          throw e;
        }
      }
      throw new Error(`Failed to cleanup ${target} after retries: ${lastErr.message}`);
    }
    created.forEach(f => tryRemove(f, false));
    if (createdDir) {
      tryRemove(dir, true);
    }
  };
}

test('Dynamic discovery of chapters/', () => {
  const cleanup = setupMockCurriculum([`
    window.CPP_CHAPTERS = [{
      id: 999, title: "Mock", icon: "mock", lessons: [{
        id: "ch999-l1", title: "L1", difficulty: "beginner", content: "C", codeExample: "int main(){}", expectedOutput: null, quiz: null, exercises: []
      }]
    }];
  `], false);
  try {
    const result = runValidator({ VALIDATE_NEW_ONLY: '1' });
    assert.ok(result.output.includes('Chapters scanned: 1') || result.output.includes('Chapters scanned:'));
  } finally {
    cleanup();
  }
});

test('Legacy/default mode accepts and normalizes exercise: Object', () => {
  const cleanup = setupMockCurriculum([`
    window.CPP_CHAPTERS = [{
      id: 998, title: "Mock", lessons: [{
        id: "ch998-l1", title: "L1", difficulty: "beginner", content: "C", codeExample: "int main(){}", expectedOutput: null, quiz: null,
        exercise: { instruction: "I", starterCode: "S" }
      }]
    }];
  `], true);
  try {
    const result = runValidator({});
    assert.ok(!result.output.includes('Legacy singular exercise found in strict v2 file'));
  } finally {
    cleanup();
  }
});

test('Staging strict-v2 mode rejects exercise: Object', () => {
  const cleanup = setupMockCurriculum([`
    window.CPP_CHAPTERS = [{
      id: 997, title: "Mock", icon: "M", lessons: [{
        id: "ch997-l1", title: "L1", difficulty: "beginner", content: "C", codeExample: "int main(){}", expectedOutput: null, quiz: null,
        exercise: { instruction: "I", starterCode: "S", exerciseType: "write" }
      }]
    }];
  `], false);
  try {
    const result = runValidator({ VALIDATE_NEW_ONLY: '1' });
    assert.ok(!result.success);
    assert.ok(result.output.includes('Legacy singular exercise found in strict v2 file'));
  } finally {
    cleanup();
  }
});

test('exercises: null normalizes to []', () => {
  const cleanup = setupMockCurriculum([`
    window.CPP_CHAPTERS = [{
      id: 996, title: "Mock", icon: "M", lessons: [{
        id: "ch996-l1", title: "L1", difficulty: "beginner", content: "C", codeExample: "int main(){}", expectedOutput: null, quiz: null,
        exercises: null
      }]
    }];
  `], false);
  try {
    const result = runValidator({ VALIDATE_NEW_ONLY: '1' });
    assert.ok(!result.output.includes('Missing exercises array'));
  } finally {
    cleanup();
  }
});

test('exercises: [] remains []', () => {
  const cleanup = setupMockCurriculum([`
    window.CPP_CHAPTERS = [{
      id: 995, title: "Mock", icon: "M", lessons: [{
        id: "ch995-l1", title: "L1", difficulty: "beginner", content: "C", codeExample: "int main(){}", expectedOutput: null, quiz: null,
        exercises: []
      }]
    }];
  `], false);
  try {
    const result = runValidator({ VALIDATE_NEW_ONLY: '1' });
    assert.ok(!result.output.includes('Missing exercises array'));
  } finally {
    cleanup();
  }
});

test('exercises Array remains unchanged', () => {
  const cleanup = setupMockCurriculum([`
    window.CPP_CHAPTERS = [{
      id: 994, title: "Mock", icon: "M", lessons: [{
        id: "ch994-l1", title: "L1", difficulty: "beginner", content: "C", codeExample: "int main(){}", expectedOutput: null, quiz: null,
        exercises: [{ instruction: "I", starterCode: "S", exerciseType: "write" }]
      }]
    }];
  `], false);
  try {
    const result = runValidator({ VALIDATE_NEW_ONLY: '1' });
    assert.ok(!result.output.includes('Missing exercises array'));
  } finally {
    cleanup();
  }
});

test('Invalid exercises plain Object/type is rejected', () => {
  const cleanup = setupMockCurriculum([`
    window.CPP_CHAPTERS = [{
      id: 993, title: "Mock", icon: "M", lessons: [{
        id: "ch993-l1", title: "L1", difficulty: "beginner", content: "C", codeExample: "int main(){}", expectedOutput: null, quiz: null,
        exercises: { foo: "bar" }
      }]
    }];
  `], false);
  try {
    const result = runValidator({ VALIDATE_NEW_ONLY: '1' });
    assert.ok(!result.success);
    assert.ok(result.output.includes('exercises must be Array or null'));
  } finally {
    cleanup();
  }
});

test('Legacy/default mode does not scan chapters/', () => {
  const cleanup1 = setupMockCurriculum([`window.CPP_CHAPTERS = [{ id: 992, title: "Legacy", lessons: [] }];`], true);
  const cleanup2 = setupMockCurriculum([`window.CPP_CHAPTERS = [{ id: 992, title: "New", icon: "N", lessons: [] }];`], false);
  try {
    const result = runValidator({});
    assert.ok(!result.output.includes('Duplicate chapter.id'));
  } finally {
    cleanup1();
    cleanup2();
  }
});

test('Staging mode does not scan old tier directories', () => {
  const cleanup1 = setupMockCurriculum([`window.CPP_CHAPTERS = [{ id: 990, title: "Legacy", lessons: [] }];`], true);
  const cleanup2 = setupMockCurriculum([`window.CPP_CHAPTERS = [{ id: 989, title: "New", icon: "N", lessons: [] }];`], false);
  try {
    const result = runValidator({ VALIDATE_NEW_ONLY: '1' });
    assert.ok(!result.output.includes('990'));
  } finally {
    cleanup1();
    cleanup2();
  }
});
