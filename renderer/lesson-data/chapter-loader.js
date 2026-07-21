// ============================================================================
// C++ Mastery — Schema v2 Chapter Loader
// Dynamically discovers and sequentially loads all chapter scripts using
// standard browser <script> elements.
//
// How it works:
//   1. Calls window.api.getCurriculumScripts() (exposed by preload.js) to get
//      the ordered list of chapter paths.
//   2. Appends the core application scripts (curriculum, checker, app) to the
//      end of the queue.
//   3. Creates a <script> element for the first file and waits for its onload
//      event before proceeding to the next.
//   4. This ensures strict execution order without blocking the main thread or
//      using deprecated/unsafe methods like synchronous XHR, eval, or document.write.
// ============================================================================

(function () {
  'use strict';

  var rawScripts = (window.api && typeof window.api.getCurriculumScripts === 'function')
    ? window.api.getCurriculumScripts()
    : [];

  // Filter to only include official Schema v2 chapter filenames (e.g. c01-..., c10-...)
  var scripts = [];
  for (var i = 0; i < rawScripts.length; i++) {
    var parts = rawScripts[i].split('/');
    var filename = parts[parts.length - 1];
    if (/^c\d{2}.*\.js$/.test(filename)) {
      scripts.push(rawScripts[i]);
    }
  }

  if (scripts.length === 0) {
    console.warn('[ChapterLoader] No chapter scripts discovered. Is the chapters/ directory empty?');
  }

  var index = 0;

  function loadNextScript() {
    if (index >= scripts.length) {
      console.log('[ChapterLoader] Successfully loaded all ' + index + ' scripts in sequence.');
      window.curriculumLoaded = true;
      window.dispatchEvent(new Event('curriculum-loaded'));
      return;
    }

    var scriptPath = scripts[index];
    var scriptEl = document.createElement('script');
    scriptEl.src = scriptPath;

    scriptEl.onload = function () {
      index++;
      loadNextScript();
    };

    scriptEl.onerror = function () {
      console.error('[ChapterLoader] Failed to load script:', scriptPath);
      // Continue loading remaining scripts even if one fails
      index++;
      loadNextScript();
    };

    document.body.appendChild(scriptEl);
  }

  // Start the sequential loading process
  loadNextScript();
})();
