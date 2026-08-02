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

---

## 6. Delta Plan: Spec v1.3 Field Changes (post-implementation update)

The screen above (Sections 1–5) was fully implemented per spec v1.0/v1.1.
The spec has since moved to **v1.3**, which:
- **Removes** "Current Database / Platform" (`currentPlatform`), "Data
  Volume (approx.)" (`dataVolume`), and "Primary Use Case / Interest"
  (`useCases`) — the last of which is currently a **required** field wired
  into `REQUIRED_FIELD_ORDER` and blocking-validation.
- **Adds** an optional "Project & Solution Details" block (spec §4, fields
  #15–22): Customer Industry, Project Name, Solution Type of Interest,
  Current Situation, Business Challenges, Objectives, Integrations Needed,
  Special Requirements.
- **Changes** the Lead Quality Scoring formula (spec §7): removes the
  "Data Volume ≥ 1TB" and "competitor platform" criteria (−20 points max).

This section plans the **code delta** required to bring the existing
implementation back in sync with spec v1.3, following the same vertical-
slice discipline as Sections 1–5.

### 6.1 Dependency Graph

```
1. content/requestDemo.ts (types, options, scoring weights)
   └─ no dependencies, must be first — every other file imports from here

2. lib/requestDemo.ts (validators, scoring, payload builder) + its tests
   └─ depends on (1) for updated types/constants

3. sections/RequestDemo.tsx — remove deprecated field JSX
   └─ depends on (1) for updated types, (2) for validators no longer
      referencing removed fields

4. sections/RequestDemo.tsx — add new Project & Solution Details JSX
   └─ depends on (1) for new option constants; independent of (3) but
      sequenced after it to avoid touching the same file twice in parallel

5. sections/RequestDemo.test.tsx — update/add tests
   └─ depends on (3) and (4)

6. Full regression pass (build/lint/test, spec acceptance criteria)
   └─ depends on (1)-(5)
```

### 6.2 Implementation Order (vertical slices)

1. **Slice A — Constants & types delta.** In `src/content/requestDemo.ts`:
   remove `CURRENT_PLATFORM_OPTIONS`/`CurrentPlatform`,
   `DATA_VOLUME_OPTIONS`/`DataVolume`, `USE_CASE_OPTIONS`/`UseCase`, and
   `COMPETITOR_PLATFORMS`; remove `currentPlatform`, `currentPlatformOther`,
   `dataVolume`, `useCases` from `RequestDemoFormData` and `currentPlatform`,
   `dataVolume`, `useCases` from `RequestDemoPayload`; remove
   `highDataVolume`/`competitorPlatform` from `LEAD_SCORE_WEIGHTS`. Add new
   option lists (`CUSTOMER_INDUSTRY_OPTIONS`, `SOLUTION_TYPE_OPTIONS`,
   `INTEGRATIONS_NEEDED_OPTIONS`, `SPECIAL_REQUIREMENTS_OPTIONS`) and new
   optional fields on both `RequestDemoFormData` and `RequestDemoPayload`
   (`customerIndustry(+Other)`, `projectName`, `solutionType(+Other)`,
   `currentSituation`, `businessChallenges`, `objectives`,
   `integrationsNeeded(+Other)`, `specialRequirements(+Other)`).
2. **Slice B — Scoring & validation delta.** In `src/lib/requestDemo.ts`:
   delete `isHighDataVolume`/`isCompetitorPlatform` and their contribution
   in `calculateLeadScore`; remove `'useCases'` from `REQUIRED_FIELD_ORDER`
   and its required-check in `validateRequestDemoForm`; update
   `buildRequestDemoPayload` to stop mapping removed fields and start
   mapping the new optional fields (`null`/`[]` when blank, per spec §8).
   Update `src/lib/requestDemo.test.ts`: remove assertions on deleted
   functions/fields, adjust `calculateLeadScore` max-score test to the new
   ceiling, add tests for the new payload fields' optional pass-through.
3. **Slice C — Remove deprecated UI.** In `src/sections/RequestDemo.tsx`:
   delete the "Current Database / Platform" select + "Other" input block,
   the "Data Volume (approx.)" select block, and the "Primary Use Case /
   Interest" `<fieldset>` (plus `toggleUseCase`, the `useCases` branch in
   `focusField`, and the corresponding `initialFormData` keys).
4. **Slice D — Add Project & Solution Details UI.** In the same file: add
   the 8 new fields (#15–22) using the existing shared input/select/
   textarea/checkbox style constants, all optional, none wired into
   `REQUIRED_FIELD_ORDER`/blocking validation.
5. **Slice E — Test updates.** In `src/sections/RequestDemo.test.tsx`:
   remove tests asserting the deleted fields render/validate; add tests
   asserting the new fields render with labels, remain optional (submission
   succeeds with them empty), and their values reach the mocked-fetch
   payload when filled in.
6. **Slice F — Full regression.** Run `npm run build && npm test && npm run
   lint`; manually re-check spec §11 acceptance criteria, including the two
   new v1.2/v1.3-specific criteria (fields optional-by-default, removed
   fields/keys absent from UI and payload).

### 6.3 Risks & Mitigations

| Risk | Mitigation |
|---|---|
| `useCases` removal changes required-field count/order, breaking existing "first invalid field" focus tests | Slice B updates `REQUIRED_FIELD_ORDER` and Slice E updates the focus-order test in the same pass; run the full `RequestDemo.test.tsx` suite before moving to Slice C. |
| Silent scoring regressions (max score changes from 100 to a lower ceiling before capping) since `Math.min(score, 100)` was already a cap | Slice B's test update explicitly asserts the new uncapped sum for an all-criteria-met submission, not just that it's `<= 100`. |
| New optional multi-select fields (`integrationsNeeded`, `specialRequirements`) accidentally introduce inconsistent state shape vs. existing `useCases` pattern being removed | Reuse the exact same checkbox-group + toggle-function pattern being deleted in Slice C, applied to the new fields in Slice D, so the codebase doesn't invent a second pattern. |
| Forgetting to remove a reference to a deleted export causes a TS build failure discovered late | Run `npx tsc --noEmit` after Slice A and again after Slice B/C, not only at the end. |
| Scope creep: implementing scoring bonuses for the new fields (spec §13 Q7, unresolved) | Explicitly out of scope for this delta — new fields are payload-only, not scoring inputs, per spec §7 "unchanged in v1.2/v1.3" note. |

### 6.4 Verification Checkpoints

- **After Slice A:** `npx tsc --noEmit` fails loudly everywhere a removed
  export is still referenced — expected at this point; proceed to fix in
  Slices B–D.
- **After Slice B:** `npx tsc --noEmit` passes for `lib/`; `npm test --
  requestDemo` (lib tests) green in isolation before touching the component.
- **After Slice D:** `npx tsc --noEmit` passes project-wide; `npm run dev`
  renders the form with deprecated fields gone and new fields present.
- **After Slice E:** `npm test -- RequestDemo` green (component tests).
- **Final (Slice F):** `npm run build && npm test && npm run lint` all
  green; spec §11 acceptance criteria re-verified, including the new
  removal/optionality criteria.

