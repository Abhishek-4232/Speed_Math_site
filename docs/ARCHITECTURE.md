# Phase 0 Architecture

## Repository layout
- `apps/web`: React + TypeScript + Vite frontend.
- `apps/api`: Express + TypeScript backend scaffold.
- `packages/math`: shared deterministic, seedable pure question generators and grading.
- `docs`: architecture, acceptance criteria and progress.

## Design decisions
- Original MathForge branding; focus-dark default, light alternative, responsive practice interface.
- Local-first session and history persistence. Guest use needs no authentication.
- Pure math module isolates correctness logic from React and future server verification.
- Planned MongoDB + Mongoose for opt-in cloud sync and accounts, with IndexedDB/Dexie for durable offline storage.
- Planned API modules: auth, users, questions, sessions, tests, games, tools, analytics, community, admin.
- Planned server-authoritative validation for competitive scores and XP. Never trust client-supplied scores.

## Security plan
- Zod request validation, HTTP-only JWT cookies, CSRF controls, bcrypt, rate limits, RBAC and audit logs before exposing write APIs.
- No payments, paywalls or advertising modules.

## Test plan
- Pure engine: deterministic generation, arithmetic correctness, uniqueness, bounds and edge cases.
- UI: keyboard, pause/resume, mobile, timer expiry, session persistence and diagnostics.
- API: validation, authentication, permission and rate-limit integration.
- E2E: guest journey, accounts, tests, offline, responsive and accessibility.
