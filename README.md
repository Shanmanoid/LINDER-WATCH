# LINDER — Watch Configurator

Bauhaus-inspired watch configurator. Portfolio project.

**Live:** https://linder-watches.vercel.app (after deploy)

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Zustand (state)
- TypeScript strict

## Features

- 8 configurable watch options (case, dial, indexes, hands, complication, strap, size, engraving)
- Real-time SVG rendering, 2700+ combinations
- Custom engraving with 4 font choices, front/back flip view
- URL state persistence, localStorage
- Editorial loading/error/404 screens
- WCAG 2.1 AA compliant, 100/100 Lighthouse A11y

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Set in Vercel dashboard (Settings → Environment Variables):

- `NEXT_PUBLIC_SITE_URL` — production URL, used for og:image absolute paths, sitemap, robots.txt
