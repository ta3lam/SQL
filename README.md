# 🗄️ SQL Mastery — Interactive Learning Platform

> تعلّم SQL من الصفر إلى الاحتراف — دروس تفاعلية، تمارين عملية، وقاعدتا بيانات حقيقيتان داخل المتصفح مباشرة.
>
> Learn SQL from zero to expert — interactive lessons, hands-on exercises, and two real databases running entirely in your browser.

[![Deploy to GitHub Pages](https://github.com/ta3lam/SQL/actions/workflows/deploy.yml/badge.svg)](https://github.com/ta3lam/SQL/actions)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)
![sql.js](https://img.shields.io/badge/sql.js-SQLite%20WASM-003B57?logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

**🌐 Live Demo → [https://ta3lam.github.io/SQL](https://ta3lam.github.io/SQL)**

---

## 📸 Preview

| Lessons (English) | Playground — DVD Rental |
|---|---|
| Structured curriculum with live SQL exercises | Full PostgreSQL dataset running in-browser |

---

## ✨ Features

### 🎓 Learning
- **42 structured lessons** — from `SELECT` basics to Window Functions, CTEs, and query optimization
- **10 levels of difficulty** — Introduction → Subqueries → Advanced topics
- **Progress tracking** — per-lesson completion saved to `localStorage`
- **Rich lesson content** — Markdown-rendered with syntax-highlighted code blocks and real examples

### 💻 SQL Playground
- **Two real databases** to explore and query:
  - 🏢 **Company Database** — employees, departments, orders, products, customers
  - 🎬 **DVD Rental** — real PostgreSQL Sakila dataset, **44,820 rows** across 15 tables
    - `inventory` 4,581 rows · `rental` 16,044 rows · `payment` 14,596 rows · `film` 1,000 rows · and more
- **Interactive schema viewer** — expandable table explorer with column types and FK relationships
- **Sample queries** — 6 ready-to-run queries per database (click to load & auto-execute)
- **SQL editor** — CodeMirror 6 with syntax highlighting, autocompletion, and `Ctrl+Enter` shortcut

### 🌍 Bilingual — Arabic & English
- Full **Arabic (RTL)** and **English (LTR)** support — switch at any time
- All 42 lesson titles, UI labels, and table descriptions translated
- Proper RTL layout: sidebar, schema panel, query buttons, lesson navigation

### ⚡ Technical
- **Zero backend** — everything runs in the browser via [sql.js](https://sql.js.org) (SQLite over WebAssembly)
- **Collapsible sidebar** — toggle with the ☰ button to maximize editor space
- **Single-file build** — the entire app bundles into one self-contained `index.html`
- **Auto-deployed** — GitHub Actions → GitHub Pages on every push to `main`

---

## 🗄️ DVD Rental Database

The playground includes the full **PostgreSQL Sakila** sample database, converted to SQLite:

| Table | Rows | Description |
|---|---|---|
| `film` | 1,000 | Films with ratings, rental rates & descriptions |
| `actor` | 200 | Actors |
| `film_actor` | 5,462 | Actor ↔ Film mapping |
| `film_category` | 1,000 | Film ↔ Genre mapping |
| `category` | 16 | Film genres |
| `language` | 6 | Spoken languages |
| `customer` | 599 | Registered customers |
| `inventory` | 4,581 | Physical film copies |
| `rental` | 16,044 | Rental transactions |
| `payment` | 14,596 | Payments |
| `address` | 603 | Addresses |
| `city` | 600 | Cities |
| `country` | 109 | Countries |
| `store` | 2 | Stores |
| `staff` | 2 | Staff members |
| **Total** | **44,820** | |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| SQL Engine | sql.js 1.14 (SQLite via WebAssembly) |
| Code Editor | CodeMirror 6 + `@codemirror/lang-sql` |
| Markdown | react-markdown + remark-gfm |
| Deployment | GitHub Actions → GitHub Pages |
| Bundling | vite-plugin-singlefile (single HTML output) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ta3lam/SQL.git
cd SQL

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

Output: a single self-contained `dist/index.html` — host it anywhere (GitHub Pages, Netlify, S3, etc.).

---

## 📁 Project Structure

```
SQL/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx             # Lesson navigation panel
│   │   ├── LessonContent.tsx       # Markdown lesson renderer
│   │   ├── ExercisePanel.tsx       # SQL exercise + validation
│   │   ├── SQLEditor.tsx           # CodeMirror editor + results table
│   │   ├── Playground.tsx          # Free-play SQL sandbox
│   │   ├── DatabaseSchema.tsx      # Company DB schema viewer
│   │   └── DVDRentalSchema.tsx     # DVD Rental schema viewer
│   ├── contexts/
│   │   └── LanguageContext.tsx     # Arabic / English context
│   ├── data/
│   │   ├── database.ts             # Company training database (SQL)
│   │   ├── dvdRental.sql           # Full DVD Rental dataset (44,820 rows)
│   │   ├── dvdRental.ts            # Re-exports dvdRental.sql via ?raw
│   │   └── lessons_part*.ts        # Lesson content (42 lessons, 4 files)
│   ├── hooks/
│   │   ├── useSQL.ts               # sql.js hook for lesson exercises
│   │   └── usePlaygroundSQL.ts     # sql.js hook for Playground databases
│   ├── i18n/
│   │   └── translations.ts         # EN + AR translations
│   ├── App.tsx                     # Root layout + routing
│   └── main.tsx                    # React entry point
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🔄 CI/CD & Deployment

Every push to `main` triggers the GitHub Actions workflow:

1. Checkout code
2. Setup Node.js 20
3. `npm ci`
4. `npm run build` → single `index.html`
5. Deploy to GitHub Pages

**Live:** [https://ta3lam.github.io/SQL](https://ta3lam.github.io/SQL)

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">Made with ❤️ by <a href="https://github.com/ta3lam">Ahmed Abdelsattar Radwan</a></p>
