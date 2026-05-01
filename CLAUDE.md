# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev` (serves at http://localhost:4321)
- Build for production: `pnpm build` (generates `dist/` and runs pagefind)
- Preview built site: `pnpm preview`
- Type-check: `pnpm check` (astro check)
- Lint & format: `pnpm lint` and `pnpm format` (Biome)
- Create new post: `pnpm new-post <filename>`
- Run Astro CLI: `pnpm astro <subcommand>` (e.g., `astro add`, `astro check`)

## Project Architecture

Firefly is an Astro-based static blog theme with the following key areas:

- **src/** – Source code
  - **components/** – Reusable UI widgets (controls, features, layout, widgets, etc.)
  - **layouts/** – Base layouts (`Layout.astro`, `MainGridLayout.astro`)
  - **pages/** – Astro pages (about, archive, search, tag, etc.) and API endpoints
  - **content/** – Markdown content collections (posts)
  - **config/** – Centralized configuration modules (siteConfig, navBarConfig, etc.) exported via `index.ts`
  - **styles/** – Global CSS and Tailwind setup
  - **utils/** – Helper functions
  - **plugins/** – Custom remark/rehype plugins (GitHub cards, Mermaid, PlantUML, etc.)
  - **constants/** – Shared constants (icons, i18n keys)
  - **assets/** – Static assets (images, fonts)
  - **i18n/** – Translation files

- **Configuration** – All site‑wide settings live in `src/config/`; edit the relevant `.ts` file (e.g., `siteConfig.ts` for title/description, `navBarConfig.ts` for menu). Import via `import { siteConfig } from '@/config';`.

- **Markdown Extensions** – The theme extends GFM with admonitions, GitHub repo cards, Expressive Code blocks, image grids, directives, and more via remark/rehype plugins defined in `astro.config.mjs`.

- **Styling** – Tailwind CSS (via `@tailwindcss/vite`) with custom typography; see `src/styles/global.css`.

- **Internationalization** – UI strings in `src/i18n/translation.ts`; language set in `siteConfig.ts`.

- **Build Pipeline** – Astro (Vite) → HTML/CSS/JS → optional image optimization → pagefind for full‑text search.

## Notes

- The theme is MIT‑licensed; keep copyright headers when modifying.
- For contributing, follow Conventional Commits and run `pnpm check` + `pnpm format` before PR.
- See `CONTRIBUTING.md` for detailed contribution guidelines.