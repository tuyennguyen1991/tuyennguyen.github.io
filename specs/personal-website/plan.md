# Implementation Plan: Personal Technology Website

Based on: `specs/personal-website/spec.md`

## 1. Major Components & Dependencies

```
1. Project scaffold (Vite + React + TS + Tailwind + ESLint/Prettier + Vitest)
   └─ no dependencies, must be first

2. Base layout & design tokens (Tailwind theme, fonts, color palette, Nav/Footer shell)
   └─ depends on (1)

3. Content model (src/content/*.ts: profile, career, skills, certifications, projects, articles)
   └─ depends on (1) — can be built in parallel with (2)

4. Section components (Hero, About, Leadership, Skills, Projects, AIInitiatives, Blog, Contact)
   └─ depends on (2) for layout primitives, (3) for data shape

5. Scroll-spy navigation wiring (active section highlight, smooth-scroll anchors)
   └─ depends on (4)

6. SEO/meta, favicon, resume asset wiring, 404 fallback (not needed since anchor nav, but 404.html for GH Pages direct-hit is still good practice)
   └─ depends on (4)

7. Tests (content validation + component rendering)
   └─ depends on (3) and (4), written alongside each, not after

8. GitHub Actions CI/CD (lint+test+build on PR, build+deploy to gh-pages on main)
   └─ depends on (1) for scripts existing; can be authored early and validated once (4)-(7) exist

9. Cleanup: remove index.html, home.html, world-clock.html; ensure repo root is fully replaced by the Vite app output structure
   └─ depends on (8) working end-to-end (don't remove old site until new one deploys green)
```

## 2. Implementation Order

1. Scaffold Vite React-TS project at repo root (or `/` with `src`, `public`,
   keeping `specs/` untouched). Configure `vite.config.ts` with
   `base: "/tuyennguyen.github.io/"`.
2. Install & configure Tailwind, ESLint, Prettier, Vitest + RTL.
3. Define content model files with real placeholder data reflecting the
   owner's actual profile (name, title, tagline) — mark clearly-fake fields
   for the owner to replace (career details, project specifics).
4. Build layout shell: `Nav` (with anchor links to all 8 sections + Resume
   button), `Footer` (social links), global design tokens in
   `tailwind.config.ts` (palette, font family, spacing).
5. Build each section component in spec order (Hero → About → Leadership →
   Skills → Projects → AI Initiatives → Blog → Contact), writing a
   colocated test immediately after each.
6. Wire scroll-spy hook for nav active-state; verify smooth-scroll behavior.
7. Add SEO metadata (`index.html` head tags, OG tags), favicon, and
   `public/resume.pdf` placeholder + working download link.
8. Add `.github/workflows/deploy.yml`: on push to `main` → checkout, setup
   Node, `npm ci`, `npm run lint`, `npm test`, `npm run build`, deploy
   `dist/` to `gh-pages` branch (via `peaceiris/actions-gh-pages` or
   `actions/deploy-pages`).
9. Configure repo GitHub Pages settings expectation (owner-side: Pages
   source = `gh-pages` branch or Actions — documented in plan, owner
   confirms in GitHub UI since this agent cannot change repo settings).
10. Verify locally: `npm run build && npm run preview`, check responsive
    breakpoints (375/768/1440), run Lighthouse locally if possible.
11. Remove `index.html`, `home.html`, `world-clock.html` from repo root
    once new site builds/deploys successfully, since spec decision #2 says
    replace.
12. Final pass: update `README.md` to describe the new site/build process.

## 3. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Wrong Vite `base` path breaks asset loading on GitHub Pages | Set `base: "/tuyennguyen.github.io/"` explicitly in `vite.config.ts`; verify via `npm run build && npm run preview -- --base`. |
| GitHub Actions deploy overwrites Pages incorrectly (wrong branch/source) | Use a well-tested action (`peaceiris/actions-gh-pages`); document that repo Settings → Pages must point at `gh-pages` branch (owner must set once). |
| Removing old `index.html`/`home.html` before new site is verified live | Only delete old files after confirming the Actions workflow deploys successfully once (step 11 gated on step 8-10 success). |
| Resume file missing at launch | Ship a clearly-labeled placeholder PDF/link now; swap when owner uploads real file — no code change needed, just replace `public/resume.pdf`. |
| Fake placeholder content (career/projects) accidentally looks "final" | Mark placeholder entries with obvious TODO-style copy the owner will recognize as needing real input (not literally "TODO" in UI, but generic/clearly example text). |
| Accessibility/perf regressions | Add axe/RTL accessibility assertions in component tests; run `npm run build` + manual Lighthouse pass before calling done. |

## 4. Parallelizable vs. Sequential

- **Sequential (must be in order):** scaffold → Tailwind/tooling config →
  layout shell → sections → nav wiring → CI workflow → cleanup of old files.
- **Parallelizable once scaffold exists:** content model files (step 3) can
  be written alongside layout shell (step 4); CI workflow YAML (step 8) can
  be drafted early since it doesn't depend on section content, just on
  `npm run build/test/lint` scripts existing.

## 5. Verification Checkpoints

- **After scaffold:** `npm run dev` serves a blank Tailwind-styled page.
- **After each section component:** its test passes (`npm test`) and it
  renders visibly in `npm run dev`.
- **After nav wiring:** manual check — clicking each nav link scrolls to
  the correct section; active link highlights on scroll.
- **After CI workflow added:** push to a feature branch/PR triggers
  lint+test+build (not deploy); push to `main` triggers full deploy.
- **Before cleanup step:** confirm live GitHub Pages URL serves the new
  site correctly, then remove old static files.
- **Final:** all Success Criteria in spec.md §"Success Criteria" checked
  off manually (10-second clarity, resume ≤2 clicks, responsive at 3
  breakpoints, `npm run build && npm test && npm run lint` green).
