# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SQL Mastery** is a bilingual (English/Arabic) interactive SQL learning platform that runs entirely in the browser via WebAssembly. No backend. Deployed as a single self-contained HTML file to GitHub Pages at https://ta3lam.github.io/SQL.

## Commands

```bash
npm run dev       # Dev server at http://localhost:5173
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
- **Company module**: 42 lessons across 4 parts (`lessons_part1–4.ts`) + playground with Company DB schema
- **DVD module**: 8 lessons (`lessons_dvd.ts`) using the 7.4 MB DVD Rental DB (PostgreSQL Sakila dataset)

**DVD lazy-loading**: The DVD SQL (`dvdRental.ts`) is only imported and initialized when the user first activates the DVD module — never on startup. This keeps the initial bundle at ~2.3 MB instead of ~10 MB.

### Key Patterns

**`tRef` pattern** (`useSQL.ts`): Stores language in a ref to read inside the SQL init callback without adding it to the dependency array, preventing expensive WASM re-initialization on language change.

**`\0` delimiter for sample queries**: Sample queries are injected with a null character appended so clicking the same query twice still triggers a state update.

**`NavArrow` component** defined outside `App` to avoid re-creation on every render (prevents remount).

**`SqlValue` type** (`string | number | null | Uint8Array`) — used for SQL result cells instead of `any` for type safety.

**Path alias**: `@/*` maps to `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

### Lesson Data Structure

Each lesson in `src/data/lessons_part*.ts` follows the `Lesson` type from `src/types/index.ts`:
- `id`, `title` (EN + AR), `difficulty`, `content` (markdown, EN + AR)
- `exercises[]`: each with `question`, `hint`, `solution`, `validationQuery` (optional override for checking answers)

### Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys on push to `main`: runs `npm ci && npm run build`, then deploys `dist/index.html` to GitHub Pages.
