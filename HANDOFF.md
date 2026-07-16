# AI Agent Handoff Document

This document summarizes the current state of the C++ Mastery curriculum migration to help the next AI session seamlessly resume work.

## 1. Project Context
We are systematically migrating the C++ Mastery desktop learning application's curriculum to a new "Schema v2" architecture. 
- The **legacy curriculum** (15 chapters) is still powering the live app.
- The **new curriculum** (34 chapters across 7 stages) is being generated in parallel inside `renderer/lesson-data/chapters/`.
- The live app will not switch to the new curriculum until **Phase F (Atomic Cutover)**, which happens only after all 34 chapters are complete.

## 2. Current State: Stage 1 is COMPLETE
- **Stage 1 (Foundations) is fully implemented.** Chapters 1 through 6 (`c01-your-first-cpp-program.js` through `c06-loops-and-repetition.js`) have been successfully generated, audited, and validated.
- **Stage 2 (Structured Programming) is in progress.** Chapter 7 (`c07-functions-basics.js`) has been generated and validated.
- **Phases Completed:** Phases A, B, C, D, and E1 are officially marked complete.
- **Current Active Phase:** We are currently in **Phase E2**, which involves generating the remaining Schema v2 chapters starting from Stage 2 (Chapters 8–34).

## 3. Recent Changes (Pending Commit)
The project documentation has just been updated to reflect the completion of Stage 1. **These changes are currently unstaged/uncommitted:**
- `FINAL_CURRICULUM_ARCHITECTURE.md`: Marked Stage 1 and Phase E1 as complete. Updated the active baseline to Phase E2.
- `CHAPTER_SPEC.md`: Updated to state that the Schema v2 curriculum currently has 6 chapters and 32 lessons. Removed outdated limitations (confirming `stdinFixture` is now supported).
- `curriculum-rules.json`: Removed IDs `1` through `6` from `reservedChapterIds`. Added a `_reservedChapterIdsDescription` field documenting that this array tracks the legacy chapter IDs (7-15) awaiting Schema v2 replacements, and that it has no effect on runtime validation.

## 4. Key Rules for the Next AI
1. **Strict Authoritative Files:** Always read `FINAL_CURRICULUM_ARCHITECTURE.md` and `CHAPTER_SPEC.md` before generating new content.
2. **Pacing:** Adhere strictly to the `oneChapterPerGenerationSession` rule. Do not attempt to generate Chapter 8 before Chapter 7 is fully completed, audited, and validated.
3. **Legacy IDs:** When a new chapter successfully passes validation and is merged, its corresponding legacy ID should be removed from `reservedChapterIds` in `curriculum-rules.json`.

## 5. Immediate Next Steps for the User/Next AI
1. Review and **commit** the current uncommitted changes (Chapter 7 generation and ID removal).
2. Continue generating **Stage 2: Structured Programming** by creating **Chapter 8** (`renderer/lesson-data/chapters/c08-functions-advanced.js`).
