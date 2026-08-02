# Implementation Plan: Request Demo Screen

Based on: `specs/Request_Demo_Screen/Request_Demo_Screen_Spec.md`

## 1. Major Components & Dependencies

```
1. Constants module (Formspree endpoint, free-email blocklist, decision-maker
   keywords, target-account/competitor lists, scoring weights, thresholds)
   └─ no dependencies, must be first — single source of truth (Boundaries §12)

2. Pure validators & scoring functions (email domain check, phone
   E.164-ish normalization, lead-score calculator, lead-grade mapper)
   └─ depends on (1); unit-testable in isolation, no React/DOM

3. RequestDemo form component — field rendering + client-side validation
   (no submission yet)
   └─ depends on (2) for validators; reuses existing Contact.tsx styling
      conventions (Section 12 Code Style)

4. Submission handling — fetch() to Formspree, loading/disabled state,
   success confirmation panel, error banner (422 + network failure paths)
   └─ depends on (3)

5. Honeypot (_gotcha) + hidden fields (_subject, UTM, leadScore, leadGrade)
   └─ depends on (2) for score/grade, (3) for field wiring — folded into
      the same component, not a separate slice

6. App wiring — nav entry + section mount in App.tsx
   └─ depends on (4)

7. Tests (unit for validators/scoring, component for rendering/validation,
   integration for mocked-fetch submit paths)
   └─ written alongside (2)-(4), not after
```

## 2. Implementation Order (vertical slices)

1. **Slice 0 — Constants & types.** Create `src/content/requestDemo.ts`
   (or `src/lib/requestDemo.ts`) with the Formspree endpoint constant,
   field option lists (Section 4 selects), free-email blocklist,
   decision-maker keywords, scoring weights/thresholds (Section 7), and the
   `RequestDemoFormData` TypeScript type matching Section 8's payload shape.
2. **Slice 1 — Pure validators & scoring.** Implement and unit-test:
   `isBlockedEmailDomain`, `normalizePhone`/`isValidPhone`,
   `calculateLeadScore`, `gradeFromScore`. No component code yet.
3. **Slice 2 — Static form skeleton.** Build `RequestDemo.tsx` rendering all
   fields from Section 4 (uncontrolled → controlled inputs, no submit logic
   yet), styled per Section 12 Code Style. Section renders standalone; not
   yet wired into `App.tsx`. Component test checks all fields/labels render.
4. **Slice 3 — Client-side validation & submit gating.** Wire validators
   from Slice 1 into the form: inline errors, submit button disabled until
   required fields + consent valid, first-invalid-field focus on submit
   attempt. Component tests for each validation rule.
5. **Slice 4 — Formspree submission + confirmation/error states.** Add
   `fetch()` POST on valid submit (loading state, disabled button), success
   confirmation panel replacing the form, `422` error banner preserving
   entered data, network-failure banner with fallback email. Mock `fetch`
   in tests for all three response paths.
6. **Slice 5 — Hidden fields & honeypot.** Add `_gotcha` (visually hidden),
   `_subject`, UTM capture from `location.search`, and computed
   `leadScore`/`leadGrade` into the submitted payload.
7. **Slice 6 — App integration.** Add `{ id: "request-demo", label:
   "Request a Demo" }` to `src/content/navigation.ts`; mount `<RequestDemo
   />` in `App.tsx` (after `Contact`, since it's a conversion action distinct
   from the professional-links section — confirm order is acceptable or
   adjust). Manual scroll/nav check.
8. **Slice 7 — Accessibility & responsiveness pass.** Verify labels/
   `aria-*`, focus states, keyboard-only completion, and no horizontal
   scroll/overlap at 375/768/1440px breakpoints (matches parent spec's
   Success Criteria).

## 3. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| No backend means rate-limiting/dedup/scoring can't be authoritative (spec §5, §7, §12 Q1) | Explicitly scoped as accepted risk; implement scoring as a clearly-labeled client-side triage hint only, not gated logic that blocks submission. |
| Formspree free-plan submission cap unknown (spec §13 Q6) | Not a code concern for this implementation; note fallback contact email in the error banner so no lead is silently lost if the endpoint ever rejects due to cap. |
| Honeypot field accidentally visible or styled inconsistently, defeating its purpose | Use `aria-hidden="true"` + off-screen CSS (not `display:none` alone, to avoid some bots detecting it) and a name attribute exactly `_gotcha` per Formspree convention; add a component test asserting it's present and empty by default. |
| Introducing a new input-styling convention inconsistently across 21 fields | Slice 2 defines one shared Tailwind class string/constant for text/select/textarea inputs and reuses it everywhere, per Boundaries §12. |
| Mixing "Always mock fetch" rule violation in tests, causing real network calls in CI | Slice 4 tests explicitly stub `global.fetch`; add a lint/review check that no test file omits the mock. |
| Scope creep into CRM/backend/rate-limiting (out of scope per spec §2) | Plan stops at Slice 7; anything beyond (Phase 2 items in spec §12 Q1) is explicitly not built now. |

## 4. Parallelizable vs. Sequential

- **Sequential (must be in order):** Slice 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7
  (each slice's tests depend on the previous slice's code existing).
- **Parallelizable:** Slice 7 (accessibility/responsiveness) checks can be
  done incrementally after Slice 2 rather than only at the end, but is
  listed last as a dedicated verification pass to avoid missing anything.

## 5. Verification Checkpoints

- **After Slice 1:** `npm test -- requestDemo` (validators/scoring unit
  tests) passes with no component code involved.
- **After Slice 2:** `npm run dev` shows the form with all fields; no
  submit wiring yet; component test passes.
- **After Slice 3:** manual check — required fields empty → submit stays
  disabled; invalid work email shows inline error; consent unchecked blocks
  submit with no network call (assert via fetch spy = not called).
- **After Slice 4:** mocked-fetch tests cover success/422/network-error
  paths; manual check via dev server with a temporary stubbed fetch or a
  real (test) Formspree submission if desired.
- **After Slice 6:** manual check — nav link scrolls to `#request-demo`;
  section appears in correct place in the page flow.
- **After Slice 7:** resize to 375/768/1440px, confirm no overflow; tab
  through the entire form with keyboard only.
- **Final:** `npm run build && npm test && npm run lint` all pass; every
  Acceptance Criterion in spec Section 11 manually checked off.
</content>
