# C++ Mastery Project Handoff

## 1. Purpose of This Document
This document transfers verified project state, development decisions, and architecture constraints to a new conversation with no prior context. It serves as the single source of truth for the current state of the C++ Mastery desktop application, prioritizing verified repository facts over historical assumptions.

## 2. Project Overview
- **Application Purpose**: An interactive desktop learning application for mastering C++ from absolute beginner to expert.
- **Target Learner**: Complete beginners to advanced developers seeking deep, practical C++ knowledge.
- **Desktop/Runtime Stack**: Electron, Node.js, HTML/CSS/JS (vanilla JS on the frontend), Monaco Editor.
- **Supported Environment**: Windows 10 environment currently used for development.
- **Compiler Assumptions**: Relies on a local `g++` compiler available in the system PATH, compiling with `-std=c++17 -Wall -Wextra`.
- **Major UI Layout**: A resizable left pane for lesson content and a right pane split vertically between the Monaco code editor (top) and a multi-tab execution/results panel (bottom).
- **Curriculum Architecture**: Lessons are delivered as pure static data via IIFEs pushing to a global `window.CPP_CHAPTERS` object, consumed synchronously at runtime.

## 3. Repository Location and Environment
- **Current Path**: `C:\Users\navee\cpp-learning-app`
- **Environment**: Windows 10, PowerShell/cmd.
- **Note**: Development relies on native Windows process management (e.g., `taskkill`) for execution cleanup.

## 4. Current Git Baseline
- **Current Branch**: `main`
- **Current HEAD**: `110d3df Add unified interactive terminal tab`
- **Working Tree**: The working tree was perfectly clean before the creation of `HANDOFF.md`. `HANDOFF.md` itself will become the only expected untracked file after creation.

**Recent Meaningful Commit History**:
- `110d3df Add unified interactive terminal tab`
- `f7f6e84 Add canonical example loader button`
- `3d7e6e1 Add automated regression tests`
- `fef4007 Add interactive execution and resizable terminal panel`
- `38c2a72 Fix output checking and exercise result routing`
- `caddf07 Separate execution output from checker results`
- `6b27618 Add canonical curriculum and chapter specification`
- `e2068e5 Refactor curriculum into modular chapter files`
- `5580adf Initial working C++ learning app`

## 5. Important Repository Structure
- **`main.js`**: Electron main process entry point. Handles app lifecycle, window creation, and proxies IPC execution requests to the execution manager.
- **`preload.js`**: Exposes a secure IPC bridge (`window.api`) for the renderer to interact with the main process (e.g., `startExecution`, `sendStdin`).
- **`lib/execution-manager.js`**: Core backend module that handles `g++` compilation, child process spawning, stdin/stdout/stderr streaming, timeouts, process lifecycle, and robust temp-file cleanup on Windows.
- **`renderer/index.html`**: The single page application HTML structure, script load order, and Content Security Policy (CSP).
- **`renderer/css/styles.css`**: Application styling, including CSS grid layouts and UI themes.
- **`renderer/js/app.js`**: Frontend logic managing UI state, Monaco editor initialization, DOM events, IPC listeners, and curriculum rendering.
- **`renderer/js/checker.js`**: Utility functions for exact string normalization and output comparison.
- **`renderer/lesson-data/`**: Directory containing all chapter/lesson data files.
- **`renderer/lesson-data/curriculum.js`**: Aggregates `window.CPP_CHAPTERS` into the globally consumed `window.LESSONS_DATA`.
- **`renderer/lesson-data/*-index.js`**: Tier manifest files loading the respective tier's chapter modules.
- **`CHAPTER_SPEC.md`**: The authoritative schema, rules, and pedagogy specification for generating new chapters.
- **`curriculum-rules.json`**: Machine-readable JSON representation of chapter schema and validation bounds.
- **`validate_curriculum.js`**: Node script that scans and structurally validates all curriculum data and compiles/runs all deterministic code examples.
- **`verify_dom_bindings.js`**: Static analysis script enforcing that all `document.getElementById` calls in `app.js` correctly resolve to existing DOM nodes in `index.html`.
- **`tests/`**: Directory containing Jest-like Node test runner suites (`checker.test.js`, `execution-session.test.js`) verifying exact output comparison and execution manager edge cases.
- **`package.json`**: Defines dependencies and custom npm scripts (`verify`, `validate`, `test`, `check:syntax`).

## 6. Current Application Architecture
**Verified Data Flow**:
1. Static lesson data files load via `<script>` tags -> `curriculum.js` aggregates them into `window.LESSONS_DATA`.
2. `app.js` renders the UI and loads `lesson.codeExample` into the Monaco editor.
3. User triggers execution -> `app.js` calls `window.api.startExecution` (Preload IPC).
4. `main.js` routes to `ExecutionManager.start()`.
5. `ExecutionManager` writes code to a temp file -> runs `g++` -> spawns compiled `.exe`.
6. Child process lifecycle (stdout, stderr, exit) fires callbacks -> `main.js` sends IPC events back to renderer.
7. `app.js` receives IPC events -> renders output in Execution Tabs -> invokes `renderer/js/checker.js` on exit -> updates UI progress.

**Boundaries**:
- **Renderer**: Pure UI, DOM manipulation, formatting, strictly front-end state.
- **Preload Bridge**: Strongly typed IPC channels; renderer has no direct Node/OS access.
- **Electron Main**: Window management and IPC routing.
- **Execution Manager**: Complete ownership of the host filesystem, compilers, child processes, and OS-level cleanup.
- **Checker**: Pure functional string comparison module loaded in both Node (for tests) and renderer.
- **Validator/Verifier**: Strict Node.js CLI scripts that test the repository without needing Electron.

## 7. Current UI State and Behavior
- **Lesson Pane**: Left side; displays HTML content, quizzes, and exercises.
- **Monaco Editor**: Top right; features C++ syntax highlighting and autocomplete.
- **Adjustable Dividers**: Drag handles exist horizontally between the lesson pane and editor, and vertically between the editor and the execution panel.
- **Toolbar**: Contains `Example`, `Reset`, `Format`, `Clear`, `Stop`, `Run` buttons.
- **Example Button**: Loads the active lesson's `codeExample` into the editor via Monaco `executeEdits` (preserving undo history). Does NOT execute code or clear tabs.
- **Reset Button**: Functions identical to Example button but acts as a panic reset.
- **Format Button**: Indents code using basic brace matching.
- **Stop Button**: Sends a kill signal to the active process.
- **Run Button**: Triggers compilation and execution of the current editor code.

**Execution Tabs (Bottom Right)**:
- **Input**: Provides a textarea and history log for sending stdin to a running process. Shows "Standard input history will appear here." until used.
- **Output**: Displays raw chronological `stdout` and `stderr` (styled red) as they stream in.
- **Result**: Displays the final output checker verification (Pass/Fail) and diagnostic diffs (e.g., extra/missing lines).
- **Terminal**: A unified, transcript-style view combining compilation status, stdout, stderr, process exits, and a `>` prompt for interactive stdin in a single scrolling pane.

**Clear/Delete Behavior**:
- Clicking the UI Clear icon clears the `#output-content`, `#input-history`, and `#terminal-transcript`.
- It **does not** switch the active tab.
- It **does not** stop the active process, close stdin, or disable the terminal input if a process is still accepting input.
- Any new process events (stdout, stderr, exit) arriving after a clear action continue appending normally to the empty Terminal.

## 8. Interactive Execution System
- **Session IDs**: Every execution request generates a unique `sessionId`. The renderer strictly filters incoming IPC events against `state.activeSessionId` to discard stale events from old processes.
- **Compilation**: `g++` is spawned asynchronously. Standard compiler errors are extracted, patterned-matched, and rendered with explanations.
- **Process Spawning**: On compilation success, the `.exe` is spawned via `child_process.spawn`.
- **Stdin Pipeline**: Handled via `window.api.sendStdin({ sessionId, input })`. A newline is forcefully appended if missing.
- **Stdin Closing**: `window.api.closeStdin({ sessionId })` triggers EOF for the process.
- **Stdout/Stderr Streaming**: Emitted immediately via `data` events on the child process streams.
- **Stopping**: User-triggered kills invoke Windows `taskkill /F /T /PID` to enforce child tree termination.
- **Timeout**: Enforced by `setTimeout` (default 10s execution, 30s compile). Triggers same kill sequence.
- **Exit Codes**: Returned accurately to the UI (e.g., 0 for success, nonzero for crashes).
- **Duplicate Callback Prevention**: Handled via robust state flags in `ExecutionManager` ensuring `cleanupPromise` only runs once per session.
- **Temp File Cleanup**: Idempotent, robust cleanup with backoff retries to combat Windows file-locking.
- **Shutdown**: Electron `before-quit` intercepts termination, prevents default, awaits `executionManager.stopAll()`, and restarts shutdown recursively with a safe guard.
- **IPC Events**: `compile-and-run`, `check-compiler`, `send-stdin`, `close-stdin`, `stop-execution`, `execution-stdout`, `execution-stderr`, `execution-exit`, `execution-error`, `execution-timeout`, `execution-stopped`, `stdin-closed`.

## 9. Output Checker Semantics
Defined in `renderer/js/checker.js`.
- **Exact Match**: `normalizeOutput(expected) === normalizeOutput(actual)`.
- **Normalization**: Strips leading/trailing whitespace and normalizes CRLF (`\r\n`) to LF (`\n`).
- **Internal Whitespace**: Internal whitespace and newlines are strictly preserved and significant.
- **Diagnostics**:
  - Empty output detected.
  - Wrong output detected.
  - First-difference reporting: highlights the exact line where execution deviated.
  - Missing line / Extra line diagnostics for length mismatches.
- **Historical Context**: Previously, visually identical outputs failed due to hidden `\r` carriage returns. Outputs were also visually mixed with compiler errors. These have been cleanly separated and normalization enforced.

## 10. Example Button
- **Purpose**: Allows users to quickly inject the lesson's canonical `codeExample` if they erased their code or got stuck.
- **Resolution**: Finds the active lesson ID from state, searches `window.LESSONS_DATA`.
- **Behavior**: Uses Monaco `executeEdits` to insert the code, keeping Ctrl+Z intact.
- **Limitations**: Does not run the code, trigger the checker, or clear the execution tabs.
- **Historical Context**: The button was originally implemented in HTML but had no JS listener bound, rendering it dead. A static DOM verifier `verify_dom_bindings.js` was created to permanently prevent orphaned DOM IDs.

## 11. Automated Verification Infrastructure
- **`npm run check:syntax`**: Node `--check` on all core `.js` files to instantly catch syntax errors.
- **`npm test`**: Native Node test runner (`tests/*.test.js`). 20/20 passing.
- **`npm run validate`**: Scans the entire curriculum schema, asserts chapter/lesson rules, compiles all 31 deterministic `codeExample` strings, executes them, and asserts output matching. 31/31 passing.
- **`node verify_dom_bindings.js`**: Statically analyzes `app.js` and asserts that all `document.getElementById` calls resolve to valid IDs in `index.html`.
- **`npm run verify`**: Runs all the above sequentially. A zero exit code proves infrastructure health.
- **Capabilities**: These tests prove backend safety, output correctness, curriculum integrity, and basic DOM linkage. They **do not** prove visual GUI layouts, drag interactions, or complex browser-level DOM state.

## 12. Current Curriculum State
- **Structure**: 15 chapters, 32 lessons, organized loosely into Basic, Intermediate, Expert, Master tiers.
- **Aggregation**: Files dynamically pushed to `window.CPP_CHAPTERS` via IIFEs.
- **Status**: The existing curriculum is **temporary placeholder content**. It is functionally valid (passes validation) but pedagogically insufficient.

## 13. Curriculum Direction Already Decided
**CRITICAL**: Do NOT continue building off the old exploratory `BASIC_CURRICULUM_PLAN.md` (which no longer exists) or the current placeholder lessons.
The user mandates a from-scratch replacement curriculum designed for maximum pedagogical depth.

**Future Curriculum Requirements**:
- Deep, highly detailed conceptual explanations.
- Progressive sequencing and prerequisites.
- Runnable, practical examples.
- Strong exercises, MCQs, and debugging activities.
- Gradual advancement from beginner to expert/modern C++.
- Must leverage all existing app features: Terminal tab, deterministic checker, Example loader, interactive stdin.

## 14. Historical Bugs Already Fixed
- **Output/Errors UI overlap**: Stdout and stderr visually clashed; fixed by creating distinct DOM routing.
- **Checker routing failure**: Exercise outputs were routed incorrectly; fixed by strictly tracking active execution context.
- **CRLF vs LF checker failures**: Fixed by adding strict newline normalization to the checker.
- **Interactive `cin` timeouts**: Fixed by plumbing a robust `sendStdin` IPC pipeline and Terminal UI.
- **Resizer drag bounds**: Fixed CSS flexbox/grid layout so the horizontal divider actually functions.
- **"Unknown error" execution bug**: Main and renderer mismatched IPC `success: true` objects; fixed by aligning object schemas.
- **Dead Example Button**: Fixed by binding DOM listeners; regression prevented by `verify_dom_bindings.js`.
- **Terminal not clearing**: Fixed `clearOutput()` to invoke `resetTerminal()` while preserving tab state and active process streams.
- **Leaked Temp Files**: Fixed by introducing retry-backoff cleanup loops and rigorous `stopAll` recursion guards on app quit.

## 15. Important Development Decisions
- **Verification-First**: Never commit without passing `npm run verify` and checking `git diff --check`.
- **Authoritative Repository**: Always trust actual code, Git history, and test outputs over prior conversation memories or agent assumptions.
- **Scoped Commits**: Do not mix infrastructure refactors with curriculum content updates.
- **Process Safety**: Windows 10 file-locking is aggressive; execution manager cleanup logic must remain strictly untouched.
- **Incremental Curriculum**: The new curriculum must be architected in a spec first, verified, and then generated in small, manageable batches to prevent quota exhaustion or massive untestable PRs.

## 16. Model/Agent Usage Context
*(Preference only, not technical restriction)*
- **Claude Opus 4.6 Thinking**: Complex architecture, pedagogy design, and schema review.
- **Claude Sonnet 4.6 Thinking**: Implementation, testing, and lesson generation.
- **Gemini 3.1 Pro High**: Repository audits, targeted debugging, and maintenance.

## 17. Files/Plans That Must Not Be Mistaken as Current Direction
- **`BASIC_CURRICULUM_PLAN.md`**: Does not exist in the working tree and is officially deprecated. Do not resurrect it.
- **Current Chapter Data**: `renderer/lesson-data/*` is technically correct but pedagogically obsolete. Do not treat it as the final product.

## 18. Current Known Limitations and Unresolved Work
- **Interactive Exercise Scaffolding**: UI currently only allows simple code-replacement. Deeply interactive fill-in-the-blank or multiple-file exercises are not natively supported by the UI yet.
- **Multiple Quiz Attempts**: Quizzes lock after one attempt.
- **GUI Testing**: Lacks Playwright/Spectron E2E GUI testing; relies on static `verify_dom_bindings` for DOM linkage.
- **CSP Warnings**: Electron Content Security Policy warnings may still appear in the devtools console.

## 19. Immediate Next Step
1. **Analyze**: Have Claude Opus 4.6 Thinking ingest this `HANDOFF.md` and audit `CHAPTER_SPEC.md` / `curriculum-rules.json`.
2. **Design**: Architect the new replacement curriculum structure from scratch, defining what the exact pedagogical progression should look like.
3. **Upgrade**: Identify if any new application capabilities (e.g., UI enhancements) are required to support the new pedagogical design.
4. **Execute**: Do not begin generating lesson JSON/JS files until the architecture and specification are fully locked in and committed.

## 20. Instructions for the New Conversation
- Read this `HANDOFF.md` first.
- Run `git status` and `git log --oneline --decorate -12` to orient yourself.
- Run `npm run verify` to confirm a green baseline.
- **Do not assume `HANDOFF.md` is authoritative over the repository** if a contradiction is found. The codebase is the absolute truth.
- Keep changes narrowly scoped. Never modify unrelated files.
- Never commit without user approval.
- Always run `npm run verify` and `git diff --check` after implementation.
- Treat the user as a beginner learning C++ who desires exceptionally high-quality, technically accurate instructional design.
- Preserve all current working execution features, DOM verifiers, and regression safeguards.

## 21. New Conversation Bootstrap Commands
Run this block immediately upon starting the new conversation:
```bash
git status
git log --oneline --decorate -12
git diff --check
npm run verify
```
Inspect `HANDOFF.md`, `CHAPTER_SPEC.md`, `curriculum-rules.json`, and `package.json` to familiarize yourself with the domain.
