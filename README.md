# CounterPoint project page

A React + TypeScript + Vite research site, structured after `ref`: Home, Results, Findings, Paper and Supplement. Content follows `../CounterPoint-paper/main.tex`, the main sections and `sec/X_suppl.tex`. Figures are rendered directly from that manuscript, and the downloadable PDF is `CounterPoint_v2.pdf` (43 pages, supplementary sections A–G begin on page 12).

## Develop

Node 22 or newer:

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Structure

- `src/pages/`: Home, Results, Findings, Paper and Supplement.
- `src/components/`: section navigation, a Radix-based research gallery, figure dialogs and shared presentation components.
- `src/site.ts`: paper metadata, citation and resource links.
- `src/supplement.json`: supplementary recall/MRR table, sourced from `tab/extra.tex`.
- `src/results.json`: all 16 rows of the manuscript's main table. Regenerate with `python scripts/extract-results.py` when the adjacent paper is available.
- `public/figures/`: manuscript figures rendered from PDF.
- `public/CounterPoint.pdf`: full manuscript and supplement.

The main-text and supplementary ACC descriptions differ: the site uses the explicit task scope in Supplement D (the AV→H / HV→A average), and calls out the three-task values on the Supplement page.

The homepage displays the original manuscript figures in a keyboard-accessible tabbed gallery. Figures open in an accessible zoom dialog. Main-table gains are computed from the displayed scores. Unreleased resources are explicitly labeled.

## Deploy

GitHub repository Settings → Pages → Source: **GitHub Actions**. Pushing to `main` runs `.github/workflows/deploy.yml`, builds `dist/`, and deploys it. Hash routing and relative asset paths support both repository Pages URLs and custom domains without server rewrite rules. For another static host, upload `dist/`.

## UI stack

- Radix Themes: navigation menu, tabs, dialogs, segmented controls, select menus, cards and buttons (MIT).
- Motion: short user-driven figure transitions and result-bar updates; reduced-motion preferences are respected (MIT).
- Lucide: interface icons (ISC).
- Geist Sans and Geist Mono: self-hosted variable fonts through Fontsource (OFL-1.1); no external font request is needed.

The Introduction question is kept verbatim in `src/site.ts` and displayed prominently on the homepage. Main-table values and scientific assumptions are unchanged.
