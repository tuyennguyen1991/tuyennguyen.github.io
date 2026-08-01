# Task Breakdown: Personal Technology Website

Based on: `specs/personal-website/spec.md`, `specs/personal-website/plan.md`

## Overview

Build the site as vertical slices: each core section ships with its content
data, component, and test together — not all content first, then all
components, then all tests. Foundation (scaffold/tooling/layout) comes
first since every slice depends on it; integration (nav, SEO, CI/CD) and
cleanup of the old static pages come last, gated on a verified deploy.

## Architecture Decisions

- Vite + React + TypeScript + Tailwind, single-page anchor navigation (no
  React Router) — per spec.
- Content lives in `src/content/*.ts`, one file per entity, imported by
  its matching section component — keeps content edits code-free.
- Vitest + React Testing Library, colocated `*.test.tsx` per component.
- Deploy via GitHub Actions to `gh-pages` branch; `base: "/tuyennguyen.github.io/"`.
- Old `index.html`, `home.html`, `world-clock.html` are removed only after
  the new site is confirmed live (spec decision: replace).

---

## Phase 1: Foundation

### Task 1: Scaffold Vite + React + TypeScript project

**Description:** Initialize the Vite React-TS app at the repo root without
disturbing `specs/`, configure TypeScript strict mode and the GitHub Pages
base path.

**Acceptance criteria:**
- [ ] `npm run dev` serves a working blank React+TS app.
- [ ] `vite.config.ts` sets `base: "/tuyennguyen.github.io/"`.
- [ ] `tsconfig.json` has `"strict": true`.

**Verification:**
- [ ] Build succeeds: `npm run build`
- [ ] Manual check: `npm run dev` loads in browser with no console errors.

**Dependencies:** None

**Files likely touched:**
- `package.json`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `src/App.tsx`, `index.html`

**Estimated scope:** S

---

### Task 2: Add Tailwind CSS, ESLint, Prettier

**Description:** Install and configure Tailwind with the design token
skeleton (colors, fonts, spacing) plus lint/format tooling.

**Acceptance criteria:**
- [ ] Tailwind utility classes render correctly in `App.tsx`.
- [ ] `tailwind.config.ts` defines a base palette (navy/slate + one accent).
- [ ] `npm run lint` and `npm run format` scripts exist and pass on a clean tree.

**Verification:**
- [ ] `npm run lint` exits 0
- [ ] Manual check: a Tailwind class (e.g., `bg-slate-900`) visibly applies in dev server.

**Dependencies:** Task 1

**Files likely touched:**
- `tailwind.config.ts`, `postcss.config.js`, `src/index.css`, `.eslintrc.*`, `.prettierrc`

**Estimated scope:** S

---

### Task 3: Configure Vitest + React Testing Library

**Description:** Set up the test runner so component tests can be written
alongside each section in Phase 2.

**Acceptance criteria:**
- [ ] `npm test` runs Vitest successfully with zero tests (passes trivially).
- [ ] A sample smoke test for `App.tsx` renders without throwing.

**Verification:**
- [ ] `npm test -- --coverage` exits 0

**Dependencies:** Task 1

**Files likely touched:**
- `vitest.config.ts`, `src/setupTests.ts`, `src/App.test.tsx`

**Estimated scope:** XS

---

### Task 4: Build layout shell — Nav and Footer

**Description:** Create the persistent header `Nav` (anchor links to all 8
sections + Resume CTA) and `Footer` (social/contact links), using the
Tailwind design tokens from Task 2.

**Acceptance criteria:**
- [ ] Nav renders links for all 8 core sections plus a visible Resume button.
- [ ] Footer renders GitHub, LinkedIn, email links with `target="_blank" rel="noopener noreferrer"` (except mailto).
- [ ] Layout is responsive at 375px/768px/1440px (no horizontal scroll).

**Verification:**
- [ ] Test passes: `npm test -- Nav`
- [ ] Test passes: `npm test -- Footer`
- [ ] Manual check: resize browser to 3 breakpoints, confirm no overflow.

**Dependencies:** Tasks 2, 3

**Files likely touched:**
- `src/components/Nav.tsx`, `src/components/Nav.test.tsx`, `src/components/Footer.tsx`, `src/components/Footer.test.tsx`

**Estimated scope:** M

---

### Checkpoint: Foundation
- [ ] `npm run build`, `npm test`, `npm run lint` all pass
- [ ] Dev server shows Nav + Footer shell with no console errors
- [ ] Review with human before proceeding to Phase 2

---

## Phase 2: Core Sections (vertical slices)

Each task = content data file + section component + colocated test,
delivered together.

### Task 5: Hero / Introduction section

**Description:** Build `profile.ts` content (name, title, tagline, resume
link, social links) and the `Hero` component rendering it above the fold.

**Acceptance criteria:**
- [ ] Name, title, and one-line tagline are visible without scrolling on desktop.
- [ ] Primary CTAs present: View Projects, Download Resume, Contact.
- [ ] Resume CTA links to `public/resume.pdf`.

**Verification:**
- [ ] Test passes: `npm test -- Hero`
- [ ] Manual check: 10-second scan confirms name/role/expertise is clear.

**Dependencies:** Checkpoint: Foundation

**Files likely touched:**
- `src/content/profile.ts`, `src/sections/Hero.tsx`, `src/sections/Hero.test.tsx`

**Estimated scope:** S

---

### Task 6: About Me section

**Description:** Build the "About Me" section presenting professional
background and domain expertise summary, sourced from `profile.ts`.

**Acceptance criteria:**
- [ ] Section renders a background summary of at least 2–3 sentences.
- [ ] Section has `id="about"` matching Nav anchor.

**Verification:**
- [ ] Test passes: `npm test -- About`

**Dependencies:** Task 5

**Files likely touched:**
- `src/sections/About.tsx`, `src/sections/About.test.tsx`

**Estimated scope:** XS

---

### Task 7: Leadership & Career Journey section

**Description:** Build `career.ts` content (role, org, dates, scope,
highlights) and a `Leadership` timeline/list component.

**Acceptance criteria:**
- [ ] Each career entry shows role, organization, dates, and leadership scope (team size/org impact).
- [ ] Entries render in reverse-chronological order.

**Verification:**
- [ ] Test passes: `npm test -- Leadership`
- [ ] Test: career-data validation (every entry has non-empty required fields).

**Dependencies:** Checkpoint: Foundation

**Files likely touched:**
- `src/content/career.ts`, `src/sections/Leadership.tsx`, `src/sections/Leadership.test.tsx`

**Estimated scope:** M

---

### Task 8: Technical Skills & Certifications section

**Description:** Build `skills.ts` and `certifications.ts` content and a
`Skills` component grouping skills by category with certifications listed
separately.

**Acceptance criteria:**
- [ ] Skills are grouped by category (e.g., Architecture, Cloud, Languages, Leadership).
- [ ] Certifications show name, issuer, and date.

**Verification:**
- [ ] Test passes: `npm test -- Skills`

**Dependencies:** Checkpoint: Foundation

**Files likely touched:**
- `src/content/skills.ts`, `src/content/certifications.ts`, `src/sections/Skills.tsx`, `src/sections/Skills.test.tsx`

**Estimated scope:** M

---

### Task 9: System Architecture Projects section

**Description:** Build `projects.ts` (category: `architecture`) and a
`Projects` component / reusable `ProjectCard` showing summary, business
impact, technical complexity, stack, and leadership contribution.

**Acceptance criteria:**
- [ ] At least 3 architecture projects render, each with business impact, technical complexity, and leadership contribution text.
- [ ] Optional external links open in a new tab with `rel="noopener noreferrer"`.

**Verification:**
- [ ] Test passes: `npm test -- Projects`
- [ ] Test: projects-data validation (required fields present for every `architecture` entry).

**Dependencies:** Checkpoint: Foundation

**Files likely touched:**
- `src/content/projects.ts`, `src/components/ProjectCard.tsx`, `src/sections/Projects.tsx`, `src/sections/Projects.test.tsx`

**Estimated scope:** M

---

### Task 10: AI & Automation Initiatives section

**Description:** Reuse `ProjectCard` and extend `projects.ts` with
`ai-automation` category entries; build the `AIInitiatives` section
filtering by that category.

**Acceptance criteria:**
- [ ] At least 2 AI/automation projects render using the same card structure as Task 9.
- [ ] Section has its own nav anchor distinct from "Projects".

**Verification:**
- [ ] Test passes: `npm test -- AIInitiatives`

**Dependencies:** Task 9

**Files likely touched:**
- `src/content/projects.ts`, `src/sections/AIInitiatives.tsx`, `src/sections/AIInitiatives.test.tsx`

**Estimated scope:** S

---

### Task 11: Technical Blog / Articles section

**Description:** Build `articles.ts` content and a `Blog` section listing
articles with title, date, summary, and external link (per decision:
articles link out, not authored in-repo).

**Acceptance criteria:**
- [ ] Each article shows title, date, summary, and a working external link.
- [ ] External links open in a new tab with `rel="noopener noreferrer"`.

**Verification:**
- [ ] Test passes: `npm test -- Blog`

**Dependencies:** Checkpoint: Foundation

**Files likely touched:**
- `src/content/articles.ts`, `src/sections/Blog.tsx`, `src/sections/Blog.test.tsx`

**Estimated scope:** S

---

### Task 12: Contact & Professional Links section

**Description:** Build the `Contact` section consolidating GitHub,
LinkedIn, email, and resume links (complementing the Footer, per spec
FR-8).

**Acceptance criteria:**
- [ ] All professional links present and correctly typed (`mailto:` vs `target="_blank"`).
- [ ] Resume is reachable here in addition to Nav (reinforces ≤2-click rule).

**Verification:**
- [ ] Test passes: `npm test -- Contact`
- [ ] Manual check: count clicks from homepage to resume — must be ≤2.

**Dependencies:** Task 5

**Files likely touched:**
- `src/sections/Contact.tsx`, `src/sections/Contact.test.tsx`

**Estimated scope:** XS

---

### Checkpoint: Core Sections
- [ ] All 8 sections render in `App.tsx` in spec order
- [ ] `npm test` passes for every section
- [ ] `npm run build` succeeds
- [ ] Manual scroll-through confirms every section is reachable and readable
- [ ] Review with human before proceeding to Phase 3

---

## Phase 3: Integration

### Task 13: Scroll-spy navigation wiring

**Description:** Implement a `useScrollSpy` hook so the `Nav` highlights
the section currently in view, and clicking a nav link smooth-scrolls to it.

**Acceptance criteria:**
- [ ] Active nav link updates as user scrolls past each section.
- [ ] Clicking a nav link smooth-scrolls to the correct section.

**Verification:**
- [ ] Test passes: `npm test -- useScrollSpy`
- [ ] Manual check: scroll page, watch nav highlight change; click each link.

**Dependencies:** Checkpoint: Core Sections

**Files likely touched:**
- `src/hooks/useScrollSpy.ts`, `src/hooks/useScrollSpy.test.ts`, `src/components/Nav.tsx`

**Estimated scope:** S

---

### Task 14: SEO metadata, favicon, resume wiring

**Description:** Add `<title>`, meta description, Open Graph tags, and
favicon to `index.html`; add a clearly-labeled placeholder
`public/resume.pdf` and confirm all resume links point to it.

**Acceptance criteria:**
- [ ] `index.html` head has title, meta description, OG tags, favicon link.
- [ ] `public/resume.pdf` exists (placeholder) and all resume CTAs link to it correctly.

**Verification:**
- [ ] Build succeeds: `npm run build`
- [ ] Manual check: view page source, confirm meta tags present; click resume links, confirm file opens.

**Dependencies:** Checkpoint: Core Sections

**Files likely touched:**
- `index.html`, `public/resume.pdf`, `public/favicon.ico`, `public/og-image.png`

**Estimated scope:** S

---

### Task 15: GitHub Actions CI/CD workflow

**Description:** Add `.github/workflows/deploy.yml`: lint+test+build on
every push/PR; build+deploy to `gh-pages` branch on push to `main` only.

**Acceptance criteria:**
- [ ] Workflow runs `npm ci`, `npm run lint`, `npm test`, `npm run build` on every push/PR.
- [ ] On push to `main` only, workflow deploys `dist/` to `gh-pages` branch.
- [ ] A failing lint/test/build step blocks the deploy step.

**Verification:**
- [ ] Manual check: open a PR, confirm CI runs lint+test+build without deploying.
- [ ] Manual check: push to `main`, confirm Actions run completes and deploy job succeeds.

**Dependencies:** Task 13, Task 14

**Files likely touched:**
- `.github/workflows/deploy.yml`

**Estimated scope:** S

---

### Checkpoint: Integration
- [ ] CI pipeline green on a test PR
- [ ] Deploy job succeeds on push to `main`
- [ ] Live GitHub Pages URL serves the new site correctly end-to-end
- [ ] Review with human before cleanup — **human must also confirm repo Settings → Pages source is set to `gh-pages` branch**

---

## Phase 4: Cleanup & Launch

### Task 16: Remove legacy static pages

**Description:** Delete `index.html`, `home.html`, `world-clock.html` from
the repo root now that the new Vite app's build output serves the site
(per spec decision: replace, not coexist).

**Acceptance criteria:**
- [ ] Old files removed from git.
- [ ] Live site still resolves correctly after removal (no broken links to old pages from elsewhere).

**Verification:**
- [ ] Manual check: visit live URL after deploy, confirm new site loads with no 404s.

**Dependencies:** Checkpoint: Integration (must be verified live first)

**Files likely touched:**
- `index.html` (old), `home.html`, `world-clock.html` — removed

**Estimated scope:** XS

---

### Task 17: Update README

**Description:** Rewrite `README.md` to describe the new site, local dev
commands, and deployment process.

**Acceptance criteria:**
- [ ] README documents `npm install`, `npm run dev`, `npm run build`, `npm test`, `npm run lint`.
- [ ] README explains the auto-deploy-on-push-to-main behavior.

**Verification:**
- [ ] Manual check: README is accurate and complete.

**Dependencies:** Task 16

**Files likely touched:**
- `README.md`

**Estimated scope:** XS

---

### Checkpoint: Complete
- [ ] All Success Criteria in `spec.md` verified manually
- [ ] `npm run build && npm test && npm run lint` green
- [ ] Live site matches spec's 8 core sections, responsive, resume ≤2 clicks
- [ ] Ready for human final review

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Wrong Vite `base` breaks assets on GitHub Pages | High | Set/verify `base` in Task 1; test with `npm run preview` before deploy |
| GitHub Pages source not set to `gh-pages` branch | High | Explicit human checkpoint after Task 15/before Task 16 |
| Deleting old pages before new site verified live | Medium | Task 16 hard-gated on Checkpoint: Integration |
| Placeholder resume/content mistaken for final | Low | Use obviously-generic placeholder copy; flagged in Task 5/14 |
| Test debt from skipping colocated tests | Medium | Each Phase 2 task includes its test in the same task, not deferred |

## Open Questions
None — all resolved in spec.md.
