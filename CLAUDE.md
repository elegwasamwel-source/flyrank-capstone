# CLAUDE.md

## Project
FlyRank Capstone — Frontend AI Engineering internship project

## Stack
- Language: JavaScript/TypeScript
- Framework: TBD (React or Vue, to be decided)
- Package manager: npm

## Conventions
- Commits follow Conventional Commits (feat/fix/docs/chore/refactor)
- Code should be clean, readable, and consistently formatted

## Commands
- `npm run dev` — start dev server
- `npm test` — run tests

## Lessons from FE-03 (Vague vs. Precise Prompting)

1. Always specify the exact tech stack and libraries in a prompt (e.g. "use react-hook-form and zod") — 
   without this, the AI chooses arbitrarily, which can mismatch project conventions or introduce unnecessary dependencies.

2. Explicitly request accessibility requirements (e.g. "all inputs need label elements with htmlFor") — 
   accessibility is not included by default unless asked for directly.

3. When requesting tests, specify exact scenarios to cover (e.g. "valid submission, invalid email, empty required field") — 
   vague requests like "add tests" produce inconsistent or incomplete coverage, and generated tests may need debugging 
   even when the underlying feature works correctly.