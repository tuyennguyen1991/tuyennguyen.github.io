# Spec: Enterprise Organization Chart Page

**Version:** v3.0 (supersedes v2.0 — adds a second tree, the Enterprise
Multi-Agent Architecture, rendered below the existing physical org chart on
the same page so a visitor can compare the Physical model and the Agent
model; v1.0/v2.0 requirements — static tree, hover panels, expand/collapse —
are kept unchanged, see Changelog)
**Status:** Approved for implementation (v3.0) — Open Questions resolved by
human review below (v1.0/v2.0 remain Approved and implemented).
**Source documents:** `Goals/ORG_Chart/0.Enterprise_Org_Chart_Overview.md`,
`Goals/ORG_Chart/1.BD_Kinh_Doanh_Org_Design.md`,
`Goals/ORG_Chart/2.Delivery_Ky_Thuat_Org_Design.md`,
`Goals/ORG_Chart/3.RD_Doi_Moi_Sang_Tao_Org_Design.md`,
`Goals/ORG_Chart/4.ESG_Van_Hanh_Xanh_Org_Design.md`,
`Goals/ORG_Chart/5.Nhan_Su_Quan_Tri_Org_Design.md`,
`Goals/ORG_Chart/Enterprise-Multi-Agent-Architecture.md` (v3.0 source — CEO
Agent, Agent Tiering Model, Layer 2/3 department + role agents, Role → Agent
Traceability table, Mapping to KPI Structure)
**Existing implementation:** `src/pages/OrgChartPage.tsx`,
`src/content/orgChart.ts`, `src/index.css` (`.org-tree`), routed at
`/org-chart` (see `specs/Org_Chart/plan.md`, `tasks.md` for v1.0/v2.0's
delivery)

## Changelog

- **v1.0 (implemented):** static tree (Company → Department → Role/sub-role),
  always-visible reporting lines, hover panels on the company node (SMART
  Objective) and each department head node (Key Results + Value Stream).
- **v2.0 (implemented):** adds click-driven expand/collapse per
  department, showing/hiding that department's employees. Hover panels from
  v1.0 are **not** removed — see Assumption 4.
- **v3.0 (this document, Specify phase):** adds a second `.org-tree` section,
  **Enterprise Multi-Agent Architecture**, below the existing physical org
  chart on the same `/org-chart` page — CEO Agent → 5 Tier-1 department
  orchestrator agents → their Tier-2 on-demand skill agents, sourced from
  `Enterprise-Multi-Agent-Architecture.md`. Goal: let a visitor see and
  compare the **Physical model** (people/roles) against the **Agent model**
  (orchestrators/skills) side by side. The agent tree reuses the exact same
  per-node expand/collapse toggle behavior as v2.0 (default collapsed,
  `+`/`−`, `aria-expanded`) to show/hide the agents belonging to a
  department. v1.0/v2.0 requirements are unchanged.

## Assumptions

Surfacing these now — proceeding with them unless corrected:

1. **"Departments as the primary nodes"** means departments remain the
   direct children of the existing Company/CEO node (as in v1.0) and are
   the primary *interactive* unit (the thing you click to expand/collapse) —
   not a restructure that removes the Company node or flattens the
   hierarchy. The Company node stays as the root, unchanged from v1.0.
2. **"Employees belonging to that department"** maps to each department's
   existing `roles` (and their nested `children`, e.g. Delivery's "Solution
   Architect / Delivery Lead" under "Delivery Manager") already defined in
   `src/content/orgChart.ts` — the source Markdown files define roles +
   headcount, not named individuals, so no fictitious employee names are
   introduced. "Employee" in the UI = one role card, exactly as rendered
   today. This **updates** v1.0's Boundary "Never add named
   individual employees" — that boundary is about not inventing real
   *names*, not about hiding the role list, and remains true under v2.0.
3. **Collapsing a department hides its entire employee subtree**, including
   two-level nested roles (Delivery: Delivery Manager → Solution Architect;
   Automation Lead → Automation Engineer; R&D: AI/Data Science Lead → R&D
   Engineer). There is no independent toggle for a nested sub-role in v2.0 —
   one toggle per department controls everything below it.
4. **Hover panels from v1.0 (SMART Objective on the company node, Key
   Results + Value Stream on department nodes) are retained**, since the
   new requirement is additive ("create an interactive... page" building on
   the existing one) and nothing in the 4 new requirements says to remove
   them. The expand/collapse toggle and the hover panel are independent
   interactions on the same department card.
5. **Default state on page load is collapsed** ("+" shown, employees
   hidden) for every department — this keeps the initial view compact and
   matches the natural reading order of the requirement (expand icon listed
   first). All 5 departments default to collapsed independently (no
   "expand all" control requested).
6. **No new npm dependency** — expand/collapse is local component state
   (`useState`) per department, consistent with v1.0's Boundary ("Ask
   first" before adding a chart/animation library) and this repo's
   dependency-light convention.
7. **The toggle icon is a visual "+"/"−" glyph** (text or a small inline
   SVG), not a third-party icon package — matches Assumption 6.
8. **"Below existing Org Chart"** means the same `/org-chart` page/route
   gets a second section, not a new page/route: the physical tree (v1.0/v2.0,
   unchanged) renders first, followed by a clearly labeled "Enterprise
   Multi-Agent Architecture" heading and its own `.org-tree` block. No
   routing change.
9. **Scope of transcription for the agent tree.** Only the structural nodes
   needed for a comparable tree are transcribed into a new content file:
   CEO Agent (root), the 5 Tier-1 department orchestrator agents
   (`head_of_sales`, `delivery_manager`, `rnd_director`, `esg_director`,
   `hrbp`), and their 18 Tier-2 on-demand skill agents (§Role → Agent
   Traceability), each with its `Tier`, `Inputs`, `Produces`, and KR
   ownership (§Mapping to KPI Structure). The source document's workflow
   state machines (WF-1..WF-5), HITL gate table, access-control rules,
   observability schema, and model-tiering table are **not** rendered as
   tree nodes — this spec only covers the comparable org-tree view, not a
   full architecture diagram of those cross-cutting concerns.
10. **1:1 department pairing for comparison.** Each of the 5 agent
    "departments" (one Tier-1 orchestrator + its Tier-2 skills) is paired
    with the same physical department by `id` (`bd`/`delivery`/`rd`/`esg`/
    `hr`) and **reuses that department's existing `accentColor`** from
    `src/content/orgChart.ts`, so the two trees are visually comparable
    color-by-color (e.g. green `bd` top border in both trees). `rnd_director`
    owns KR1+KR5 per the traceability table; this is carried into the agent
    department's KR label rather than simplified.
11. **Toggle behavior is identical, not shared/coupled state.** "Behavior
    toggle to show/hide Agent/Role belong to department is same" is read as:
    the agent tree's orchestrator cards get the **same interaction pattern**
    as v2.0's `DepartmentCard` toggle (default collapsed, icon-only `+`/`−`
    button, `aria-expanded`, independent per node) — not that expanding the
    physical `bd` department also expands the agent `bd` orchestrator. The
    two trees' expand states are fully independent, since they answer
    different questions ("who" vs "which agent").
12. **Hover panel parity, new content.** The CEO Agent card and each
    orchestrator card get an hover panel mirroring the physical model's
    pattern (Assumption 4) — CEO Agent shows a short Tiering note (Tier-1
    persistent orchestrator vs Tier-2 on-demand skill, from §Agent Tiering
    Model); each orchestrator card shows its KR ownership and the list of
    its Tier-2 skill names, mirroring Key Results + Value Stream. This is
    new content (not reused strings) since the source documents differ.
13. **New content file, not a merge.** Agent data lives in a new
    `src/content/agentOrgChart.ts`, parallel to (not merged into)
    `orgChart.ts` — the two trees have different shapes (role headcount vs.
    agent tier/inputs/produces) and different sources, so forcing one
    shared type would blur the physical/agent distinction the feature
    exists to make visible. No new npm dependency (matches Assumption 6).

## Objective

Let a visitor progressively disclose an org chart: departments are always
visible as primary nodes; clicking a department's toggle expands it to
reveal every employee (role) in that department, and clicking again
collapses it back down — so the default view stays compact and the visitor
controls how much detail they see, department by department.

**User story:**
> As a visitor exploring the organization chart, I want each department
> collapsed by default with a clear "+" to expand it, so that I can scan
> all department names first, then drill into just the departments I care
> about — and collapse them again with "−" without losing my place in the
> chart.

**Success looks like:** a visitor lands on `/org-chart`, sees all 5
department nodes with a "+" icon and no employee rows yet; clicking any
department's "+" reveals exactly that department's employees (and only
that department's) and the icon becomes "−"; clicking "−" hides them again;
this works independently and repeatably for all 5 departments in any order
or combination.

**Objective addition (v3.0):** let that same visitor scroll down and see a
second, structurally parallel tree — the Enterprise Multi-Agent
Architecture — so they can compare the **Physical model** (who does the
work: 23 roles/41 FTE) against the **Agent model** (which agent does the
work: 5 persistent Tier-1 orchestrators + 18 on-demand Tier-2 skills). The
agent tree uses the exact same collapse-by-default, click-to-expand
interaction per department as the physical tree, so the two models feel
like one consistent UI pattern applied twice, not two different UIs bolted
together.

**User story (v3.0):**
> As a visitor comparing how the org is structured on paper versus how it
> would run as AI agents, I want the same collapsed-by-default,
> click-to-expand tree directly below the physical chart, so I can expand
> "BD / Kinh doanh" in both trees and see the role names next to the agent
> names that do that department's work — without learning a second
> interaction model.

**Success looks like (v3.0):** the visitor sees the physical tree, then
below it a "Enterprise Multi-Agent Architecture" tree rooted at a CEO Agent
card with 5 orchestrator cards (each `+`, no skills shown); clicking any
orchestrator's `+` reveals exactly that orchestrator's Tier-2 skill agents;
this behaves identically to, and independently of, the physical tree's
expand/collapse for the same department.

## Interaction Requirements (from request, verbatim intent)

1. **Departments are the primary nodes** — each of the 5 departments
   (BD/Kinh doanh, Delivery/Kỹ thuật, R&D/Đổi mới sáng tạo, ESG/Vận hành
   Xanh, Nhân sự/Quản trị) renders as its own top-level card under the
   Company node, always visible regardless of expand state.
2. **Each department node has a toggle icon:**
   - `+` = Expand department (currently collapsed → about to expand)
   - `−` = Collapse department (currently expanded → about to collapse)
   The icon always reflects the *current* state, and clicking it performs
   the action implied by the icon shown.
3. **Expanding a department shows all employees belonging to it** — every
   `role` entry (and nested `children`) under that department in
   `src/content/orgChart.ts`, rendered with their existing card
   (title/headcount/KPI), connected with the existing `.org-tree` reporting
   lines.
4. **Collapsing a department hides all its employees** — the same role
   cards are removed from view (not just visually dimmed); the department
   card itself remains visible.
5. **A second tree, "Enterprise Multi-Agent Architecture", renders below the
   physical tree on the same page** — its own section heading, its own
   `.org-tree` markup, rooted at a CEO Agent card (paired conceptually with
   the physical Company card).
6. **Each of the 5 agent departments is a Tier-1 orchestrator card**
   (`head_of_sales`, `delivery_manager`, `rnd_director`, `esg_director`,
   `hrbp`), always visible under the CEO Agent card, colored with the same
   `accentColor` as its paired physical department (Assumption 10), and
   carrying its own `+`/`−` toggle — same icon semantics as requirement 2.
7. **Expanding an orchestrator shows its Tier-2 skill agents** — every
   on-demand skill agent from §Role → Agent Traceability that reports to it
   (e.g. `head_of_sales` → `account_director`, `bd_executive`, `presales`,
   `bid_compliance`, `crm_operations`), rendered as its own card
   (name/Tier/Inputs/Produces), connected with `.org-tree` lines, exactly
   as requirement 3 does for physical roles.
8. **Collapsing an orchestrator hides its Tier-2 skill agents** — same
   "removed, not dimmed" rule as requirement 4; the orchestrator card stays
   visible. Each agent department's toggle is independent of every other
   agent department's toggle **and** of the physical tree's toggles for the
   same paired `id` (Assumption 11).

## Behavior Detail

- **Initial state:** every department is collapsed (`+`) on first render
  (Assumption 5). No persistence across page reloads/navigation is required
  (v2.0 scope; see Open Questions).
- **Independence:** expanding/collapsing one department has no effect on
  any other department's state.
- **Click target:** the toggle icon itself, and — for a larger, easier
  click/tap target — the whole department card header is clickable to
  toggle (icon is the visual indicator, not the only hit area), unless this
  conflicts with the existing hover-panel trigger area (Assumption 4); if
  it does, the toggle's click target is scoped to the icon button only and
  the rest of the card keeps its hover-only behavior.
- **Accessibility:** the toggle renders as a real `<button>` with
  `aria-expanded="true"/"false"` and an accessible name (e.g. "Expand BD /
  Kinh doanh department" / "Collapse BD / Kinh doanh department"), keyboard
  operable (`Enter`/`Space`), so screen reader users get the same
  expand/collapse semantics as sighted users.
- **Visual transition:** no specific animation is required by the request;
  an instant show/hide is acceptable for v2.0 (a CSS transition may be added
  later without changing this spec's acceptance criteria).
- **Reporting lines:** when a department is collapsed, its `.org-tree`
  connector lines down to (now-hidden) employees are also hidden — no
  dangling line to nothing. When expanded, lines render exactly as v1.0
  already does for that subtree.
- **Agent tree parity (v3.0):** every bullet above applies identically to
  the agent tree's orchestrator cards, substituting "department" →
  "agent department" and "employees" → "Tier-2 skill agents" — same
  default-collapsed state, same independence rule, same icon-only click
  target, same `aria-expanded`/accessible-name pattern (e.g. "Expand
  head_of_sales agents" / "Collapse head_of_sales agents"), same instant
  show/hide, same no-dangling-connector rule. The physical tree's and
  agent tree's toggle states never read or write each other, even for the
  same paired department `id` (Assumption 11).
- **Section ordering (v3.0):** the physical tree section renders first
  (unchanged v1.0/v2.0 markup and heading), then the "Enterprise
  Multi-Agent Architecture" heading and its `.org-tree` block render below
  it in normal page flow — no side-by-side/split-screen layout is
  requested, so vertical stacking satisfies "see and compare."

## Tech Stack

- React 18 + TypeScript (strict) — no change from v1.0
- Local component state (`useState<Record<string, boolean>>` or one
  `useState<boolean>` per department instance) for expand/collapse — no
  routing/query-string state, no global state library
- Tailwind CSS for the toggle button and layout; reuses the existing
  `.org-tree` CSS connector rules in `src/index.css`
- No new npm dependency (Assumption 6/7, 13)
- **(v3.0)** Same stack, same `.org-tree` CSS reused as-is (no new CSS file
  needed since the connector pattern is generic to `<ul><li>` nesting); the
  agent tree's toggle logic reuses the same per-node `useState<boolean>`
  pattern as the physical tree's `DepartmentCard`/`DepartmentNode`, either
  by extracting a small shared toggle-button component or duplicating the
  ~10-line button (decide in Plan phase — Assumption/Boundary, not a
  Success Criterion).

## Commands

```
Dev:       npm run dev
Typecheck: npx tsc -p tsconfig.app.json --noEmit
Test:      npm test -- --coverage
Lint:      npx eslint src/pages/OrgChartPage.tsx src/content/orgChart.ts
Build:     npm run build
```

## Project Structure

```
src/content/orgChart.ts     → unchanged data model (Department/OrgRole);
                               no schema change needed for this feature
src/pages/OrgChartPage.tsx   → add per-department expand/collapse state and
                               the toggle button; conditionally render each
                               department's role subtree
src/pages/OrgChartPage.test.tsx → add expand/collapse interaction tests
```

No changes anticipated to `src/AppRoutes.tsx`, `src/components/Nav.tsx`, or
`src/index.css` beyond possibly hiding connector lines for a collapsed
subtree (may already be handled by simply not rendering the child `<ul>`).

**(v3.0 additions)**

```
src/content/agentOrgChart.ts     → NEW — CeoAgentInfo, AgentDepartment,
                                    AgentNode types; `ceoAgent` and
                                    `agentDepartments` data transcribed from
                                    Enterprise-Multi-Agent-Architecture.md
                                    §Layer 1/2/3, §Agent Tiering Model,
                                    §Role → Agent Traceability, §Mapping to
                                    KPI Structure
src/pages/OrgChartPage.tsx        → add a second section below the existing
                                    physical tree: CeoAgentCard →
                                    OrchestratorCard (×5, reusing the
                                    toggle pattern) → AgentSkillNode (×18)
src/pages/OrgChartPage.test.tsx    → add agent-tree interaction tests
                                    (parallel to the physical-tree tests)
```

Still no changes anticipated to `src/AppRoutes.tsx`, `src/components/Nav.tsx`
(same route, same nav entry), or new rules in `src/index.css` (the existing
`.org-tree` selectors are generic and apply to the new section's markup
unchanged).

## Code Style

Follows v1.0's existing component conventions in `OrgChartPage.tsx`
(function components, named exports, Tailwind-only styling):

```tsx
function DepartmentCard({ dept }: { dept: Department }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="group relative">
      <div className="... border-t-4 ..." style={{ borderTopColor: dept.accentColor }}>
        {/* existing always-visible title/headcount/KPI */}
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${dept.name} department`}
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          {expanded ? '−' : '+'}
        </button>
      </div>
      {/* existing hover panel — unchanged, independent of `expanded` */}
    </div>
  )
}
```

```tsx
{dept.roles.length > 0 && expanded && (
  <ul>
    {dept.roles.map((role) => (
      <RoleNode key={role.title} role={role} />
    ))}
  </ul>
)}
```

**Conventions:** one `expanded` boolean per `DepartmentCard` instance (state
lives with the card, not lifted to a shared map, since departments don't
need to coordinate); toggle button uses `+`/`−` literal glyphs, not an icon
font/SVG library.

**(v3.0)** New data shape, illustrated for one department (the full 5×23
transcription is a Plan/Tasks-phase deliverable, not spelled out in the
spec):

```ts
export interface AgentNode {
  id: string            // e.g. 'account_director'
  name: string           // display name, e.g. 'Account Director Agent'
  tier: 'Tier-2'
  inputs: string[]
  produces: string[]
}

export interface AgentDepartment {
  id: string             // pairs with Department.id in orgChart.ts
  name: string            // e.g. 'BD / Kinh doanh'
  accentColor: string      // copied from the paired Department.accentColor
  orchestrator: { id: string; name: string; tier: 'Tier-1'; kr: string; inputs: string[]; produces: string[] }
  skills: AgentNode[]      // this department's Tier-2 on-demand skills
}

export interface CeoAgentInfo {
  name: string             // 'CEO Agent'
  responsibilities: string[]
  tieringNote: string       // short Tier-1 vs Tier-2 explainer for the hover panel
}
```

The `OrchestratorCard` component reuses the exact same toggle `<button>`
markup/props shape as `DepartmentCard` (`expanded`, `onToggle`,
`aria-expanded`, `aria-label`), just pointed at `agentDept.skills` instead
of `dept.roles` when conditionally rendering the child `<ul>`.

## Testing Strategy

- **Framework:** Vitest + React Testing Library (existing convention).
- **Levels:**
  - Component: for each department, assert its employee/role cards are
    **absent** from the DOM before any click (default collapsed), assert
    clicking the toggle makes them **present**, assert the icon text
    changes `+` → `−`, assert clicking again removes them and reverts the
    icon to `+`.
  - Independence test: expanding one department does not reveal another
    department's employees.
  - Accessibility: toggle button has `aria-expanded` reflecting state and
    an accessible name that changes with state.
- **Coverage expectation:** every one of the 4 numbered requirements in
  this spec has at least one corresponding test.
- No new test infra required; extends the existing
  `src/pages/OrgChartPage.test.tsx`.
- **(v3.0)** Same framework/levels, applied to the agent tree:
  - Component: the "Enterprise Multi-Agent Architecture" heading and all 5
    orchestrator cards render with no Tier-2 skill cards present by
    default; clicking an orchestrator's toggle reveals only its own
    skills and flips its icon/`aria-expanded`; clicking again hides them.
  - Independence: expanding an agent orchestrator does not reveal another
    orchestrator's skills, and does not change the physical tree's expand
    state for the same paired department `id` (and vice versa).
  - Regression: existing v1.0/v2.0 physical-tree tests continue to pass
    unmodified (the new section is additive, appended after the physical
    tree in the DOM).
- **Coverage expectation (v3.0):** every one of requirements 5–8 has at
  least one corresponding test.

## Boundaries

- **Always do:**
  - Keep the toggle a real `<button>` with `aria-expanded`, not a `<div>`
    with an `onClick` (keyboard/screen-reader accessibility).
  - Keep department data/roles in `src/content/orgChart.ts` — no new
    hardcoded employee copy in the component.
  - Default every department to collapsed on initial render.
  - Run `npx tsc --noEmit`, `npm run build`, `npx eslint`, and `npm test`
    on touched files before considering this feature complete.
- **Ask first:**
  - Persisting expand/collapse state (URL query param, `localStorage`) —
    not requested; ask before adding.
  - An "Expand all / Collapse all" convenience control — not requested;
    ask before adding.
  - Removing or altering the v1.0 hover panels (SMART Objective / Key
    Results / Value Stream) — out of scope for this delta (Assumption 4).
  - Any expand/collapse animation library or CSS transition beyond a
    simple show/hide.
- **Never do:**
  - Invent named individual employees — "employees" continue to mean the
    existing role/headcount entries (Assumption 2).
  - Leave orphaned `.org-tree` connector lines pointing at hidden/removed
    employee nodes when a department is collapsed.

**(v3.0 additions)**

- **Always do:**
  - Keep the agent tree's toggle a real `<button>` with `aria-expanded`,
    identical accessibility pattern to the physical tree's toggle.
  - Keep agent data in the new `src/content/agentOrgChart.ts` — no
    hardcoded agent copy in the component (mirrors the existing rule for
    `orgChart.ts`).
  - Default every orchestrator to collapsed on initial render.
  - Pair every agent department's `accentColor` with its physical
    counterpart by `id` (Assumption 10) so the comparison is visually
    legible.
- **Ask first:**
  - Adding a visual "mapping" affordance between the two trees (e.g. lines
    or arrows connecting a physical role to its agent) beyond color
    pairing — not requested; the requirement is "see and compare" two
    stacked trees, not a merged diagram.
  - Rendering the WF-1..WF-5 workflow state machines, HITL gate table,
    access-control rules, observability schema, or model-tiering table as
    additional tree nodes or sections (Assumption 9) — out of scope unless
    explicitly requested.
  - Extracting a shared `Toggle`/`ExpandableCard` component used by both
    trees (nice-to-have refactor, not required by this spec) — ask before
    doing more than duplicating the existing ~10-line pattern.
- **Never do:**
  - Invent agents beyond the 5 Tier-1 orchestrators + 18 Tier-2 skills in
    §Role → Agent Traceability of `Enterprise-Multi-Agent-Architecture.md`
    (23 total, mirroring the physical chart's 23 roles).
  - Couple the agent tree's expand/collapse state to the physical tree's
    state for the same department `id` (Assumption 11).

## Success Criteria

- [x] On loading `/org-chart`, all 5 departments show a `+` icon and no
      employee/role cards are rendered under any of them.
- [x] Clicking a department's `+` reveals all of that department's
      employees (including nested sub-roles, e.g. Delivery's Solution
      Architect under Delivery Manager) and the icon becomes `−`.
- [x] Clicking a department's `−` hides all of that department's employees
      again and the icon reverts to `+`.
- [x] Expanding/collapsing one department never changes another
      department's expand state or visible employees.
- [x] The toggle button has `aria-expanded` matching its current state and
      an accessible name that updates with state.
- [x] The v1.0 hover panels (company → SMART Objective; department head →
      Key Results + Value Stream) still work unchanged, independent of the
      new expand/collapse state.
- [x] `npx tsc -p tsconfig.app.json --noEmit`, `npm run build`,
      `npx eslint`, and `npm test` all pass with no errors.
- [x] No new npm dependency was added.

**(v3.0 additions)**

- [ ] Loading `/org-chart` shows the physical tree (unchanged) followed by
      an "Enterprise Multi-Agent Architecture" heading and a second
      `.org-tree` rooted at a CEO Agent card.
- [ ] All 5 orchestrator cards (`head_of_sales`, `delivery_manager`,
      `rnd_director`, `esg_director`, `hrbp`) render with a `+` icon and no
      Tier-2 skill cards, colored with their paired physical department's
      `accentColor`.
- [ ] Clicking an orchestrator's `+` reveals exactly its own Tier-2 skill
      agents (name/Tier/Inputs/Produces, no hover panel — Decision 6) and
      the icon becomes `−`; clicking `−` hides them again.
- [ ] Expanding/collapsing one orchestrator never changes another
      orchestrator's state, nor the physical tree's expand state for the
      same paired department `id`.
- [ ] The agent tree's toggle buttons have `aria-expanded` and an
      accessible name that updates with state, same as the physical tree.
- [ ] Hovering the CEO Agent card shows the Tier-1/Tier-2 explainer;
      hovering an orchestrator card shows its KR ownership + skill list.
- [ ] All 23 agents (5 orchestrators + 18 skills) from §Role → Agent
      Traceability are represented exactly once, with no invented agents.
- [ ] No duplicate department-color legend row is added (Decision 7).
- [ ] `npx tsc -p tsconfig.app.json --noEmit`, `npm run build`,
      `npx eslint`, and `npm test` all pass with no errors on the new file
      and touched files.
- [ ] No new npm dependency was added.

## Decisions (resolved)

1. **No persistence.** Expand/collapse state is in-memory only (`useState`);
   resets to fully collapsed on every page load/navigation. No
   `localStorage`, no URL query param.
2. **No "Expand all"/"Collapse all" control.** Only the per-department `+`/
   `−` toggle is built.
3. **Toggle click target is icon-only.** The `+`/`−` button is the sole
   click target for expand/collapse; the rest of the department card
   keeps its existing hover-only behavior (SMART Objective/Key
   Results/Value Stream panel), with no ambiguity between the two
   interactions.
4. **Hover panel and expand/collapse are fully independent.** Key Results
   and Value Stream (and the company's SMART Objective) remain
   discoverable via hover even when a department is collapsed
   (employees hidden). Collapsing never closes/disables the hover panel.
5. **(v3.0) Component duplication, not extraction — confirmed by human.**
   `OrchestratorCard` duplicates the toggle `<button>` pattern from
   `DepartmentCard` rather than extracting a shared component.
6. **(v3.0) No hover panel on Tier-2 skill agent cards — confirmed by
   human.** `AgentSkillCard` shows Tier/Inputs/Produces as static text,
   mirroring how physical `RoleCard` shows headcount/KPI — no
   `group-hover` panel.
7. **(v3.0) Agent department color matches its paired physical department
   — confirmed by human, explicit rationale: "easy to mapping and
   compare."** No duplicate legend row is added; the shared 5-color
   legend above the physical tree covers both trees.

## Open Questions

None outstanding — all 4 original questions and all 3 v3.0 questions are
resolved (see Decisions above). Ready to proceed to Plan phase.
