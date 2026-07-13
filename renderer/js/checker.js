// checker.js
// Pure utility functions for output verification

function normalizeOutputForComparison(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/\r\n?/g, '\n') // Normalize CRLF to LF
    .split('\n')
    .map(function(line) { return line.replace(/[ \t]+$/g, ''); }) // Trim trailing spaces/tabs
    .join('\n')
    .replace(/^\n+|\n+$/g, ''); // Trim leading and trailing blank lines
}

function findFirstDifference(normalizedActual, normalizedExpected) {
  var actualLines = normalizedActual.split('\n');
  var expectedLines = normalizedExpected.split('\n');
  var maxLines = Math.max(actualLines.length, expectedLines.length);

  for (var i = 0; i < maxLines; i++) {
    var a = actualLines[i];
    var e = expectedLines[i];
    
    if (a !== e) {
      if (a === undefined) return 'First difference at line ' + (i + 1) + ' (Actual output is missing this line).';
      if (e === undefined) return 'First difference at line ' + (i + 1) + ' (Actual output has extra line).';
      
      // Find the first differing column
      var maxCols = Math.max(a.length, e.length);
      for (var j = 0; j < maxCols; j++) {
        if (a[j] !== e[j]) {
          return 'First difference at line ' + (i + 1) + ', column ' + (j + 1) + '.';
        }
      }
      return 'First difference at line ' + (i + 1) + '.';
    }
  }
  return null;
}

// Export for Node.js testing environment, but don't break browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    normalizeOutputForComparison: normalizeOutputForComparison,
    findFirstDifference: findFirstDifference
  };
}
