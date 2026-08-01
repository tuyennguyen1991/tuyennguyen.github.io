# Spec: Personal Technology Website

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
AI & Automation Initiatives, Technical Blog/Articles, Contact &
Professional Links.

## Tech Stack

- React 18 + TypeScript (strict mode)
- Vite (build tool / dev server)
- Tailwind CSS
- React Router — NOT used; single-page anchor navigation (see Assumption 2)
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
  components/       → Reusable UI components (Nav, Hero, Card, etc.)
  sections/         → One component per core section (Hero, About, Leadership,
                      Skills, Projects, AIInitiatives, Blog, Contact)
  content/          → Structured content data (TS modules), edited to update
                      site copy without touching layout code:
                      profile.ts, career.ts, skills.ts, certifications.ts,
                      projects.ts, articles.ts
  hooks/            → Shared React hooks (e.g., useScrollSpy for nav)
  lib/              → Utilities (formatting, constants)
  assets/           → Images, icons, resume.pdf reference
  App.tsx           → Composes sections in order
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

**Conventions:**
- Components: PascalCase, one component per file, named exports (not default).
- Content types/interfaces: PascalCase, colocated with their data array in
  `src/content/*.ts`.
- Tailwind utility classes only — no custom CSS files unless a utility can't
  express it (then use `@layer` in `index.css`).
- No inline styles, no CSS-in-JS libraries.
- Props interfaces named `<Component>Props`.

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

## Boundaries

- **Always do:**
  - Run `npm run lint` and `npm test` before considering a change complete.
  - Keep section content editable via `src/content/*.ts` — no hardcoded
    copy inside components.
  - Use semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<section>`,
    `<footer>`) and add `alt` text to all images.
  - Open external profile links in a new tab with `rel="noopener noreferrer"`.
- **Ask first:**
  - Adding new npm dependencies beyond the agreed stack (React, TS, Tailwind,
    Vite, Vitest/RTL, ESLint/Prettier).
  - Changing the GitHub Actions deploy workflow or Pages configuration.
  - Switching from single-page anchor nav to multi-route (React Router).
  - Any change to the resume file itself (content, not just its location).
- **Never do:**
  - Commit secrets, tokens, or credentials.
  - Remove or weaken failing tests to make CI pass without approval.
  - Introduce a backend/server component (site must stay fully static).
  - Break the existing `index.html` redirect / `home.html` /
    `world-clock.html` without explicit instruction (unless this new site
    replaces them, to be confirmed).

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

## Decisions (resolved)

1. Assumptions 1–8 confirmed: SPA with anchor nav, Vite, static PDF resume,
   external blog links, Vitest + RTL, npm.
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

## Open Questions

None outstanding. Ready to proceed to Plan phase.
