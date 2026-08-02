# Task Breakdown: Request Demo Screen

Based on: `specs/Request_Demo_Screen/Request_Demo_Screen_Spec.md`,
`specs/Request_Demo_Screen/plan.md`

## Overview

Each task is one increment per `incremental-implementation`: implement,
test, verify, commit, before moving to the next. No task changes more than
~5 files. Tasks are ordered by dependency (validators before the component
that uses them, static form before submission wiring, submission before app
integration).

## Architecture Decisions

- No backend: all validation, scoring, and rate/dedup logic are client-side
  only (spec §5, §7, §12 — accepted risk, not re-litigated per task).
- Formspree endpoint (`https://formspree.io/f/mlgqyaql`) lives in exactly
  one constants file — never duplicated or inlined elsewhere (Boundaries).
- Follows existing repo conventions: PascalCase components, named exports,
  Tailwind-only styling, colocated `*.test.tsx`, Vitest + RTL.
- `global.fetch` is always mocked in tests — never a live call to Formspree.

---

## Phase 1: Foundation (constants, types, validators)

### Task 1: Constants, types, and option lists

**Description:** Create the single source of truth for the Formspree
endpoint, field option lists (country/company-size/timeline/etc. from spec
Section 4), free-email blocklist, decision-maker keywords, scoring
weights/thresholds (Section 7), and the `RequestDemoFormData` /
`RequestDemoPayload` TypeScript types matching Section 8's payload shape.

**Acceptance criteria:**
- [x] `FORMSPREE_ENDPOINT` exported once, value `https://formspree.io/f/mlgqyaql`.
- [x] All select-field option lists from Section 4 are exported as typed arrays/enums.
- [x] Scoring weights/thresholds from Section 7 are named constants (no magic numbers).
- [x] `RequestDemoFormData` type covers every field in Section 4; `RequestDemoPayload` matches Section 8 JSON shape.

**Verification:**
- [x] `npx tsc --noEmit` passes (types compile).

**Dependencies:** None

**Files likely touched:**
- `src/content/requestDemo.ts`

**Estimated scope:** S

---

### Task 2: Pure validators and lead-scoring functions

**Description:** Implement framework-free functions: `isBlockedEmailDomain`,
`normalizePhone`/`isValidPhone`, `calculateLeadScore`, `gradeFromScore`,
using Task 1's constants.

**Acceptance criteria:**
- [x] `isBlockedEmailDomain('x@gmail.com')` → `true`; company domain → `false`.
- [x] `normalizePhone` rejects unparseable numbers, normalizes valid ones.
- [x] `calculateLeadScore` sums weights per Section 7 table exactly.
- [x] `gradeFromScore` returns `'hot' | 'warm' | 'cold'` per thresholds (≥70 / 40–69 / <40).

**Verification:**
- [x] `npm test -- requestDemo` passes with unit tests covering each function's happy path + one edge case.

**Dependencies:** Task 1

**Files likely touched:**
- `src/lib/requestDemo.ts`, `src/lib/requestDemo.test.ts`

**Estimated scope:** M

---

### Checkpoint: Foundation
- [x] `npm test`, `npx tsc --noEmit` pass
- [x] No React/component code yet — pure logic only
- [x] Review with human before proceeding to Phase 2

---

## Phase 2: Form Component (vertical slices)

### Task 3: Static form skeleton — all fields, no submission

**Description:** Build `RequestDemo.tsx` (`id="request-demo"`) rendering
all 17 visible fields from spec Section 4 as controlled inputs, styled with
one shared input-class constant per Boundaries §12 (reuse `Contact.tsx`
section-wrapper/button conventions for heading/CTA). No submit handler,
no validation yet — just state + rendering.

**Acceptance criteria:**
- [x] All 17 visible fields render with visible `<label>`s.
- [x] Section wrapper/heading style matches `Contact.tsx` conventions.
- [x] Shared input/select/textarea class constant used for every field (no per-field one-off styles).

**Verification:**
- [x] Test passes: `npm test -- RequestDemo` (asserts every field label present).
- [x] Manual check: `npm run dev`, section renders standalone with no console errors.

**Dependencies:** Checkpoint: Foundation

**Files likely touched:**
- `src/sections/RequestDemo.tsx`, `src/sections/RequestDemo.test.tsx`

**Estimated scope:** L

---

### Task 4: Client-side validation and submit gating

**Description:** Wire Task 2's validators into the form: inline error
messages, Submit button visually indicates invalid state (dimmed,
`aria-disabled`) while any required field is invalid, and clicking it always
runs validation — blocking actual submission and focusing the first invalid
field when the form is invalid, submitting when valid. (Implementation
note: the button intentionally does not use the native `disabled` attribute,
since that would also block the click-to-validate/focus behavior required
by spec Section 11's acceptance criteria.)

**Acceptance criteria:**
- [x] Submit button is visually dimmed while any required field is empty/invalid or consent unchecked.
- [x] Blocklisted work-email domain shows the exact inline error from Section 5.
- [x] Consent unchecked → submit blocked, no network call attempted.
- [x] Blocked submit focuses the first invalid field.

**Verification:**
- [x] Test passes: `npm test -- RequestDemo` (new cases: disabled state, inline errors, focus-on-invalid, consent gate with fetch-not-called assertion).

**Dependencies:** Task 3

**Files likely touched:**
- `src/sections/RequestDemo.tsx`, `src/sections/RequestDemo.test.tsx`

**Estimated scope:** M

---

### Task 5: Honeypot and hidden fields

**Description:** Add the `_gotcha` honeypot (off-screen, `aria-hidden`,
exact field name required by Formspree), `_subject`, UTM capture from
`location.search`, and placeholders for `leadScore`/`leadGrade` (values
wired in Task 6) into the form's internal payload state.

**Acceptance criteria:**
- [x] `_gotcha` input is present, empty by default, visually hidden but present in the DOM/payload.
- [x] `_subject` is a static string per Section 4.
- [x] UTM fields are parsed from `window.location.search` on mount (`utm_source`, `utm_medium`, `utm_campaign`), default `null` if absent.

**Verification:**
- [x] Test passes: `npm test -- RequestDemo` (asserts `_gotcha` present+empty, UTM parsed from a mocked URL).

**Dependencies:** Task 4

**Files likely touched:**
- `src/sections/RequestDemo.tsx`, `src/sections/RequestDemo.test.tsx`

**Estimated scope:** S

---

### Task 6: Formspree submission, confirmation, and error states

**Description:** On valid submit, compute `leadScore`/`leadGrade` (Task 2),
POST the full payload to `FORMSPREE_ENDPOINT` via `fetch` (Section 6/8),
show a loading/disabled submit state, replace the form with the
confirmation panel on success, show a non-blocking error banner (preserving
entered data) on `422` or network failure.

**Acceptance criteria:**
- [x] Submit button shows loading state and is disabled while the request is in flight.
- [x] On success (`res.ok`), form is replaced with the confirmation copy from Section 6.
- [x] On `422`, an error banner is shown, entered field values are preserved, retry is possible.
- [x] On network failure, a retry-safe banner with a fallback contact email is shown.
- [x] Payload includes `leadScore`/`leadGrade` computed via Task 2.

**Verification:**
- [x] Test passes: `npm test -- RequestDemo` (three mocked-fetch cases: success / 422 / network error — `global.fetch` always mocked, never real).

**Dependencies:** Task 5

**Files likely touched:**
- `src/sections/RequestDemo.tsx`, `src/sections/RequestDemo.test.tsx`

**Estimated scope:** L

---

### Checkpoint: Form Component
- [x] `npm test`, `npm run lint`, `npx tsc --noEmit` all pass
- [x] Full form usable end-to-end in `npm run dev` (manual mocked/test submission)
- [x] Review with human before proceeding to Phase 3

---

## Phase 3: Integration

### Task 7: App wiring — nav entry and section mount

**Description:** Add `{ id: "request-demo", label: "Request a Demo" }` to
`src/content/navigation.ts` and mount `<RequestDemo />` in `App.tsx`.

**Acceptance criteria:**
- [x] Nav shows a "Request a Demo" link that scroll-links to `#request-demo`.
- [x] Section appears in `App.tsx`'s `<main>` in a sensible position (after `Contact`, unless directed otherwise).

**Verification:**
- [x] Test passes: `npm test -- Nav` (existing Nav test still covers the new item, or extend it).
- [x] Manual check: click the nav link, confirm smooth-scroll to the section.

**Dependencies:** Checkpoint: Form Component

**Files likely touched:**
- `src/content/navigation.ts`, `src/App.tsx`

**Estimated scope:** XS

---

### Task 8: Accessibility and responsiveness pass

**Description:** Verify WCAG 2.1 AA basics (labels, focus states,
keyboard-only completion, screen-reader-announced errors) and responsive
layout at 375/768/1440px, per spec Section 10.

**Acceptance criteria:**
- [x] Every field reachable and operable via keyboard only (Tab/Shift+Tab, Enter to submit).
- [x] Inline errors use `aria-invalid`/`aria-describedby` or equivalent so screen readers announce them.
- [x] No horizontal scroll or overlapping/clipped content at 375/768/1440px.

**Verification:**
- [x] Manual check: keyboard-only walkthrough of the full form.
- [x] Manual check: resize browser to the three breakpoints.

**Dependencies:** Task 7

**Files likely touched:**
- `src/sections/RequestDemo.tsx`

**Estimated scope:** S

---

### Checkpoint: Complete
- [x] All Acceptance Criteria in spec Section 11 verified manually or via test
- [x] `npm run build && npm test && npm run lint` green
- [x] Ready for human final review

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Real network call to Formspree accidentally made in CI | Medium | Task 6 tests always mock `global.fetch`; reviewed at Checkpoint: Form Component |
| Honeypot implemented incorrectly (wrong field name, or actually hidden from bots via easily-detected `display:none`) | Low | Task 5 uses exact `_gotcha` name and off-screen CSS technique, with a dedicated test |
| Input styling drifts per-field, inconsistent with rest of site | Medium | Task 3 defines one shared class constant before any field is built |
| Scope creep into backend/CRM/rate-limiting work (explicitly out of scope) | Medium | Plan and tasks stop at Task 8; anything else routed to spec §13 open questions, not built |
| Accessibility issues found late, requiring rework across many fields | Medium | Task 8 is a dedicated pass, but basic labels/focus states are already required in Task 3/4 acceptance criteria, not deferred entirely |

## Open Questions

None blocking implementation — see `Request_Demo_Screen_Spec.md` Section 13
for unresolved business/ops questions (notification email owner, Formspree
plan cap, integrations) that don't block building the screen itself.
</content>
