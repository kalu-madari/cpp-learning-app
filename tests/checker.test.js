const test = require('node:test');
const assert = require('node:assert');
const checker = require('../renderer/js/checker.js');

test('Checker exact match', () => {
  const actual = 'Hello World';
  const expected = 'Hello World';
  assert.strictEqual(checker.normalizeOutputForComparison(actual), checker.normalizeOutputForComparison(expected));
  assert.strictEqual(checker.findFirstDifference(
    checker.normalizeOutputForComparison(actual),
    checker.normalizeOutputForComparison(expected)
  ), null);
});

test('Checker CRLF vs LF normalization', () => {
  const actual = 'Line 1\nLine 2';
  const expected = 'Line 1\r\nLine 2';
  assert.strictEqual(checker.normalizeOutputForComparison(actual), checker.normalizeOutputForComparison(expected));
});

test('Checker outer whitespace normalization', () => {
  const actual = '   \nHello World\n   ';
  const expected = 'Hello World';
  assert.strictEqual(checker.normalizeOutputForComparison(actual), checker.normalizeOutputForComparison(expected));
});

test('Checker internal whitespace difference (significant)', () => {
  const actual = 'Hello  World';
  const expected = 'Hello World';
  assert.notStrictEqual(checker.normalizeOutputForComparison(actual), checker.normalizeOutputForComparison(expected));
});

test('Checker wrong output', () => {
  const actual = '43';
  const expected = '42';
  assert.notStrictEqual(checker.normalizeOutputForComparison(actual), checker.normalizeOutputForComparison(expected));
});

test('Checker empty output', () => {
  const actual = '';
  const expected = '';
  assert.strictEqual(checker.normalizeOutputForComparison(actual), checker.normalizeOutputForComparison(expected));

  const nullActual = null;
  assert.strictEqual(checker.normalizeOutputForComparison(nullActual), '');
});

test('Checker first-difference diagnostic', () => {
  const actual = checker.normalizeOutputForComparison('Line 1\nLine 2\nLine 3');
  const expected = checker.normalizeOutputForComparison('Line 1\nLine X\nLine 3');
  const diff = checker.findFirstDifference(actual, expected);
  assert.strictEqual(diff, 'First difference at line 2, column 6.');
});

test('Checker first-difference missing line', () => {
  const actual = checker.normalizeOutputForComparison('Line 1');
  const expected = checker.normalizeOutputForComparison('Line 1\nLine 2');
  const diff = checker.findFirstDifference(actual, expected);
  assert.strictEqual(diff, 'First difference at line 2 (Actual output is missing this line).');
});

test('Checker first-difference extra line', () => {
  const actual = checker.normalizeOutputForComparison('Line 1\nLine 2');
  const expected = checker.normalizeOutputForComparison('Line 1');
  const diff = checker.findFirstDifference(actual, expected);
  assert.strictEqual(diff, 'First difference at line 2 (Actual output has extra line).');
});

test('Trailing-whitespace-per-line normalization behavior required by the architecture', () => {
  const actual = 'Line 1  \nLine 2 \t\nLine 3';
  const expected = 'Line 1\nLine 2\nLine 3';
  assert.strictEqual(checker.normalizeOutputForComparison(actual), checker.normalizeOutputForComparison(expected));
});
