# 🗄️ SQL Mastery — Interactive Learning Platform

> Learn SQL from zero to expert — interactive lessons, exercises, and a full in-browser training database.

[![Deploy SQL Mastery to GitHub Pages](https://github.com/ta3lam/SQL/actions/workflows/deploy.yml/badge.svg)](https://github.com/ta3lam/SQL/actions)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 Overview

**SQL Mastery** is a fully browser-based, interactive SQL learning platform. It requires no backend, no database server, and no installation — everything runs locally in the browser thanks to [sql.js](https://sql.js.org), a WebAssembly port of SQLite.

Users progress through structured lessons, write real SQL queries in an embedded code editor, and instantly see results against a preloaded training database — all without leaving the page.

---

## ✨ Features

- 📚 **Structured curriculum** — Lessons organized from beginner to advanced SQL concepts
- ⌨️ **In-browser SQL editor** — Powered by CodeMirror with full SQL syntax highlighting and autocompletion
- ⚡ **Live query execution** — Runs real SQLite queries in the browser via WebAssembly (no server needed)
- 🗃️ **Preloaded training database** — Practice with realistic data right out of the box
- 📝 **Markdown-rendered lessons** — Rich lesson content with code blocks and formatted explanations
- 📦 **Single-file build** — The entire app bundles into one self-contained HTML file for easy distribution
- 🚀 **Auto-deployed** — Continuously deployed to GitHub Pages on every push to `main`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| SQL Engine | sql.js (SQLite via WebAssembly) |
| Code Editor | CodeMirror 6 + `@codemirror/lang-sql` |
| Markdown | react-markdown + remark-gfm |
| Deployment | GitHub Actions → GitHub Pages |
| Bundling | vite-plugin-singlefile (single HTML output) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
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

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The output will be a single self-contained `index.html` file in the `dist/` directory, which can be hosted on any static file server.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
SQL/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions CI/CD pipeline
├── src/                      # Application source code
│   └── main.tsx              # React entry point
├── index.html                # HTML shell
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config           # Tailwind CSS configuration
└── package.json              # Dependencies and scripts
```

---

## 🔄 CI/CD & Deployment

The project uses **GitHub Actions** to automatically build and deploy to **GitHub Pages** on every push to the `main` branch.

The workflow (`deploy.yml`) does the following:

1. Checks out the code
2. Sets up Node.js 20
3. Installs dependencies with `npm ci`
4. Builds the project with `npm run build`
5. Deploys the `dist/` folder to GitHub Pages

**Live Demo:** [https://ta3lam.github.io/SQL](https://ta3lam.github.io/SQL)

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by <a href="https://github.com/ta3lam">Ahmed Abdelsattar Radwan</a></p>
