# tuyennguyen.github.io

Personal website of Tuyen Nguyen — Senior Systems Design Team Lead. Showcases
technical leadership, system architecture work, and engineering achievements.

Live at: https://tuyennguyen1991.github.io/tuyennguyen.github.io/

## Tech Stack

- React 18 + TypeScript (strict mode)
- Vite
- Tailwind CSS
- Vitest + React Testing Library
- ESLint + Prettier
- GitHub Actions → GitHub Pages (`gh-pages` branch)

## Getting Started

```bash
npm install
npm run dev
```

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Type-check and build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the Vitest test suite |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the codebase with Prettier |

## Project Structure

```
src/
  components/   Reusable UI components (Nav, Footer, ProjectCard)
  sections/     One component per homepage section (Hero, About, Leadership, ...)
  content/      Structured content data — edit these to update site copy
  hooks/        Shared hooks (e.g. useScrollSpy)
public/
  resume.pdf    Downloadable resume
specs/          Spec, plan, and task breakdown for this project
```

## Updating Content

Site content (profile, career history, skills, certifications, projects,
articles) lives in `src/content/*.ts`. Edit the relevant file, commit, and
push to `main` — no component code changes are needed for content-only
updates.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which runs
lint, tests, and build, then deploys the production bundle to the
`gh-pages` branch via GitHub Pages. Pull requests run lint/test/build only
(no deploy). A failing lint/test/build step blocks deployment, so the last
successful deploy stays live.
