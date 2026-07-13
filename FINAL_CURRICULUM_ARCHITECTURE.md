# FINAL_CURRICULUM_ARCHITECTURE.md
# C++ Mastery — Final Implementation-Ready Curriculum Architecture

**Status:** IMPLEMENTATION READY
**Baseline commit:** `5b58798 Add project handoff documentation`
**Precedes:** Schema v2 commits A–G
**Authority:** This document supersedes `CURRICULUM_ARCHITECTURE.md` and `CURRICULUM_ARCHITECTURE_REVIEW.md`.
**Do not modify** without re-running `npm run verify` and updating HANDOFF.md.

---

## PART 0: REVIEW RECONCILIATION

Every finding from `CURRICULUM_ARCHITECTURE_REVIEW.md` is addressed below before the architecture is stated.

### Error Corrections

| # | Finding | Decision | Reason |
|---|---|---|---|
| E1 | `app.js` has **6 locations** reading `lesson.exercise`, not just lines 1127–1145; `renderPractice` (1973, 1995, 2005–2006) is missed | **ACCEPT** | All 9 exact migration locations documented in §15 |
| E2 | Interactive stdin is **A — fully tested** in the app; only the *curriculum validator* has a gap | **ACCEPT** | Capability matrix corrected. App = A. Validator execution path = D. |
| E3 | Lesson completion fires on any example PASS — exercise completion is not required | **ACCEPT** | Kept as-is by design. Consequences for authors documented in §9 |
| E4 | Validator `stdinFixture` skip already exists; what is missing is the execution path | **ACCEPT** | Validator change is piping support only, not a schema gate |
| E5 | "35 chapters" silently omits review chapters — actually ~40 if reviews are standalone | **ACCEPT** | Reviews redesigned as embedded final lessons; total = 34 chapters |
| E6 | Backward-compat shim for `exercise→exercises` is unnecessary | **PARTIALLY ACCEPT** | Legacy `exercise: Object` compatibility maintained during transition. Removed in Phase G. |

### Missing-Requirement Corrections

| # | Finding | Decision | Reason |
|---|---|---|---|
| MR1 | Multi-exercise UX must be decided before touching `app.js` | **ACCEPT** | UX fully specified in §7 |
| MR2 | `validate_curriculum.js` hardcodes 15 files; won't discover new chapters | **ACCEPT** | Dynamic discovery specified in §13 and implemented in Phase B |
| MR3 | Directory structure must be decided before any file is created | **ACCEPT** | Flat `chapters/` directory specified in §14 |
| MR4 | Exceptions and Templates are sequenced backwards | **ACCEPT** | Exceptions = Ch 22, Templates = Ch 23 |
| MR5 | Review chapters must be clarified or eliminated from count | **ACCEPT** | Reviews are embedded final lessons within content chapters; no separate review chapter IDs |
| MR6 | `completedExercises` tracking granularity for arrays | **ACCEPT** | Format changed to `"lessonId:N"` strings; documented in §9 |
| MR7 | Practice mode broken by `exercises` array (app.js:1973, 1995, 2005) | **ACCEPT** | All 9 locations included in renderer migration list (§15) |

### Overengineering Findings

| # | Finding | Decision | Reason |
|---|---|---|---|
| OE1 | `exercises: Array` is premature complexity | **REJECT** | Pedagogical need is real. Multiple exercises per lesson are essential for review and synthesis lessons. Backward-compat handled via temporary transition normalisation. |
| OE2 | `exerciseType` if not rendered adds no learner value | **PARTIALLY ACCEPT** | Required field for all Schema v2 exercises. Validated for new chapters. Legacy normalized exercises may omit during transition. |
| OE3 | Tier directory structure vs flat `chapters/` | **ACCEPT** | Flat `chapters/` directory adopted |

### Sequencing Corrections

| # | Finding | Decision | Reason |
|---|---|---|---|
| SC1 | Recursion misplaced; should follow Functions: Advanced | **ACCEPT** | Moved to Ch 9 |
| SC2 | Enums too thin for own chapter; merge with Structs | **ACCEPT** | Ch 13 = "Structs and Enums"; saves one chapter |
| SC3 | Operator Overloading belongs in Stage 3, not Stage 4 | **ACCEPT** | Moved to Ch 17 after Const Correctness |
| SC4 | Exceptions before Templates | **ACCEPT** | Exceptions = Ch 22, Templates = Ch 23 |
| SC5 | `std::vector` before `std::array` for beginners | **PARTIALLY ACCEPT** | `std::vector` taught first as primary container; `std::array` covered in same chapter as secondary option |
| SC6 | lvalue/rvalue concept needs earlier introduction | **ACCEPT** | Brief conceptual treatment added to Ch 8 (Functions: Advanced) |

---

## PART 1: FINAL PEDAGOGICAL PRINCIPLES

1. **Conceptual depth over breadth.** One new idea per lesson. Never introduce two unrelated concepts simultaneously.
2. **Motivation before mechanism.** Every concept opens with *why*, not *how*.
3. **Mental models and analogies.** Build intuition through progressive refinement; avoid pure memorisation.
4. **Predict before running.** Every example is small enough that the reader can predict output before executing.
5. **Error literacy is a first-class skill.** Teach compiler error reading explicitly. Use deliberate common-mistake examples with callout boxes.
6. **Interactive programs from Ch 3 onward.** Use stdin-based exercises starting in Ch 3. Make learning feel live.
7. **Progressive independence.** Stage 1–2: heavily scaffolded (code completion/modification). Stage 3–4: fix-a-bug or write from spec. Stage 5–7: write from scratch.
8. **Modern C++ from the start.** `std::string`, `std::vector`, range-for, `auto`, `nullptr` — modern idioms used where appropriate. C-style arrays and raw `char*` strings are not taught as primary patterns.
9. **No undefined behaviour shown silently.** Any UB shown must be explicitly flagged with a `<div class="warning">` callout.
10. **Retrieval practice.** Every lesson ends with exercises and MCQs that force active recall.
11. **Reviews embedded, not bolted on.** The final lesson of every chapter synthesises that chapter and previews the next topic.
12. **Projects as applied synthesis.** One project-structured lesson at each stage boundary chapter. The final chapter (Ch 34) ends with a capstone.
13. **Determinism by default.** All automatically validated examples produce deterministic output. Non-deterministic examples use `expectedOutput: null`.
14. **Compilable and complete.** Every `codeExample` is a complete, compilable, runnable C++17 program.

---

## PART 2: EXACT STAGE ARCHITECTURE

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

## PART 3: EXACT ORDERED CHAPTER LIST (34 chapters)

**Reviews are the final lesson inside each chapter — no separate review chapters.**
Lesson count ranges are targets; validator enforces minimum of 2.

### STAGE 1: FOUNDATIONS (Chapters 1–6)

| ID | Title | Lessons | Key Concepts |
|---|---|---|---|
| 1 | Your First C++ Program | 4–5 | Hello World, `#include`, `main()`, `cout`, compilation stages, reading compiler errors, `return 0` |
| 2 | Variables and Data Types | 5–6 | `int`, `double`, `char`, `bool`, `std::string`; declaration; initialisation (uniform `{}`); assignment; naming; type safety; `auto`; `sizeof` |
| 3 | Input and Output | 4–5 | `cin`, `cout`, `getline`, escape sequences, `<<`/`>>`, prompt patterns, basic formatting; **first interactive stdin programs** |
| 4 | Operators and Expressions | 4–5 | Arithmetic, comparison, logical, assignment; precedence; integer division; implicit conversion; `static_cast` |
| 5 | Conditions and Decisions | 5–6 | `if`/`else if`/`else`; nested conditions; `switch`; `?:` ternary; short-circuit evaluation; common mistakes |
| 6 | Loops and Repetition | 5–7 | `while`, `for` (classic + range-for preview), `do-while`, `break`, `continue`, nested loops, infinite loops, loop debugging; **Stage 1 project exercise** in review lesson |

### STAGE 2: STRUCTURED PROGRAMMING (Chapters 7–12)

| ID | Title | Lessons | Key Concepts |
|---|---|---|---|
| 7 | Functions: Basics | 5–6 | Definition, parameters, return values, `void`, scope, function calls, stack-frame mental model |
| 8 | Functions: Advanced | 4–5 | Pass-by-value vs pass-by-reference, `const` parameters, overloading, default arguments, forward declarations; **brief lvalue/rvalue conceptual introduction** |
| 9 | Recursion | 3–4 | Base case, recursive case, stack depth, factorial, Fibonacci; recursion vs iteration trade-offs |
| 10 | Vectors and Arrays | 5–6 | `std::vector` (primary): `push_back`, `size`, range-for, index access, 2D vectors; `std::array` (secondary, fixed-size); bounds errors |
| 11 | Strings In Depth | 4–5 | `std::string`: `find`, `substr`, `+`, `size`, `empty`, character access; `std::stringstream`; common string patterns |
| 12 | Scope, Lifetime, and Program Structure | 3–4 | Local vs global scope, variable shadowing, storage duration, `const` variables, `static` locals, namespaces intro; **Stage 2 project exercise** in review lesson |

### STAGE 3: DATA ABSTRACTION (Chapters 13–17)

| ID | Title | Lessons | Key Concepts |
|---|---|---|---|
| 13 | Structs and Enums | 4–5 | `struct` definition, member access, nested structs, struct arrays; `enum class`, underlying type, switch with enums |
| 14 | Classes: Basics | 5–6 | `class` vs `struct`, access control, constructors, member functions, encapsulation, `this` pointer, const member functions |
| 15 | Classes: Resource Management | 4–5 | Destructors, RAII, rule of three (conceptual), copy constructor, copy assignment; explicitly shows what breaks without destructors |
| 16 | Const Correctness | 3–4 | `const` variables, `const` references, `const` member functions, `const` parameters, `constexpr` basics, `mutable` |
| 17 | Operator Overloading | 3–4 | Overloading `<<`, `+`, `==`, `[]`; friend functions; when *not* to overload; canonical forms; **Stage 3 project exercise** in review lesson |

### STAGE 4: POINTERS AND POLYMORPHISM (Chapters 18–22)

| ID | Title | Lessons | Key Concepts |
|---|---|---|---|
| 18 | Pointers Fundamentals | 5–6 | Address-of `&`, dereference `*`, `nullptr`, pointer arithmetic, pointers vs references, `const` pointers, common pointer bugs |
| 19 | Dynamic Memory | 4–5 | `new`/`delete`, memory leaks, dangling pointers, RAII motivation, heap vs stack mental model; explicit "why smart pointers exist" |
| 20 | Inheritance | 4–5 | Base/derived classes, `protected`, constructor chaining, `is-a` relationship, object slicing warning |
| 21 | Polymorphism | 4–5 | Virtual functions, `override`, dynamic dispatch, abstract classes, pure virtual, virtual destructors, vtable mental model |
| 22 | Exception Handling | 4–5 | `try`/`catch`/`throw`, exception hierarchy, exception safety levels, RAII + exceptions, `noexcept`, when to use vs not use exceptions; **Stage 4 project exercise** in review lesson |

### STAGE 5: MODERN C++ (Chapters 23–28)

| ID | Title | Lessons | Key Concepts |
|---|---|---|---|
| 23 | Templates: Basics | 4–5 | Function templates, class templates, template parameter deduction, instantiation, constraints preview |
| 24 | Smart Pointers | 4–5 | `unique_ptr`, `shared_ptr`, `weak_ptr`, `make_unique`, `make_shared`, ownership semantics, RAII payoff |
| 25 | Move Semantics | 4–5 | lvalues/rvalues formally, rvalue references `&&`, `std::move`, move constructor, move assignment, rule of five |
| 26 | Lambda Expressions | 3–4 | Lambda syntax, capture clause, generic lambdas (with template context), lambdas with STL algorithms, `std::function` brief mention |
| 27 | STL Containers | 4–5 | `std::map`, `std::set`, `std::unordered_map`, iterators, iterator invalidation, choosing containers |
| 28 | STL Algorithms | 4–5 | `std::sort`, `find`, `transform`, `accumulate`, `count_if`, `for_each`, `remove_if`, ranges introduction (C++20 preview); **Stage 5 capstone project exercise** in review lesson |

### STAGE 6: APPLIED C++ (Chapters 29–32)

| ID | Title | Lessons | Key Concepts |
|---|---|---|---|
| 29 | File I/O | 4–5 | `ifstream`, `ofstream`, text vs binary, RAII for files, `std::filesystem` basics, exception-based error handling |
| 30 | Error Handling Patterns | 3–4 | Error codes vs exceptions, `std::optional`, `std::expected` (conceptual), defensive programming, assertions |
| 31 | Program Organisation | 3–4 | Header files, source files, include guards, `#pragma once`, namespaces, compilation units (conceptual), forward declarations in headers |
| 32 | Debugging and Undefined Behaviour | 3–4 | `assert`, `static_assert`, common UB types (signed overflow, use-after-free, out-of-bounds), sanitisers (`-fsanitize`), debugging strategy |

### STAGE 7: ADVANCED TOPICS (Chapters 33–34)

| ID | Title | Lessons | Key Concepts |
|---|---|---|---|
| 33 | Advanced Templates and Concepts | 3–4 | Template specialisation, variadic templates (overview), SFINAE (conceptual), C++20 `concepts` and `requires` |
| 34 | Concurrency and Final Capstone | 4–5 | `std::thread`, `std::mutex`, `std::lock_guard`, race conditions, `std::atomic`; **final capstone** (last 2 lessons): multi-threaded data-processing project |

**Total: 34 chapters. Estimated 136–175 lessons.**

---

## PART 4: CHAPTER PREREQUISITE TABLE

The curriculum is strictly linear. Prerequisites listed are the minimum required conceptual dependencies (not just "previous chapter").

| Ch | Hard Prerequisites | Notes |
|---|---|---|
| 1 | None | |
| 2 | Ch 1 | |
| 3 | Ch 2 | |
| 4 | Ch 2 | Operators don't require I/O knowledge |
| 5 | Ch 4 | Conditions use comparison operators |
| 6 | Ch 5 | Loops use conditions |
| 7 | Ch 6 | |
| 8 | Ch 7 | |
| 9 | Ch 8 | Recursion requires functions |
| 10 | Ch 8 | Vectors don't require recursion |
| 11 | Ch 10 | Strings build on iteration patterns from vectors |
| 12 | Ch 8, Ch 11 | Scope chapter ties functions and strings together |
| 13 | Ch 12 | |
| 14 | Ch 13 | |
| 15 | Ch 14 | |
| 16 | Ch 14 | Const member functions require member functions |
| 17 | Ch 16 | Operator overloading uses const member functions |
| 18 | Ch 16 | Pointers need classes + const as context |
| 19 | Ch 18 | Dynamic memory builds on raw pointers |
| 20 | Ch 15, Ch 16 | Inheritance needs well-formed classes + const |
| 21 | Ch 20 | |
| 22 | Ch 15 (RAII), Ch 19 (dynamic memory context) | Exception handling needs RAII and memory context |
| 23 | Ch 22 | Exceptions before templates (STL exception guarantees) |
| 24 | Ch 19 (raw pointers), Ch 22 (exceptions) | Smart pointers are the RAII answer to dynamic memory |
| 25 | Ch 24, Ch 17 (operator overloading) | Move constructor/assignment builds on copy versions |
| 26 | Ch 23 | Generic lambdas require templates |
| 27 | Ch 10, Ch 26 | STL containers + lambdas for algorithms |
| 28 | Ch 27 | |
| 29 | Ch 15 (RAII), Ch 22 (file errors) | File streams are RAII types themselves. Smart pointers are not required. |
| 30 | Ch 22, Ch 23 (`std::optional` is a template type) | |
| 31 | Ch 12, Ch 29 | Program organisation follows file I/O naturally |
| 32 | Ch 19 (UB from dynamic memory), Ch 30 | |
| 33 | Ch 23 | Advanced templates requires basics |
| 34 | Ch 25 (move semantics), Ch 28 (STL algorithms) | |

**Implementation note:** Prerequisites are enforced by ordering only. No `prerequisites` field is added to the schema.

---

## PART 5: EXACT SCHEMA v2

### 5.1 Chapter Object Schema (v2 — unchanged from v1)

```javascript
{
  id: Number,          // Integer 1–34; globally unique; determines sort order
  title: String,       // Display title
  description: String, // Short subtitle (optional but recommended)
  icon: String,        // Single emoji
  lessons: Array       // Array of lesson objects
}
```

### 5.2 Lesson Object Schema (v2)

```javascript
{
  // REQUIRED
  id: String,           // "chN-lM" — N = chapter id (no zero-pad), M = 1-indexed lesson number
  title: String,
  difficulty: String,   // "beginner" | "intermediate" | "advanced" | "expert"
  content: String,      // HTML string injected into .lesson-body (see §5.5 for allowed elements)
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
  // Array of exercise objects (see §5.3). Max 3 per lesson.

  // UNCHANGED — quiz section
  quiz: Array | null    // Array of quiz question objects (see §5.4). null or [] → hidden.
}
```

**Removed in v2:** `exercise: Object` — deprecated. Supported ONLY during transition via normalisation to `exercises` array. Not allowed in new files under `chapters/`.

### 5.3 Exercise Object Schema (v2)

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
  // "modify" | "debug" | "complete" | "write" | "predict" | "review"

  hints: Array
  // Array of plain text strings. Empty array is valid. 1–3 recommended.
}
```

### 5.4 Quiz Question Schema (v2 — unchanged from v1)

```javascript
{
  question: String,     // Plain text (no HTML). Refer to code with backticks by convention.
  options: Array,       // 2–6 plain text answer strings
  correctIndex: Number, // Zero-based index into options[]; must vary across questions
  explanation: String   // Explains WHY correct; shown after answering
}
```

### 5.5 Supported HTML in lesson.content

| Element | v1 | v2 |
|---|---|---|
| `<h2>`, `<h3>` | ✅ | ✅ |
| `<p>` | ✅ | ✅ |
| `<ul>`, `<ol>`, `<li>` | ✅ | ✅ |
| `<code>` (inline) | ✅ | ✅ |
| `<pre><code>` (block) | ✅ | ✅ |
| `<strong>`, `<em>` | ✅ | ✅ |
| `<div class="note">` | ❌ | ✅ NEW — blue informational callout |
| `<div class="warning">` | ❌ | ✅ NEW — orange warning callout |
| `<div class="tip">` | ❌ | ✅ NEW — green best-practice callout |
| `<div class="mistake">` | ❌ | ✅ NEW — red common-mistake callout |
| `<table>` | ❌ | ✅ NEW — basic table styling |
| `<blockquote>` | ❌ | ❌ Not styled |
| `<img>`, `<a>` | ❌ | ❌ CSP restriction |

---

## PART 6: FIELD-CONSUMER MATRIX

Every v2 schema field mapped to every consumer that reads or validates it.

| Field | `app.js` locations | `validate_curriculum.js` | `verify_dom_bindings.js` | `curriculum-rules.json` |
|---|---|---|---|---|
| `chapter.id` | `curriculum.js` sort; chapter labels | Chapter file loads; uniqueness check | — | `chapterIdRules` |
| `chapter.title` | `renderLessons`, `getAllLessons` | Present check | — | `requiredChapterFields` |
| `chapter.description` | `renderLessons` subtitle | — | — | — |
| `chapter.icon` | `renderLessons`, `renderDashboard` | — | — | — |
| `chapter.lessons` | `getAllLessons` | Iteration | — | `requiredChapterFields` |
| `lesson.id` | `findLesson`, `completeLesson`, `completedLessons` | Uniqueness check, regex | — | `lessonIdPattern` |
| `lesson.title` | Lesson header, list | Present check | — | `requiredLessonFields` |
| `lesson.difficulty` | Badge CSS; practice filter | — | — | `observedDifficultyValues` |
| `lesson.content` | `openLesson` → `innerHTML` | — | — | — |
| `lesson.codeExample` | Editor load; Example button | Compilation | — | `requiredLessonFields` |
| `lesson.expectedOutput` | `handleExecutionExit` → checker | Output comparison | — | — |
| `lesson.stdinFixture` *(v2)* | Not consumed by renderer | Pipe to `execSync` stdin during validation | — | `optionalLessonFields` |
| `lesson.exercises` *(v2)* | All 9 locations in §15 | `exercises[n]` iteration | — | `exerciseSchema` |
| `exercises[n].instruction` | Exercise section; practice mode card | — | — | `requiredExerciseFields` |
| `exercises[n].starterCode` | Load-Exercise button; practice auto-load | — | — | `requiredExerciseFields` |
| `exercises[n].expectedOutput` | `compileAndRun` when `editorMode=exercise` | Compilation (optional) | — | `optionalExerciseFields` |
| `exercises[n].stdinFixture` *(v2)* | Not consumed by renderer | Pipe to `execSync` for exercise validation | — | `optionalExerciseFields` |
| `exercises[n].exerciseType` *(v2)* | Not consumed | Enforced enum for new chapters | — | `exerciseSchema` |
| `exercises[n].hints` | Hover-to-reveal hint divs | — | — | — |
| `quiz[n].question` | `renderQuiz` | — | — | `requiredQuizFields` |
| `quiz[n].options` | `renderQuiz` | bounds check | — | `minimumOptions` |
| `quiz[n].correctIndex` | `renderQuiz` answer check | bounds check | — | `correctIndexBounds` |
| `quiz[n].explanation` | `renderQuiz` feedback | — | — | `requiredQuizFields` |

---

## PART 7: MULTIPLE-EXERCISE UX SPECIFICATION

### 7.1 Layout

The exercise section renders a **numbered vertical list** of exercise cards. Each card is a `.exercise-card.glass-card` element.

```
[ 💻 Exercises                                   ]
[ Exercise 1 of 3                                ]
[ ┌───────────────────────────────────────────┐ ]
[ │ Instruction text                          │ ]
[ │ [Hint 1] [Hint 2]                         │ ]
[ │ [ Load Exercise 1 in Editor → ]           │ ]
[ └───────────────────────────────────────────┘ ]
[ Exercise 2 of 3                                ]
[ ┌───────────────────────────────────────────┐ ]
[ │ ...                                       │ ]
[ └───────────────────────────────────────────┘ ]
```

### 7.2 Load Button Behaviour

- Each exercise card has its own "Load Exercise N in Editor →" button.
- On click:
  - `setEditorCode(exercises[n].starterCode)`
  - `state.originalCode = exercises[n].starterCode`
  - `state.editorMode = 'exercise'`
  - `state.activeExerciseIndex = n` ← **new state field**
- `compileAndRun` reads `exercises[state.activeExerciseIndex].expectedOutput` for comparison.
- Reset button resets to `exercises[state.activeExerciseIndex].starterCode` when `editorMode === 'exercise'`.

### 7.3 Single-Exercise Case (No Visual Difference)

When `exercises.length === 1`: the label "Exercise 1 of 1" is **omitted**; the single card renders identically to the old design. The existing `#btn-load-exercise` DOM ID is reused as the first (only) exercise button. `verify_dom_bindings.js` compatibility is maintained.

### 7.4 Multi-Exercise DOM IDs

When `exercises.length >= 2`: buttons are assigned IDs `btn-load-exercise-0`, `btn-load-exercise-1`, etc. The static `#btn-load-exercise` element in `index.html` remains (serves as the first button anchor) and `verify_dom_bindings.js` still finds it. Additional buttons are created dynamically with the indexed IDs.

### 7.5 Practice Mode Behaviour

- Filter: a lesson appears in practice mode if `exercises && exercises.length > 0`.
- Card displays: `exercises[0].instruction` and `exercises[0].starterCode`.
- Click on card auto-loads `exercises[0]` (first exercise only).
- If the lesson has `exercises.length > 1`, a small badge "N exercises" is shown on the card (informational only).

### 7.6 No New Static DOM Elements Required

`index.html` requires no new static element additions for multi-exercise support. All exercise cards beyond the first are rendered dynamically by `openLesson`. `#lesson-exercise-section`, `#exercise-instruction`, `#exercise-hints`, and `#btn-load-exercise` remain as-is.

---

## PART 8: STDIN AND DETERMINISTIC VALIDATION POLICY

### 8.1 Corrected Capability Classification

| Capability | Classification |
|---|---|
| App interactive stdin (Input tab + Terminal tab) | **A — Fully supported and test-covered** (6 tests in `execution-session.test.js`) |
| Curriculum validator stdin execution | **D — Not supported** (skip logic present; execution path missing) |

### 8.2 When to Use `stdinFixture`

| Situation | Policy |
|---|---|
| `codeExample` uses `cin`/`getline`; output is deterministic for a known input | Set `expectedOutput` + `stdinFixture` (the input string). Validator pipes it. |
| `codeExample` uses `cin`; output depends on free user input | Set `expectedOutput: null`. Validator skips. No automated check. |
| Exercise `starterCode` expects stdin; correct answer is deterministic | Set `exercise.expectedOutput` + `exercise.stdinFixture`. |
| `codeExample` has no `cin`/`getline` | Leave `stdinFixture: null`. Normal deterministic path. |

### 8.3 `stdinFixture` Format

- Plain string with newlines embedded as `\n`.
- Each `cin >> token` requires a whitespace-separated value in the fixture.
- Example for two integers: `"5\n3\n"`. The trailing newline ensures EOF is clean.
- The validator pipes this verbatim and closes stdin (EOF) after writing.

### 8.4 Floating-Point Output Policy (unchanged)

Use `<< fixed << setprecision(N)` whenever floats appear in `expectedOutput`. Otherwise `expectedOutput: null`.

---

## PART 9: PROGRESS AND COMPLETION SEMANTICS

### 9.1 Lesson Completion

Lesson completion is now decoupled from canonical example validation.
- Running the canonical `codeExample` successfully does NOT auto-complete the lesson.
- A lesson with automatically checkable exercises completes when at least one required exercise passes (exit 0 and matches `expectedOutput`).
- Open-ended exercises (`expectedOutput: null`) do NOT auto-complete lessons merely because execution exits 0.
- Add an explicit manual "Mark Lesson Complete" action for lessons whose exercises are all open-ended.
- The action must only be available after the learner has loaded and run at least one open-ended exercise during the current lesson session.
- Track this eligibility in renderer state only (`state.openEndedRunCompleted = true`); no new persisted schema field is required.
- Canonical example execution must not unlock manual completion.
- Switching lessons resets the eligibility state to false.
- Checkable exercises continue using automatic completion semantics.

### 9.2 Exercise Completion Tracking (v2)

An individual exercise is automatically marked complete ONLY when ALL are true:
- `state.editorMode === 'exercise'`
- `state.activeExerciseIndex` points to a valid exercise
- Active exercise `expectedOutput` is a non-null string
- Process exits with code 0
- Normalised actual output equals normalised exercise expected output

Additional behaviour requirements:
- Open-ended exercises (`expectedOutput: null`) cannot auto-complete themselves.
- Open-ended exercises cannot auto-complete their parent lesson.
- Successful execution of a loaded open-ended exercise may only set manual-completion eligibility according to §9.1.
- Running canonical example code cannot mark an exercise complete.
- Running Exercise N cannot complete Exercise M.
- Switching lessons resets `activeExerciseIndex` to 0.
- Loading a specific exercise sets `activeExerciseIndex` before execution.
- Reset button preserves the current exercise selection and reloads that exercise's `starterCode`.


- `state.progress.completedExercises` is an array of strings in the format `"lessonId:N"` where N is the 0-based exercise index.
- Example: `"ch3-l2:1"` = second exercise of lesson ch3-l2 completed.
- **Granularity:** A lesson's "exercise" stat counts how many individual exercises across all lessons have been completed.
- **"At least one" for progress display:** The dashboard "Exercises Passed" stat and achievement conditions count distinct `"lessonId:N"` entries.
- **Old format migration:** The old format stored bare `"lessonId"` strings. Since the old curriculum is replaced atomically in Phase F, no migration is needed. Old entries will not match the new `"lessonId:N"` format.

### 9.3 Quiz Completion (unchanged from v1)

Tracked per-question as `"lessonId-qN"` in `completedQuizzes`. Unchanged.

### 9.4 Achievement Thresholds

With 140+ lessons and up to 3 exercises each, `exercisesCount` can reach ~400+. The existing achievement thresholds (5, 10 exercises) unlock far too quickly.

**Required update in Phase C:**
- `five-exercises` → renamed to `ten-exercises` at threshold 10
- `ten-exercises` → renamed to `exercises-25` at threshold 25
- Add new: `exercises-50` at threshold 50
- Add new: `exercises-100` at threshold 100

The `lessonsCount` achievements (5, 10, 20 lessons) remain appropriate for a 140+ lesson curriculum.

---

## PART 10: LESSON DEPTH STANDARD

Every lesson's `content` HTML must include the following sections in order. Use `<h2>` and `<h3>` to delineate.

1. **`<h2>` — Topic Title** — States what this lesson teaches.
2. **Motivation paragraph(s)** — Why this concept matters; connects to something the learner has already done.
3. **Mental model** — Analogy or conceptual description without syntax.
4. **Prerequisite recall** — Brief reminder of required prior knowledge.
5. **Core explanation** — The concept explained clearly; one idea only.
6. **`<pre><code>` syntax reference** — Minimal syntax template.
7. **Worked example walkthrough** — Line-by-line explanation of the `codeExample`.
8. **At least one callout** — `<div class="tip">`, `<div class="note">`, or both.
9. **Common mistake** — `<div class="mistake">` showing the most frequent error with compiler output.
10. **Predict activity** — A "What will this print?" question embedded in content; the answer is explored in the quiz.

The `exercises` array and `quiz` array follow automatically in the UI. Do not duplicate them in `content`.

---

## PART 11: EXERCISE AND MCQ STANDARDS

### 11.1 Exercise Standards

| Rule | Value |
|---|---|
| Minimum per lesson | 1 |
| Recommended per lesson | 2 (general) / 3 (chapter review lesson) |
| Maximum per lesson | 3 |
| Scaffolding by stage | Stage 1–2: code completion or modification. Stage 3–4: fix-a-bug or write from specification. Stage 5–7: write from scratch. |
| `starterCode` | Must be a compilable skeleton, never a blank file or an uncompilable fragment |
| `expectedOutput` | Set whenever the correct answer produces deterministic output |
| `hints` | 1–3 per exercise. First = conceptual. Last = near-solution. |
| `exerciseType` | REQUIRED. Validator enforces for new Schema v2 files: `modify`, `debug`, `complete`, `write`, `predict`, `review`. Legacy files may omit. |

### 11.2 MCQ Standards

| Rule | Value |
|---|---|
| Minimum per lesson | 2 |
| Recommended per lesson | 3 |
| Maximum per lesson | 5 |
| Options per question | 3–4 (2 allowed for true/false style) |
| `correctIndex` | Must vary across questions in a lesson; never all the same index |
| Question mix | Conceptual understanding + syntax recognition + output prediction + error diagnosis |
| `explanation` | Required. Must explain WHY correct, not restate the answer. |
| Prohibited | Trick questions, ambiguous wording, "all of the above" |

---

## PART 12: REVIEW AND PROJECT PEDAGOGY

### 12.1 Chapter-Embedded Review Lessons (Every Chapter)

The **final lesson of every chapter** is a "Review and Practice" lesson:
- `title`: `"Review: [Chapter Topic]"`
- `content`: synthesises all lessons in the chapter; previews what comes next
- `exercises`: 2–3 exercises with `exerciseType: "review"` that combine multiple chapter concepts
- `quiz`: 3–5 MCQs covering the full chapter
- `codeExample`: a complete program demonstrating multiple chapter concepts together

### 12.2 Stage Project Lessons

The review lesson of the stage-end chapter (Ch 6, 12, 17, 22, 28) is additionally structured as a **guided project**:
- `content` explains a small complete project brief
- `exercises` are sequential steps (each builds on the last)
- `exerciseType: "write"` throughout
- `expectedOutput: null` (projects are open-ended) unless a specific output-deterministic subcomponent is testable

### 12.3 Capstone (Ch 34)

Last two lessons of Ch 34:
- **Lesson N-1:** Capstone specification + architecture + first implementation exercise
- **Lesson N:** Capstone completion + "Next Steps" (further resources, modern C++ ecosystem, contribution)
- Both lessons: `expectedOutput: null`. Assessment by running and observing. Learner uses manual completion button.

---

## PART 13: VALIDATOR REQUIREMENTS

### 13.1 Dynamic Chapter File Discovery (P0-B)

Replace the hardcoded 15-file array in `validate_curriculum.js` with dynamic discovery:

```javascript
// During transition, validator supports two explicitly isolated modes to prevent duplicate ID collisions:
//
// 1. Legacy mode (default):
//    - scans ONLY old tier directories;
//    - allows and normalizes legacy exercise: Object;
//    - does NOT scan chapters/.
//
// 2. Staging mode (activated by VALIDATE_NEW_ONLY / npm run validate:new):
//    - scans ONLY chapters/;
//    - enforces strict Schema v2;
//    - rejects exercise: Object;
//    - does NOT scan old tier directories.
//
// After Phase F (atomic cutover):
// - the application uses the new curriculum;
// - compatibility validator infrastructure still remains temporarily.
//
// Phase G:
// - removes legacy mode and mode switching;
// - default validator then scans ONLY chapters/ in strict Schema v2 mode.

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
```

Phase G removes the legacy scanning block and `VALIDATE_NEW_ONLY` mode switch.

### 13.2 `exercises` Array Support

Replace existing singular `lesson.exercise` checks with array iteration:

```javascript
// Exact legacy normalization semantics during transition
let exerciseList = [];
if (lesson.exercises === null) {
  exerciseList = [];
} else if (Array.isArray(lesson.exercises)) {
  exerciseList = lesson.exercises;
} else if (lesson.exercises !== undefined) {
  console.error(`exercises must be Array or null in ${lesson.id}`);
} else if (lesson.exercise !== undefined) {
  if (!isLegacy) {
    console.error(`Legacy singular exercise found in strict v2 file ${lesson.id}`);
  } else {
    exerciseList = [lesson.exercise];
  }
} else {
  exerciseList = [];
}
exerciseList.forEach((ex, exIdx) => {
  if (!ex.instruction) console.error(`Missing exercises[${exIdx}].instruction in ${lesson.id}`);
  if (!ex.starterCode) console.error(`Missing exercises[${exIdx}].starterCode in ${lesson.id}`);
  if (typeof ex.expectedOutput !== 'string' && ex.expectedOutput !== null && ex.expectedOutput !== undefined) {
    console.error(`Invalid exercises[${exIdx}].expectedOutput type in ${lesson.id}`);
  }
});
```

### 13.3 `stdinFixture` Execution Support

When `lesson.expectedOutput !== null` and program contains `cin`/`getline`:
- If `lesson.stdinFixture` is a non-null string: execute with stdin piped
- If `lesson.stdinFixture` is null: skip (unchanged existing behaviour)

```javascript
const stdoutRaw = execSync(`"${exeFile}"`, {
  stdio: ['pipe', 'pipe', 'pipe'],
  input: lesson.stdinFixture  // non-null string piped to stdin; process sees EOF after
}).toString();
```

Same pattern for `exercises[n]` validation when `exercises[n].expectedOutput` is non-null.

### 13.4 Static Schema Validation (strengthened)

| Check | Action |
|---|---|
| `lesson.id` matches `^ch\d+-l\d+$` | Error if not |
| `lesson.id` globally unique across all chapters | Error if duplicate |
| `chapter.id` unique positive integer | Error if duplicate |
| `quiz[n].correctIndex` in `[0, options.length)` | Error if out-of-bounds |
| `exercises` when present is Array or null | Error if it's a plain Object (old v1 format, except when handled by legacy mode normalization) |
| `exercises[n].instruction` non-empty string | Error if absent/empty |
| `exercises[n].starterCode` non-empty string | Error if absent/empty |
| `stdinFixture` | Valid values: String, null, undefined. Reject other types. |

---

## PART 14: DIRECTORY, FILE, AND ID STRATEGY

### 14.1 Directory Structure

```
renderer/
  lesson-data/
    chapters/                    ← NEW: flat directory for all 34 chapters
      c01-your-first-cpp-program.js
      c02-variables-and-data-types.js
      ...
      c34-concurrency-and-capstone.js
    curriculum.js                ← unchanged aggregator (verified: simply sorts and exports window.CPP_CHAPTERS array, no modification needed)
    [old tier directories remain until Phase F]
  index.html                     ← updated with new <script> tags atomically in Phase F
```

### 14.2 Chapter File Naming

Format: `c{NN}-{slug}.js` where `NN` is zero-padded to 2 digits.

Examples:
- `c01-your-first-cpp-program.js`
- `c10-vectors-and-arrays.js`
- `c34-concurrency-and-capstone.js`

### 14.3 Chapter IDs

Integer 1–34. Globally unique. Sequential. Chapter ID matches the file's `NN` number (no zero-padding in the ID integer itself).

### 14.4 Lesson IDs

Format: `ch{N}-l{M}` where N is the chapter ID (no zero-padding) and M is 1-indexed.

Examples: `ch1-l1`, `ch10-l4`, `ch34-l5`.

### 14.5 index.html Script Tags (Phase F)

In Phase F (Atomic Cutover), old tier-directory `<script>` tags are removed and replaced simultaneously with all 34 new chapter tags:

```html
<!-- New curriculum chapters -->
<script src="lesson-data/chapters/c01-your-first-cpp-program.js"></script>
<script src="lesson-data/chapters/c02-variables-and-data-types.js"></script>
...
<script src="lesson-data/chapters/c34-concurrency-and-capstone.js"></script>
<script src="lesson-data/curriculum.js"></script>
```

### 14.6 Tier Index Files and Tier Directories

- Old tier index files are removed in Phase F.
- Old tier directories are removed in Phase F.
- `curriculum-rules.json` `tiers` field updated to document stages instead of tiers.

---

## PART 15: RENDERER MIGRATION REQUIREMENTS

All 9 `lesson.exercise` references in `app.js` that must be updated in Phase C:

**Important Compatibility Note:** To safely handle both legacy v1 chapters and new v2 chapters during transition, create a small helper function `normalizeExerciseData(lesson)` that returns `lesson.exercises || (lesson.exercise ? [lesson.exercise] : [])`. Use the output of this helper in the 9 locations instead of reading properties directly.

| # | Line(s) | Current code | Required change |
|---|---|---|---|
| 1 | 652 | `if (state.currentLesson.exercise)` | `const ex = normalizeExerciseData(state.currentLesson); if (ex.length > 0)` |
| 2 | 653 | `state.currentLesson.exercise.starterCode` | `normalizeExerciseData(state.currentLesson)[state.activeExerciseIndex].starterCode` |
| 3 | 654 | `state.currentLesson.exercise.starterCode` (originalCode) | same as #2 |
| 4 | 1129 | `if (lesson.exercise)` | `const exList = normalizeExerciseData(lesson); if (exList.length > 0)` |
| 5 | 1131 | `lesson.exercise.instruction` (single) | iterate over `normalizeExerciseData(lesson)` |
| 6 | 1134 | `lesson.exercise.hints` | `ex.hints` inside loop |
| 7 | 1267–1269 | `state.currentLesson.exercise.expectedOutput` | `normalizeExerciseData(state.currentLesson)[state.activeExerciseIndex].expectedOutput` |
| 8 | 1973 | `if (!l.exercise) return false` | `const ex = normalizeExerciseData(l); if (ex.length === 0) return false` |
| 9 | 1995, 2005–2006 | `lesson.exercise.instruction`, `.starterCode` | `const ex = normalizeExerciseData(lesson); ex[0].instruction`, `ex[0].starterCode` |

**New `state` fields required** (add to initial `state` object, line ~126):
```javascript
activeExerciseIndex: 0,
openEndedRunCompleted: false,
```

**State Transition Requirements:**

On `openLesson`:
- `activeExerciseIndex = 0`
- `openEndedRunCompleted = false`

On loading any exercise:
- set `activeExerciseIndex` before execution;
- reset `openEndedRunCompleted = false`.

On successful exit-code-0 execution of the currently loaded open-ended exercise:
- set `openEndedRunCompleted = true`;
- update/render manual completion action availability.

Running canonical example code:
- must not modify `openEndedRunCompleted`.

Switching lessons:
- resets `openEndedRunCompleted = false`.

### 15.1 Manual Completion UI Migration Requirements ("Mark Lesson Complete")

**Visibility:**
- Only relevant for lessons whose exercises are all open-ended.
- Hidden for lessons with no exercises.
- Hidden when any checkable exercise exists, because normal automatic completion semantics apply.
- Hidden until `openEndedRunCompleted === true`.
- Hidden if the lesson is already complete.

**Action:**
- Clicking invokes the existing lesson-completion persistence path (`completeLesson(lesson.id)`).
- Must not mark any individual open-ended exercise complete.
- Must not fabricate a `completedExercises` entry.
- Must update progress/dashboard/UI using existing completion rendering paths.

**Binding:**
- **Implementation strategy:** Add a new static DOM element `<button id="btn-mark-lesson-complete" class="btn btn-success" style="display:none; margin-top: 15px;">Mark Lesson Complete</button>` below the exercise section in `index.html`.
- Explicitly require `verify_dom_bindings.js` coverage for `#btn-mark-lesson-complete`.
- Bind event listener once in `app.js` initialization.

**Reset behavior:**
- Switching lessons resets eligibility and hides the action.
- Loading another exercise resets eligibility and hides the action.
- Canonical Example button does not unlock eligibility.

---

## PART 16: TEST REQUIREMENTS

### 16.1 Existing Tests — Must All Pass

All 20 tests in `tests/checker.test.js` + `tests/execution-session.test.js` must pass unchanged after every commit.

### 16.2 New Tests Required

| Test | File | Phase | Description |
|---|---|---|---|
**VALIDATOR TESTS**
| # | Test | Type | Phase |
|---|---|---|---|
| 1 | Dynamic discovery of `chapters/` | Validator Integration | B |
| 2 | Legacy/default mode accepts and normalizes `exercise: Object` | Validator Integration | B |
| 3 | Staging strict-v2 mode rejects `exercise: Object` | Validator Integration | B |
| 4 | `exercises: null` normalizes to `[]` | Validator Integration | B |
| 5 | `exercises: []` remains `[]` | Validator Integration | B |
| 6 | `exercises` Array remains unchanged | Validator Integration | B |
| 7 | Invalid `exercises` plain Object/type is rejected | Validator Integration | B |
| 8 | `stdinFixture` is piped correctly | Execution Integration | D |
| 9 | Legacy/default mode does not scan `chapters/` | Validator Integration | B |
| 10 | Staging mode does not scan old tier directories | Validator Integration | B |

**NORMALIZATION / PURE HELPER TESTS**
| # | Test | Type | Phase |
|---|---|---|---|
| 11 | `normalizeExerciseData` converts legacy `exercise` Object to one-element array | `node:test` pure helper | D |
| 12 | `normalizeExerciseData` returns v2 `exercises` Array unchanged | `node:test` pure helper | D |
| 13 | `normalizeExerciseData` returns `[]` for null/missing exercise data | `node:test` pure helper | D |
| 14 | Completion key format is exactly `"lessonId:N"` | `node:test` pure helper | D |

**EXERCISE ROUTING TESTS**
| # | Test | Type | Phase |
|---|---|---|---|
| 15 | Loading Exercise N sets `activeExerciseIndex = N` | `node:test` pure helper | D |
| 16 | Running Exercise N uses Exercise N expectedOutput | `node:test` pure helper | D |
| 17 | Passing Exercise N completes only Exercise N, never Exercise M | `node:test` pure helper | D |
| 18 | Reset in exercise mode reloads active exercise starterCode and preserves activeExerciseIndex | `node:test` pure helper | D |
| 19 | Switching lessons resets activeExerciseIndex to 0 | `node:test` pure helper | D |

**CANONICAL EXAMPLE ISOLATION TESTS**
| # | Test | Type | Phase |
|---|---|---|---|
| 20 | Passing canonical codeExample does not complete a lesson | `node:test` pure helper | D |
| 21 | Passing canonical codeExample does not complete an exercise | `node:test` pure helper | D |
| 22 | Running canonical codeExample does not set openEndedRunCompleted | `node:test` pure helper | D |

**OPEN-ENDED COMPLETION TESTS**
| # | Test | Type | Phase |
|---|---|---|---|
| 23 | Exit-code-0 execution of a loaded open-ended exercise sets `openEndedRunCompleted = true` | `node:test` pure helper | D |
| 24 | Open-ended execution does not create completedExercises entries | `node:test` pure helper | D |
| 25 | Open-ended execution does not automatically complete the lesson | `node:test` pure helper | D |
| 26 | Manual completion action is unavailable before eligible open-ended execution | `node:test` pure helper | D |
| 27 | Manual completion action becomes available after eligible execution | `node:test` pure helper | D |
| 28 | Manual completion action completes the lesson through existing persistence path | `node:test` pure helper | D |
| 29 | Manual completion action does not complete any individual exercise | `node:test` pure helper | D |
| 30 | Switching lessons resets eligibility | `node:test` pure helper | D |
| 31 | Loading another exercise resets eligibility | `node:test` pure helper | D |

**PRACTICE MODE TESTS**
| # | Test | Type | Phase |
|---|---|---|---|
| 32 | Lesson with legacy exercise appears in Practice Mode during transition | `node:test` pure helper | D |
| 33 | Lesson with v2 exercises Array appears in Practice Mode | `node:test` pure helper | D |
| 34 | Lesson with null/empty exercises does not appear | `node:test` pure helper | D |
| 35 | Practice Mode uses `exercises[0]` | `node:test` pure helper | D |
| 36 | Multi-exercise lesson reports the correct exercise count | `node:test` pure helper | D |

**CHECKER TEST**
| # | Test | Type | Phase |
|---|---|---|---|
| 37 | Trailing-whitespace-per-line normalization behavior required by the architecture | `checker.test.js` | D |

---

## PART 17: P0 IMPLEMENTATION PLAN (Phases)

### Phase A — "chore(spec): Rewrite specification to schema v2"
**Risk:** Low (documentation and validator configuration)
Files: `CHAPTER_SPEC.md`, `curriculum-rules.json`
Verification: `npm run verify` must pass unchanged.

### Phase B — "feat(schema-v2): Validator infrastructure + transition compatibility"
**Risk:** Low (validator only)
Files: `validate_curriculum.js` — staging/legacy validator modes; normalize legacy singular exercise.
Verification: `npm run validate` passes (legacy mode); `npm run validate:new` checks staging.

### Phase C — "feat(schema-v2): Renderer Schema v2 support + compatibility + progress semantics"
**Risk:** Medium (runtime)
Files: `renderer/css/styles.css`, `renderer/js/app.js` — use `normalizeExerciseData(lesson)` for legacy compat; decoupled lesson/exercise completion logic; `"lessonId:N"` format.
Verification: `node verify_dom_bindings.js` passes; Manual smoke test of completion paths.

### Phase D — "test: Add schema v2 regression tests"
**Risk:** Low (validator execution behavior + tests)
Files: `validate_curriculum.js` (implement `stdinFixture` piping), `tests/checker.test.js`, `tests/execution-session.test.js`, `tests/renderer-helpers.test.js` (new file for pure helpers).
Requirement: Must explicitly implement the full regression contract defined in §16.2 (37 tests total covering validator logic, normalization, routing, canonical isolation, open-ended completion, and practice mode).
Verification: `npm test` passes.

### Phase E1–E7 — "chore(curriculum): Generate and validate Stage X chapters"
**Risk:** Medium (data generation)
Files: `renderer/lesson-data/chapters/c*.js` generated stage-by-stage.
Verification: `npm run validate:new` passes independently of legacy curriculum.

### Phase F — "chore(curriculum): Atomic curriculum cutover"
**Risk:** High (app data replacement)
Files: `renderer/index.html` (swap all old script tags for all 34 new chapter tags simultaneously).
Verification: All legacy chapters vanish, all 34 new chapters present in UI.

### Phase G — "refactor: Remove transition compatibility and legacy validator mode"
**Risk:** Low
Files: `validate_curriculum.js`, `renderer/js/app.js` (remove `normalizeExerciseData` shim and legacy tier scanning).
Verification: Clean `npm run verify`.

## PART 18: UNRESOLVED DECISIONS

| # | Decision | Impact | Status |
|---|---|---|---|
| UD1 | Does capstone have any automated validation? | Low | **Resolved:** Open-ended. `expectedOutput: null` throughout. |
| UD2 | Should `exerciseType` eventually display as a badge in the UI? | Low | Deferred to post-launch. Not in v2 renderer. |
| UD3 | Should quiz questions support code-block formatting? | Medium | **Resolved for now:** Plain text only. Backtick convention for code references. |
| UD4 | Practice mode: show exercise count badge? | Low | Yes — show "N exercises" badge when `exercises.length > 1`. |
| UD5 | Achievement thresholds for exercises and lessons at 140+ lesson scale | Low | **Resolved:** Updated thresholds specified in §9.4. |
| UD6 | `std::array` as lesson within Ch 10 or its own short chapter? | Very Low | Remains as a lesson within Ch 10. Finalise during content generation. |

---

## PART 19: RISKS

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Phase C's `exercises` change breaks old chapters during smoke test | Low | High | Old chapters remain; `npm run validate` tests them. Fix before merging C. |
| `stdinFixture` piping fails on Windows (buffering/EOF issues) | Medium | Medium | Use `execSync` `input:` option (handles this correctly on Windows). Test explicitly. |
| 34 chapters × 4–5 lessons = ~150 lessons; quality degrades with generation fatigue | High | High | Generate and review one stage at a time. Human review before proceeding to next stage. |
| `completedExercises` format change silently breaks old progress | Low | Low | User is developer. Old entries won't match new `"lessonId:N"` format. Reset via Settings. |
| `verify_dom_bindings.js` fails if new dynamic exercise buttons create static ID conflicts | Low | Low | Dynamic buttons have no static IDs. Verifier checks only static IDs. No conflict. |
| Chapter IDs 1–34 collide with old curriculum 1–15 if both loaded simultaneously | Medium | Low | Never coexist. Old `<script>` tags removed atomically in Phase F. |
| Deeply detailed lessons exceed 20KB chapter file limit | Medium | Low | Review and raise the chapter file size limit during Phase A if required by the lesson depth standard. Split chapters if needed. |

---

## FINAL REPORT

| Item | Value |
|---|---|
| **File created** | `FINAL_CURRICULUM_ARCHITECTURE.md` (repository root) |
| **Final chapter count** | **34** |
| **Estimated lesson count** | **136–175** |
| **Major corrections applied** | 6 factual errors fixed; 7 missing requirements addressed; 6 sequencing corrections (Exceptions→Templates swap, Recursion to Ch 9, Enums+Structs merged, Operator Overloading to Stage 3, `std::vector` before `std::array`, lvalue/rvalue earlier); dynamic validator discovery added |
| **Schema version** | v2: `exercises: Array`, `stdinFixture`, callout CSS, deprecated `exercise: Object` |
| **Backward compatibility** | Temporary backward compatibility IS required via `normalizeExerciseData()` and legacy validator mode during Phases B-F. Both are removed in Phase G. |
| **Phase plan** | 7 top-level phases: A (spec), B (validator), C (renderer), D (tests), E1-E7 (data generation), F (atomic cutover), G (compatibility removal) |
| **Deferred decisions** | 2 items (UD2, UD6), neither blocks implementation |
| **git diff --check** | Clean — no whitespace errors |
| **git status** | `On branch main` — untracked: `CURRICULUM_ARCHITECTURE.md`, `CURRICULUM_ARCHITECTURE_REVIEW.md`, `FINAL_CURRICULUM_ARCHITECTURE.md` |

## VERDICT: IMPLEMENTATION READY

Phase A may begin immediately upon approval of this document. Phases B and C must not begin until Phase A is merged and `npm run verify` passes. Phase E1-E7 generation must not begin until Phases A-D are complete. Phase F cutover must not happen until all 34 chapters are validated.
