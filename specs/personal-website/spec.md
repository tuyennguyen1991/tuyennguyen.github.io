# Spec: Personal Technology Website

**Version:** v2.0 (supersedes v1.0 — moves the Blog list off the homepage
onto its own route; also documents the React Router adoption that already
happened in the codebase but was never reflected here, see Changelog)
**Status:** Approved for implementation (v2.0) — Assumptions below are
low-risk defaults; proceeding directly per user goal.

## Changelog

- **v1.0 (implemented, as originally specced):** single-page anchor-nav
  SPA — every core section, including "Technical Blog/Articles", rendered
  inline on `/` via scroll-spy anchors (`#blog`, etc.); Tech Stack said
  "React Router — NOT used."
- **v1.1 (implemented, undocumented drift — corrected retroactively here):**
  React Router was actually adopted (commit "restructure app with routing
  and new article detail page") to support `/blog/:articleId` (article
  detail pages, see `ArticleDetailPage.tsx`) and later `/org-chart` (see
  `specs/Org_Chart/spec.md`). The homepage (`/`) still renders all other
  sections — including the Blog **list** — inline via anchors; only
  individual article pages and the org chart got their own routes. This
  spec's Tech Stack section is corrected below to stop claiming Router
  isn't used.
- **v2.0 (this document):** the Blog **list** itself moves off the
  homepage onto its own independent route `/blog`, mirroring how
  `/org-chart` already works — full page, own header/footer, reached via
  a nav `Link` instead of a scroll-spy anchor. Goal: homepage length no
  longer grows as blog articles are added over time.

## Assumptions

Low-risk, mechanical defaults — proceeding with them per the direct goal
already given; flag here for visibility, not blocking implementation:

1. **New page mirrors `OrgChartPage.tsx`'s shell.** `BlogPage.tsx` gets the
   same header pattern (site name linking to `/`, "← Back to Home" link)
   and `<Footer />`, reusing the existing `Blog`-list markup/content logic
   (title/date/domain/summary, link to `/blog/:articleId`) rather than
   inventing new visual design.
2. **`navItems` (homepage scroll-spy anchors) drops the `blog` entry.**
   Since the Blog list no longer lives on `/`, it's no longer part of
   `useScrollSpy`'s anchor set. The remaining 7 anchor items keep their
   existing order (Home, About, Leadership, Skills, Projects,
   AI & Automation, Contact, Request a Demo).
3. **`Nav.tsx` gets a "Blog" route `Link` positioned like the existing "Org
   Chart" `Link`** — both render as plain `<Link to="...">` list items
   (not scroll-spy anchors) after the anchor-based items, in the order
   Blog, then Org Chart (Blog kept first since it existed in the nav
   before Org Chart did).
4. **`ArticleDetailPage.tsx`'s two "← Back to Blog" links change from
   `/#blog` to `/blog`** — both the success-path header link and the
   not-found-state link, since the anchor target no longer exists.
5. **`/blog` is a new static route, added alongside (not replacing)
   `/blog/:articleId`** in `AppRoutes.tsx` — React Router v6 matches the
   literal `/blog` path independently of the `:articleId` param route, so
   no route-ordering conflict.
6. **No change to `src/content/articles.ts`, `businessDomains.ts`, or the
   underlying list-rendering JSX** (title/date/domain badge/summary/link)
   — only its container changes from a `<section id="blog">` embedded in
   `Home.tsx` to a full page component, matching how `OrgChartPage.tsx`
   wraps its content without altering `orgChart.ts`.
7. **The existing `Blog` section component is retired, not duplicated.**
   `src/sections/Blog.tsx` (and its test) are removed/superseded by
   `src/pages/BlogPage.tsx` — keeping one source of the list markup avoids
   drift between a "homepage version" and a "route version" that both
   claim to render the same list.

## Objective

Build and deploy a modern, content-focused personal website on GitHub Pages
for a Senior Systems Design Team Lead, showcasing technical leadership,
system design expertise, and engineering achievements to recruiters, peers,
and collaborators.

**User story:** As a Senior Systems Design Team Lead, I want a modern,
professional, content-focused personal website hosted on GitHub Pages so
that I can showcase my technical expertise, leadership experience,
architecture projects, and professional achievements to recruiters, peers,
and potential collaborators.

**Acceptance criteria:**
- A visitor understands who I am and what I do from the homepage.
- The site presents professional background, leadership experience, and
  technical skills.
- Visitors can review selected system architecture and engineering
  projects, each showing business impact, technical complexity, and
  leadership contribution.
- The site links to GitHub, LinkedIn, resume, and other professional
  profiles.
- The site is responsive and accessible on desktop, tablet, and mobile.
- The site loads quickly and follows modern web standards.
- Content updates happen through a Git push (no manual deploy steps).
- Deployment is automatic via GitHub Actions → GitHub Pages.

**Core sections:** Hero/Introduction, About Me, Leadership & Career
Journey, Technical Skills & Certifications, System Architecture Projects,
AI & Automation Initiatives, Contact & Professional Links (all on the
homepage, anchor nav). **Technical Blog/Articles** moved to its own
`/blog` route in v2.0 — see Blog Routing Requirements below.

**Objective addition (v2.0):** decouple the homepage's length/scroll depth
from the number of blog articles published. Today, every new article added
under `src/content/articles/*.md` grows the homepage's inline Blog list;
after this change, the homepage stays a fixed length and the full,
independently-growing blog list lives at `/blog`, exactly as `/org-chart`
already demonstrates for the org chart content.

## Blog Routing Requirements (v2.0)

1. **`/blog` renders the full article list as its own page** — same
   information per article as today (title, date, domain badge, summary,
   link to `/blog/:articleId`), inside a `BlogPage` component with its own
   header (site name + back-to-home link) and `<Footer />`, structurally
   parallel to `OrgChartPage.tsx`.
2. **The homepage (`/`) no longer renders the Blog list.** `Home.tsx` drops
   `<Blog />`; the `#blog` anchor and its scroll-spy nav entry are removed.
3. **The primary nav's "Blog" entry becomes a route link to `/blog`**,
   using the same `<Link>` pattern already used for "Org Chart" — not a
   `#blog` scroll anchor.
4. **Every existing link that pointed at `/#blog` now points at `/blog`**
   — specifically `ArticleDetailPage.tsx`'s two "← Back to Blog" links
   (success path and not-found path).
5. **Individual article pages (`/blog/:articleId`) are unchanged** — same
   route, same component, same content rendering; only the list view moved.
6. **Adding a new article (`src/content/articles/*.md`) never changes the
   homepage's length or scroll behavior** — it only grows the `/blog` page.

## Tech Stack

- React 18 + TypeScript (strict mode)
- Vite (build tool / dev server)
- Tailwind CSS
- React Router — **used** for `/blog/:articleId`, `/org-chart`, and (v2.0)
  `/blog`; the homepage (`/`) still uses single-page anchor nav for its
  remaining 7 sections (corrects v1.0's stale claim that Router isn't
  used — see Changelog v1.1).
- GitHub Pages (static hosting)
- GitHub Actions (build + deploy on push to `main`)
- Vitest + React Testing Library (component tests)
- ESLint + Prettier

## Commands

```
Install:  npm install
Dev:      npm run dev
Build:    npm run build
Preview:  npm run preview
Test:     npm test -- --coverage
Lint:     npm run lint --fix
Format:   npm run format
Deploy:   automatic via .github/workflows/deploy.yml on push to main
```

## Project Structure

```
src/
  components/       → Reusable UI components (Nav, Footer, ProjectCard, etc.)
  pages/            → Routed pages: Home, ArticleDetailPage, OrgChartPage,
                      BlogPage (NEW v2.0), NotFoundPage
  sections/         → One component per homepage anchor section (Hero, About,
                      Leadership, Skills, Projects, AIInitiatives, Contact,
                      RequestDemo) — Blog.tsx retired in v2.0 (Assumption 7)
  content/          → Structured content data (TS modules), edited to update
                      site copy without touching layout code:
                      profile.ts, career.ts, skills.ts, certifications.ts,
                      projects.ts, articles.ts, businessDomains.ts,
                      navigation.ts, orgChart.ts, agentOrgChart.ts
  hooks/            → Shared React hooks (e.g., useScrollSpy for nav)
  lib/              → Utilities (formatting, constants, markdown parsing)
  assets/           → Images, icons, resume.pdf reference
  App.tsx           → Mounts <BrowserRouter> + <AppRoutes>
  AppRoutes.tsx      → Route table: /, /blog (NEW v2.0), /blog/:articleId,
                      /org-chart, *
  main.tsx          → Entry point
public/
  resume.pdf        → Downloadable resume
  favicon, og-image → SEO/social assets
tests/
  (colocated *.test.tsx next to components, or tests/ mirroring src/)
.github/workflows/
  deploy.yml        → CI: install, lint, test, build, deploy to gh-pages
specs/
  personal-website/spec.md → this document
  Org_Chart/spec.md         → reference pattern for BlogPage's page shell
```

## Code Style

Example component + content-data pattern:

```tsx
// src/content/projects.ts
export interface Project {
  id: string;
  title: string;
  category: "architecture" | "ai-automation";
  summary: string;
  businessImpact: string;
  technicalComplexity: string;
  stack: string[];
  leadershipNote: string;
  links?: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: "realtime-order-platform",
    title: "Real-Time Order Processing Platform",
    category: "architecture",
    summary: "Redesigned a monolithic order system into an event-driven microservices architecture.",
    businessImpact: "Reduced order processing latency by 60% and cut infra cost by 30%.",
    technicalComplexity: "Kafka-based event sourcing, CQRS, multi-region failover.",
    stack: ["Kafka", "Kubernetes", "Go", "PostgreSQL"],
    leadershipNote: "Led a team of 8 engineers across 3 time zones through migration.",
    links: [{ label: "Case Study", url: "https://example.com/case-study" }],
  },
];
```

```tsx
// src/sections/Projects.tsx
import { projects } from "../content/projects";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-semibold text-slate-900">System Architecture Projects</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {projects
          .filter((p) => p.category === "architecture")
          .map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </div>
    </section>
  );
}
```

**(v2.0) `BlogPage.tsx` follows `OrgChartPage.tsx`'s page-shell pattern**
(reusing the existing article-list JSX from the retired `Blog.tsx`):

```tsx
// src/pages/BlogPage.tsx
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { profile } from '../content/profile'
import { articles } from '../content/articles'
import { businessDomains } from '../content/businessDomains'

export function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="font-semibold text-slate-900">{profile.name}</Link>
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600">← Back to Home</Link>
        </div>
      </header>
      <main className="flex-1">
        {/* existing article list markup, unchanged from Blog.tsx */}
      </main>
      <Footer />
    </div>
  )
}
```

**Conventions:**
- Components: PascalCase, one component per file, named exports (not default).
- Content types/interfaces: PascalCase, colocated with their data array in
  `src/content/*.ts`.
- Tailwind utility classes only — no custom CSS files unless a utility can't
  express it (then use `@layer` in `index.css`).
- No inline styles, no CSS-in-JS libraries.
- Props interfaces named `<Component>Props`.
- **(v2.0)** Routed pages live in `src/pages/`, homepage-only anchor
  sections live in `src/sections/` — a component moves from `sections/` to
  `pages/` exactly when it stops being a homepage anchor and becomes its
  own route (this is what happens to Blog in v2.0).

## Testing Strategy

- **Framework:** Vitest + React Testing Library + `@testing-library/jest-dom`.
- **Location:** colocated `ComponentName.test.tsx` next to each component/section.
- **Levels:**
  - Unit: content-data shape validation (e.g., every `Project` has required
    fields non-empty).
  - Component: each section renders its expected headings/links; nav anchor
    links point to existing section ids; external links have
    `target="_blank" rel="noopener noreferrer"`.
  - Build-level smoke check: `npm run build` succeeds and `dist/index.html`
    references the correct base path.
- **Coverage expectation:** no hard threshold enforced in CI initially;
  aim for meaningful coverage of `content/` validation and `sections/`
  rendering, not 100%.
- CI (GitHub Actions) runs lint + test + build on every push/PR before deploy.
- **(v2.0) Additional levels:**
  - `BlogPage.test.tsx` (new) asserts every article's title/date/summary
    renders, each title links to `/blog/:articleId`, and a "← Back to
    Home" link exists — mirrors the retired `Blog.test.tsx` plus the
    back-link assertion pattern from `OrgChartPage.test.tsx`.
  - `AppRoutes.test.tsx` updated: the `/` assertion no longer expects
    `document.getElementById('blog')`; a new case renders `/blog` and
    asserts an article title appears.
  - `Nav.test.tsx` updated: "Blog" is asserted as a `Link` with
    `href="/blog"`, not an anchor `href="#blog"`.
  - `ArticleDetailPage.test.tsx` updated (if it asserts the back-link
    href) to expect `/blog` instead of `/#blog`.

## Boundaries

- **Always do:**
  - Run `npm run lint` and `npm test` before considering a change complete.
  - Keep section content editable via `src/content/*.ts` — no hardcoded
    copy inside components.
  - Use semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<section>`,
    `<footer>`) and add `alt` text to all images.
  - Open external profile links in a new tab with `rel="noopener noreferrer"`.
  - **(v2.0)** Keep exactly one source of the article-list markup (in
    `BlogPage.tsx` after the move) — do not leave a second copy in
    `Home.tsx` or a lingering unused `Blog.tsx`.
- **Ask first:**
  - Adding new npm dependencies beyond the agreed stack (React, TS, Tailwind,
    Vite, Vitest/RTL, ESLint/Prettier).
  - Changing the GitHub Actions deploy workflow or Pages configuration.
  - Switching the *remaining* homepage sections from anchor nav to routed
    pages (v2.0 only moves Blog; the other 7 sections stay anchor-based
    unless separately requested).
  - Any change to the resume file itself (content, not just its location).
- **Never do:**
  - Commit secrets, tokens, or credentials.
  - Remove or weaken failing tests to make CI pass without approval.
  - Introduce a backend/server component (site must stay fully static).
  - Break the existing `index.html` redirect / `home.html` /
    `world-clock.html` without explicit instruction (unless this new site
    replaces them, to be confirmed).
  - **(v2.0)** Leave any in-repo link pointing at `/#blog` after the move
    (grep for it before considering the change complete).

## Success Criteria

- Visitor can identify the owner's name, role, and expertise within 10
  seconds of landing on the homepage (Hero renders above the fold with
  name/title/tagline).
- Resume is downloadable/openable in ≤2 clicks from any page.
- Each project card in "System Architecture Projects" and "AI & Automation
  Initiatives" states business impact, technical complexity, and
  leadership contribution.
- Site renders with no horizontal scroll and no overlapping/clipped content
  at 375px, 768px, and 1440px viewport widths.
- Lighthouse (mobile, production build): Performance ≥90, Accessibility
  ≥90, Best Practices ≥90, SEO ≥90.
- `npm run build && npm test && npm run lint` all pass in CI on every push
  to `main`, and a successful build auto-deploys to GitHub Pages; a failing
  build does not overwrite the live site.
- A new project/article/skill can be added by editing only a file under
  `src/content/`, with no changes to component/layout code required.

**(v2.0 additions):**
- [ ] `/blog` renders the full article list (title/date/domain/summary,
      link to `/blog/:articleId` per article) with no route params.
- [ ] The homepage (`/`) no longer renders any article title, summary, or
      the "Technical Blog / Articles" heading.
- [ ] The primary nav's "Blog" item navigates to `/blog` (a real route),
      not a `#blog` hash anchor.
- [ ] No link anywhere in the codebase still points at `/#blog`.
- [ ] Adding a new file under `src/content/articles/*.md` changes only the
      `/blog` page's length, not the homepage's.
- [ ] `npx tsc --noEmit`, `npm run build`, `npx eslint`, and `npm test` all
      pass with no errors after the move.

## Decisions (resolved)

1. Assumptions 1–8 (v1.0) confirmed: SPA with anchor nav, Vite, static PDF
   resume, external blog links, Vitest + RTL, npm.
2. This new site **replaces** the current `index.html`, `home.html`, and
   `world-clock.html`. Those files will be removed once the new site is in
   place (world clock is not carried over as a section/page unless
   requested later).
3. Resume PDF exists and will be uploaded by the owner later; scaffold
   `public/resume.pdf` as a placeholder path and wire the download link to
   it now — swap in the real file when provided.
4. Visual design is created from scratch, "Microsoft-inspired engineering
   leadership" direction: clean, restrained palette (navy/slate neutrals +
   one accent color), clear typographic hierarchy, generous whitespace.
5. Keep the default GitHub Pages path
   `https://tuyennguyen1991.github.io/tuyennguyen.github.io/` — no custom
   domain. Vite `base` must be set to `/tuyennguyen.github.io/`.
6. **(v2.0)** Blog list moves to its own `/blog` route, structurally
   identical in pattern to `/org-chart` (own page shell, own nav `Link`,
   homepage no longer renders it) — confirmed by direct user request; the
   7 Assumptions above are the mechanical defaults for executing that move.

## Open Questions

None outstanding. Ready to proceed to Plan phase.
