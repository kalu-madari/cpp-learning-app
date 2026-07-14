const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appPath = path.join(__dirname, '..', 'renderer', 'js', 'app.js');
const appCode = fs.readFileSync(appPath, 'utf8');

let codeToRun = appCode.replace(/^\(function \(\) \{/m, '').replace(/\}\)\(\);\s*$/m, '');
codeToRun = codeToRun.replace("if (document.readyState === 'loading') {", "if (false) {");
codeToRun = codeToRun.replace("document.addEventListener('DOMContentLoaded', init);", "");
codeToRun = codeToRun.replace("} else {\n    init();\n  }", "} else {}");

codeToRun += `
module.exports = {
  init,
  normalizeExerciseData: typeof normalizeExerciseData !== 'undefined' ? normalizeExerciseData : null,
  isExerciseCompleted: typeof isExerciseCompleted !== 'undefined' ? isExerciseCompleted : null,
  state: typeof state !== 'undefined' ? state : null,
  openLesson: typeof openLesson !== 'undefined' ? openLesson : null,
  completeLesson: typeof completeLesson !== 'undefined' ? completeLesson : null,
  renderCheckerResult: typeof renderCheckerResult !== 'undefined' ? renderCheckerResult : null,
  handleExecutionExit: typeof handleExecutionExit !== 'undefined' ? handleExecutionExit : null,
  renderPractice: typeof renderPractice !== 'undefined' ? renderPractice : null,
  updateManualCompleteVisibility: typeof updateManualCompleteVisibility !== 'undefined' ? updateManualCompleteVisibility : null
};
`;

class MockDOMElement {
  constructor(id, tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.style = { display: '' };
    this.classList = { add: () => {}, remove: () => {}, toggle: () => {} };
    this._innerHTML = '';
    this.textContent = '';
    this.children = [];
    this.dataset = {};
    this.listeners = {};
    this.value = '';
  }
  focus() {}
  insertAdjacentHTML() {}
  set innerHTML(val) {
    this._innerHTML = val;
    if (val === '') this.children = [];
  }
  get innerHTML() { return this._innerHTML; }
  addEventListener(event, handler) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(handler);
  }
  dispatchEvent(eventObj) {
    if (this.listeners[eventObj.type]) {
      this.listeners[eventObj.type].forEach(h => h(eventObj));
    }
  }
  appendChild(child) { this.children.push(child); }
  insertBefore(newChild, refChild) { this.children.push(newChild); }
  querySelector() { return new MockDOMElement('qs'); }
  querySelectorAll() { return []; }
  cloneNode() { return new MockDOMElement(this.id, this.tagName); }
  remove() { }
  removeAttribute() { }
}

function createMockApp() {
  const elements = {};
  function getEl(id) {
    if (!elements[id]) elements[id] = new MockDOMElement(id);
    return elements[id];
  }

  const documentListeners = {};
  const mockDocument = {
    readyState: 'loading',
    documentElement: { setAttribute: () => {} },
    body: new MockDOMElement('body'),
    getElementById: getEl,
    createElement: (tag) => new MockDOMElement('', tag),
    addEventListener: (event, handler) => {
      if (!documentListeners[event]) documentListeners[event] = [];
      documentListeners[event].push(handler);
    },
    querySelector: () => new MockDOMElement('qs'),
    querySelectorAll: () => [],
    dispatchEvent: (eventObj) => {
      if (documentListeners[eventObj.type]) {
        documentListeners[eventObj.type].forEach(h => h(eventObj));
      }
    }
  };

  let editorValue = 'int main(){return 0;}';
  const mockRequire = Object.assign((deps, cb) => {
    if (typeof cb === 'function') cb();
    return {};
  }, { config: () => {} });

  const mockWindow = {
    require: mockRequire,
    LESSONS_DATA: { chapters: [{ lessons: [{ id: 'ch1-l1', title: 'L1', difficulty: 'beginner', exercises: [
      { instruction: 'A', expectedOutput: 'A', starterCode: 'A' },
      { instruction: 'B', expectedOutput: 'B', starterCode: 'B' },
      { instruction: 'C', expectedOutput: 'C', starterCode: 'C' }
    ]}] }] },
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    monaco: {
      editor: {
        create: () => ({ getValue: () => editorValue, setValue: (v) => { editorValue = v; }, layout: () => {}, onDidChangeModelContent: () => {}, addCommand: () => {} }),
        defineTheme: () => {},
        setTheme: () => {}
      },
      languages: {
        registerCompletionItemProvider: () => {},
        CompletionItemKind: { Snippet: 1 },
        CompletionItemInsertTextRule: { InsertAsSnippet: 1 }
      },
      KeyMod: { CtrlCmd: 1 },
      KeyCode: { Enter: 2 }
    },
    api: new Proxy({}, { get: (target, prop) => {
      if (prop === 'checkCompiler') return async () => ({ available: true });
      return () => {};
    } }),
    confirm: () => true,
    performance: { now: () => Date.now() },
    requestAnimationFrame: (cb) => cb()
  };

  const sandbox = {
    document: mockDocument,
    window: mockWindow,
    localStorage: {
      data: {},
      getItem: function(k) { return this.data[k] || null; },
      setItem: function(k, v) { this.data[k] = v; }
    },
    setTimeout: (cb) => { cb(); },
    Date: Date, Math: Math,
    console: { log: () => {}, error: () => {}, warn: () => {} },
    parseInt: parseInt, isNaN: isNaN, String: String, Array: Array,
    performance: { now: () => Date.now() },
    requestAnimationFrame: (cb) => cb(),
    require: mockRequire,
    monaco: mockWindow.monaco,
    module: { exports: {} }
  };

  vm.createContext(sandbox);
  vm.runInContext(codeToRun, sandbox);

  return { app: sandbox.module.exports, document: mockDocument, getEl, window: mockWindow };
}

// ----------------------------------------------------------------------------------
// NORMALIZATION / PURE HELPER TESTS
// ----------------------------------------------------------------------------------
test('normalizeExerciseData converts legacy exercise Object to one-element array', () => {
  const { app } = createMockApp();
  const lesson = { exercise: { instruction: "A" } };
  const res = app.normalizeExerciseData(lesson);
  assert.strictEqual(res.length, 1);
  assert.strictEqual(res[0].instruction, "A");
});

test('normalizeExerciseData returns v2 exercises Array unchanged', () => {
  const { app } = createMockApp();
  const lesson = { exercises: [{ instruction: "A" }, { instruction: "B" }] };
  const res = app.normalizeExerciseData(lesson);
  assert.strictEqual(res.length, 2);
  assert.strictEqual(res[0].instruction, "A");
  assert.strictEqual(res[1].instruction, "B");
});

test('normalizeExerciseData returns [] for null/missing exercise data', () => {
  const { app } = createMockApp();
  assert.strictEqual(app.normalizeExerciseData(null).length, 0);
  assert.strictEqual(app.normalizeExerciseData({}).length, 0);
  assert.strictEqual(app.normalizeExerciseData({ exercises: null }).length, 0);
});

test('Completion key format is exactly "lessonId:N"', () => {
  const { app } = createMockApp();
  app.state.progress.completedExercises = ['ch1-l1:0'];
  assert.strictEqual(app.isExerciseCompleted('ch1-l1', 0), true);
  assert.strictEqual(app.isExerciseCompleted('ch1-l1', 1), false);
});

// ----------------------------------------------------------------------------------
// EXERCISE ROUTING TESTS
// ----------------------------------------------------------------------------------
test('Loading Exercise N sets activeExerciseIndex = N', async () => {
  const { app, document } = createMockApp();
  await app.init();
  app.state.currentLesson = app.state.chapters?.[0]?.lessons?.[0] || { id: 'l1', exercises: [{}, {}, {}] };

  document.dispatchEvent({ type: 'click', target: { id: 'btn-load-exercise-1' } });
  assert.strictEqual(app.state.activeExerciseIndex, 1);

  document.dispatchEvent({ type: 'click', target: { id: 'btn-load-exercise-2' } });
  assert.strictEqual(app.state.activeExerciseIndex, 2);
});

test('Running Exercise N uses Exercise N expectedOutput', async () => {
  const { app, getEl } = createMockApp();
  await app.init();
  app.state.currentLesson = { id: 'ch1-l1', exercises: [{ expectedOutput: 'out0' }, { expectedOutput: 'out1' }] };
  app.state.activeExerciseIndex = 1;
  app.state.editorMode = 'exercise';

  getEl('btn-run-code').dispatchEvent({ type: 'click' });

  assert.strictEqual(app.state.activeExecutionContext.expectedOutputRaw, 'out1');
});

test('Passing Exercise N completes only Exercise N, never Exercise M', () => {
  const { app } = createMockApp();
  app.state.currentLesson = { id: 'ch1-l1', exercises: [{ expectedOutput: 'A' }, { expectedOutput: 'B' }] };
  app.state.activeExerciseIndex = 0;
  app.state.activeExecutionContext = { source: 'exercise', lessonId: 'ch1-l1', hasExpectedOutput: true, exerciseIndex: 0 };

  app.renderCheckerResult('PASS', 'A', 'A', 'A', 'A', app.state.activeExecutionContext);

  assert.strictEqual(app.state.progress.completedExercises.includes('ch1-l1:0'), true);
  assert.strictEqual(app.state.progress.completedExercises.includes('ch1-l1:1'), false);
  assert.strictEqual(app.isExerciseCompleted('ch1-l1'), false);
});

test('Reset in exercise mode reloads active exercise starterCode and preserves activeExerciseIndex', async () => {
  const { app, getEl } = createMockApp();
  await app.init();
  app.state.currentLesson = { id: 'ch1-l1', exercises: [{ starterCode: 'A' }, { starterCode: 'B' }] };
  app.state.activeExerciseIndex = 1;
  app.state.editorMode = 'exercise';
  app.state.originalCode = 'B';

  getEl('btn-reset-code').dispatchEvent({ type: 'click' });

  assert.strictEqual(app.state.activeExerciseIndex, 1);
  assert.strictEqual(app.state.editor.getValue(), 'B');
});

test('Switching lessons resets activeExerciseIndex to 0', async () => {
  const { app } = createMockApp();
  await app.init();
  app.state.activeExerciseIndex = 2;
  app.openLesson('ch1-l1');
  assert.strictEqual(app.state.activeExerciseIndex, 0);
});

// ----------------------------------------------------------------------------------
// CANONICAL EXAMPLE ISOLATION TESTS
// ----------------------------------------------------------------------------------
test('Passing canonical codeExample does not complete a lesson', () => {
  const { app } = createMockApp();
  app.state.activeExecutionContext = { source: 'example', lessonId: 'ch1-l1' };
  app.renderCheckerResult('PASS', 'A', 'A', 'A', 'A', app.state.activeExecutionContext);
  assert.strictEqual(app.state.progress.completedLessons.includes('ch1-l1'), false);
});

test('Passing canonical codeExample does not complete an exercise', () => {
  const { app } = createMockApp();
  app.state.activeExecutionContext = { source: 'example', lessonId: 'ch1-l1' };
  app.renderCheckerResult('PASS', 'A', 'A', 'A', 'A', app.state.activeExecutionContext);
  assert.strictEqual(app.state.progress.completedExercises.length, 0);
});

test('Running canonical codeExample does not set openEndedRunCompleted', () => {
  const { app } = createMockApp();
  app.state.activeExecutionContext = { source: 'example', lessonId: 'ch1-l1', hasExpectedOutput: false };
  app.handleExecutionExit(0);
  assert.strictEqual(app.state.openEndedRunCompleted, false);
});

// ----------------------------------------------------------------------------------
// OPEN-ENDED COMPLETION TESTS
// ----------------------------------------------------------------------------------
test('Exit-code-0 execution of a loaded open-ended exercise sets openEndedRunCompleted = true', () => {
  const { app } = createMockApp();
  app.state.isCompiling = true;
  app.state.activeExecutionContext = { source: 'exercise', lessonId: 'ch1-l1', hasExpectedOutput: false };
  app.handleExecutionExit(0);
  assert.strictEqual(app.state.openEndedRunCompleted, true);
});

test('Open-ended execution does not create completedExercises entries', () => {
  const { app } = createMockApp();
  app.state.isCompiling = true;
  app.state.activeExecutionContext = { source: 'exercise', lessonId: 'ch1-l1', hasExpectedOutput: false };
  app.handleExecutionExit(0);
  assert.strictEqual(app.state.progress.completedExercises.length, 0);
});

test('Open-ended execution does not automatically complete the lesson', () => {
  const { app } = createMockApp();
  app.state.isCompiling = true;
  app.state.activeExecutionContext = { source: 'exercise', lessonId: 'ch1-l1', hasExpectedOutput: false };
  app.handleExecutionExit(0);
  assert.strictEqual(app.state.progress.completedLessons.includes('ch1-l1'), false);
});

test('Manual completion action is unavailable before eligible open-ended execution', () => {
  const { app, getEl } = createMockApp();
  app.state.openEndedRunCompleted = false;
  const lesson = { id: 'ch1-l1', exercises: [{ instruction: 'Do stuff' }] };
  app.updateManualCompleteVisibility(lesson);
  assert.strictEqual(getEl('manual-completion-section').style.display, 'none');
});

test('Manual completion action becomes available after eligible execution', () => {
  const { app, getEl } = createMockApp();
  app.state.openEndedRunCompleted = true;
  const lesson = { id: 'ch1-l1', exercises: [{ instruction: 'Do stuff' }] };
  app.updateManualCompleteVisibility(lesson);
  assert.strictEqual(getEl('manual-completion-section').style.display, 'block');
});

test('Manual completion action completes the lesson through existing persistence path', async () => {
  const { app, getEl } = createMockApp();
  await app.init();
  app.state.currentLesson = { id: 'ch1-l1' };

  getEl('btn-mark-lesson-complete').dispatchEvent({ type: 'click' });

  assert.strictEqual(app.state.progress.completedLessons.includes('ch1-l1'), true);
});

test('Manual completion action does not complete any individual exercise', async () => {
  const { app, getEl } = createMockApp();
  await app.init();
  app.state.currentLesson = { id: 'ch1-l1' };

  getEl('btn-mark-lesson-complete').dispatchEvent({ type: 'click' });

  assert.strictEqual(app.state.progress.completedExercises.length, 0);
});

test('Switching lessons resets eligibility', async () => {
  const { app } = createMockApp();
  await app.init();
  app.state.openEndedRunCompleted = true;
  app.openLesson('ch1-l1');
  assert.strictEqual(app.state.openEndedRunCompleted, false);
});

test('Loading another exercise resets eligibility', async () => {
  const { app, document } = createMockApp();
  await app.init();
  app.state.currentLesson = { id: 'ch1-l1', exercises: [{}, {}] };
  app.state.openEndedRunCompleted = true;

  document.dispatchEvent({ type: 'click', target: { id: 'btn-load-exercise-1' } });

  assert.strictEqual(app.state.openEndedRunCompleted, false);
});

// ----------------------------------------------------------------------------------
// PRACTICE MODE TESTS
// ----------------------------------------------------------------------------------
test('Lesson with legacy exercise appears in Practice Mode during transition', async () => {
  const { app, getEl, window } = createMockApp();
  window.LESSONS_DATA.chapters = [{ lessons: [
    { id: 'l1', difficulty: 'beginner', exercise: { instruction: "I" } }
  ] }];
  await app.init();

  app.renderPractice('beginner');
  const grid = getEl('practice-grid');
  assert.ok(grid.children.length > 0);
});

test('Lesson with v2 exercises Array appears in Practice Mode', async () => {
  const { app, getEl, window } = createMockApp();
  window.LESSONS_DATA.chapters = [{ lessons: [
    { id: 'l1', difficulty: 'beginner', exercises: [{ instruction: "I" }, { instruction: "I2" }] }
  ] }];
  await app.init();

  app.renderPractice('beginner');
  const grid = getEl('practice-grid');
  assert.ok(grid.children.length > 0);
});

test('Lesson with null/empty exercises does not appear', async () => {
  const { app, getEl, window } = createMockApp();
  window.LESSONS_DATA.chapters = [{ lessons: [
    { id: 'l1', difficulty: 'beginner', exercises: [] }
  ] }];
  await app.init();

  app.renderPractice('beginner');
  const grid = getEl('practice-grid');
  assert.strictEqual(grid.children.length, 0);
});

test('Practice Mode uses exercises[0]', async () => {
  const { app, getEl, window } = createMockApp();
  window.LESSONS_DATA.chapters = [{ lessons: [
    { id: 'l1', title: 'T1', difficulty: 'beginner', exercises: [{ starterCode: "STARTER_0" }, { starterCode: "STARTER_1" }] }
  ] }];
  await app.init();

  app.renderPractice('beginner');
  const grid = getEl('practice-grid');

  // Find the practice item that was appended to the grid and click it
  grid.children[0].dispatchEvent({ type: 'click' });

  // Clicking the practice item should set the editor mode and load starterCode from exercises[0]
  assert.strictEqual(app.state.originalCode, 'STARTER_0');
  assert.strictEqual(app.state.editorMode, 'exercise');
});

test('Multi-exercise lesson reports the correct exercise count', async () => {
  const { app, getEl, window } = createMockApp();
  window.LESSONS_DATA.chapters = [{ lessons: [
    { id: 'l1', title: 'T1', difficulty: 'beginner', exercises: [{}, {}, {}] }
  ] }];
  await app.init();

  app.renderPractice('beginner');
  const grid = getEl('practice-grid');
  assert.ok(grid.children[0].innerHTML.includes('3 exercises'));
});
