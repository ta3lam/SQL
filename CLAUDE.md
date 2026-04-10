# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SQL Mastery** is a bilingual (English/Arabic) interactive SQL learning platform that runs entirely in the browser via WebAssembly. No backend. Deployed as a single self-contained HTML file to GitHub Pages at https://ta3lam.github.io/SQL.

## Commands

```bash
npm run dev       # Dev server at http://localhost:5174
npm run build     # Production build → dist/index.html (single file, all assets inlined)
npm run preview   # Preview production build locally
```

No test suite currently configured.

## Architecture

### Tech Stack
- **React 19 + TypeScript** (strict mode), **Vite 7**, **Tailwind CSS 4**
- **sql.js 1.14** — SQLite compiled to WebAssembly; runs fully in-browser, synchronous API (no async/await)
- **CodeMirror 6** — SQL editor with syntax highlighting
- **vite-plugin-singlefile** — bundles everything (CSS, JS, WASM) into one `dist/index.html`

### State & Data Flow

**`App.tsx`** owns all global state: current lesson, completed lessons array, dark mode, language, active module (Company vs DVD). Everything persists to `localStorage`.

Two SQL hooks manage separate database instances:
- **`useSQL()`** — initializes the Company DB (from `src/data/database.ts`) once on mount. Uses a `tRef` ref pattern so language switches don't trigger re-initialization (WASM init is expensive).
- **`usePlaygroundSQL(customInitSQL)`** — used for the Playground and DVD module. Accepts `null` until SQL is ready (lazy-load guard). Wraps bulk INSERTs in transactions for ~50x faster load.

**`LanguageContext`** provides `lang` (`'en' | 'ar'`), `t` (translations), and `isRTL`. Persists to `localStorage` and sets `document.lang`/`document.dir` for full RTL support.

### Module System

Two independent modules share the same UI shell but use separate SQL instances:
- **Company module**: 60 lessons across 5 parts (`lessons_part1–5.ts`) + playground with Company DB schema
- **DVD module**: 60 lessons (IDs 101–160) split across `lessons_dvd.ts` + `lessons_dvd2–4.ts`, using the 7.4 MB DVD Rental DB (PostgreSQL Sakila dataset). `lessons_dvd.ts` is the entry point that imports and re-exports all parts as `dvdLessons`.

**DVD lazy-loading**: The DVD SQL (`dvdRental.ts`) is only imported and initialized when the user first activates the DVD module — never on startup. This keeps the initial bundle at ~2.3 MB instead of ~10 MB.

### Key Patterns

**`tRef` pattern** (`useSQL.ts`): Stores language in a ref to read inside the SQL init callback without adding it to the dependency array, preventing expensive WASM re-initialization on language change.

**`\0` delimiter for sample queries**: Sample queries are injected with a null character appended so clicking the same query twice still triggers a state update.

**Cursor-aware query execution** (`SQLEditor.tsx`): Clicking Run (or Ctrl+Enter) executes only the statement the cursor is positioned in, not all statements. If text is selected, only the selection runs. Uses a `ReactCodeMirrorRef` to read `view.state.selection.main` at execution time. The `getStatementAtCursor` helper splits on `;` and matches cursor offset to statement end positions.

**`NavArrow` component** defined outside `App` to avoid re-creation on every render (prevents remount).

**`SqlValue` type** (`string | number | null | Uint8Array`) — used for SQL result cells instead of `any` for type safety.

**Path alias**: `@/*` maps to `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

### Lesson Data Structure

Each lesson in `src/data/lessons_part*.ts` follows the `Lesson` type from `src/types/index.ts`:
- `id`, `title`/`titleAr`, `description`/`descriptionAr`, `content`/`contentAr` (markdown), `example` (runnable SQL shown in the "Try it out" editor)
- `exercises[]`: each with `question`/`questionAr`, `hint`/`hintAr`, `expectedQuery`, and `checkFunction: (result, query) => boolean` for validating the learner's answer

All `*Ar` fields are optional — if omitted the English version is shown in both languages. The `checkFunction` receives the raw result rows and the raw query string, so validation can be structural (regex on query) or data-driven (inspect result rows).

### Translations

All UI strings live in `src/i18n/translations.ts` as a `Record<'en'|'ar', Translations>`. The `Translations` interface enforces both languages stay in sync — add new keys to the interface first, then implement in both `en` and `ar` blocks. Arabic plural forms follow a 4-tier pattern (1 / 2 / 3–10 / 11+) already established for `rowsReturned`, `columnsCount`, and `querySuccess`.

### Sidebar Level Groups

`Sidebar.tsx` has two hardcoded `LEVEL_GROUPS` arrays (`LEVEL_GROUPS` for Company, `DVD_LEVEL_GROUPS` for DVD) that map lesson IDs to sidebar sections. When adding new lessons, you must add their IDs to the appropriate group array **and** add the corresponding label to `t.levels` (or `t.dvdLevels`) in both EN and AR in `translations.ts`. The Company module currently has 13 levels (IDs 1–60); DVD has 17 levels (IDs 101–160).

### Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys on push to `main`: runs `npm ci && npm run build`, then deploys `dist/index.html` to GitHub Pages.
