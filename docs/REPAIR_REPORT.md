# MathForge repair report — 10 November 2026

## Fixed in this pass

1. **100-question drill crash:** the generator previously threw after exhausting the possible unique prompts, especially with one-digit settings or restricted drill types. It now completes the requested count and assigns unique IDs. Small ranges can still produce repeated prompt text.
2. **Percentage-to-fraction grading:** the drill now asks for a fraction or decimal. Grading accepts equivalent fractions (for example, `1/4`, `2/8`, and `0.25`) and rejects invalid denominators.
3. **MCQ choices:** distractor generation now guarantees three distinct incorrect values plus the correct answer.
4. **Pause timing:** paused duration is excluded from the recorded active duration.
5. **Storage resilience:** local-storage writes are guarded against browser storage restrictions.
6. **Topic question correctness:** repaired question templates for common arithmetic, interest, work, speed, triangle, mensuration, ratio, mixture, and trigonometry cases. This is still a starter generator, not a curated exam-grade question bank.

## Checks that passed

- TypeScript transpile/syntax diagnostics: `App.tsx`, shared math engine, and math tests.
- Strict TypeScript compile of `packages/math/src/index.ts`.
- Smoke test: each of the 16 drill types generated a 100-question set using one-digit settings without crashing.
- Smoke test: every generated answer was finite.
- Fraction grading: equivalent fractions and decimals passed; invalid/incorrect fractions failed.

## Not verified yet

`npm install` timed out in this environment. Therefore the following were not run: Vitest, full React/TypeScript project build, Vite production build, Playwright/browser QA, and mobile-device QA.

## Still outstanding

- Decimal/negative operand settings, ranges, ordering, feedback and auto-submit options.
- IndexedDB/Dexie persistence and cross-tab recovery.
- Full topic-by-topic lesson content, diagrams and exam-grade validated question banks.
- Full React tests and browser acceptance tests.
