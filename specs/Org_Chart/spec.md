# Spec: Enterprise Organization Chart Page

**Version:** v2.0 (supersedes v1.0 — adds interactive expand/collapse;
v1.0's hover-based SMART Objective / Key Results / Value Stream panels are
kept, see Changelog)
**Status:** Approved for implementation (v2.0) — Open Questions resolved by
human review below.
**Source documents:** `Goals/ORG_Chart/0.Enterprise_Org_Chart_Overview.md`,
`Goals/ORG_Chart/1.BD_Kinh_Doanh_Org_Design.md`,
`Goals/ORG_Chart/2.Delivery_Ky_Thuat_Org_Design.md`,
`Goals/ORG_Chart/3.RD_Doi_Moi_Sang_Tao_Org_Design.md`,
`Goals/ORG_Chart/4.ESG_Van_Hanh_Xanh_Org_Design.md`,
`Goals/ORG_Chart/5.Nhan_Su_Quan_Tri_Org_Design.md`
**Existing implementation:** `src/pages/OrgChartPage.tsx`,
`src/content/orgChart.ts`, `src/index.css` (`.org-tree`), routed at
`/org-chart` (see `specs/Org_Chart/plan.md`, `tasks.md` for v1.0's delivery)

## Changelog

- **v1.0 (implemented):** static tree (Company → Department → Role/sub-role),
  always-visible reporting lines, hover panels on the company node (SMART
  Objective) and each department head node (Key Results + Value Stream).
- **v2.0 (this document):** adds click-driven expand/collapse per
  department, showing/hiding that department's employees. Hover panels from
  v1.0 are **not** removed — see Assumption 4.

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

## Tech Stack

- React 18 + TypeScript (strict) — no change from v1.0
- Local component state (`useState<Record<string, boolean>>` or one
  `useState<boolean>` per department instance) for expand/collapse — no
  routing/query-string state, no global state library
- Tailwind CSS for the toggle button and layout; reuses the existing
  `.org-tree` CSS connector rules in `src/index.css`
- No new npm dependency (Assumption 6/7)

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

## Open Questions

None outstanding — all 4 questions from the draft resolved above. Ready to
proceed to Plan phase.
