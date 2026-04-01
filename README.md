# Ramy Khairy — Portfolio 2.0

Personal portfolio website built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and Motion.

**Live:** [ramykhairy24.github.io](https://ramykhairy24.github.io) *(deploying via Vercel)*

## Tech Stack

- **Next.js 15** — App Router, Turbopack
- **React 19** + **TypeScript 5.8**
- **Tailwind CSS 4** — utility-first styling via PostCSS
- **Motion (Motion One)** — scroll-driven animations & parallax
- **Lucide React** — icons

## Features

- Full responsive design — mobile, tablet, desktop
- Dark / light mode toggle with `localStorage` persistence
- Page intro animation (session-based, plays once)
- Active nav highlighting via `IntersectionObserver`
- Scroll progress indicator
- Contact form (Formspree)
- Open Graph metadata + auto-generated OG image
- `sitemap.xml` + `robots.txt`

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Lint & type check |

