# Implementation Plan: Enterprise Organization Chart Page

Based on: `specs/Org_Chart/spec.md` (Phase 2 of `spec-driven-development`)

## 1. Major Components & Dependencies

```
1. Content module (src/content/orgChart.ts)
   - CompanyInfo, Department, OrgRole, KeyResultSummary types
   - `company` and `departments` static data, transcribed from
     Goals/ORG_Chart/0.*.md and 1.*.md-5.*.md
   └─ no dependencies, must be first — single source of truth for the page

2. Tree-connector styling (src/index.css, `.org-tree` rules)
   └─ no dependencies; pure CSS, reusable by any future org/tree page

3. OrgChartPage component (src/pages/OrgChartPage.tsx)
   - CompanyCard (hover → SMART Objective)
   - DepartmentCard (hover → Key Results + Value Stream)
   - RoleCard / RoleNode (recursive, renders nested sub-roles)
   └─ depends on (1) for data, (2) for connector lines

4. Routing + navigation wiring
   - src/AppRoutes.tsx — add `/org-chart` route
   - src/components/Nav.tsx — add "Org Chart" link
   └─ depends on (3)
```

## 2. Implementation Order (vertical slices)

1. **Slice 0 — Data transcription.** Read all 6 files in
   `Goals/ORG_Chart/` and transcribe: company SMART Objective (file 0, §1),
   each department's mission/Key Results/Value Stream/roles (files 1–5, §1
   Overview + §2 Organization Chart + §5 Value Stream) into
   `src/content/orgChart.ts`. Preserve source headcounts and KR codes
   exactly; do not invent data not present in the source Markdown.
2. **Slice 1 — Tree connector CSS.** Add `.org-tree` rules to
   `src/index.css` implementing the classic CSS-tree pattern (`::before`/
   `::after` pseudo-elements on `<li>`, first/last-child border trimming,
   `ul ul::before` vertical connector) so any `<ul><li>` nesting renders as
   a management-chart tree with no JS layout logic.
3. **Slice 2 — Static page skeleton.** Build `OrgChartPage.tsx` with header
   (site name + back-to-home link, mirroring `ArticleDetailPage.tsx`),
   intro/legend section, and the `.org-tree` markup rendering company →
   departments → roles (including nested `children`) with no hover
   interactivity yet — just the always-visible title/headcount/KPI text on
   each card.
4. **Slice 3 — Hover panels.** Add the company-card and department-card
   hover panels (Tailwind `group`/`group-hover` utilities, absolutely
   positioned, `invisible`/`opacity-0` by default) showing SMART Objective
   (company) and Key Results + Value Stream (department), per spec §6.
5. **Slice 4 — Routing & nav wiring.** Register `/org-chart` in
   `AppRoutes.tsx`; add an "Org Chart" link in `Nav.tsx`.
6. **Slice 5 — Verification pass.** `npx tsc -p tsconfig.app.json --noEmit`,
   `npm run build`, `npx eslint` on the new/changed files; manual visual
   check of hover panels and reporting lines at default viewport.

## 3. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Transcribing 6 Markdown files by hand introduces data drift vs. source (wrong headcount/KR/target) | Slice 0 copies values verbatim from each file's §1/§2/§5 tables/lists; cross-checked against the overview file's §3 Headcount Summary and §4 Traceability Matrix totals (41 FTE + CEO). |
| Pure-CSS tree connectors break on deeply nested or uneven sibling counts (e.g. Delivery has both single roles and two 2-level sub-trees) | Slice 1 uses the well-established `:only-child`/`:first-child`/`:last-child` CSS-tree pattern, verified visually in Slice 2 against the two departments with nested children (Delivery, R&D). |
| Hover panels clipped off-screen on narrow viewports | Chart section wrapped in `overflow-x-auto`; panels are fixed-width and centered under their card (`-translate-x-1/2`), acceptable for v1 per spec §7; horizontal scroll absorbs overflow. |
| No chart library keeps bundle small but limits future features (zoom/pan/export) | Explicitly deferred — spec §2 scopes this out; revisit only if requested. |

## 4. Parallelizable vs. Sequential

- **Sequential:** Slice 0 → 1 → 2 → 3 → 4 → 5 (each depends on the previous
  slice's output existing).
- **Parallelizable:** Slice 1 (CSS) has no runtime dependency on Slice 0's
  data and could be written concurrently, but is sequenced first since
  Slice 2 needs it immediately.

## 5. Verification Checkpoints

- **After Slice 0:** `npx tsc -p tsconfig.app.json --noEmit` passes on the
  new content file in isolation (no page imports it yet is fine, but the
  file itself must type-check).
- **After Slice 2:** `npm run dev`, visit `/org-chart` manually (or via
  temporary route), confirm all 5 departments and their sub-roles render
  with visible connector lines, no horizontal overflow crash.
- **After Slice 3:** manual hover check on company card and all 5
  department cards; confirm panel content matches the corresponding source
  Markdown file's Key Results/Value Stream exactly.
- **Final (Slice 5):** `npm run build` succeeds; `npx eslint` on
  `src/pages/OrgChartPage.tsx`, `src/content/orgChart.ts`,
  `src/components/Nav.tsx`, `src/AppRoutes.tsx` reports no errors; every
  Acceptance Criterion in spec §8 manually re-checked.

---

## 6. Delta Plan: v2.0 Expand/Collapse (Phase 2 of `spec-driven-development`)

Based on: `specs/Org_Chart/spec.md` v2.0 (Decisions resolved: no
persistence, no expand/collapse-all, icon-only toggle, hover independent
of expand state).

### 6.1 Dependency Graph

```
1. DepartmentCard: add `expanded` state + toggle button
   └─ no dependency on (1.0)'s data model — Department/OrgRole types
      already support this; touches only OrgChartPage.tsx

2. Conditional rendering of the roles <ul> based on `expanded`
   └─ depends on (1) for the state to condition on

3. Tests: expand/collapse behavior, independence across departments,
   accessibility (aria-expanded), hover-panel independence
   └─ depends on (2)
```

No changes to `src/content/orgChart.ts`, `src/index.css`, `AppRoutes.tsx`,
or `Nav.tsx` are anticipated — this delta is scoped entirely to
`OrgChartPage.tsx` (+ its test file).

### 6.2 Implementation Order (vertical slices)

1. **Slice A — Toggle state & button (no hiding yet).** In
   `DepartmentCard`, add `const [expanded, setExpanded] = useState(false)`
   and render a `<button type="button" aria-expanded={expanded}
   aria-label={...}>` showing `+`/`−` next to the existing always-visible
   title/headcount/KPI text. Clicking it flips `expanded` but the roles
   `<ul>` still always renders (Slice B wires the actual show/hide).
2. **Slice B — Conditional roles rendering.** Change the existing
   `{dept.roles.length > 0 && (...)}` block in `OrgChartPage.tsx` to also
   require `expanded`, so the roles `<ul>` (and therefore its `.org-tree`
   connector lines) is not rendered at all when collapsed — satisfying
   spec's "hides all employees... not just visually dimmed" and "no
   dangling connector line" requirements together, since an unrendered
   `<ul>` has no connector pseudo-elements either.
3. **Slice C — Default-collapsed verification.** Confirm (no code change
   expected, since `useState(false)` already defaults collapsed) that all
   5 departments render with `+` and no employee cards on initial mount.
4. **Slice D — Tests.** In `OrgChartPage.test.tsx`, add: (a) default
   state — no role text present, all `+`; (b) expand one department reveals
   its roles and only its roles; (c) expand then collapse removes them
   again and reverts to `+`; (d) `aria-expanded` toggles `false`→`true`→
   `false`; (e) hover-panel content (SMART Objective / Key Results / Value
   Stream) still passes existing v1.0 assertions regardless of expand
   state (add one assertion with a department left collapsed).
5. **Slice E — Full regression.** `npx tsc -p tsconfig.app.json --noEmit`,
   `npm run build`, `npx eslint src/pages/OrgChartPage.tsx
   src/pages/OrgChartPage.test.tsx`, `npm test -- --run`.

### 6.3 Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Existing v1.0 tests assume roles are always rendered (written before expand/collapse existed) and will break once collapsed-by-default lands | Slice D updates those specific assertions in the same pass — search `OrgChartPage.test.tsx` for role-title assertions (e.g. "Solution Architect / Delivery Lead") and gate them behind an expand click first. |
| Icon-only click target (Decision 3) accidentally also triggers the hover panel's mouseenter, confusing the two interactions | Hover panel trigger is `group-hover` on the outer wrapper (already present, unrelated to click); toggle button is a separate element with its own `onClick` — no code change needed to keep them independent, verified in Slice D. |
| `aria-expanded`/label state drifts from visual `+`/`−` if refactored later | Single source of truth: the same `expanded` boolean drives both the glyph and `aria-expanded`; no duplicated state. |
| Collapsing removes the `<ul>` but leaves a leftover top connector stub from the department `<li>` itself | Verify visually in Slice C — the department `<li>`'s own `::before`/`::after` (connecting it to the Company node) are independent of its children `<ul>`; only nested connectors disappear, which is correct. |

### 6.4 Verification Checkpoints

- **After Slice B:** `npm run dev`, manual check — all departments start
  collapsed, clicking `+` on one reveals only that department's employees
  with connector lines, clicking `−` removes them cleanly.
- **After Slice D:** `npm test -- --run src/pages/OrgChartPage.test.tsx`
  green, covering every Success Criterion in spec v2.0.
- **Final (Slice E):** `npm run build && npm test -- --run && npx eslint`
  all pass; every Success Criterion in `specs/Org_Chart/spec.md` v2.0
  re-verified manually.

---

## 7. Delta Plan: v3.0 Enterprise Multi-Agent Architecture (Phase 2 of `spec-driven-development`)

Based on: `specs/Org_Chart/spec.md` v3.0 (Decisions confirmed: duplicate the
toggle component rather than extract a shared one; no hover panel on
Tier-2 skill cards; agent department color matches its paired physical
department, no duplicate legend).

### 7.1 Dependency Graph

```
1. Content module (src/content/agentOrgChart.ts) — NEW
   - CeoAgentInfo, AgentDepartment, AgentNode types
   - `ceoAgent` and `agentDepartments` data transcribed from
     Goals/ORG_Chart/Enterprise-Multi-Agent-Architecture.md
     (§Layer 1, §Agent Tiering Model, §Layer 2/3, §Role → Agent
     Traceability, §Mapping to KPI Structure)
   - each AgentDepartment.accentColor copied verbatim from the paired
     Department.accentColor in src/content/orgChart.ts (Decision 7)
   └─ no dependency on orgChart.ts's types (parallel file, Assumption 13),
      but its accentColor values are sourced from it — must be written
      after inspecting orgChart.ts's 5 accentColor values

2. OrgChartPage additions (src/pages/OrgChartPage.tsx)
   - AgentSkillCard (static text only — Tier/Inputs/Produces, no hover
     panel, Decision 6)
   - AgentSkillNode (recursive-shaped like RoleNode, but skills are flat
     per orchestrator — no nested children in the traceability table)
   - OrchestratorCard (duplicates DepartmentCard's toggle button markup —
     own useState, no shared component, Decision 5) with a hover panel
     (KR ownership + skill-name list, mirrors DepartmentCard's hover panel
     since this level DOES get hover per spec requirement 6/Decision text)
   - OrchestratorNode (duplicates DepartmentNode's expand-gated <ul> pattern)
   - CeoAgentCard (duplicates CompanyCard's hover panel pattern, showing
     Tiering note instead of SMART Objective)
   - new "Enterprise Multi-Agent Architecture" heading + second `.org-tree`
     block, appended after the existing physical tree's closing </div>
   └─ depends on (1) for data; reuses existing `.org-tree` CSS as-is (no
      src/index.css changes)

3. Tests (src/pages/OrgChartPage.test.tsx)
   └─ depends on (2)
```

No changes to `src/content/orgChart.ts`, `src/index.css`, `AppRoutes.tsx`,
or `Nav.tsx` — same route, same nav entry, same CSS connector rules reused
by the new section's markup.

### 7.2 Implementation Order (vertical slices)

1. **Slice A — Agent content data.** Create `src/content/agentOrgChart.ts`
   with `CeoAgentInfo`, `AgentNode`, `AgentDepartment` types; transcribe the
   CEO Agent (name, responsibilities, a short Tier-1/Tier-2 explainer for
   its hover panel) and all 5 agent departments (`bd`, `delivery`, `rd`,
   `esg`, `hr` — same `id`s as `orgChart.ts` for pairing) each with one
   Tier-1 orchestrator (id, name, KR ownership, inputs, produces) and its
   Tier-2 skills array (id, name, inputs, produces) from §Role → Agent
   Traceability — 23 agents total (5 + 18), verified against the
   traceability table row count. Copy each department's `accentColor` from
   `orgChart.ts` verbatim.
2. **Slice B — Static agent tree skeleton.** In `OrgChartPage.tsx`, add
   `CeoAgentCard`, `OrchestratorCard` (no toggle yet, always show skills),
   `AgentSkillCard`, render a new heading + `.org-tree` block after the
   physical tree, mirroring the company→department→role nesting with
   ceoAgent→agentDepartments→skills. No hover panel on `AgentSkillCard`
   (Decision 6); no toggle yet.
3. **Slice C — Toggle + hover panel on OrchestratorCard.** Add
   `useState(false)` + toggle `<button>` to `OrchestratorCard` (duplicated
   pattern, own state, Decision 5) and gate the skills `<ul>` on it
   (default collapsed); add `OrchestratorCard`'s hover panel (KR ownership
   + skill-name list) and `CeoAgentCard`'s hover panel (Tiering note),
   both using the existing `group`/`group-hover` Tailwind pattern.
4. **Slice D — Tests.** In `OrgChartPage.test.tsx`, add: (a) default state
   for the agent tree — no skill-agent names present, all orchestrators
   show `+`; (b) expanding one orchestrator reveals only its own skills;
   (c) collapsing reverts; (d) `aria-expanded` toggles correctly; (e)
   independence from the physical tree's toggles for the same department
   `id`; (f) orchestrator hover panel shows KR + skill list; (g) existing
   v1.0/v2.0 physical-tree tests still pass unmodified.
5. **Slice E — Full regression.** `npx tsc -p tsconfig.app.json --noEmit`,
   `npm run build`, `npx eslint src/pages/OrgChartPage.tsx
   src/pages/OrgChartPage.test.tsx src/content/agentOrgChart.ts`,
   `npm test -- --run`.

### 7.3 Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Transcribing 23 agents from a long Markdown file by hand introduces drift vs. source (wrong Tier, wrong Inputs/Produces, wrong department grouping) | Slice A copies directly from §Role → Agent Traceability's table (authoritative row-by-row mapping) rather than re-deriving from the narrative sections; row count cross-checked against the table's own 23-row total. |
| Accidentally coupling the agent tree's `expanded` state to the physical tree's state for the same department `id` (e.g. via a shared keyed map) | Each `OrchestratorNode`/`DepartmentNode` keeps its own independent `useState`, exactly like the existing per-instance pattern — no shared state object introduced (Decision 5 rules out a shared component too). |
| Giving `AgentSkillCard` a hover panel by copy-paste habit from `RoleCard`/`DepartmentCard` | Explicit Decision 6 — `AgentSkillCard` has no `group`/hover markup at all, verified in Slice D by asserting no additional hover-only text appears on mouseover for a skill card. |
| Agent department `accentColor` drifting from its physical pair after a future edit to one file but not the other | Slice A sources the value directly from `orgChart.ts`'s existing constants at write-time; a code comment is not used (no comments per project convention) — instead the traceability is documented here in the plan and in spec Assumption 10/Decision 7. |

### 7.4 Verification Checkpoints

- **After Slice A:** `npx tsc -p tsconfig.app.json --noEmit` passes on the
  new content file in isolation; manual count confirms 5 orchestrators + 18
  skills = 23 agents, and 5 `accentColor` values match `orgChart.ts` exactly.
- **After Slice C:** `npm run dev`, manual check — agent tree renders below
  physical tree, all orchestrators collapsed by default with matching
  department colors, clicking `+` reveals only that orchestrator's skills
  with no hover panel on skill cards, hover on orchestrator/CEO cards shows
  the new panels.
- **Final (Slice E):** `npm run build && npm test -- --run && npx eslint`
  all pass; every v3.0 Success Criterion in `specs/Org_Chart/spec.md`
  checked off and re-verified manually.
