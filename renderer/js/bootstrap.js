// ============================================================================
// C++ Mastery — Application Bootstrap
// Waits for the curriculum chapters to finish loading dynamically before
// sequentially loading the core application scripts.
// ============================================================================

(function () {
  'use strict';

  const bootstrapScripts = [
    'lesson-data/curriculum.js',
    'js/checker.js',
    'js/app.js'
  ];

  function loadScriptsSequentially(scripts, onComplete) {
    let index = 0;

    function loadNext() {
      if (index >= scripts.length) {
        if (onComplete) onComplete();
        return;
      }

      const scriptPath = scripts[index];
      const s = document.createElement('script');
      s.src = scriptPath;

      s.onload = function() {
        index++;
        loadNext();
      };

      s.onerror = function() {
        console.error('[Bootstrap] Failed to load ' + scriptPath);
        index++;
        loadNext();
      };

      document.body.appendChild(s);
    }

    loadNext();
  }

  function startBootstrap() {
    loadScriptsSequentially(bootstrapScripts, function() {
      console.log('[Bootstrap] Application initialized.');
    });
  }

  if (window.curriculumLoaded) {
    startBootstrap();
  } else {
    window.addEventListener('curriculum-loaded', startBootstrap);
  }
})();
