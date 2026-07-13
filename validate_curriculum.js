const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const checker = require('./renderer/js/checker.js');

// Mock window to load browser scripts
global.window = {};

const chaptersDir = path.join(__dirname, 'renderer', 'lesson-data', 'chapters');
let chapterFiles = [];

// Legacy support during transition
const legacyDirs = ['basic', 'intermediate', 'expert', 'master'].map(t =>
  path.join(__dirname, 'renderer', 'lesson-data', t)
);
if (!process.env.VALIDATE_NEW_ONLY) {
  legacyDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('index'))
        .forEach(f => chapterFiles.push({ path: path.join(dir, f), isLegacy: true }));
    }
  });
}

// New chapters/
if (process.env.VALIDATE_NEW_ONLY && fs.existsSync(chaptersDir)) {
  fs.readdirSync(chaptersDir).filter(f => f.endsWith('.js'))
    .sort()
    .forEach(f => chapterFiles.push({ path: path.join(chaptersDir, f), isLegacy: false }));
}

let globalChapterIds = new Set();
let globalLessonIds = new Set();

let totalChaptersScanned = 0;
let totalLessonsScanned = 0;
let deterministicExamplesExecuted = 0;
let skippedStdinExamples = 0;
let passes = 0;
let failures = [];
let floatingPointIssues = [];

const tempDir = path.join(__dirname, 'temp_build');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

function addFailure(chapterId, lessonId, title, errorMsg) {
  failures.push({
    chapterId: chapterId || 'N/A',
    lessonId: lessonId || 'N/A',
    title: title || 'N/A',
    error: 'SCHEMA_ERROR',
    details: errorMsg
  });
}

// Static Audit & Execution
chapterFiles.forEach(fileObj => {
  const fullPath = fileObj.path;
  const isLegacy = fileObj.isLegacy;
  if (!fs.existsSync(fullPath)) return;

  // Clean window.CPP_CHAPTERS for isolation
  window.CPP_CHAPTERS = [];

  // Evaluate the IIFE safely
  const code = fs.readFileSync(fullPath, 'utf8');
  eval(code);

  const chapters = window.CPP_CHAPTERS;
  if (!chapters || !Array.isArray(chapters) || chapters.length === 0) return;

  chapters.forEach(chapter => {
    totalChaptersScanned++;

    // Chapter Schema validation
    if (!chapter.title || typeof chapter.title !== 'string' || !chapter.title.trim()) {
      addFailure(chapter.id, null, null, `Invalid or empty chapter.title in ${fullPath}`);
    }
    if (!isLegacy) {
      if (!chapter.icon || typeof chapter.icon !== 'string' || !chapter.icon.trim()) {
        addFailure(chapter.id, null, null, `Invalid or empty chapter.icon in ${fullPath}`);
      }
    }

    if (typeof chapter.id !== 'number' || chapter.id <= 0 || !Number.isInteger(chapter.id)) {
      addFailure(chapter.id, null, chapter.title, `Invalid chapter.id in file ${fullPath}`);
    } else {
      if (globalChapterIds.has(chapter.id)) {
        addFailure(chapter.id, null, chapter.title, `Duplicate chapter.id ${chapter.id} in file ${fullPath}`);
      }
      globalChapterIds.add(chapter.id);
    }

    if (!chapter.lessons || !Array.isArray(chapter.lessons)) {
       addFailure(chapter.id, null, chapter.title, `chapter.lessons must be an array`);
       return;
    }

    chapter.lessons.forEach(lesson => {
      totalLessonsScanned++;

      // Lesson ID
      if (!lesson.id) {
        addFailure(chapter.id, null, lesson.title, `Missing lesson id`);
      } else {
        if (!/^ch\d+-l\d+$/.test(lesson.id)) {
          addFailure(chapter.id, lesson.id, lesson.title, `Invalid lesson.id format ${lesson.id}`);
        }
        if (globalLessonIds.has(lesson.id)) {
          addFailure(chapter.id, lesson.id, lesson.title, `Duplicate lesson.id ${lesson.id}`);
        }
        globalLessonIds.add(lesson.id);
      }

      // Required lesson fields
      if (!lesson.title || typeof lesson.title !== 'string' || !lesson.title.trim()) {
        addFailure(chapter.id, lesson.id, lesson.title, `Invalid or empty lesson.title`);
      }
      if (!lesson.difficulty || typeof lesson.difficulty !== 'string') {
        addFailure(chapter.id, lesson.id, lesson.title, `Invalid lesson.difficulty`);
      }
      if (!lesson.content || typeof lesson.content !== 'string' || !lesson.content.trim()) {
        addFailure(chapter.id, lesson.id, lesson.title, `Invalid or empty lesson.content`);
      }
      if (!lesson.codeExample || typeof lesson.codeExample !== 'string' || !lesson.codeExample.trim()) {
        addFailure(chapter.id, lesson.id, lesson.title, `Invalid or empty lesson.codeExample`);
      }

      if (typeof lesson.expectedOutput !== 'string' && lesson.expectedOutput !== null && lesson.expectedOutput !== undefined) {
        addFailure(chapter.id, lesson.id, lesson.title, `Invalid expectedOutput type`);
      }

      if (typeof lesson.stdinFixture !== 'string' && lesson.stdinFixture !== null && lesson.stdinFixture !== undefined) {
        addFailure(chapter.id, lesson.id, lesson.title, `Invalid stdinFixture type`);
      }

      // Quiz check
      if (lesson.quiz === null) {
        // valid
      } else if (Array.isArray(lesson.quiz)) {
        lesson.quiz.forEach((q, qIdx) => {
          if (!q.question || typeof q.question !== 'string' || (!isLegacy && !q.question.trim())) {
             addFailure(chapter.id, lesson.id, lesson.title, `Missing, invalid, or empty quiz question at qIdx ${qIdx}`);
          }
          if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
             addFailure(chapter.id, lesson.id, lesson.title, `Quiz options must be an Array with length >= 2 in qIdx ${qIdx}`);
          }
          const optLen = Array.isArray(q.options) ? q.options.length : 0;
          if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= optLen) {
             addFailure(chapter.id, lesson.id, lesson.title, `Invalid correctIndex in qIdx ${qIdx}`);
          }
          if (!q.explanation || typeof q.explanation !== 'string' || (!isLegacy && !q.explanation.trim())) {
             addFailure(chapter.id, lesson.id, lesson.title, `Missing, invalid, or empty quiz explanation at qIdx ${qIdx}`);
          }
        });
      } else {
        if (!isLegacy) {
          addFailure(chapter.id, lesson.id, lesson.title, `lesson.quiz must be Array or null`);
        }
      }

      // Exact legacy normalization semantics during transition
      let exerciseList = [];
      if (lesson.exercises === null) {
        exerciseList = [];
      } else if (Array.isArray(lesson.exercises)) {
        exerciseList = lesson.exercises;
      } else if (lesson.exercises !== undefined) {
        addFailure(chapter.id, lesson.id, lesson.title, `exercises must be Array or null`);
      } else if (lesson.exercise !== undefined) {
        if (!isLegacy) {
          addFailure(chapter.id, lesson.id, lesson.title, `Legacy singular exercise found in strict v2 file`);
        } else {
          exerciseList = [lesson.exercise];
        }
      } else {
        if (!isLegacy) {
          addFailure(chapter.id, lesson.id, lesson.title, `Missing exercises array (must be Array or null)`);
        }
        exerciseList = [];
      }

      if (!isLegacy && exerciseList.length > 3) {
        addFailure(chapter.id, lesson.id, lesson.title, `exercises array exceeds maximum of 3`);
      }

      const validExerciseTypes = ["modify", "debug", "complete", "write", "predict", "review"];

      exerciseList.forEach((ex, exIdx) => {
        if (!ex.instruction || typeof ex.instruction !== 'string' || (!isLegacy && !ex.instruction.trim())) {
           addFailure(chapter.id, lesson.id, lesson.title, `Missing, invalid, or empty exercises[${exIdx}].instruction`);
        }
        if (!ex.starterCode || typeof ex.starterCode !== 'string' || !ex.starterCode.trim()) {
           addFailure(chapter.id, lesson.id, lesson.title, `Missing or empty exercises[${exIdx}].starterCode`);
        }
        if (typeof ex.expectedOutput !== 'string' && ex.expectedOutput !== null && ex.expectedOutput !== undefined) {
          addFailure(chapter.id, lesson.id, lesson.title, `Invalid exercises[${exIdx}].expectedOutput type`);
        }
        if (typeof ex.stdinFixture !== 'string' && ex.stdinFixture !== null && ex.stdinFixture !== undefined) {
          addFailure(chapter.id, lesson.id, lesson.title, `Invalid exercises[${exIdx}].stdinFixture type`);
        }
        if (!isLegacy) {
          if (!ex.exerciseType || !validExerciseTypes.includes(ex.exerciseType)) {
            addFailure(chapter.id, lesson.id, lesson.title, `Invalid or missing exercises[${exIdx}].exerciseType`);
          }
        }
      });

      // Execute code if expectedOutput is deterministic
      if (lesson.expectedOutput !== null && lesson.expectedOutput !== undefined) {
        const hasStdin = /\b(cin|getline)\b/.test(lesson.codeExample);
        if (hasStdin && !lesson.stdinFixture) {
          skippedStdinExamples++;
          return;
        }

        deterministicExamplesExecuted++;

        const timestamp = Date.now() + '_' + Math.floor(Math.random() * 10000);
        const cppFile = path.join(tempDir, `validate_${timestamp}.cpp`);
        const exeFile = path.join(tempDir, process.platform === 'win32' ? `validate_${timestamp}.exe` : `validate_${timestamp}`);

        fs.writeFileSync(cppFile, lesson.codeExample);

        try {
          execSync(`g++ -std=c++17 -Wall -Wextra "${cppFile}" -o "${exeFile}"`, { stdio: 'pipe' });
        } catch (e) {
          failures.push({
            chapterId: chapter.id,
            lessonId: lesson.id,
            title: lesson.title,
            error: 'COMPILATION_FAILED',
            details: e.stderr ? e.stderr.toString() : e.message
          });
          return;
        }

        try {
          const stdoutRaw = execSync(`"${exeFile}"`, { stdio: 'pipe' }).toString();
          const expectedRaw = lesson.expectedOutput;

          const normalizedActual = checker.normalizeOutputForComparison(stdoutRaw);
          const normalizedExpected = checker.normalizeOutputForComparison(expectedRaw);

          if (normalizedActual === normalizedExpected) {
            passes++;
          } else {
            // Check if floating point formatting issue
            if (expectedRaw.includes('.') && stdoutRaw.includes('.') && /\d/.test(expectedRaw)) {
              floatingPointIssues.push({
                lessonId: lesson.id,
                title: lesson.title
              });
            }

            const diffMsg = checker.findFirstDifference(normalizedActual, normalizedExpected);
            failures.push({
              chapterId: chapter.id,
              lessonId: lesson.id,
              title: lesson.title,
              error: 'MISMATCH',
              rawExpected: expectedRaw,
              rawActual: stdoutRaw,
              normalizedExpected: normalizedExpected,
              normalizedActual: normalizedActual,
              diff: diffMsg
            });
          }
        } catch (e) {
           failures.push({
            chapterId: chapter.id,
            lessonId: lesson.id,
            title: lesson.title,
            error: 'RUNTIME_FAILED',
            details: e.stderr ? e.stderr.toString() : e.message
          });
        } finally {
          // Cleanup
          try { if (fs.existsSync(cppFile)) fs.unlinkSync(cppFile); } catch (e) {}
          try { if (fs.existsSync(exeFile)) fs.unlinkSync(exeFile); } catch (e) {}
        }
      }
    });
  });
});

let sortedChapters = Array.from(globalChapterIds).sort((a,b)=>a-b);
for (let i = 0; i < sortedChapters.length; i++) {
  if (sortedChapters[i] !== i + 1) {
    failures.push({
      chapterId: sortedChapters[i],
      lessonId: 'N/A',
      title: 'N/A',
      error: 'SCHEMA_ERROR',
      details: `Chapter IDs are not strictly sequential starting from 1 (found ${sortedChapters[i]} at index ${i})`
    });
  }
}

console.log("==========================================");
console.log("FINAL REPORT");
console.log("==========================================");
console.log(`Chapters scanned: ${totalChaptersScanned}`);
console.log(`Lessons scanned: ${totalLessonsScanned}`);
console.log(`Deterministic examples compiled/executed: ${deterministicExamplesExecuted}`);
console.log(`Stdin-dependent examples skipped: ${skippedStdinExamples}`);
console.log(`Passes: ${passes}`);
console.log(`Failures: ${failures.length}`);

if (failures.length > 0) {
  process.exitCode = 1;
  console.log("\n--- FAILURES ---");
  failures.forEach(f => {
    console.log(`\n[Chapter ${f.chapterId} | Lesson ${f.lessonId}: ${f.title}] - ${f.error}`);
    if (f.error === 'MISMATCH') {
      console.log(`Diff: ${f.diff}`);
      console.log(`Raw Expected:\n${f.rawExpected}`);
      console.log(`Raw Actual:\n${f.rawActual}`);
      console.log(`Normalized Expected:\n${f.normalizedExpected}`);
      console.log(`Normalized Actual:\n${f.normalizedActual}`);
    } else {
      console.log(`Details: ${f.details}`);
    }
  });
}

if (floatingPointIssues.length > 0) {
  console.log("\n--- FLOATING-POINT FORMATTING ISSUES ---");
  floatingPointIssues.forEach(f => {
    console.log(`Lesson ${f.lessonId}: ${f.title}`);
  });
}
