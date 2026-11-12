# Phase 4 acceptance checklist

## Delivered in source
- [x] 41 calculator entries across everyday maths, number theory, finance, algebra, geometry, motion, statistics, combinatorics and health/fitness.
- [x] Calculator search and category filters.
- [x] Formula and result explanations with invalid-input handling for unsupported domains.
- [x] 32 separately authored brain-game challenge patterns.
- [x] Timed game loop, answer feedback, points and streak bonus.
- [x] Recently played games and per-game best score saved locally.
- [x] Lavender design retained.

## Still required before Phase 4 can be called fully accepted
- [ ] Install dependencies and pass the full TypeScript/Vite production build.
- [ ] Browser test every calculator input path and all game challenge patterns.
- [ ] Add automated unit tests for all 41 calculators and all 32 game generators.
- [ ] Add distinct game-specific mechanics and richer rules where a question pattern alone is insufficient (memory, logic and pattern games).
- [ ] Verify mobile layouts, keyboard operation, reduced-motion and storage-denied behaviour.
- [ ] Verify saved scores/history across refresh and gracefully handle corrupt local storage.

Phase 5 is intentionally not started until these acceptance items are verified.


## 2026-11-12 repair follow-up
- [x] Fixed undeclared best-score state referenced by the game UI.
- [x] Restored best scores and recent games from local storage defensively.
- [x] Fixed stale score capture in the game timeout callback.
- [x] Added domain validation for HCF/LCM, ratio, probability, BMI, EMI and savings.
- [x] Replaced memory-heavy prime checking with a divisor loop.
- [ ] Full production build and browser acceptance still pending dependency installation.
