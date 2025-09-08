# Data Export Feature

## Purpose
Describe the feature goal and scope.

## Structure
- `components/`
- `hooks/`
- `api/`
- `utils.ts`
- `types.ts`
- `index.ts`
- `tests/`


## Public API
Re-export only what other features/pages should import via `index.ts`.

## Notes
- Keep business logic in `api/`.
- Keep UI-only bits in `components/`.
- Co-locate hook logic in `hooks/`.
