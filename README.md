# Digital Garden & Engineering Portfolio

A "Show Your Work" style personal website tailored for a Backend/Cloud Engineer.
This project moves beyond the traditional static portfolio by implementing Austin Kleon's **"Stock and Flow"** philosophy—combining a live engineering log with curated architectural case studies.

Built with performance and maintainability in mind, using the latest 2025 web standards.

![Project Preview](public/project-preview.png)

## 🧠 Design Philosophy: Stock & Flow

This site is architected around two distinct types of content:

1.  **The Flow (System Log):** A chronological stream of daily learnings, debugging notes, and raw ideas. It serves as a "Server Log" of my engineering life.
    - _Visual Style:_ Terminal/Console aesthetic, Monospaced fonts.
    - _Location:_ Homepage Feed & `/log`
2.  **The Stock (Selected Artifacts):** Durable, polished content. These are deep dives into system design, architecture decisions, and complex problem-solving.
    - _Visual Style:_ Blueprint/Documentation aesthetic, Gallery layout.
    - _Location:_ `/work`

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first configuration, no `tailwind.config.js`)
- **Content:** Markdown-based CMS (Local Files)
  - `remark` & `rehype` for HTML processing
  - `gray-matter` for metadata parsing
  - Syntax Highlighting for code blocks
- **Typography:** `Geist Sans` (Narrative) & `Geist Mono` (Data/Logs)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** Vercel

## ✨ Key Features

- **Dual-Stream Architecture:** File-system based routing that separates ephemeral "Logs" from permanent "Works".
- **Zero-Config Tailwind v4:** Leveraging the new CSS-first configuration approach.
- **Semantic HTML:** Fully accessible `<footer>`, `<article>`, and `<section>` tags.
- **Performance First:** 100/100 Lighthouse score, static generation for content pages.
- **Developer UX:** Write content in Markdown, commit to Git, auto-deploy.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone [https://github.com/jl681/jl-portfolio.git](https://github.com/jl681/jl-portfolio.git)
   cd jl-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

## 📂 Project Structure

```bash
├── app/
│   ├── log/              # [Flow] Dynamic pages for daily logs
│   ├── work/             # [Stock] Dynamic pages for case studies
│   └── page.tsx          # Homepage (Combines Stream & Featured Work)
├── components/           # UI Components (NowStream, FeaturedWork, PortfolioCard)
articles
├── lib/
│   └── posts.ts       # Data fetching & processing logic
└── public/               # Static assets

```

## 🚢 Deployment

This site is optimized for **Vercel**.
Simply push to `main`, and Vercel will detect the Next.js framework and build the static pages automatically.
