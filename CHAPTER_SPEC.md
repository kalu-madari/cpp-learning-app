# CHAPTER_SPEC.md
# C++ Mastery — Canonical Chapter & Curriculum Specification
**Version:** 2.0
**Based on commit:** 66725b4
**Authority:** This document is derived from direct inspection of the application source code. It takes precedence over README.md, comments, and prior conversation context.

---

## 1. Purpose

This specification is the single authoritative contract for generating, reviewing, expanding, and validating chapters in the C++ Mastery desktop learning application. A future AI session with no prior conversation context must be able to read this document and produce a chapter that is:

- Syntactically valid as a module file
- Data-contract-compatible with the current application
- Pedagogically consistent with existing chapters
- Immediately testable by launching the application

---

## 2. Source-of-Truth Files

Read these files in order before generating or modifying any chapter:

| File | Purpose |
|------|---------|
| `CHAPTER_SPEC.md` | This specification (read first) |
| `renderer/js/app.js` | Authoritative source for all data fields consumed at runtime |
| `renderer/index.html` | Script load order and CSP constraints |
| `renderer/css/styles.css` | Which HTML elements/classes are styled in lesson content |
| `renderer/lesson-data/curriculum.js` | How modules are aggregated into `window.LESSONS_DATA` |
| `curriculum-rules.json` | Validator configuration. Note: The `tiers` key is preserved but its values document the new 7 stages (per FINAL_CURRICULUM_ARCHITECTURE.md). |
| `renderer/lesson-data/<tier>-index.js` | Legacy tier manifests (removed in Phase F) |
| `renderer/lesson-data/chapters/c01-*.js` | Schema v2 chapters (future location until generated) |
| `main.js` | IPC handlers: `compile-and-run`, `check-compiler` |
| `preload.js` | API surface exposed to renderer: `window.api.compileAndRun`, `window.api.checkCompiler` |

---

## 3. Current Runtime Curriculum Architecture

The application uses `window.LESSONS_DATA` as the final curriculum contract. The curriculum is modularized into separate JavaScript files per chapter (currently 15 chapters, 32 lessons). These are loaded through plain `<script>` tags in `renderer/index.html` before the main application code. Each chapter file wraps its data in an IIFE and pushes it to a global `window.CPP_CHAPTERS` array. Finally, `renderer/lesson-data/curriculum.js` sorts these chapters by ID and assigns them to `window.LESSONS_DATA`. The main application (`app.js`) consumes this global variable directly.

---

## 4. Current Application Capabilities

### 4.1 Feature Classification

| Feature | Status | Notes |
|---------|--------|-------|
| Chapter list view | ✅ IMPLEMENTED AND WORKING | Collapsible cards per chapter |
| Lesson list within chapter | ✅ IMPLEMENTED AND WORKING | Ordered items inside expanded chapter |
| Lesson detail view | ✅ IMPLEMENTED AND WORKING | Renders `lesson.content` as raw HTML |
| Monaco Editor (C++) | ✅ IMPLEMENTED AND WORKING | Syntax highlighting, autocomplete snippets, line numbers |
| Load codeExample into editor | ✅ IMPLEMENTED AND WORKING | Set on lesson open |
| Reset code to original | ✅ IMPLEMENTED AND WORKING | Ctrl+R / Reset button |
| Basic code formatter | ✅ IMPLEMENTED AND WORKING | Brace-based indentation only (not clang-format) |
| Compile via g++ | ✅ IMPLEMENTED AND WORKING | -std=c++17 -Wall -Wextra, 30s compile timeout |
| Execute compiled binary | ✅ IMPLEMENTED AND WORKING | Configurable timeout (default 10s) |
| stdout capture | ✅ IMPLEMENTED AND WORKING | Displayed in output panel |
| stderr capture | ✅ IMPLEMENTED AND WORKING | Displayed with error styling |
| Exit code display | ✅ IMPLEMENTED AND WORKING | Shown in status bar |
| Timeout detection | ✅ IMPLEMENTED AND WORKING | Infinite loop protection |
| Expected output verification | ✅ IMPLEMENTED AND WORKING | `trim()` normalized string comparison |
| Compiler error explanations | ✅ IMPLEMENTED AND WORKING | Pattern-matched from 13 known error types |
| Exercise section | ✅ IMPLEMENTED AND WORKING | Shows instruction + hints, loads starterCode |
| Exercise completion tracking | ✅ IMPLEMENTED AND WORKING | Triggered when output matches AND code ≠ codeExample |
| Quiz rendering | ✅ IMPLEMENTED AND WORKING | Multiple choice, single answer, one-attempt |
| Quiz answer feedback | ✅ IMPLEMENTED AND WORKING | Correct/incorrect highlight + explanation text |
| Quiz completion tracking | ✅ IMPLEMENTED AND WORKING | Per question, stored as `lessonId-qN` |
| Lesson completion tracking | ✅ IMPLEMENTED AND WORKING | Triggered when expectedOutput matches |
| Bookmarks | ✅ IMPLEMENTED AND WORKING | Toggle, persisted, view in Bookmarks tab |
| Dashboard progress | ✅ IMPLEMENTED AND WORKING | Counts, progress bars, chapter grid |
| Streak tracking | ✅ IMPLEMENTED AND WORKING | Daily, persisted to localStorage |
| Achievements | ✅ IMPLEMENTED AND WORKING | 16 achievements, auto-unlocked |
| Search | ✅ IMPLEMENTED AND WORKING | Full-text across title, content, chapter title |
| Practice mode | ✅ IMPLEMENTED AND WORKING | Filters lessons by difficulty, shows exercises |
| Dark/Light theme | ✅ IMPLEMENTED AND WORKING | Persisted to localStorage |
| Font size control | ✅ IMPLEMENTED AND WORKING | 10–24px |
| Execution timeout setting | ✅ IMPLEMENTED AND WORKING | User-configurable |
| Keyboard shortcut Ctrl+Enter | ✅ IMPLEMENTED AND WORKING | Triggers compile and run |
| stdin support | ✅ IMPLEMENTED AND WORKING | Fully supported and test-covered (Input tab + Terminal tab) |
| Resizable pane | ✅ IMPLEMENTED AND WORKING | Drag handle between content and editor |
| Prev/Next lesson navigation | ✅ IMPLEMENTED AND WORKING | Linear order across all chapters |
| XP system | ❌ NOT IMPLEMENTED | No XP field used anywhere in app.js |
| Syntax visualization | ❌ NOT IMPLEMENTED | No special diagram renderer |
| Interactive exercises (fill-in) | ❌ NOT IMPLEMENTED | Only code editor + run |
| Multiple quiz attempts | ❌ NOT IMPLEMENTED | Questions lock after first click |
| Hint reveal animation | ✅ IMPLEMENTED AND WORKING | Hover over hint element to reveal |
| Lesson duration display | ❌ NOT IMPLEMENTED | `duration` field not consumed anywhere |
| Lesson tags | ❌ NOT IMPLEMENTED | No tag field consumed |
| Chapter difficulty badge | ❌ NOT IMPLEMENTED | Chapter-level difficulty not shown |

### 4.2 stdin Constraint — Validation vs Runtime

**Runtime:** Interactive stdin is fully supported and test-covered in the application (Input tab + Terminal tab).
**Validation:** Currently, the validator does not support interactive input during automated execution. Programs requiring interactive input will hang and timeout. Schema v2 introduces the `stdinFixture` field, but **automated execution support for piping this fixture is a Phase D change** and is not currently implemented.

### 4.3 Supported HTML in lesson.content

The `lesson.content` field is injected as `innerHTML` into a `<div class="lesson-body">`. The following HTML elements have CSS styling:
`<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<li>`, `<code>`, `<pre><code>`, `<strong>`, `<em>`.

**NEW in v2 (Styled):**
- `<div class="note">` — blue informational callout
- `<div class="warning">` — orange warning callout
- `<div class="tip">` — green best-practice callout
- `<div class="mistake">` — red common-mistake callout
- `<table>` — basic table styling

**NOT styled (avoid or use with care):**
- `<blockquote>` — not styled
- `<img>`, `<a>` — CSP restricts external resources

---

## 5. Exact Current Chapter Data Contract

### 5.1 Chapter Object Schema

```javascript
{
  id: Number,          // Integer 1–34; globally unique; determines sort order
  title: String,       // Display title
  description: String, // Short subtitle (optional but recommended)
  icon: String,        // Single emoji
  lessons: Array       // Array of lesson objects
}
```

**Fields NOT consumed (do not invent without schema upgrade):**
- Any `difficulty` or `tier` at chapter level
- Any `prerequisites` array at chapter level
- Any `tags` array

---

## 6. Exact Current Lesson Data Contract

### 6.1 Lesson Object Schema

```javascript
{
  // REQUIRED
  id: String,           // "chN-lM" — N = chapter id (no zero-pad), M = 1-indexed lesson number
  title: String,
  difficulty: String,   // "beginner" | "intermediate" | "advanced" | "expert"
  content: String,      // HTML string injected into .lesson-body (see allowed elements)
  codeExample: String,  // Complete, compilable C++17 source; use \n for newlines

  // OPTIONAL — example output validation
  expectedOutput: String | null,
  // If non-null: automated validation when codeExample runs.
  // null → no automatic check (open-ended, stdin-interactive, or non-deterministic).

  // NEW IN v2 — stdin for automated validation of codeExample
  stdinFixture: String | null | undefined, // optional; undefined treated as null
  // If non-null AND expectedOutput is non-null:
  //   piped verbatim to the compiled program during validate_curriculum.js execution.
  //   Enables automated validation of interactive programs.
  // null → program receives empty stdin during validation.

  // NEW IN v2 — replaces exercise: Object
  exercises: Array | null,
  // null or [] → exercise section is hidden.
  // Array of exercise objects. Max 3 per lesson.

  // UNCHANGED — quiz section
  quiz: Array | null    // Array of quiz question objects. null or [] → hidden.
}
```

### 6.2 Exercise Object Schema

```javascript
{
  // REQUIRED
  instruction: String,      // Plain text instruction shown to the learner
  starterCode: String,      // Complete, compilable C++ source loaded on exercise load

  // OPTIONAL
  expectedOutput: String | null,
  // Non-null → triggers automated output check when user runs exercise.
  // null → open-ended, no automatic pass/fail.

  stdinFixture: String | null | undefined,
  // NEW IN v2. Stdin piped during validate_curriculum.js exercise validation.
  // Mirrors lesson-level stdinFixture but scoped to this exercise.

  // REQUIRED IN v2
  exerciseType: String,
  // Must be one of: "modify" | "debug" | "complete" | "write" | "predict" | "review"

  hints: Array
  // Array of plain text strings. Empty array is valid. 1–3 recommended.
}
```

### 6.3 Quiz Question Schema

```javascript
{
  // REQUIRED
  question: String,       // The question text (plain string, no HTML)
  options: Array,         // Array of 2-6 plain text answer strings
  correctIndex: Number,   // Zero-based index into options[] pointing to the correct answer
  explanation: String     // Plain text explanation shown after answering (correct or wrong)
}
```

---

## 7. Concrete JavaScript Chapter Example

```javascript
// Chapter 99: Example Chapter
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
    "id": 99,
    "title": "Example Chapter",
    "description": "Just an example",
    "icon": "🧪",
    "lessons": [
      {
        "id": "ch99-l1",
        "title": "Example Lesson",
        "difficulty": "beginner",
        "content": "<h2>Motivation</h2><p>Why do this?</p><h3>Syntax</h3><pre><code>code();</code></pre>",
        "codeExample": "#include <iostream>\n\nint main() {\n    std::cout << \"Hello!\\n\";\n    return 0;\n}",
        "expectedOutput": "Hello!",
        "exercises": [
          {
            "instruction": "Print Goodbye!",
            "starterCode": "#include <iostream>\n\nint main() {\n    // Write your code here\n    return 0;\n}",
            "expectedOutput": "Goodbye!",
            "exerciseType": "modify",
            "hints": [
              "Use std::cout"
            ]
          }
        ],
        "quiz": [
          {
            "question": "What is the return type of main?",
            "options": [
              "void",
              "int",
              "double"
            ],
            "correctIndex": 1,
            "explanation": "main always returns int."
          }
        ]
      }
    ]
  });
})();
```

---

## 8. Teaching Philosophy

1. **Zero assumed C++ knowledge at the start.**
2. **Why before how.** Motivation comes first.
3. **Mental models over memorization.** Build intuition through analogies.
4. **Small, complete, runnable examples.** Every `codeExample` should compile and run.
5. **Predict before running.** Encourage active understanding.
6. **Deliberate practice.** Exercises for modification and bug-fixing.
7. **Compiler errors are learning opportunities.** Teach error literacy intentionally.
8. **Incremental difficulty.** One new idea per lesson.
9. **Frequent retrieval.** Quizzes and review exercises.
10. **Standard C++ first, extensions never.** Avoid undefined behavior.
11. **Modern practices.** Introduce modern C++ (auto, smart pointers) at appropriate stages.
12. **Warn about unsafe patterns.** Explicitly note safer alternatives for outdated patterns.
13. **No unexplained jargon.**

---

## 9. Stage Definitions

| Stage | Name | Chapters | Learner Entry State | Exit Competency |
|---|---|---|---|---|
| 1 | Foundations | 1–6 | Zero C++ knowledge | Write standalone programs with variables, I/O, conditions, loops; read simple compiler errors |
| 2 | Structured Programming | 7–12 | Can write sequential programs | Decompose into functions; use vectors and strings; understand pass-by-value vs reference; write basic recursive functions |
| 3 | Data Abstraction | 13–17 | Multi-function programs with collections | Design and implement classes; use const correctly; understand value semantics, RAII, and operator overloading |
| 4 | Pointers and Polymorphism | 18–22 | Well-designed classes | Use raw pointers safely; manage dynamic memory; design class hierarchies; dispatch dynamically; handle exceptions |
| 5 | Modern C++ | 23–28 | OOP + exception handling | Write modern idiomatic C++ with smart pointers, move semantics, lambdas, and STL algorithms |
| 6 | Applied C++ | 29–32 | Comfortable with modern idioms | File I/O, error patterns, program organisation, debugging and UB awareness |
| 7 | Advanced Topics | 33–34 | Solid modern C++ | Advanced templates, C++20 concepts, concurrency basics, capstone project |

---

## 10. Canonical Chapter Quality Standard

- **Recommended lesson count:** 3–5
- **Minimum lesson count:** 2
- **Maximum recommended lesson count:** 7
- **Introduction:** First lesson must introduce motivation and simplest core concept.
- **Progression:** One concept per lesson, building up to an application lesson.
- **Quizzes:** Every lesson must have at least 2 questions.
- **Exercises:** Every lesson should have an exercise.
- **Splitting:** Split chapters if they exceed 7 lessons or cover conceptually distinct topics.

---

## 11. Canonical Lesson Quality Standard

Pedagogical progression within `content` HTML (adapt as needed):
1. Motivation / Problem being solved
2. Learning objectives
3. Prerequisite recall
4. Concept explanation / Mental model
5. Syntax breakdown (`<pre><code>`)
6. Minimal working example
7. Line-by-line explanation
8. Predict-before-running activity
9. Common mistakes / Error interpretation
*(The interactive codeExample, Exercise, and Quiz sections follow automatically in the UI)*

---

## 12. Code Example Standards

- **Compilable:** Must be a complete program (with `#include` and `int main()`) unless explicitly teaching fragment definitions (like a class struct).
- **Headers:** Must include necessary headers.
- **Determinism:** If `expectedOutput` is set, output must be deterministic.
- **Portable:** Standard C++17.
- **Clean:** No undefined behavior. Minimal irrelevant code.
- **Progression:** Start with demonstrations, progress to independent coding.

---

## 13. expectedOutput Rules

**Comparison Implementation:**
```javascript
var normalizedActual = (actual || '').trim();
var normalizedExpected = (expected || '').trim();
```
- **Newlines & Whitespace:** Leading/trailing whitespace on the *entire output* is trimmed. Internal whitespace and newlines must match exactly.
- **Interactive input:** Programs requiring interactive input currently hang in the validator. Once Phase D implements `stdinFixture` piping, you must provide `stdinFixture` to supply deterministic input, or set `expectedOutput: null`.
- **Fragile Output:** Floating-point outputs without `fixed << setprecision` are fragile across platforms. Set `expectedOutput: null` or enforce precision.
- **Addresses/Randomness/Timestamps/Unordered Iteration:** Set `expectedOutput: null`.
- **Set `expectedOutput: null` when:** The output is non-deterministic, platform-dependent, or the exercise is open-ended.

---

## 14. Exercise Standards

- **Categories:** Code Completion, Code Modification, Predict Output, Fix Bug, Write from Scratch, Refactoring, Chapter Challenge.
- **Purpose:** Active practice of the lesson's concept.
- **Stage Matching:** Scaffolding should decrease as stages progress (Stage 1 = fill blanks, Stage 7 = write from scratch).
- **Validation:** Use `expectedOutput` for automatic verification when possible. Use `null` for open-ended or creative tasks.
- **Hints:** 1-3 hints per exercise, progressive disclosure.

---

## 15. Quiz Standards

- **Format:** Single-answer multiple choice.
- **Options:** 2–6 plain text strings (3-4 recommended).
- **correctIndex:** Must be valid. **Vary the correct index** (avoid making it always 1).
- **Explanation:** Required. Must explain WHY it's correct.
- **Minimum Count:** 2 per lesson. (Recommended: 2-3).
- **Balance:** Test concepts, syntax, and code-reading.
- **Prohibitions:** No ambiguous wording, no trick questions.

---

## 16. Content Sizing Rules

- **Lessons per chapter:** 2–7 (3-5 recommended).
- **Content size per lesson:** 150–500 words of prose.
- **Warning threshold for chapter file size:** ~35,000 bytes (35840 bytes). Exceeding this triggers review for duplication, filler, scope creep, and unnecessary verbosity, but is not a validation failure and must not force pedagogical compression.
- **One-chapter-per-session:** AI generation must happen one chapter at a time to prevent quota exhaustion.
- **Splitting:** If a chapter grows too large, split it logically (e.g., "Functions Part 1", "Functions Part 2").

---

## 17. IDs and Naming Conventions

- **Filenames:** `renderer/lesson-data/chapters/c<NN>-<slug>.js` (Future Schema v2 location until generated)
- **Legacy Filenames:** `renderer/lesson-data/<tier>/c<NN>-<slug>.js` (Removed in Phase F)
- **Chapter IDs:** Integer, globally unique, sequential.
- **Lesson IDs:** `ch<N>-l<M>` (e.g., `ch1-l2`).
- **Slugs:** Lowercase, hyphen-separated.
- **Legacy Tier indexes:** `renderer/lesson-data/<tier>-index.js` (Removed in Phase F)
- **CRITICAL RULE:** **Never rename an existing chapter ID or lesson ID.** Progress is saved in localStorage using the lesson ID. Renaming IDs destroys user progress.

---

## 18. Compatibility and Persistence Rules

- **Registration:** Must push to `window.CPP_CHAPTERS`.
- **Aggregation:** `curriculum.js` sorts `CPP_CHAPTERS` by chapter `id` and sets `window.LESSONS_DATA`.
- **Script Load Order:** In `index.html`, chapter files must be loaded before `curriculum.js`.
- **Progress Dependency:** `localStorage` relies on exact `lesson.id` strings.

---

## 19. Validation Requirements

**Mandatory Static Checks (Automatable):**
- Valid JS syntax (IIFE + JSON object)
- `window.CPP_CHAPTERS.push` present
- Unique chapter ID, unique lesson IDs globally
- Correct field types and required fields
- `correctIndex` within bounds
- Non-empty content and codeExample

**Mandatory Runtime Checks (Manual/Execution):**
- `codeExample` compiles and produces `expectedOutput` (if non-null).
- App launches without console errors.
- Chapter renders in the list, lessons render cleanly.
- Run button functions, verification fires correctly.
- Next/Prev navigation works.

---

## 20. Future One-Chapter Generation Workflow

Future AI sessions generating chapters MUST follow this workflow:
1. **Read `CHAPTER_SPEC.md`** and `curriculum-rules.json`.
2. **Inspect Context:** Check prerequisites and existing chapters.
3. **Verify Git State:** Ensure clean tree.
4. **Generate Only One Chapter.**
5. **Validate Syntax & Schema.**
6. **Compile Runnable Examples** to verify correctness.
7. **Verify Outputs** match `expectedOutput`.
8. **Launch App:** Test rendering, navigation, and exercises.
9. **Report Changes & Stop.** Let human review and commit.

---

## 21. Definition of Done

A generated chapter is complete when:
- [ ] Valid JS module registering to `window.CPP_CHAPTERS`
- [ ] Unique chapter ID and lesson IDs (`ch<N>-l<M>`)
- [ ] Required fields present with correct types
- [ ] `correctIndex` in bounds and varied; `explanation` present
- [ ] All `codeExample` programs compile under C++17
- [ ] All `expectedOutput` values match actual output exactly
- [ ] Included in `index.html` (Note: legacy `<tier>-index.js` files are not used for Schema v2 chapters and will be removed in Phase F)
- [ ] Tested manually: App launches, chapter renders, editor works, code runs

---

## 22. Current Limitations

- **Interactive Stdin in Validator:** Programs requiring interactive input currently hang and timeout in the validator. Support for `stdinFixture` piping will be added in Phase D.
- **Single Quiz Attempt:** UI locks choices after one click.
- **Basic Formatter:** Indentation only, no full C++ parsing.
- **CSP Restrictions:** No external images, scripts, or styles allowed in lesson content.
- **Float Output Fragility:** `expectedOutput` matching is strictly string-based, making unformatted floats fragile across compilers/platforms.

---

## 23. Proposed Future Schema Extensions

These fields are **NOT CURRENTLY SUPPORTED**. Do not use them without modifying `app.js`.
- `lesson.duration` (Estimated minutes)
- `lesson.prerequisites` (Array of lesson IDs)
- `lesson.tags` (Array of topic tags)
- `quiz.difficulty`

---

## 24. Validator Execution and Phase B/D Enhancements

The existing `validate_curriculum.js` script verifies:
- **Schema:** JSON shape, field types, required fields.
- **IDs:** Uniqueness, format regex, no duplicates.
- **Quiz:** `options.length >= 2`, `0 <= correctIndex < options.length`.
- **Compilation:** Spawns `g++` to compile each `codeExample` and `starterCode`.
- **Execution:** Runs the binary, trims stdout, compares to `expectedOutput`.
- **Size:** Warns on large chapter files.

Phase B and D enhancements add:
- Dynamic discovery of the `chapters/` directory.
- `VALIDATE_NEW_ONLY` staging mode for strict Schema v2 enforcement.
- Support for piping `stdinFixture` to the compiled program during execution (Phase D).
- Legacy `exercise: Object` normalization during transition.

**Cutover and Cleanup:**
- **Phase F (Atomic Cutover):** Removes legacy tier directories, tier index files, and old `<script>` tags from `index.html`.
- **Phase G (Cleanup):** Removes transition compatibility logic (legacy normalization and staging mode switches) from the validator and renderer.
