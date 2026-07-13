const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const checker = require('./renderer/js/checker.js');

// Mock window to load browser scripts
global.window = {};

const LESSON_DATA_DIR = path.join(__dirname, 'renderer', 'lesson-data');

// Load chapters
const chapterFiles = [
  'basic/c01-getting-started-with-c.js',
  'basic/c02-variables-and-data-types.js',
  'basic/c03-operators-and-expressions.js',
  'basic/c04-control-flow.js',
  'intermediate/c05-loops.js',
  'intermediate/c06-functions.js',
  'intermediate/c07-arrays-and-strings.js',
  'expert/c08-pointers-and-references.js',
  'intermediate/c09-structures-and-enums.js',
  'expert/c10-object-oriented-programming.js',
  'expert/c11-templates-and-stl.js',
  'expert/c12-file-handling.js',
  'expert/c13-exception-handling.js',
  'master/c14-smart-pointers-and-memory.js',
  'master/c15-advanced-topics.js'
];

let totalChaptersScanned = 0;
let totalLessonsScanned = 0;
let deterministicExamplesExecuted = 0;
let skippedStdinExamples = 0;
let passes = 0;
let failures = [];
let floatingPointIssues = [];

const tempDir = path.join(__dirname, 'temp_build');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

// Static Audit & Execution
chapterFiles.forEach(file => {
  const fullPath = path.join(LESSON_DATA_DIR, file);
  if (!fs.existsSync(fullPath)) return;

  // Clean window.CPP_CHAPTERS for isolation
  window.CPP_CHAPTERS = [];

  // Evaluate the IIFE safely
  const code = fs.readFileSync(fullPath, 'utf8');
  eval(code);

  const chapters = window.CPP_CHAPTERS;
  if (!chapters || chapters.length === 0) return;

  chapters.forEach(chapter => {
    totalChaptersScanned++;
    chapter.lessons.forEach(lesson => {
      totalLessonsScanned++;

      // Static assertions
      if (!lesson.id) console.error(`Missing lesson id in Chapter ${chapter.id}`);
      if (typeof lesson.expectedOutput !== 'string' && lesson.expectedOutput !== null && lesson.expectedOutput !== undefined) {
        console.error(`Invalid expectedOutput type in ${lesson.id}`);
      }
      if (lesson.exercise) {
        if (typeof lesson.exercise.expectedOutput !== 'string' && lesson.exercise.expectedOutput !== null && lesson.exercise.expectedOutput !== undefined) {
          console.error(`Invalid exercise.expectedOutput type in ${lesson.id}`);
        }
      }

      // Execute code if expectedOutput is deterministic
      if (lesson.expectedOutput !== null && lesson.expectedOutput !== undefined) {
        const hasStdin = /\b(cin|getline)\b/.test(lesson.codeExample);
        if (hasStdin && !lesson.stdinFixture) {
          skippedStdinExamples++;
          return;
        }

        deterministicExamplesExecuted++;

        const cppFile = path.join(tempDir, 'main.cpp');
        const exeFile = path.join(tempDir, process.platform === 'win32' ? 'main.exe' : 'main');

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
        }
      }
    });
  });
});

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
