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

---

## Phase 5: v3.0 Enterprise Multi-Agent Architecture

Based on: `specs/Org_Chart/spec.md` v3.0, `specs/Org_Chart/plan.md` §7.
Decisions confirmed: duplicate the toggle component (no shared
extraction); no hover panel on Tier-2 skill cards; agent department color
matches its paired physical department (no duplicate legend).

- [ ] Task: Create agent org chart content module
  - Acceptance: `src/content/agentOrgChart.ts` defines `CeoAgentInfo`,
    `AgentNode`, `AgentDepartment` types; exports `ceoAgent` and
    `agentDepartments` (5 entries, `id`s `bd`/`delivery`/`rd`/`esg`/`hr`
    matching `orgChart.ts`); each `AgentDepartment` has one Tier-1
    orchestrator (name, KR ownership, inputs, produces) and its Tier-2
    skills array, transcribed from
    `Goals/ORG_Chart/Enterprise-Multi-Agent-Architecture.md` §Role → Agent
    Traceability; 5 orchestrators + 18 skills = 23 agents total; each
    `accentColor` copied verbatim from the paired `Department.accentColor`
    in `src/content/orgChart.ts`.
  - Verify: `npx tsc -p tsconfig.app.json --noEmit` passes on this file;
    manual count of 23 agents and 5 matching accent colors.
  - Files: `src/content/agentOrgChart.ts`

- [ ] Task: Build the agent tree skeleton below the physical tree
  - Acceptance: `OrgChartPage.tsx` renders a new "Enterprise Multi-Agent
    Architecture" heading and a second `.org-tree` block after the
    existing physical tree, with `CeoAgentCard` → `OrchestratorCard` (×5)
    → `AgentSkillCard` (×18) nesting mirroring `CompanyCard` →
    `DepartmentCard` → `RoleCard`; `AgentSkillCard` shows Tier/Inputs/
    Produces as static text with no hover panel (Decision 6).
  - Verify: `npm run dev`, visit `/org-chart`, confirm the new section
    renders below the physical tree with all 23 agents visible (no toggle
    yet at this task).
  - Files: `src/pages/OrgChartPage.tsx`

- [ ] Task: Add expand/collapse toggle and hover panels to `OrchestratorCard`
  - Acceptance: each `OrchestratorCard` has its own `useState(false)` and a
    duplicated toggle `<button aria-expanded>` (not a shared component
    with `DepartmentCard`, Decision 5), showing `+`/`−`, gating its
    Tier-2 skills `<ul>`; default collapsed on first render; hovering
    `OrchestratorCard` shows a panel with its KR ownership + skill-name
    list; hovering `CeoAgentCard` shows a panel with the Tier-1/Tier-2
    explainer text.
  - Verify: `npx tsc -p tsconfig.app.json --noEmit` passes; manual check —
    all 5 orchestrators start collapsed (`+`, no skill cards), clicking one
    reveals only its own skills and flips to `−`, hover panels appear on
    orchestrator and CEO cards.
  - Files: `src/pages/OrgChartPage.tsx`

- [ ] Task: Verify agent-tree/physical-tree independence
  - Acceptance: expanding/collapsing an `OrchestratorCard` never changes
    the expand state of the physical `DepartmentCard` with the same
    paired `id`, and vice versa; expanding one orchestrator never reveals
    another orchestrator's skills.
  - Verify: manual check — expand physical `bd` department, confirm agent
    `bd` orchestrator (`head_of_sales`) is still collapsed, and vice versa.
  - Files: `src/pages/OrgChartPage.tsx` (only if a conflict is found)

- [ ] Task: Add tests for the agent tree
  - Acceptance: `OrgChartPage.test.tsx` covers: (a) default render — no
    Tier-2 skill agent names present anywhere, all 5 orchestrator toggles
    read the collapsed accessible name; (b) clicking one orchestrator's
    toggle reveals only that orchestrator's skill names and flips
    `aria-expanded` to `"true"`; (c) clicking again removes them and
    flips back to `"false"`; (d) expanding one orchestrator does not
    reveal another's skills; (e) expanding a physical department does not
    expand its paired agent orchestrator (and vice versa); (f) hovering an
    orchestrator card shows its KR + skill-name text; (g) all existing
    v1.0/v2.0 physical-tree tests still pass unmodified.
  - Verify: `npm test -- --run src/pages/OrgChartPage.test.tsx` passes.
  - Files: `src/pages/OrgChartPage.test.tsx`

- [ ] Task: Full regression pass
  - Acceptance: no TypeScript, build, lint, or test failures anywhere in
    the repo caused by this change; every Success Criterion in
    `specs/Org_Chart/spec.md` v3.0 holds; no new npm dependency added.
  - Verify: `npx tsc -p tsconfig.app.json --noEmit`, `npm run build`,
    `npx eslint src/pages/OrgChartPage.tsx src/pages/OrgChartPage.test.tsx
    src/content/agentOrgChart.ts`, `npm test -- --run`.
  - Files: (verification only, no new changes expected)

### Risks and Mitigations (Phase 5)

| Risk | Impact | Mitigation |
|---|---|---|
| Hand-transcribing 23 agents from a long Markdown file introduces drift (wrong Tier, Inputs/Produces, or department grouping) | Medium | Copied directly from §Role → Agent Traceability's table rows (authoritative), row count cross-checked against the table's own 23-row total |
| Agent tree's expand state accidentally coupled to physical tree's state for the same department `id` | Medium | Each `OrchestratorNode` keeps its own independent `useState`, verified with an explicit independence test (Task 4/5) |
| `AgentSkillCard` accidentally gains a hover panel by copy-paste from `RoleCard`/`DepartmentCard` | Low | Decision 6 explicit; no `group`/hover markup added to `AgentSkillCard`, verified in tests |
| Agent department `accentColor` drifts from its physical pair after a future edit to one file only | Low | Value copied verbatim at write-time from `orgChart.ts`; traceability documented in spec Decision 7 and plan §7.1 |

### Open Questions (Phase 5)

None — all 3 v3.0 questions resolved in `specs/Org_Chart/spec.md` v3.0
Decisions (5, 6, 7).

### Checkpoint: v3.0 Complete

- [ ] All Success Criteria in `specs/Org_Chart/spec.md` v3.0 verified
- [ ] `npm run build`, `npm test -- --run`, `npx eslint` all green
- [ ] No new npm dependency added
- [ ] No regression in v1.0/v2.0 behavior
- [ ] Ready for human final review
