# Task Breakdown: Enterprise Organization Chart Page

Based on: `specs/Org_Chart/spec.md`, `specs/Org_Chart/plan.md`
(Phase 3 of `spec-driven-development`)

## Architecture Decisions

- No chart/diagram npm dependency — tree is built with nested `<ul><li>` +
  a `.org-tree` CSS block (spec Boundaries: "Ask first" before adding one).
- All org data lives in one file, `src/content/orgChart.ts` — no literal
  department/role copy inside the page component.
- Standalone route (`/org-chart`), own header/footer, not part of the
  single-page anchor-nav flow (matches `ArticleDetailPage.tsx` precedent).

---

- [x] Task: Transcribe company + department data into `src/content/orgChart.ts`
  - Acceptance: `CompanyInfo`, `Department`, `OrgRole`, `KeyResultSummary`
    types defined; `company` has the SMART Objective from
    `0.Enterprise_Org_Chart_Overview.md` §1; all 5 `departments` entries
    have mission, Key Results, Value Stream, and roles (with nested
    `children` for Delivery's and R&D's two-level sub-roles) matching their
    source file's §1/§2/§5 exactly; headcounts sum to the source totals
    (11/12/7/5/6, 41 total + CEO).
  - Verify: `npx tsc -p tsconfig.app.json --noEmit` passes on this file.
  - Files: `src/content/orgChart.ts`

- [x] Task: Add `.org-tree` CSS connector rules
  - Acceptance: nested `<ul><li>` markup renders with visible top/vertical
    connector lines between parent and child nodes, including correct
    first/last-child border trimming and collapsing single-child connectors.
  - Verify: manual visual check in `npm run dev` once Task 3 renders markup
    using the class.
  - Files: `src/index.css`

- [x] Task: Build `OrgChartPage` skeleton (no hover yet)
  - Acceptance: page renders header (site name + back-to-home link), intro
    + department legend, and the full company → department → role tree
    (including nested sub-roles) using `.org-tree`; always-visible
    title/headcount/KPI text on every card.
  - Verify: `npm run dev`, visit `/org-chart` (temporarily wire the route or
    render standalone), confirm all 5 departments and their roles appear.
  - Files: `src/pages/OrgChartPage.tsx`

- [x] Task: Add hover panels for company and department nodes
  - Acceptance: hovering the company card reveals a panel with the SMART
    Objective text; hovering each department-head card reveals a panel with
    that department's Key Results (code/title/target) and Value Stream
    (`→`-joined); panels hide on mouse-leave; sub-role cards have no hover
    panel.
  - Verify: manual hover check on company card and all 5 department cards;
    panel content cross-checked against each source Markdown file's §1/§5.
  - Files: `src/pages/OrgChartPage.tsx`

- [x] Task: Wire routing and navigation
  - Acceptance: `/org-chart` renders `OrgChartPage`; a "404" route still
    catches unmatched paths; a "Org Chart" link exists in the primary nav.
  - Verify: `npm run build` succeeds; manual click-through from `Nav.tsx`
    reaches `/org-chart`.
  - Files: `src/AppRoutes.tsx`, `src/components/Nav.tsx`

- [x] Task: Full verification pass
  - Acceptance: no TypeScript, build, or lint errors on any touched file;
    every Success Criterion in `specs/Org_Chart/spec.md` holds.
  - Verify: `npx tsc -p tsconfig.app.json --noEmit`, `npm run build`,
    `npx eslint src/pages/OrgChartPage.tsx src/content/orgChart.ts
    src/components/Nav.tsx src/AppRoutes.tsx`.
  - Files: (verification only, no new changes expected)

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Manual transcription of 6 Markdown files introduces data drift (wrong headcount/KR/target) | Medium | Cross-checked every department against its own §1/§2/§5 and the overview file's §3 Headcount Summary totals |
| Pure-CSS tree connectors misrender on uneven sibling/nesting counts (Delivery and R&D mix flat and 2-level roles) | Medium | Used the standard `:only-child`/`:first-child`/`:last-child` CSS-tree pattern; visually verified against exactly these two departments |
| Hover panels clipped on narrow viewports | Low | Chart wrapped in `overflow-x-auto`; panels centered under their card, horizontal scroll absorbs overflow (accepted v1 limitation, spec Open Question 2) |

## Open Questions

See `specs/Org_Chart/spec.md` Open Questions — none block the current
scope; all are deferred follow-ups (sub-role hover detail, keyboard-focus
parity, linking out to full Markdown docs).

## Checkpoint: Complete

- [x] All Success Criteria in `specs/Org_Chart/spec.md` verified
- [x] `npm run build` and `npx eslint` (touched files) green
- [x] No new npm dependency added
- [x] Ready for human final review

---

## Phase 4: v2.0 Expand/Collapse Departments

Based on: `specs/Org_Chart/spec.md` v2.0, `specs/Org_Chart/plan.md` §6.
Decisions confirmed: no persistence, no expand/collapse-all, icon-only
toggle, hover panel independent of expand state.

- [x] Task: Add expand/collapse state and toggle button to `DepartmentCard`
  - Acceptance: each `DepartmentCard` has its own `expanded` boolean
    (`useState(false)`); renders a `<button type="button"
    aria-expanded={expanded}>` showing `+` when collapsed / `−` when
    expanded, with an accessible label that updates with state (e.g.
    "Expand BD / Kinh doanh department" / "Collapse BD / Kinh doanh
    department"); button is a sibling of the existing always-visible
    title/headcount/KPI text, not nested inside the hover-panel trigger
    area.
  - Verify: `npx tsc -p tsconfig.app.json --noEmit` passes; manual check —
    button renders with `+` on every department on first load.
  - Files: `src/pages/OrgChartPage.tsx`

- [x] Task: Gate the roles subtree on `expanded`
  - Acceptance: the existing `{dept.roles.length > 0 && (...)}` block for
    rendering the roles `<ul>` also requires `expanded === true`; when
    `false`, the `<ul>` (and its nested `.org-tree` connector lines) is not
    rendered at all — not just visually hidden.
  - Verify: `npm run dev`, manual check — all 5 departments start with no
    employee cards visible; clicking `+` on one reveals exactly that
    department's roles (including nested sub-roles for Delivery/R&D) with
    connector lines; clicking `−` removes them and connector lines cleanly.
  - Files: `src/pages/OrgChartPage.tsx`

- [x] Task: Verify hover panel stays independent of expand state
  - Acceptance: hovering a collapsed department's card still shows its Key
    Results + Value Stream panel (and the company's SMART Objective panel
    is unaffected by any department's expand state); no code change is
    expected if the hover `group-hover` markup and the new toggle button
    are separate elements as designed — this task is a verification pass,
    not necessarily new code.
  - Verify: manual hover check on at least one collapsed and one expanded
    department card, confirming identical panel content either way.
  - Files: `src/pages/OrgChartPage.tsx` (only if a conflict is found)

- [x] Task: Update/add tests for expand/collapse behavior
  - Acceptance: `OrgChartPage.test.tsx` covers: (a) default render has no
    role-card text present anywhere and every toggle button reads the
    collapsed accessible name; (b) clicking one department's toggle reveals
    only that department's role titles (including a nested sub-role) and
    flips `aria-expanded` to `"true"`; (c) clicking it again removes those
    role titles and flips `aria-expanded` back to `"false"`; (d) expanding
    one department does not reveal another's roles; (e) the existing
    hover-panel assertions (SMART Objective, Key Results, Value Stream)
    still pass without first expanding anything.
  - Verify: `npm test -- --run src/pages/OrgChartPage.test.tsx` passes.
  - Files: `src/pages/OrgChartPage.test.tsx`

- [x] Task: Full regression pass
  - Acceptance: no TypeScript, build, lint, or test failures anywhere in
    the repo caused by this change; every Success Criterion in
    `specs/Org_Chart/spec.md` v2.0 holds.
  - Verify: `npx tsc -p tsconfig.app.json --noEmit`, `npm run build`,
    `npx eslint src/pages/OrgChartPage.tsx src/pages/OrgChartPage.test.tsx`,
    `npm test -- --run`.
  - Files: (verification only, no new changes expected)

### Risks and Mitigations (Phase 4)

| Risk | Impact | Mitigation |
|---|---|---|
| Existing v1.0 component tests assert role titles are present without first expanding, and will fail once collapsed-by-default ships | Medium | Rewrote those assertions to click the toggle first (see "expands a department..." test) |
| Icon-only toggle button visually too small/hard to hit on touch devices | Low | Not a blocking requirement in this spec; acceptable for v2.0, revisit only if requested |
| Removing the `<ul>` on collapse accidentally also removes/breaks the department `<li>`'s own connector to the Company node | Low | Department `<li>`'s own `::before`/`::after` (to its parent) are independent of its children `<ul>`; the department `<li>`/card render is unconditional in `DepartmentNode`, only the roles `<ul>` is gated |

### Open Questions (Phase 4)

None — all resolved in `specs/Org_Chart/spec.md` v2.0 Decisions.

### Checkpoint: v2.0 Complete

- [x] All Success Criteria in `specs/Org_Chart/spec.md` v2.0 verified
- [x] `npm run build`, `npm test -- --run`, `npx eslint` all green
- [x] No new npm dependency added
- [x] No regression in v1.0 hover-panel behavior
- [x] Ready for human final review
