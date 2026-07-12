// ============================================================================
// C++ Mastery — Curriculum Aggregator
// Collects all chapters registered via window.CPP_CHAPTERS and exposes
// them as window.LESSONS_DATA for consumption by app.js.
// ============================================================================

(function () {
  'use strict';

  var chapters = window.CPP_CHAPTERS || [];

  // Sort by chapter ID to ensure deterministic order
  chapters.sort(function (a, b) { return a.id - b.id; });

  // Expose in the same format app.js expects
  window.LESSONS_DATA = { chapters: chapters };

  console.log('[Curriculum] Loaded ' + chapters.length + ' chapters, ' +
    chapters.reduce(function (s, c) { return s + (c.lessons || []).length; }, 0) + ' lessons');
})();
