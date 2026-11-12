# Phase 4 repair notes — 2026-11-12

## Confirmed defects found in the supplied Phase 4 source
- `bestScores` / `setBestScores` were referenced in the game UI and timer but were never declared. This causes a TypeScript error and a runtime failure when rendering the Phase 4 game view.
- The timer callback captured the score and selected game from the start of a round, so best scores could be saved as stale values.
- Recently played games were written to localStorage but not restored on page load.
- The prime checker allocated an array up to the square root of the input, which could consume excessive memory for large inputs.
- HCF/LCM accepted decimal values even though these operations require integers; ratio `0:0` could produce invalid simplification output.
- Probability accepted impossible values such as favourable outcomes greater than total outcomes.
- BMI accepted negative weight values; EMI and savings allowed zero/negative durations.

## Changes in this repair
- Added defensive, validated localStorage initializers for best scores and recently played history.
- Corrected timer closure by restarting the interval when the active game or score changes, so the latest score is persisted at timeout.
- Replaced array-based prime checking with a bounded divisor loop.
- Added integer/domain checks to HCF, LCM and ratio; disallowed `0:0` ratio.
- Added probability, BMI, EMI and savings domain checks.
- Made calculator reset defaults depend on the selected calculator.

## Verification limitations
- `npm install --no-audit --no-fund` timed out in this environment.
- A TypeScript run was attempted. It could not resolve React, lucide-react, or workspace packages because dependencies were unavailable, so a full typecheck / production build / browser run remains unverified.
- Do not treat this repair as proof that every one of the 41 calculators and 32 games has passed end-to-end acceptance. Those require installed dependencies and browser testing.
