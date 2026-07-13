// ============================================================================
// C++ Mastery — Main Application Controller
// Orchestrates all views, Monaco editor, compilation, progress tracking,
// search, bookmarks, achievements, and the interactive learning workflow.
// ============================================================================

(function () {
  'use strict';

  // =========================================================================
  // Constants & Configuration
  // =========================================================================
  const STORAGE_KEYS = {
    PROGRESS: 'cpp-mastery-progress',
    BOOKMARKS: 'cpp-mastery-bookmarks',
    SETTINGS: 'cpp-mastery-settings',
    STREAK: 'cpp-mastery-streak',
    ACHIEVEMENTS: 'cpp-mastery-achievements',
    LAST_LESSON: 'cpp-mastery-last-lesson',
  };

  const ACHIEVEMENTS_LIST = [
    { id: 'first-run', title: 'Hello World!', desc: 'Run your first C++ program', icon: '🚀', condition: 'runsCount >= 1' },
    { id: 'five-lessons', title: 'Getting Started', desc: 'Complete 5 lessons', icon: '📖', condition: 'lessonsCount >= 5' },
    { id: 'ten-lessons', title: 'Dedicated Learner', desc: 'Complete 10 lessons', icon: '📚', condition: 'lessonsCount >= 10' },
    { id: 'twenty-lessons', title: 'Knowledge Seeker', desc: 'Complete 20 lessons', icon: '🎓', condition: 'lessonsCount >= 20' },
    { id: 'all-lessons', title: 'C++ Master', desc: 'Complete all lessons', icon: '👑', condition: 'lessonsCount >= totalLessons' },
    { id: 'streak-3', title: 'On a Roll', desc: '3-day learning streak', icon: '🔥', condition: 'streak >= 3' },
    { id: 'streak-7', title: 'Week Warrior', desc: '7-day learning streak', icon: '⚡', condition: 'streak >= 7' },
    { id: 'streak-30', title: 'Monthly Champion', desc: '30-day learning streak', icon: '🏆', condition: 'streak >= 30' },
    { id: 'five-exercises', title: 'Problem Solver', desc: 'Complete 5 exercises', icon: '💪', condition: 'exercisesCount >= 5' },
    { id: 'ten-exercises', title: 'Code Warrior', desc: 'Complete 10 exercises', icon: '⚔️', condition: 'exercisesCount >= 10' },
    { id: 'first-quiz', title: 'Quiz Taker', desc: 'Complete your first quiz', icon: '📝', condition: 'quizzesCount >= 1' },
    { id: 'ten-runs', title: 'Compiler Friend', desc: 'Run code 10 times', icon: '⚙️', condition: 'runsCount >= 10' },
    { id: 'fifty-runs', title: 'Code Machine', desc: 'Run code 50 times', icon: '🤖', condition: 'runsCount >= 50' },
    { id: 'night-owl', title: 'Night Owl', desc: 'Code after midnight', icon: '🦉', condition: 'nightCoding' },
    { id: 'speed-runner', title: 'Speed Runner', desc: 'Complete a lesson in under 2 minutes', icon: '⏱️', condition: 'speedRun' },
    { id: 'bookworm', title: 'Bookworm', desc: 'Bookmark 5 lessons', icon: '🔖', condition: 'bookmarksCount >= 5' },
  ];

  // Common C++ compiler error patterns and their explanations
  const ERROR_PATTERNS = [
    {
      pattern: /expected ['"]?;['"]? before/i,
      title: 'Missing Semicolon',
      explanation: 'You forgot a semicolon (;) at the end of a statement. Every C++ statement must end with a semicolon.',
      suggestion: 'Add a semicolon at the end of the line mentioned in the error.'
    },
    {
      pattern: /['"](.+?)['"] was not declared in this scope/i,
      title: 'Undeclared Variable or Function',
      explanation: 'The compiler doesn\'t recognize this name. It might be misspelled, not yet declared, or you forgot to include the right header.',
      suggestion: 'Check spelling, ensure the variable is declared before use, or add the necessary #include directive.'
    },
    {
      pattern: /expected primary-expression/i,
      title: 'Syntax Error',
      explanation: 'The compiler expected a value, variable, or expression but found something unexpected. This usually means there\'s a typo or missing operand.',
      suggestion: 'Check the line for typos, missing operators, or incomplete expressions.'
    },
    {
      pattern: /no matching function for call to/i,
      title: 'Wrong Function Arguments',
      explanation: 'You\'re calling a function with the wrong number or type of arguments.',
      suggestion: 'Check the function signature and make sure you\'re passing the correct arguments.'
    },
    {
      pattern: /expected ['"]?\}['"]? at end of input/i,
      title: 'Missing Closing Brace',
      explanation: 'You have an opening brace { without a matching closing brace }. This often happens when you forget to close a function, loop, or if-block.',
      suggestion: 'Count your braces and add the missing closing brace }.'
    },
    {
      pattern: /invalid operands? of types? ['"]?(.+?)['"]? (?:and ['"]?(.+?)['"]? )?to/i,
      title: 'Type Mismatch',
      explanation: 'You\'re trying to use an operator with incompatible types. For example, you can\'t add a string and an integer directly.',
      suggestion: 'Use type casting or conversion functions to match the types.'
    },
    {
      pattern: /redefinition of ['"]?(.+?)['"]?/i,
      title: 'Duplicate Definition',
      explanation: 'You\'ve defined the same variable, function, or class more than once in the same scope.',
      suggestion: 'Remove the duplicate definition or rename one of them.'
    },
    {
      pattern: /cannot convert ['"]?(.+?)['"]? to ['"]?(.+?)['"]?/i,
      title: 'Type Conversion Error',
      explanation: 'The compiler can\'t automatically convert between these types. An explicit cast might be needed.',
      suggestion: 'Use static_cast<TargetType>(value) or check if the types are compatible.'
    },
    {
      pattern: /undefined reference to/i,
      title: 'Linker Error: Undefined Reference',
      explanation: 'The linker can\'t find the implementation of a function or variable you\'re trying to use. It was declared but never defined.',
      suggestion: 'Make sure the function is implemented (not just declared) and all source files are being compiled.'
    },
    {
      pattern: /use of undeclared identifier/i,
      title: 'Undeclared Identifier',
      explanation: 'This variable or function hasn\'t been declared. It might be out of scope or misspelled.',
      suggestion: 'Declare the variable before using it, or check for typos.'
    },
    {
      pattern: /class ['"]?(.+?)['"]? has no member named ['"]?(.+?)['"]?/i,
      title: 'Unknown Class Member',
      explanation: 'You\'re trying to access a member that doesn\'t exist in this class or struct.',
      suggestion: 'Check the class definition for the correct member name, or ensure the member is public.'
    },
    {
      pattern: /control reaches end of non-void function/i,
      title: 'Missing Return Statement',
      explanation: 'A function that should return a value doesn\'t have a return statement at the end.',
      suggestion: 'Add a return statement at the end of the function.'
    },
    {
      pattern: /no viable overloaded/i,
      title: 'No Matching Overload',
      explanation: 'None of the overloaded versions of this function match the arguments you provided.',
      suggestion: 'Check the function\'s documentation for valid argument types and counts.'
    }
  ];

  // =========================================================================
  // Application State
  // =========================================================================
  let state = {
    currentView: 'dashboard',
    currentLesson: null,
    currentLessonStartTime: null,
    editor: null,
    editorReady: false,
    compilerAvailable: false,
    isCompiling: false,
    originalCode: '',
    editorMode: 'example', // Tracks if the editor currently shows an example or exercise

    // Persisted state
    progress: {
      completedLessons: [],
      completedExercises: [],
      completedQuizzes: [],
      runsCount: 0,
    },
    bookmarks: [],
    settings: {
      theme: 'dark',
      fontSize: 14,
      timeout: 10000,
    },
    streak: {
      count: 0,
      lastDate: null,
    },
    achievements: [],
    lastLesson: null,
  };

  // =========================================================================
  // Initialization
  // =========================================================================
  async function init() {
    loadState();
    applyTheme();
    bindUIEvents();
    await checkCompiler();
    initMonaco();
    renderDashboard();
    updateSidebarStats();

    // Hide loading screen
    setTimeout(function () {
      var loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(function () {
          loadingScreen.style.display = 'none';
        }, 500);
      }
    }, 800);
  }

  // =========================================================================
  // State Persistence (localStorage)
  // =========================================================================
  function loadState() {
    try {
      var p = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      if (p) state.progress = JSON.parse(p);

      var b = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (b) state.bookmarks = JSON.parse(b);

      var s = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (s) state.settings = Object.assign(state.settings, JSON.parse(s));

      var st = localStorage.getItem(STORAGE_KEYS.STREAK);
      if (st) state.streak = JSON.parse(st);

      var a = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (a) state.achievements = JSON.parse(a);

      var ll = localStorage.getItem(STORAGE_KEYS.LAST_LESSON);
      if (ll) state.lastLesson = ll;
    } catch (e) {
      console.warn('Failed to load state:', e);
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(state.progress));
    } catch (e) { console.warn('Save failed:', e); }
  }

  function saveBookmarks() {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(state.bookmarks));
    } catch (e) { console.warn('Save failed:', e); }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
    } catch (e) { console.warn('Save failed:', e); }
  }

  function saveStreak() {
    try {
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(state.streak));
    } catch (e) { console.warn('Save failed:', e); }
  }

  function saveAchievements() {
    try {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(state.achievements));
    } catch (e) { console.warn('Save failed:', e); }
  }

  function saveLastLesson(lessonId) {
    try {
      state.lastLesson = lessonId;
      localStorage.setItem(STORAGE_KEYS.LAST_LESSON, lessonId);
    } catch (e) { console.warn('Save failed:', e); }
  }

  // =========================================================================
  // Data Access Helpers
  // =========================================================================
  function getChapters() {
    return (window.LESSONS_DATA && window.LESSONS_DATA.chapters) || [];
  }

  function getAllLessons() {
    var lessons = [];
    getChapters().forEach(function (ch) {
      (ch.lessons || []).forEach(function (l) {
        lessons.push(Object.assign({}, l, { chapterTitle: ch.title, chapterId: ch.id, chapterIcon: ch.icon }));
      });
    });
    return lessons;
  }

  function findLesson(lessonId) {
    var all = getAllLessons();
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === lessonId) return all[i];
    }
    return null;
  }

  function getLessonIndex(lessonId) {
    var all = getAllLessons();
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === lessonId) return i;
    }
    return -1;
  }

  function getNextLesson(currentLessonId) {
    var all = getAllLessons();
    var idx = getLessonIndex(currentLessonId);
    if (idx >= 0 && idx < all.length - 1) return all[idx + 1];
    return null;
  }

  function getPrevLesson(currentLessonId) {
    var all = getAllLessons();
    var idx = getLessonIndex(currentLessonId);
    if (idx > 0) return all[idx - 1];
    return null;
  }

  function isLessonCompleted(lessonId) {
    return state.progress.completedLessons.indexOf(lessonId) !== -1;
  }

  function isExerciseCompleted(lessonId) {
    return state.progress.completedExercises.indexOf(lessonId) !== -1;
  }

  function isBookmarked(lessonId) {
    return state.bookmarks.indexOf(lessonId) !== -1;
  }

  function getTotalLessons() {
    return getAllLessons().length;
  }

  function getProgressPercentage() {
    var total = getTotalLessons();
    if (total === 0) return 0;
    return Math.round((state.progress.completedLessons.length / total) * 100);
  }

  function getUserLevel() {
    var pct = getProgressPercentage();
    if (pct >= 90) return 'Expert';
    if (pct >= 60) return 'Advanced';
    if (pct >= 30) return 'Intermediate';
    return 'Beginner';
  }

  // =========================================================================
  // Theme
  // =========================================================================
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.settings.theme);
    var checkbox = document.getElementById('theme-checkbox');
    if (checkbox) checkbox.checked = state.settings.theme === 'light';
  }

  // =========================================================================
  // Compiler Check
  // =========================================================================
  async function checkCompiler() {
    if (!window.api || !window.api.checkCompiler) {
      state.compilerAvailable = false;
      return;
    }
    try {
      var result = await window.api.checkCompiler();
      state.compilerAvailable = result.available;
      var statusEl = document.getElementById('compiler-status');
      if (statusEl) {
        statusEl.textContent = result.available
          ? result.info
          : 'Not found — install MinGW-w64 or MSYS2';
        statusEl.style.color = result.available ? 'var(--color-success)' : 'var(--color-error)';
      }
      if (!result.available) {
        document.getElementById('compiler-setup-overlay').style.display = 'flex';
      }
    } catch (e) {
      state.compilerAvailable = false;
    }
  }

  // =========================================================================
  // Monaco Editor Setup
  // =========================================================================
  function initMonaco() {
    if (typeof require === 'undefined' || typeof require.config !== 'function') {
      console.warn('Monaco AMD loader not available. Editor will be limited.');
      initFallbackEditor();
      return;
    }

    require.config({
      paths: { vs: '../node_modules/monaco-editor/min/vs' }
    });

    require(['vs/editor/editor.main'], function () {
      // Define a custom dark theme
      monaco.editor.defineTheme('cpp-mastery-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6a737d', fontStyle: 'italic' },
          { token: 'keyword', foreground: 'c084fc' },
          { token: 'string', foreground: '34d399' },
          { token: 'number', foreground: 'fbbf24' },
          { token: 'type', foreground: '60a5fa' },
          { token: 'function', foreground: '818cf8' },
          { token: 'variable', foreground: 'f1f5f9' },
          { token: 'operator', foreground: 'f472b6' },
          { token: 'preprocessor', foreground: 'fb923c' },
        ],
        colors: {
          'editor.background': '#0d1117',
          'editor.foreground': '#e6edf3',
          'editorLineNumber.foreground': '#484f58',
          'editorLineNumber.activeForeground': '#e6edf3',
          'editor.selectionBackground': '#264f78',
          'editor.lineHighlightBackground': '#161b22',
          'editorCursor.foreground': '#818cf8',
          'editorIndentGuide.background': '#21262d',
          'editorIndentGuide.activeBackground': '#30363d',
          'editor.selectionHighlightBackground': '#3fb95040',
          'editorBracketMatch.background': '#818cf820',
          'editorBracketMatch.border': '#818cf860',
          'scrollbar.shadow': '#0000',
          'scrollbarSlider.background': '#484f5855',
          'scrollbarSlider.hoverBackground': '#484f5888',
        }
      });

      monaco.editor.defineTheme('cpp-mastery-light', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6a737d', fontStyle: 'italic' },
          { token: 'keyword', foreground: '7c3aed' },
          { token: 'string', foreground: '059669' },
          { token: 'number', foreground: 'd97706' },
          { token: 'type', foreground: '2563eb' },
          { token: 'function', foreground: '4f46e5' },
          { token: 'preprocessor', foreground: 'ea580c' },
        ],
        colors: {
          'editor.background': '#ffffff',
          'editor.foreground': '#1e293b',
          'editor.lineHighlightBackground': '#f8fafc',
          'editorCursor.foreground': '#4f46e5',
        }
      });

      var container = document.getElementById('monaco-container');
      state.editor = monaco.editor.create(container, {
        value: '// Welcome to C++ Mastery!\n// Select a lesson to start coding.\n\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}\n',
        language: 'cpp',
        theme: state.settings.theme === 'dark' ? 'cpp-mastery-dark' : 'cpp-mastery-light',
        fontSize: state.settings.fontSize,
        fontFamily: "'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace",
        fontLigatures: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        lineNumbers: 'on',
        roundedSelection: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        smoothScrolling: true,
        padding: { top: 12, bottom: 12 },
        renderLineHighlight: 'all',
        bracketPairColorization: { enabled: true },
        suggest: {
          showKeywords: true,
          showSnippets: true,
        },
        quickSuggestions: true,
        wordWrap: 'off',
        tabSize: 4,
        insertSpaces: true,
      });

      // Register C++ snippets for autocomplete
      monaco.languages.registerCompletionItemProvider('cpp', {
        provideCompletionItems: function (model, position) {
          var word = model.getWordUntilPosition(position);
          var range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn
          };
          return {
            suggestions: [
              { label: 'cout', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'cout << ${1:value} << endl;', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Print to stdout', range: range },
              { label: 'cin', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'cin >> ${1:variable};', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Read from stdin', range: range },
              { label: 'for', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t${3}\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'For loop', range: range },
              { label: 'while', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'while (${1:condition}) {\n\t${2}\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'While loop', range: range },
              { label: 'if', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'if (${1:condition}) {\n\t${2}\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'If statement', range: range },
              { label: 'ifelse', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'if (${1:condition}) {\n\t${2}\n} else {\n\t${3}\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'If-else statement', range: range },
              { label: 'class', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'class ${1:ClassName} {\npublic:\n\t${1:ClassName}() {}\n\t~${1:ClassName}() {}\n\nprivate:\n\t${2}\n};', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Class definition', range: range },
              { label: 'struct', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'struct ${1:Name} {\n\t${2}\n};', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Struct definition', range: range },
              { label: 'vector', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'vector<${1:int}> ${2:vec};', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Vector declaration', range: range },
              { label: 'main', kind: monaco.languages.CompletionItemKind.Snippet, insertText: '#include <iostream>\nusing namespace std;\n\nint main() {\n\t${1}\n\treturn 0;\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Main function template', range: range },
              { label: 'func', kind: monaco.languages.CompletionItemKind.Snippet, insertText: '${1:void} ${2:functionName}(${3:params}) {\n\t${4}\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Function definition', range: range },
              { label: 'switch', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'switch (${1:expr}) {\n\tcase ${2:value}:\n\t\t${3}\n\t\tbreak;\n\tdefault:\n\t\t${4}\n\t\tbreak;\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Switch statement', range: range },
              { label: 'try', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'try {\n\t${1}\n} catch (const exception& e) {\n\tcerr << e.what() << endl;\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Try-catch block', range: range },
            ]
          };
        }
      });

      // Keybinding: Ctrl+Enter to run
      state.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, function () {
        compileAndRun();
      });

      state.editorReady = true;
    });
  }

  function initFallbackEditor() {
    // Simple textarea fallback if Monaco fails to load
    var container = document.getElementById('monaco-container');
    container.innerHTML = '<textarea id="fallback-editor" style="width:100%;height:100%;background:var(--bg-primary);color:var(--text-primary);font-family:var(--font-mono);font-size:14px;padding:12px;border:none;outline:none;resize:none;" spellcheck="false"></textarea>';
    var ta = document.getElementById('fallback-editor');
    ta.value = '// Welcome to C++ Mastery!\n// Select a lesson to start coding.\n\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}\n';
    state.editorReady = true;
  }

  function getEditorCode() {
    if (state.editor && state.editor.getValue) {
      return state.editor.getValue();
    }
    var ta = document.getElementById('fallback-editor');
    return ta ? ta.value : '';
  }

  function setEditorCode(code) {
    if (state.editor && state.editor.setValue) {
      state.editor.setValue(code);
    } else {
      var ta = document.getElementById('fallback-editor');
      if (ta) ta.value = code;
    }
  }

  // =========================================================================
  // UI Event Bindings
  // =========================================================================
  function bindUIEvents() {
    // Window controls
    var btnMin = document.getElementById('btn-minimize');
    var btnMax = document.getElementById('btn-maximize');
    var btnClose = document.getElementById('btn-close');
    if (btnMin) btnMin.addEventListener('click', function () { window.api && window.api.windowMinimize(); });
    if (btnMax) btnMax.addEventListener('click', function () { window.api && window.api.windowMaximize(); });
    if (btnClose) btnClose.addEventListener('click', function () { window.api && window.api.windowClose(); });

    // Sidebar navigation
    document.querySelectorAll('.nav-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var view = item.getAttribute('data-view');
        switchView(view);
      });
    });

    // Sidebar toggle
    document.getElementById('sidebar-toggle').addEventListener('click', function () {
      document.getElementById('sidebar').classList.toggle('collapsed');
    });

    // Search
    var searchInput = document.getElementById('search-input');
    var searchTimer = null;
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () {
        var query = searchInput.value.trim();
        if (query.length >= 2) {
          performSearch(query);
          switchView('search');
        }
      }, 300);
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var query = searchInput.value.trim();
        if (query.length >= 1) {
          performSearch(query);
          switchView('search');
        }
      }
    });

    // Continue button
    document.getElementById('continue-btn').addEventListener('click', function () {
      var lessonId = state.lastLesson || getFirstIncompleteLessonId();
      if (lessonId) openLesson(lessonId);
    });
    document.getElementById('continue-card').addEventListener('click', function (e) {
      if (e.target.closest('.btn')) return; // don't double-fire
      var lessonId = state.lastLesson || getFirstIncompleteLessonId();
      if (lessonId) openLesson(lessonId);
    });

    // Editor toolbar
    document.getElementById('btn-run-code').addEventListener('click', compileAndRun);
    document.getElementById('btn-reset-code').addEventListener('click', resetCode);
    document.getElementById('btn-format-code').addEventListener('click', formatCode);
    document.getElementById('btn-clear-output').addEventListener('click', clearOutput);

    // Output tabs
    document.querySelectorAll('.output-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        setActiveExecutionTab(tab.getAttribute('data-tab'));
      });
    });

    // Lesson navigation
    document.getElementById('btn-back-to-lessons').addEventListener('click', function () {
      switchView('lessons');
    });
    document.getElementById('btn-prev-lesson').addEventListener('click', function () {
      if (state.currentLesson) {
        var prev = getPrevLesson(state.currentLesson.id);
        if (prev) openLesson(prev.id);
      }
    });
    document.getElementById('btn-next-lesson').addEventListener('click', function () {
      if (state.currentLesson) {
        var next = getNextLesson(state.currentLesson.id);
        if (next) openLesson(next.id);
      }
    });
    document.getElementById('btn-next-lesson-complete').addEventListener('click', function () {
      if (state.currentLesson) {
        var next = getNextLesson(state.currentLesson.id);
        if (next) openLesson(next.id);
        else switchView('lessons');
      }
    });

    // Bookmark
    document.getElementById('btn-bookmark').addEventListener('click', function () {
      if (state.currentLesson) toggleBookmark(state.currentLesson.id);
    });

    // Load exercise
    document.getElementById('btn-load-exercise').addEventListener('click', function () {
      if (state.currentLesson && state.currentLesson.exercise) {
        setEditorCode(state.currentLesson.exercise.starterCode);
        state.originalCode = state.currentLesson.exercise.starterCode;
        state.editorMode = 'exercise';
        showToast('Exercise loaded into editor', 'info');
      }
    });

    // Resize handle
    initResizeHandle();

    // Settings
    document.getElementById('theme-checkbox').addEventListener('change', function (e) {
      state.settings.theme = e.target.checked ? 'light' : 'dark';
      applyTheme();
      updateEditorTheme();
      saveSettings();
    });

    document.getElementById('btn-font-decrease').addEventListener('click', function () {
      if (state.settings.fontSize > 10) {
        state.settings.fontSize--;
        updateEditorFontSize();
        saveSettings();
      }
    });

    document.getElementById('btn-font-increase').addEventListener('click', function () {
      if (state.settings.fontSize < 24) {
        state.settings.fontSize++;
        updateEditorFontSize();
        saveSettings();
      }
    });

    document.getElementById('timeout-select').addEventListener('change', function (e) {
      state.settings.timeout = parseInt(e.target.value);
      saveSettings();
    });

    document.getElementById('btn-check-compiler').addEventListener('click', checkCompiler);

    document.getElementById('btn-reset-progress').addEventListener('click', function () {
      if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        resetAllProgress();
      }
    });

    // Compiler setup dialog
    document.getElementById('btn-dismiss-setup').addEventListener('click', function () {
      document.getElementById('compiler-setup-overlay').style.display = 'none';
    });
    document.getElementById('btn-recheck-compiler').addEventListener('click', async function () {
      await checkCompiler();
      if (state.compilerAvailable) {
        document.getElementById('compiler-setup-overlay').style.display = 'none';
        showToast('C++ compiler detected!', 'success');
      }
    });

    // Modal close
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', function (e) {
      if (e.target === document.getElementById('modal-overlay')) closeModal();
    });

    // Practice filters
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderPractice(btn.getAttribute('data-difficulty'));
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
      // Ctrl+Enter to run (global)
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (state.currentView === 'lesson-detail') {
          e.preventDefault();
          compileAndRun();
        }
      }
      // Escape to close modal
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Set initial values
    document.getElementById('font-size-display').textContent = state.settings.fontSize + 'px';
    document.getElementById('timeout-select').value = state.settings.timeout.toString();
  }

  // =========================================================================
  // Resize Handle (Split Pane)
  // =========================================================================
  function initResizeHandle() {
    var handle = document.getElementById('resize-handle');
    var contentPanel = document.getElementById('lesson-content-panel');
    var isDragging = false;
    var startX, startWidth;

    handle.addEventListener('mousedown', function (e) {
      isDragging = true;
      startX = e.clientX;
      startWidth = contentPanel.offsetWidth;
      handle.classList.add('active');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      var delta = e.clientX - startX;
      var newWidth = startWidth + delta;
      var container = document.getElementById('app-container');
      var minW = 320;
      var maxW = container.offsetWidth - 400;
      newWidth = Math.max(minW, Math.min(maxW, newWidth));
      contentPanel.style.width = newWidth + 'px';
    });

    document.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        handle.classList.remove('active');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    });
  }

  // =========================================================================
  // View Management
  // =========================================================================
  function switchView(viewName) {
    state.currentView = viewName;

    // Update nav menu active state
    document.querySelectorAll('.nav-item').forEach(function (item) {
      item.classList.toggle('active', item.getAttribute('data-view') === viewName);
    });

    // Show/hide views
    document.querySelectorAll('.view').forEach(function (v) {
      v.classList.remove('active');
    });

    var targetView = document.getElementById('view-' + viewName);
    if (targetView) {
      targetView.classList.add('active');
    }

    // Render view content
    switch (viewName) {
      case 'dashboard': renderDashboard(); break;
      case 'lessons': renderLessons(); break;
      case 'practice': renderPractice('all'); break;
      case 'bookmarks': renderBookmarks(); break;
      case 'achievements': renderAchievements(); break;
      case 'settings': break; // Static
    }
  }

  // =========================================================================
  // Dashboard View
  // =========================================================================
  function renderDashboard() {
    var all = getAllLessons();
    var totalLessons = all.length;
    var completedCount = state.progress.completedLessons.length;
    var exercisesCount = state.progress.completedExercises.length;
    var achievementsCount = state.achievements.length;

    // Stats
    animateCounter('stat-lessons-done', completedCount);
    animateCounter('stat-exercises-done', exercisesCount);
    animateCounter('stat-streak', state.streak.count);
    animateCounter('stat-achievements', achievementsCount);

    // Progress bars
    setTimeout(function () {
      setBarWidth('stat-bar-lessons', totalLessons > 0 ? (completedCount / totalLessons * 100) : 0);
      setBarWidth('stat-bar-exercises', totalLessons > 0 ? (exercisesCount / totalLessons * 100) : 0);
      setBarWidth('stat-bar-streak', Math.min(state.streak.count / 30 * 100, 100));
      setBarWidth('stat-bar-achievements', ACHIEVEMENTS_LIST.length > 0 ? (achievementsCount / ACHIEVEMENTS_LIST.length * 100) : 0);
    }, 100);

    // Continue card
    var nextLessonId = state.lastLesson || getFirstIncompleteLessonId();
    if (nextLessonId) {
      var lesson = findLesson(nextLessonId);
      if (lesson) {
        document.getElementById('continue-chapter').textContent = 'Chapter ' + lesson.chapterId + ' · ' + lesson.chapterTitle;
        document.getElementById('continue-title').textContent = lesson.title;
        document.getElementById('continue-desc').textContent = 'Continue where you left off.';
      }
    } else if (totalLessons > 0) {
      document.getElementById('continue-chapter').textContent = '🎉 All Complete';
      document.getElementById('continue-title').textContent = 'You\'ve completed all lessons!';
      document.getElementById('continue-desc').textContent = 'Try practice mode or review previous lessons.';
    }

    // Chapter progress grid
    var grid = document.getElementById('chapter-progress-grid');
    grid.innerHTML = '';
    grid.classList.add('stagger-children');
    getChapters().forEach(function (ch) {
      var chLessons = ch.lessons || [];
      var completed = 0;
      chLessons.forEach(function (l) {
        if (isLessonCompleted(l.id)) completed++;
      });
      var pct = chLessons.length > 0 ? Math.round(completed / chLessons.length * 100) : 0;

      var card = document.createElement('div');
      card.className = 'chapter-progress-card glass-card';
      card.innerHTML =
        '<div class="chapter-icon">' + (ch.icon || '📘') + '</div>' +
        '<div class="chapter-progress-info">' +
          '<div class="chapter-progress-title">' + escapeHtml(ch.title) + '</div>' +
          '<div class="chapter-progress-bar-container">' +
            '<div class="chapter-progress-bar"><div class="chapter-progress-fill" style="width:' + pct + '%;"></div></div>' +
            '<span class="chapter-progress-pct">' + pct + '%</span>' +
          '</div>' +
        '</div>';
      card.addEventListener('click', function () {
        switchView('lessons');
        setTimeout(function () {
          var chCard = document.querySelector('.chapter-card[data-chapter-id="' + ch.id + '"]');
          if (chCard) {
            chCard.classList.add('expanded');
            chCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
      grid.appendChild(card);
    });

    // Update sidebar stats
    updateSidebarStats();
  }

  // =========================================================================
  // Lessons View (Chapter List)
  // =========================================================================
  function renderLessons() {
    var container = document.getElementById('chapters-list');
    container.innerHTML = '';
    container.classList.add('stagger-children');

    getChapters().forEach(function (ch) {
      var chLessons = ch.lessons || [];
      var completed = 0;
      chLessons.forEach(function (l) {
        if (isLessonCompleted(l.id)) completed++;
      });

      var card = document.createElement('div');
      card.className = 'chapter-card glass-card';
      card.setAttribute('data-chapter-id', ch.id);

      // Header
      var header = document.createElement('div');
      header.className = 'chapter-header';
      header.innerHTML =
        '<div class="chapter-header-icon">' + (ch.icon || '📘') + '</div>' +
        '<div class="chapter-header-info">' +
          '<div class="chapter-header-title">Chapter ' + ch.id + ': ' + escapeHtml(ch.title) + '</div>' +
          '<div class="chapter-header-desc">' + escapeHtml(ch.description || '') + '</div>' +
          '<div class="chapter-header-meta">' +
            '<span class="chapter-meta-badge">' + chLessons.length + ' lesson' + (chLessons.length !== 1 ? 's' : '') + '</span>' +
            '<span class="chapter-meta-badge">' + completed + '/' + chLessons.length + ' complete</span>' +
          '</div>' +
        '</div>' +
        '<div class="chapter-expand-icon">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>' +
        '</div>';

      header.addEventListener('click', function () {
        card.classList.toggle('expanded');
      });

      // Lessons
      var lessonsContainer = document.createElement('div');
      lessonsContainer.className = 'chapter-lessons';

      chLessons.forEach(function (lesson, idx) {
        var item = document.createElement('div');
        item.className = 'lesson-item';
        var isComplete = isLessonCompleted(lesson.id);
        item.innerHTML =
          '<div class="lesson-item-status ' + (isComplete ? 'completed' : '') + '">' +
            (isComplete ? '✓' : (idx + 1)) +
          '</div>' +
          '<div class="lesson-item-info">' +
            '<div class="lesson-item-title">' + escapeHtml(lesson.title) + '</div>' +
            '<div class="lesson-item-difficulty">' + capitalize(lesson.difficulty || 'beginner') + '</div>' +
          '</div>' +
          '<div class="lesson-item-arrow">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
          '</div>';

        item.addEventListener('click', function () {
          openLesson(lesson.id);
        });
        lessonsContainer.appendChild(item);
      });

      card.appendChild(header);
      card.appendChild(lessonsContainer);
      container.appendChild(card);
    });
  }

  // =========================================================================
  // Lesson Detail View
  // =========================================================================
  function openLesson(lessonId) {
    var lesson = findLesson(lessonId);
    if (!lesson) {
      showToast('Lesson not found', 'error');
      return;
    }

    state.currentLesson = lesson;
    state.currentLessonStartTime = Date.now();
    saveLastLesson(lessonId);

    // Update streak
    updateStreak();

    // Switch to lesson detail view
    document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('active'); });
    document.getElementById('view-lesson-detail').classList.add('active');
    state.currentView = 'lesson-detail';

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(function (item) {
      item.classList.toggle('active', item.getAttribute('data-view') === 'lessons');
    });

    // Populate lesson content
    var diffBadge = document.getElementById('lesson-difficulty');
    diffBadge.textContent = capitalize(lesson.difficulty || 'beginner');
    diffBadge.className = 'lesson-difficulty-badge ' + (lesson.difficulty || 'beginner');

    document.getElementById('lesson-title').textContent = lesson.title;
    document.getElementById('lesson-chapter-info').textContent =
      'Chapter ' + lesson.chapterId + ' · ' + lesson.chapterTitle + ' · Lesson ' + (getLessonIndex(lessonId) + 1);

    document.getElementById('lesson-body').innerHTML = lesson.content || '<p>No content available.</p>';
    state.editorMode = 'example';

    // Load code example into editor
    if (lesson.codeExample) {
      setEditorCode(lesson.codeExample);
      state.originalCode = lesson.codeExample;
    }

    // Bookmark button state
    var bookmarkBtn = document.getElementById('btn-bookmark');
    bookmarkBtn.classList.toggle('bookmarked', isBookmarked(lessonId));

    // Exercise section
    var exerciseSection = document.getElementById('lesson-exercise-section');
    if (lesson.exercise) {
      exerciseSection.style.display = 'block';
      document.getElementById('exercise-instruction').textContent = lesson.exercise.instruction;
      var hintsEl = document.getElementById('exercise-hints');
      hintsEl.innerHTML = '';
      if (lesson.exercise.hints && lesson.exercise.hints.length > 0) {
        lesson.exercise.hints.forEach(function (hint) {
          var hintDiv = document.createElement('div');
          hintDiv.className = 'exercise-hint hidden-text';
          hintDiv.innerHTML = '<span>' + escapeHtml(hint) + '</span>';
          hintDiv.title = 'Hover to reveal hint';
          hintsEl.appendChild(hintDiv);
        });
      }
    } else {
      exerciseSection.style.display = 'none';
    }

    // Quiz section
    var quizSection = document.getElementById('lesson-quiz-section');
    if (lesson.quiz && lesson.quiz.length > 0) {
      quizSection.style.display = 'block';
      renderQuiz(lesson.quiz);
    } else {
      quizSection.style.display = 'none';
    }

    // Complete section
    document.getElementById('lesson-complete-section').style.display =
      isLessonCompleted(lessonId) ? 'block' : 'none';

    // Clear output
    clearOutput();

    // Scroll to top
    document.getElementById('lesson-content-scroll').scrollTop = 0;

    // Layout the editor
    if (state.editor && state.editor.layout) {
      setTimeout(function () { state.editor.layout(); }, 100);
    }
  }

  // =========================================================================
  // Quiz Rendering
  // =========================================================================
  function renderQuiz(quizData) {
    var container = document.getElementById('quiz-container');
    container.innerHTML = '';

    quizData.forEach(function (q, qIdx) {
      var card = document.createElement('div');
      card.className = 'quiz-question-card glass-card';

      var questionText = document.createElement('div');
      questionText.className = 'quiz-question-text';
      questionText.textContent = (qIdx + 1) + '. ' + q.question;
      card.appendChild(questionText);

      var optionsDiv = document.createElement('div');
      optionsDiv.className = 'quiz-options';

      q.options.forEach(function (opt, optIdx) {
        var optEl = document.createElement('div');
        optEl.className = 'quiz-option';
        var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        optEl.innerHTML =
          '<div class="quiz-option-marker">' + (letters[optIdx] || optIdx) + '</div>' +
          '<span>' + escapeHtml(opt) + '</span>';

        optEl.addEventListener('click', function () {
          if (optEl.classList.contains('disabled')) return;

          // Disable all options
          optionsDiv.querySelectorAll('.quiz-option').forEach(function (o) {
            o.classList.add('disabled');
          });

          var isCorrect = optIdx === q.correctIndex;
          optEl.classList.add(isCorrect ? 'correct' : 'incorrect');

          // Highlight correct answer if wrong
          if (!isCorrect) {
            optionsDiv.querySelectorAll('.quiz-option')[q.correctIndex].classList.add('correct');
          }

          // Show explanation
          var explanation = document.createElement('div');
          explanation.className = 'quiz-explanation ' + (isCorrect ? 'correct' : 'incorrect');
          explanation.textContent = (isCorrect ? '✅ Correct! ' : '❌ Incorrect. ') + (q.explanation || '');
          card.appendChild(explanation);

          // Track quiz completion
          if (state.currentLesson && isCorrect) {
            if (state.progress.completedQuizzes.indexOf(state.currentLesson.id + '-q' + qIdx) === -1) {
              state.progress.completedQuizzes.push(state.currentLesson.id + '-q' + qIdx);
              saveProgress();
            }
          }
        });

        optionsDiv.appendChild(optEl);
      });

      card.appendChild(optionsDiv);
      container.appendChild(card);
    });
  }

  // =========================================================================
  // Compile & Run
  // =========================================================================
  async function compileAndRun() {
    if (state.isCompiling) return;
    if (!state.compilerAvailable) {
      showToast('No C++ compiler found. Check Settings.', 'error');
      document.getElementById('compiler-setup-overlay').style.display = 'flex';
      return;
    }

    var code = getEditorCode();
    if (!code.trim()) {
      showToast('Nothing to compile — write some code first!', 'warning');
      return;
    }

    // Capture explicit execution context before async IPC boundary
    var currentLessonId = state.currentLesson ? state.currentLesson.id : null;
    var runSource = state.editorMode || 'example';
    var expectedOutputRaw = null;
    var hasExpectedOutput = false;

    if (state.currentLesson) {
      if (runSource === 'example') {
        if (state.currentLesson.expectedOutput !== undefined && state.currentLesson.expectedOutput !== null) {
          expectedOutputRaw = state.currentLesson.expectedOutput;
          hasExpectedOutput = true;
        }
      } else if (runSource === 'exercise' && state.currentLesson.exercise) {
        if (state.currentLesson.exercise.expectedOutput !== undefined && state.currentLesson.exercise.expectedOutput !== null) {
          expectedOutputRaw = state.currentLesson.exercise.expectedOutput;
          hasExpectedOutput = true;
        }
      }
    }

    var executionContext = {
      lessonId: currentLessonId,
      source: runSource,
      hasExpectedOutput: hasExpectedOutput,
      expectedOutputRaw: expectedOutputRaw
    };

    state.isCompiling = true;
    var runBtn = document.getElementById('btn-run-code');
    runBtn.classList.add('running');
    runBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Running...';

    var statusEl = document.getElementById('output-status');
    statusEl.textContent = 'Compiling...';
    statusEl.className = 'output-status running';

    var outputEl = document.getElementById('output-content');
    outputEl.innerHTML = '<span style="color:var(--text-tertiary);">⏳ Compiling and running...</span>';
    setActiveExecutionTab('output');
    renderCheckerResult('NOT_RUN_YET');

    try {
      var result = await window.api.compileAndRun({
        code: code,
        stdinInput: '',
        timeoutMs: state.settings.timeout,
      });

      state.progress.runsCount++;
      saveProgress();

      // Check for night coding achievement
      var hour = new Date().getHours();
      if (hour >= 0 && hour < 5) {
        unlockAchievement('night-owl');
      }

      checkAchievements();

      if (!result.compiled) {
        // Compilation failed
        statusEl.textContent = 'Compile Error';
        statusEl.className = 'output-status error';

        var errorHtml = '<span style="color:var(--color-error);font-weight:600;">❌ Compilation Failed</span>\n\n';
        errorHtml += '<span style="color:var(--color-error);">' + escapeHtml(result.compileErrors) + '</span>';

        // Add error explanation
        var explanation = explainError(result.compileErrors);
        if (explanation) {
          errorHtml += '\n\n<div class="error-explanation">' +
            '<div class="error-explanation-title">💡 ' + escapeHtml(explanation.title) + '</div>' +
            '<div class="error-explanation-body"><p>' + escapeHtml(explanation.explanation) + '</p></div>' +
            '<div class="error-suggestion"><strong>Suggestion:</strong> ' + escapeHtml(explanation.suggestion) + '</div>' +
            '</div>';
        }

        outputEl.innerHTML = errorHtml;
        renderCheckerResult('COMPILATION_FAILED');
      } else {
        // Compilation succeeded
        var hasWarnings = result.compileErrors && result.compileErrors.trim();

        if (result.timedOut) {
          statusEl.textContent = 'Timed Out';
          statusEl.className = 'output-status error';
          outputEl.innerHTML = '<span style="color:var(--color-warning);font-weight:600;">⏰ Execution timed out</span>\n\n' +
            '<span style="color:var(--text-secondary);">Your program took too long to execute. Check for infinite loops.</span>\n\n' +
            (result.stdout ? '<span style="color:var(--text-primary);">' + escapeHtml(result.stdout) + '</span>' : '');
          renderCheckerResult('RUNTIME_FAILED');
        } else if (result.exitCode !== 0) {
          statusEl.textContent = 'Runtime Error (exit ' + result.exitCode + ')';
          statusEl.className = 'output-status error';
          var runtimeHtml = '<span style="color:var(--color-error);font-weight:600;">⚠️ Runtime Error (exit code: ' + result.exitCode + ')</span>\n\n';
          if (result.stdout) runtimeHtml += escapeHtml(result.stdout) + '\n';
          if (result.stderr) runtimeHtml += '<span style="color:var(--color-error);">' + escapeHtml(result.stderr) + '</span>';
          outputEl.innerHTML = runtimeHtml;
          renderCheckerResult('RUNTIME_FAILED');
        } else {
          statusEl.textContent = 'Success (' + result.executionTime + 'ms)';
          statusEl.className = 'output-status success';
          var successHtml = '';
          if (hasWarnings) {
            successHtml += '<span style="color:var(--color-warning);">⚠️ Warnings:\n' + escapeHtml(result.compileErrors) + '</span>\n\n';
          }
          successHtml += escapeHtml(result.stdout || '(no output)');
          outputEl.innerHTML = successHtml;

          // Verify output against expected
          if (executionContext.lessonId && executionContext.hasExpectedOutput) {
            var actualRaw = result.stdout || '';
            var normalizedActual = window.normalizeOutputForComparison ? window.normalizeOutputForComparison(actualRaw) : actualRaw.trim();
            var normalizedExpected = window.normalizeOutputForComparison ? window.normalizeOutputForComparison(executionContext.expectedOutputRaw) : executionContext.expectedOutputRaw.trim();
            
            if (normalizedActual === normalizedExpected) {
              renderCheckerResult('PASS', actualRaw, executionContext.expectedOutputRaw, normalizedActual, normalizedExpected, executionContext);
            } else {
              renderCheckerResult('FAIL', actualRaw, executionContext.expectedOutputRaw, normalizedActual, normalizedExpected, executionContext);
              setActiveExecutionTab('result');
            }
          } else {
            renderCheckerResult('CHECK_NOT_AVAILABLE');
          }
        }
      }
    } catch (err) {
      statusEl.textContent = 'Error';
      statusEl.className = 'output-status error';
      outputEl.innerHTML = '<span style="color:var(--color-error);">' + escapeHtml(err.message || 'Unknown error') + '</span>';
      renderCheckerResult('RUNTIME_FAILED');
    } finally {
      state.isCompiling = false;
      runBtn.classList.remove('running');
      runBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> Run';
    }
  }

  // =========================================================================
  // Output Verification & Result Tab
  // =========================================================================
  function setActiveExecutionTab(tabId) {
    document.querySelectorAll('.output-tab').forEach(function (t) {
      if (t.getAttribute('data-tab') === tabId) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
    document.getElementById('output-content').style.display = (tabId === 'output') ? 'block' : 'none';
    document.getElementById('verification-panel').style.display = (tabId === 'result') ? 'block' : 'none';
  }

  function renderCheckerResult(status, actualRaw, expectedRaw, normalizedActual, normalizedExpected, executionContext) {
    var verifyContent = document.getElementById('verification-content');
    verifyContent.innerHTML = ''; // safe clear
    verifyContent.className = 'verification-content';

    if (status === 'NOT_RUN_YET') {
      verifyContent.innerHTML = '<div class="output-placeholder"><span>Run the code to see the result.</span></div>';
    } else if (status === 'CHECK_NOT_AVAILABLE') {
      verifyContent.innerHTML = '<span style="color:var(--text-secondary);">No automatic output check is available for this exercise.</span>';
    } else if (status === 'COMPILATION_FAILED') {
      verifyContent.innerHTML = '<span style="color:var(--text-secondary);">Result unavailable because compilation failed.</span>';
    } else if (status === 'RUNTIME_FAILED') {
      verifyContent.innerHTML = '<span style="color:var(--text-secondary);">Result unavailable because the program did not complete successfully.</span>';
    } else if (status === 'PASS') {
      verifyContent.className = 'verification-content pass';
      verifyContent.innerHTML = '✅ <strong>Output matches expected result.</strong>';

      if (executionContext && executionContext.lessonId) {
        completeLesson(executionContext.lessonId);
        
        if (executionContext.source === 'exercise') {
          if (state.progress.completedExercises.indexOf(executionContext.lessonId) === -1) {
            state.progress.completedExercises.push(executionContext.lessonId);
            saveProgress();
            showToast('Exercise completed! 🎉', 'success');
          }
        }
      }
    } else if (status === 'FAIL') {
      verifyContent.className = 'verification-content fail';
      
      var header = document.createElement('div');
      header.innerHTML = '❌ <strong>Output does not match expected result.</strong><br><br><strong>Expected:</strong>';
      verifyContent.appendChild(header);

      var expectedDiv = document.createElement('div');
      expectedDiv.className = 'expected-output';
      expectedDiv.textContent = expectedRaw;
      verifyContent.appendChild(expectedDiv);

      var yourOutputLabel = document.createElement('div');
      yourOutputLabel.innerHTML = '<strong>Your output:</strong>';
      verifyContent.appendChild(yourOutputLabel);

      var actualDiv = document.createElement('div');
      actualDiv.className = 'actual-output';
      actualDiv.textContent = actualRaw;
      verifyContent.appendChild(actualDiv);

      var diffMsg = window.findFirstDifference ? window.findFirstDifference(normalizedActual, normalizedExpected) : null;
      if (diffMsg) {
        var diffLabel = document.createElement('p');
        diffLabel.style.marginTop = '8px';
        diffLabel.style.fontWeight = 'bold';
        diffLabel.style.color = 'var(--color-warning)';
        diffLabel.textContent = diffMsg;
        verifyContent.appendChild(diffLabel);
      }

      var footer = document.createElement('p');
      footer.style.marginTop = '8px';
      footer.style.color = 'var(--text-secondary)';
      footer.textContent = 'Review your code and try again. Check for typos, missing spaces, or newline differences.';
      verifyContent.appendChild(footer);
    }
  }

  // =========================================================================
  // Error Explanation
  // =========================================================================
  function explainError(errorText) {
    for (var i = 0; i < ERROR_PATTERNS.length; i++) {
      if (ERROR_PATTERNS[i].pattern.test(errorText)) {
        return ERROR_PATTERNS[i];
      }
    }
    return null;
  }

  // =========================================================================
  // Code Management
  // =========================================================================
  function resetCode() {
    if (state.originalCode) {
      setEditorCode(state.originalCode);
      showToast('Code reset to original', 'info');
    }
  }

  function formatCode() {
    // Basic formatting: fix indentation
    var code = getEditorCode();
    var lines = code.split('\n');
    var indent = 0;
    var formatted = [];

    for (var i = 0; i < lines.length; i++) {
      var trimmed = lines[i].trim();
      if (!trimmed) {
        formatted.push('');
        continue;
      }

      // Decrease indent for closing braces
      if (trimmed.charAt(0) === '}' || trimmed.indexOf('};') === 0) {
        indent = Math.max(0, indent - 1);
      }

      formatted.push('    '.repeat(indent) + trimmed);

      // Increase indent for opening braces
      if (trimmed.charAt(trimmed.length - 1) === '{') {
        indent++;
      }
      // Handle public:, private:, protected: (decrease by 1 temporarily)
      if (/^(public|private|protected)\s*:/.test(trimmed)) {
        // Re-indent: these should be one level less
        formatted[formatted.length - 1] = '    '.repeat(Math.max(0, indent - 1)) + trimmed;
      }
    }

    setEditorCode(formatted.join('\n'));
    showToast('Code formatted', 'info');
  }

  function clearOutput() {
    document.getElementById('output-content').innerHTML =
      '<div class="output-placeholder">' +
        '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3">' +
          '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>' +
        '</svg>' +
        '<span>Click <strong>Run</strong> or press <kbd>Ctrl+Enter</kbd> to compile and execute</span>' +
      '</div>';
    document.getElementById('output-status').textContent = '';
    document.getElementById('output-status').className = 'output-status';
    renderCheckerResult('NOT_RUN_YET');
    setActiveExecutionTab('output');
  }

  // =========================================================================
  // Progress & Streaks
  // =========================================================================
  function completeLesson(lessonId) {
    if (state.progress.completedLessons.indexOf(lessonId) === -1) {
      state.progress.completedLessons.push(lessonId);
      saveProgress();
      checkAchievements();
      updateSidebarStats();

      // Show complete section
      document.getElementById('lesson-complete-section').style.display = 'block';

      // Check speed run achievement
      if (state.currentLessonStartTime) {
        var elapsed = Date.now() - state.currentLessonStartTime;
        if (elapsed < 120000) { // 2 minutes
          unlockAchievement('speed-runner');
        }
      }
    }
  }

  function updateStreak() {
    var today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    if (state.streak.lastDate === today) return; // Already updated today

    if (state.streak.lastDate) {
      var last = new Date(state.streak.lastDate);
      var diff = Math.floor((new Date(today) - last) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        state.streak.count++;
      } else if (diff > 1) {
        state.streak.count = 1;
      }
    } else {
      state.streak.count = 1;
    }

    state.streak.lastDate = today;
    saveStreak();
    updateSidebarStats();
    checkAchievements();
  }

  function updateSidebarStats() {
    document.getElementById('streak-count').textContent = state.streak.count;
    document.getElementById('progress-pct').textContent = getProgressPercentage() + '%';
    document.getElementById('user-level').textContent = getUserLevel();
  }

  // =========================================================================
  // Achievements
  // =========================================================================
  function checkAchievements() {
    var context = {
      lessonsCount: state.progress.completedLessons.length,
      exercisesCount: state.progress.completedExercises.length,
      quizzesCount: state.progress.completedQuizzes.length,
      runsCount: state.progress.runsCount,
      streak: state.streak.count,
      totalLessons: getTotalLessons(),
      bookmarksCount: state.bookmarks.length,
      nightCoding: new Date().getHours() >= 0 && new Date().getHours() < 5,
      speedRun: false, // Handled separately
    };

    ACHIEVEMENTS_LIST.forEach(function (achievement) {
      if (state.achievements.indexOf(achievement.id) !== -1) return; // Already unlocked

      var unlocked = false;
      try {
        // Safe evaluation of condition
        var fn = new Function(
          'lessonsCount', 'exercisesCount', 'quizzesCount', 'runsCount',
          'streak', 'totalLessons', 'bookmarksCount', 'nightCoding', 'speedRun',
          'return (' + achievement.condition + ');'
        );
        unlocked = fn(
          context.lessonsCount, context.exercisesCount, context.quizzesCount,
          context.runsCount, context.streak, context.totalLessons,
          context.bookmarksCount, context.nightCoding, context.speedRun
        );
      } catch (e) {
        unlocked = false;
      }

      if (unlocked) {
        unlockAchievement(achievement.id);
      }
    });
  }

  function unlockAchievement(achievementId) {
    if (state.achievements.indexOf(achievementId) !== -1) return;

    state.achievements.push(achievementId);
    saveAchievements();

    // Find achievement info
    var achievement = null;
    for (var i = 0; i < ACHIEVEMENTS_LIST.length; i++) {
      if (ACHIEVEMENTS_LIST[i].id === achievementId) {
        achievement = ACHIEVEMENTS_LIST[i];
        break;
      }
    }

    if (achievement) {
      showToast(achievement.icon + ' Achievement Unlocked: ' + achievement.title, 'success');
    }
  }

  function renderAchievements() {
    var grid = document.getElementById('achievements-grid');
    grid.innerHTML = '';
    grid.classList.add('stagger-children');

    ACHIEVEMENTS_LIST.forEach(function (a) {
      var isUnlocked = state.achievements.indexOf(a.id) !== -1;
      var card = document.createElement('div');
      card.className = 'achievement-card glass-card ' + (isUnlocked ? 'unlocked' : 'locked');
      card.innerHTML =
        '<div class="achievement-icon">' + a.icon + '</div>' +
        '<div class="achievement-title">' + escapeHtml(a.title) + '</div>' +
        '<div class="achievement-desc">' + escapeHtml(a.desc) + '</div>';
      grid.appendChild(card);
    });
  }

  // =========================================================================
  // Bookmarks
  // =========================================================================
  function toggleBookmark(lessonId) {
    var idx = state.bookmarks.indexOf(lessonId);
    if (idx !== -1) {
      state.bookmarks.splice(idx, 1);
      showToast('Bookmark removed', 'info');
    } else {
      state.bookmarks.push(lessonId);
      showToast('Lesson bookmarked!', 'success');
    }
    saveBookmarks();
    checkAchievements();

    // Update bookmark button
    var btn = document.getElementById('btn-bookmark');
    btn.classList.toggle('bookmarked', isBookmarked(lessonId));
  }

  function renderBookmarks() {
    var container = document.getElementById('bookmarks-list');
    container.innerHTML = '';

    if (state.bookmarks.length === 0) {
      container.innerHTML =
        '<div class="empty-state">' +
          '<div class="empty-icon">🔖</div>' +
          '<h3>No bookmarks yet</h3>' +
          '<p>Bookmark lessons to access them quickly here.</p>' +
        '</div>';
      return;
    }

    state.bookmarks.forEach(function (lessonId) {
      var lesson = findLesson(lessonId);
      if (!lesson) return;

      var item = document.createElement('div');
      item.className = 'bookmark-item glass-card';
      item.innerHTML =
        '<div class="bookmark-icon">' + (lesson.chapterIcon || '📘') + '</div>' +
        '<div class="bookmark-info">' +
          '<div class="bookmark-title">' + escapeHtml(lesson.title) + '</div>' +
          '<div class="bookmark-chapter">Chapter ' + lesson.chapterId + ' · ' + escapeHtml(lesson.chapterTitle) + '</div>' +
        '</div>' +
        '<button class="bookmark-remove" title="Remove bookmark">&times;</button>';

      item.querySelector('.bookmark-info').addEventListener('click', function () {
        openLesson(lessonId);
      });

      item.querySelector('.bookmark-remove').addEventListener('click', function (e) {
        e.stopPropagation();
        toggleBookmark(lessonId);
        renderBookmarks();
      });

      container.appendChild(item);
    });
  }

  // =========================================================================
  // Practice Mode
  // =========================================================================
  function renderPractice(difficulty) {
    var grid = document.getElementById('practice-grid');
    grid.innerHTML = '';
    grid.classList.add('stagger-children');

    var lessons = getAllLessons().filter(function (l) {
      if (!l.exercise) return false;
      if (difficulty === 'all') return true;
      return l.difficulty === difficulty;
    });

    if (lessons.length === 0) {
      grid.innerHTML =
        '<div class="empty-state" style="grid-column: 1/-1;">' +
          '<div class="empty-icon">💻</div>' +
          '<h3>No exercises found</h3>' +
          '<p>Try a different filter or complete more lessons.</p>' +
        '</div>';
      return;
    }

    lessons.forEach(function (lesson) {
      var card = document.createElement('div');
      card.className = 'practice-card glass-card';
      var isDone = isExerciseCompleted(lesson.id);
      card.innerHTML =
        '<div class="practice-card-chapter">Chapter ' + lesson.chapterId + '</div>' +
        '<div class="practice-card-title">' + escapeHtml(lesson.title) + '</div>' +
        '<div class="practice-card-instruction">' + escapeHtml(lesson.exercise.instruction) + '</div>' +
        '<div class="practice-card-footer">' +
          '<span class="practice-card-difficulty ' + (lesson.difficulty || 'beginner') + '">' + capitalize(lesson.difficulty || 'beginner') + '</span>' +
          '<span class="practice-card-status">' + (isDone ? '✅' : '⬜') + '</span>' +
        '</div>';

      card.addEventListener('click', function () {
        openLesson(lesson.id);
        // Auto-load the exercise
        setTimeout(function () {
          setEditorCode(lesson.exercise.starterCode);
          state.originalCode = lesson.exercise.starterCode;
        }, 200);
      });

      grid.appendChild(card);
    });
  }

  // =========================================================================
  // Search
  // =========================================================================
  function performSearch(query) {
    var results = [];
    var lowerQuery = query.toLowerCase();

    getAllLessons().forEach(function (lesson) {
      var titleMatch = lesson.title.toLowerCase().indexOf(lowerQuery) !== -1;
      var contentMatch = (lesson.content || '').toLowerCase().indexOf(lowerQuery) !== -1;
      var chapterMatch = lesson.chapterTitle.toLowerCase().indexOf(lowerQuery) !== -1;

      if (titleMatch || contentMatch || chapterMatch) {
        // Extract snippet
        var snippet = '';
        if (contentMatch) {
          var plainContent = (lesson.content || '').replace(/<[^>]*>/g, '');
          var matchIdx = plainContent.toLowerCase().indexOf(lowerQuery);
          if (matchIdx !== -1) {
            var start = Math.max(0, matchIdx - 40);
            var end = Math.min(plainContent.length, matchIdx + query.length + 80);
            snippet = (start > 0 ? '...' : '') + plainContent.substring(start, end) + (end < plainContent.length ? '...' : '');
          }
        }

        results.push({
          lesson: lesson,
          snippet: snippet,
          relevance: titleMatch ? 3 : (chapterMatch ? 2 : 1),
        });
      }
    });

    // Sort by relevance
    results.sort(function (a, b) { return b.relevance - a.relevance; });

    // Render
    document.getElementById('search-results-subtitle').textContent = 'Showing ' + results.length + ' result' + (results.length !== 1 ? 's' : '') + ' for "' + query + '"';

    var container = document.getElementById('search-results-list');
    container.innerHTML = '';

    if (results.length === 0) {
      container.innerHTML =
        '<div class="empty-state">' +
          '<div class="empty-icon">🔍</div>' +
          '<h3>No results found</h3>' +
          '<p>Try a different search term.</p>' +
        '</div>';
      return;
    }

    results.forEach(function (r) {
      var item = document.createElement('div');
      item.className = 'search-result-item glass-card';

      var snippetHtml = '';
      if (r.snippet) {
        snippetHtml = escapeHtml(r.snippet).replace(
          new RegExp('(' + escapeRegex(query) + ')', 'gi'),
          '<mark>$1</mark>'
        );
      }

      item.innerHTML =
        '<div class="search-result-icon">' + (r.lesson.chapterIcon || '📘') + '</div>' +
        '<div class="search-result-info">' +
          '<div class="search-result-title">' + escapeHtml(r.lesson.title) + '</div>' +
          '<div class="search-result-chapter">Chapter ' + r.lesson.chapterId + ' · ' + escapeHtml(r.lesson.chapterTitle) + '</div>' +
          (snippetHtml ? '<div class="search-result-snippet">' + snippetHtml + '</div>' : '') +
        '</div>';

      item.addEventListener('click', function () {
        openLesson(r.lesson.id);
      });

      container.appendChild(item);
    });
  }

  // =========================================================================
  // Reset Progress
  // =========================================================================
  function resetAllProgress() {
    state.progress = { completedLessons: [], completedExercises: [], completedQuizzes: [], runsCount: 0 };
    state.bookmarks = [];
    state.streak = { count: 0, lastDate: null };
    state.achievements = [];
    state.lastLesson = null;

    Object.values(STORAGE_KEYS).forEach(function (key) {
      localStorage.removeItem(key);
    });

    showToast('All progress has been reset', 'info');
    updateSidebarStats();
    renderDashboard();
  }

  // =========================================================================
  // Editor Settings
  // =========================================================================
  function updateEditorTheme() {
    if (state.editor && state.editor.updateOptions) {
      var theme = state.settings.theme === 'dark' ? 'cpp-mastery-dark' : 'cpp-mastery-light';
      monaco.editor.setTheme(theme);
    }
  }

  function updateEditorFontSize() {
    if (state.editor && state.editor.updateOptions) {
      state.editor.updateOptions({ fontSize: state.settings.fontSize });
    }
    document.getElementById('font-size-display').textContent = state.settings.fontSize + 'px';
  }

  // =========================================================================
  // Toast Notifications
  // =========================================================================
  function showToast(message, type) {
    type = type || 'info';
    var icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML =
      '<span class="toast-icon">' + (icons[type] || 'ℹ️') + '</span>' +
      '<span>' + escapeHtml(message) + '</span>';

    var container = document.getElementById('toast-container');
    container.appendChild(toast);

    // Auto-remove after 4 seconds
    setTimeout(function () {
      toast.classList.add('removing');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 4000);
  }

  // =========================================================================
  // Modal
  // =========================================================================
  function showModal(contentHtml) {
    document.getElementById('modal-body').innerHTML = contentHtml;
    document.getElementById('modal-overlay').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
  }

  // =========================================================================
  // Utility Helpers
  // =========================================================================
  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function animateCounter(elementId, target) {
    var el = document.getElementById(elementId);
    if (!el) return;
    var current = parseInt(el.textContent) || 0;
    if (current === target) return;

    var duration = 600;
    var start = performance.now();

    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(current + (target - current) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function setBarWidth(elementId, percentage) {
    var el = document.getElementById(elementId);
    if (el) el.style.width = Math.min(100, Math.max(0, percentage)) + '%';
  }

  function getFirstIncompleteLessonId() {
    var all = getAllLessons();
    for (var i = 0; i < all.length; i++) {
      if (!isLessonCompleted(all[i].id)) return all[i].id;
    }
    return all.length > 0 ? all[0].id : null;
  }

  // =========================================================================
  // Bootstrap
  // =========================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
