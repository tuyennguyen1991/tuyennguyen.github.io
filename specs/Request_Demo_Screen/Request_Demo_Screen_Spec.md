---
Screen ID: SCR-DEMO-REQ-01
Screen Name: Request a Demo
Department: Business Department (Sales)
Owner: Business Department (Sales)
Version: v1.3
Status: Draft
Integration: Formspree (static-site form backend)
Formspree Endpoint: https://formspree.io/f/mlgqyaql
---

# Spec: Request Demo Screen (Lead Generation)

## 1. Objective

Give prospective customers a simple form to request a live demo of our database
software. The site is a **fully static** React/Vite app (GitHub Pages hosting,
no custom backend — see `specs/personal-website/spec.md` boundaries), so form
submissions are sent directly to **Formspree**, which handles delivery,
storage, and email notification without requiring us to run or maintain a
server.

**User story:**
> As a website visitor evaluating database software, I want to request a demo
> by submitting my contact and company details, so that a sales rep can
> follow up with a relevant, well-prepared demo.

> As a DB department sales rep, I want every demo request delivered to my
> inbox (via Formspree) with enough detail and a computed priority signal, so
> that I can prioritize follow-up and skip low-quality/spam submissions.

> As a prospect with a complex, custom-software or logistics/bidding-platform
> need (e.g. an enterprise evaluating a bespoke system, not just a database
> demo), I want to optionally describe my current situation, challenges,
> objectives, and technical/integration requirements in the same form, so
> that the sales/solutioning team receives enough context to scope a
> meaningful first conversation instead of a generic demo slot.

This v1.2 update added an optional **Project & Solution Details** block
(Section 4, fields 15–22 as of v1.3) so the same form can capture richer
enterprise intake information — modeled on real custom-software/logistics
engagements (e.g. a manufacturing/trading customer needing a logistics +
bidding management platform) — without adding friction to the simple,
existing DB demo-request flow. These fields are entirely optional.

v1.3 removes three database-specific fields ("Current Database / Platform",
"Data Volume (approx.)", "Primary Use Case / Interest") that no longer fit
the broadened scope now that this form also serves non-database, custom-
software/logistics prospects — see Section 4 for details.

## 2. Scope

**In scope:** the public-facing "Request a Demo" form screen/section, client-
side validation, submission to the Formspree endpoint
(`https://formspree.io/f/mlgqyaql`) via `fetch`/AJAX, a client-computed lead
score included in the submission payload, and Formspree-native notification
setup (email; optional Zapier/Slack/Google Sheets connectors configured in
the Formspree dashboard — no code required).

**Out of scope:** a custom backend/lead API, server-side rate limiting or
duplicate detection (not possible without a server — see Section 5 and
Section 12), CRM configuration beyond what Formspree's no-code integrations
support, the actual demo delivery/scheduling call, and marketing automation
nurture flows.

## 3. Screen Layout

| Zone | Content |
|---|---|
| Header | Product/DB solution name + short value proposition (1 line) |
| Left/top panel | Benefit bullets ("Why request a demo") — optional, marketing-owned |
| Form panel | The lead-capture form (see Section 4), submitting to Formspree |
| Footer | Privacy notice + link to Privacy Policy, consent checkbox |
| Post-submit state | Confirmation message replacing the form (see Section 6) |

Implemented as `src/sections/RequestDemo.tsx` (`id="request-demo"`), composed
in `App.tsx` and linked from `src/content/navigation.ts`, following the same
pattern as the existing `Contact` section.

Wireframe detail (exact visual layout, colors, spacing) is owned by UI/UX and
tracked separately; this spec defines fields, behavior, validation, and data
contract only.

## 4. Input Fields

| # | Field | Type | Required | Validation | Notes |
|---|---|---|---|---|---|
| 1 | Full Name | text | Yes | 2–80 chars, letters/spaces/hyphen only | |
| 2 | Work Email | email | Yes | Valid email format; **reject free/personal domains** (gmail.com, yahoo.com, hotmail.com, outlook.com, icloud.com — configurable blocklist) | Primary dedup key (manual, see Section 5) |
| 3 | Phone Number | tel | Yes | E.164-normalizable; 8–15 digits; country code selector defaults to visitor's locale | |
| 4 | Company Name | text | Yes | 2–120 chars | |
| 5 | Job Title | text | Yes | 2–80 chars | Used for decision-maker scoring |
| 6 | Country | select | Yes | ISO country list | |
| 7 | Company Size | select | Yes | Ranges: 1–50, 51–200, 201–1000, 1000+ | |
| 8 | Project Timeline | select | Yes | Immediate (0–1 month), 1–3 months, 3–6 months, 6+ months, Just researching | Urgency scoring input |
| 9 | Budget Range | select | No | <$10k, $10k–$50k, $50k–$200k, >$200k, Not disclosed | Optional — do not block submission if omitted |
| 10 | Preferred Demo Date/Time | date/time picker | No | Must be a future business day/time in visitor's timezone | Optional convenience field |
| 11 | Message / Requirements | textarea | No | Max 1000 chars | Free text, spam-filtered |
| 12 | How did you hear about us? | select | No | Search, Referral, Event, Social, Ad, Other | Marketing attribution |
| 13 | Consent (Privacy/GDPR) | checkbox | Yes | Must be checked to submit | Blocks submit if unchecked |
| 14 | Marketing opt-in | checkbox | No | Unchecked by default | Separate from required consent |
| 15 | Customer Industry | select + "Other" free text | No | Options: Manufacturing, Automotive, Trading & Logistics, Retail, Technology, Financial Services, Healthcare, Other | Broader enterprise context beyond company size/platform |
| 16 | Project Name | text | No | Max 120 chars | Internal working name, if the prospect already has one |
| 17 | Solution Type of Interest | select + "Other" free text | No | Options: Custom Software Development, Logistics Management, Bidding/Procurement Management, Workflow/Approval Automation, Database Solution, Other | Higher-level solution category the prospect is evaluating |
| 18 | Current Situation | textarea | No | Max 2000 chars | Describes current manual/legacy process (e.g. email/spreadsheet-based coordination) |
| 19 | Business Challenges | textarea | No | Max 2000 chars | Pain points prompting the request |
| 20 | Objectives | textarea | No | Max 2000 chars | Desired outcomes of the new system |
| 21 | Integrations Needed | multi-select + "Other" free text | No | Options: SharePoint, SSO, MFA, ERP, WMS, Existing internal approval systems, Other | Systems the new solution must connect to |
| 22 | Special Requirements | multi-select + "Other" free text | No | Options: Document centralization, Vendor/external portal access, Quote encryption & secure bidding, Dashboard/KPI reporting, Audit logging & security monitoring, Role-based access control, SSO/MFA authentication, Multi-language (EN/VI) support, Other | Non-functional/compliance asks |
| 23 (hidden) | `_subject` | hidden field | No | Static string, e.g. "New Demo Request" | Formspree native — sets email subject |
| 24 (hidden) | UTM parameters | hidden fields | No | Captured from URL query string | Attribution, included in payload |
| 25 (hidden) | `_gotcha` | hidden text input | No | Must remain empty | Formspree's built-in honeypot field name — do **not** rename |
| 26 (hidden) | `leadScore` / `leadGrade` | hidden fields | No | Computed client-side (see Section 7) | Sent so the rep sees priority directly in the Formspree email/dashboard row |

**Removed in this update:** "Current Database / Platform", "Data Volume
(approx.)", and "Primary Use Case / Interest" (formerly fields #8–10) have
been dropped — the newer, broader "Solution Type of Interest" (#17) and
free-text "Current Situation"/"Objectives" fields (#18, #20) now cover this
intent without forcing a database-specific choice.

Fields 15–22 (**Project & Solution Details**) remain entirely optional and
are not part of any required-field validation, lead-scoring formula
(Section 7), or acceptance criteria beyond "must not block submission when
empty" and "must be included in the payload when provided" (see Section 11).

## 5. Validation Rules

- All "Required" fields must be non-empty and pass their format rule before
  the **Submit** button is enabled (client-side). Because there is no
  application backend, **Formspree is the only server-side layer**; it
  performs its own minimal validation (e.g. malformed email → `422`) but does
  **not** enforce our business rules (free-domain blocklist, phone format,
  consent) — those are client-side only in v1. See
  Section 12 for the residual-risk discussion.
- Work Email: reject if domain is on the free-email blocklist → show inline
  error "Please use your company email address."
- Phone Number: normalize to E.164 on submit; reject unparseable numbers.
- Honeypot field (`_gotcha`) non-empty → Formspree silently discards the
  submission server-side (returns success to the caller, no email/record
  created); the client does not need any special handling beyond rendering
  the field visually hidden.
- **Rate limiting:** not implementable client-side and not available on our
  Formspree plan without a paid tier; treated as an accepted risk for v1 (see
  Section 12). Formspree's own account-level abuse protection and reCAPTCHA
  provide a baseline.
- **Duplicate detection:** not possible without a backend/database in v1;
  repeat submissions from the same email simply create additional Formspree
  entries. Sales reps de-duplicate manually from the Formspree dashboard/
  inbox. Automating this is tracked as a Phase 2 item (Section 12).
- Consent checkbox unchecked → block submit with inline error, no network
  call is made.

## 6. Submission Flow & Confirmation

1. User fills form → clicks **Request Demo**.
2. Client-side validation runs; first invalid field is focused with inline
   error text.
3. On valid submit, the client computes the lead score/grade (Section 7) and
   POSTs JSON directly to Formspree:

   ```js
   const res = await fetch("https://formspree.io/f/mlgqyaql", {
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
     },
     body: JSON.stringify(payload), // see Section 8
   });
   const data = await res.json();
   ```

4. While pending: submit button shows a loading state and is disabled
   (prevents double-submit).
5. On success (`res.ok`, `{ "ok": true }`): form is replaced with a
   confirmation panel:
   > "Thanks, [First Name]! Your request has been received. A [Product] specialist
   > will contact you within 1 business day to schedule your demo."
   Includes a link back to the homepage/resources.
6. On failure (`res.status === 422` with an `errors` array, or a network
   error): show a non-blocking error banner above the form, keep entered data
   intact, allow retry. Map any field-level `errors[].field` back to the
   corresponding input where possible; otherwise show a generic message.
7. There is no bot/rate-limit-specific response path to branch on: Formspree
   returns a normal success response even when it silently drops a
   honeypot-flagged submission, so the client always shows the standard
   success confirmation in that case (this is intentional — see Section 5).

## 7. Lead Quality Scoring (Business Rules)

Every submission is scored 0–100 **client-side at submit time** (no backend
to do this server-side) so sales can prioritize by quality, not just
recency. The score and grade are sent as extra hidden fields in the Formspree
payload so they're visible directly in the notification email/dashboard row.

| Criterion | Points |
|---|---|
| Work email domain matches a known target-account domain list | +20 |
| Job Title matches decision-maker keywords (Director, VP, Head, CTO, CIO, Manager, Owner, Founder) | +15 |
| Company Size ≥ 201 | +10 |
| Project Timeline = "Immediate" or "1–3 months" | +20 |
| Budget Range provided and ≥ $10k | +15 |
| Country is in the department's active sales territory list | +5 |
| Preferred Demo Date/Time provided | +5 |

**Removed in this update:** the "Data Volume ≥ 1TB" (+10) and "Current
Database/Platform is a known migration-target competitor product" (+10)
criteria are dropped along with their source fields; maximum achievable
score (excluding the repeat-request bonus) decreases accordingly. This is a
scoring-formula change and must be re-implemented in `calculateLeadScore`
(currently in `src/lib/requestDemo.ts`) alongside the field removal.

**Grading (informational only in v1 — no automated routing):**
- **Hot (≥70):** flagged `leadGrade: "hot"` in the payload/email subject
  prefix so reps can spot it at a glance; target first-contact within 4
  business hours (manual, rep-driven).
- **Warm (40–69):** standard SLA first-contact within 1 business day.
- **Cold (<40):** routed to nurture/marketing follow-up at the rep's
  discretion.
- Because there is no server, this scoring cannot be recalculated or audited
  centrally — it is computed once in the browser and trusted as sent. Treat
  it as a triage hint, not an authoritative record.

## 8. Data Contract (Formspree)

`POST https://formspree.io/f/mlgqyaql`

Headers: `Accept: application/json`, `Content-Type: application/json`

Request body (field names match Section 4 order):
```json
{
  "fullName": "string",
  "workEmail": "string",
  "phone": "string",
  "companyName": "string",
  "jobTitle": "string",
  "country": "string (ISO-3166 alpha-2)",
  "companySize": "1-50 | 51-200 | 201-1000 | 1000+",
  "timeline": "immediate | 1-3m | 3-6m | 6m+ | researching",
  "budgetRange": "string | null",
  "preferredDemoAt": "ISO-8601 datetime | null",
  "message": "string | null",
  "referralSource": "string | null",
  "marketingOptIn": "boolean",
  "consent": "boolean (must be true)",
  "customerIndustry": "string | null",
  "projectName": "string | null",
  "solutionType": "string | null",
  "currentSituation": "string | null",
  "businessChallenges": "string | null",
  "objectives": "string | null",
  "integrationsNeeded": ["string"],
  "specialRequirements": ["string"],
  "utm_source": "string | null",
  "utm_medium": "string | null",
  "utm_campaign": "string | null",
  "leadScore": "integer 0-100",
  "leadGrade": "hot | warm | cold",
  "_subject": "New Demo Request",
  "_gotcha": "string (must remain empty)"
}
```

Fields `customerIndustry` through `specialRequirements` (Section 4, #15–22)
are all optional; send `null` (single-value fields) or `[]` (multi-select
fields) when the prospect leaves them blank — never omit the keys, so
Formspree/downstream consumers see a consistent shape.

Success response (`200 OK`):
```json
{ "ok": true }
```

Error response (`422 Unprocessable Entity`):
```json
{
  "errors": [
    { "field": "workEmail", "message": "Invalid email address", "code": "INVALID_EMAIL" }
  ]
}
```

Other errors: network failure/timeout (no response) → treat as a generic
retry-safe failure per Section 6, step 6.

## 9. Downstream Integration

- Formspree delivers each submission by email to the addresses configured
  in the Formspree dashboard for this form (Business Department (Sales)
  distribution list) — no application code required.
- Optional, no-code Formspree integrations (Zapier, Slack, Google Sheets,
  Mailchimp) can be enabled from the Formspree dashboard to push submissions
  to a spreadsheet/CRM/Slack channel; **configuring which integrations are
  enabled is an operational task owned by the Business Department (Sales)**,
  not part of this codebase.
- There is no automated territory-based rep assignment or CRM Lead-object
  creation in v1 (that requires either a paid Formspree plan's Zapier tier or
  a real backend) — tracked as a Phase 2 item in Section 12.
- Marketing attribution (UTM fields) is included in every submission so it's
  visible in the Formspree dashboard/email; dedicated analytics
  conversion-tracking (e.g., a client-side analytics event fired on success)
  can be added independently of Formspree.

## 10. Non-Functional Requirements

- **Performance:** form submit round-trip (client click → confirmation shown)
  under 2 seconds at p95 under normal load; this depends on Formspree's own
  latency/availability, which we do not control.
- **Availability:** the screen itself inherits GitHub Pages' static-hosting
  availability; submission availability depends on Formspree's uptime. If
  the Formspree endpoint is unreachable, show a fallback contact email in the
  error banner so no lead is ever lost silently.
- **Security/Privacy:** all traffic over HTTPS (both GitHub Pages and
  Formspree enforce HTTPS); no PII is stored by our own infrastructure since
  there is no backend — Formspree is the system of record for raw
  submissions, subject to Formspree's own data-retention/GDPR terms.
  GDPR/CCPA data-subject deletion requests must be routed to Formspree's
  account tools (delete the submission there), since we hold no copy.
- **Accessibility:** WCAG 2.1 AA — labeled inputs, visible focus states,
  keyboard-only completable, error messages announced to screen readers.
- **Responsiveness:** fully usable on mobile, tablet, desktop breakpoints,
  matching the rest of the site (375px, 768px, 1440px per
  `specs/personal-website/spec.md`).
- **i18n:** field labels and error messages support localization (at minimum
  English; other locales per marketing site scope).
- **Anti-abuse:** honeypot (`_gotcha`) is mandatory and must use that exact
  field name for Formspree to recognize it; Formspree's account-level
  reCAPTCHA/spam heuristics are the only additional layer available without
  a backend.

## 11. Acceptance Criteria

- [ ] Given all required fields are valid and consent is checked, when the
      user clicks Request Demo, then the payload is POSTed to
      `https://formspree.io/f/mlgqyaql` and a confirmation message is shown
      on a `200`/`{ ok: true }` response.
- [ ] Given the Work Email uses a blocklisted free domain, when the user
      blurs/submits the field, then an inline error is shown and the form
      cannot be submitted.
- [ ] Given the consent checkbox is unchecked, when the user clicks Request
      Demo, then submission is blocked client-side with an inline error and
      no network call is made.
- [ ] Given a required field is empty, when the user clicks Request Demo, then
      the first invalid field is focused and its specific error is shown.
- [ ] Given the `_gotcha` honeypot field is filled (bot), when submitted, then
      the request still resolves as a normal success to the client (per
      Formspree's behavior) and the standard confirmation is shown — no
      client-visible difference is expected or required.
- [ ] Given a valid submission, when it is sent, then `leadScore` and
      `leadGrade` are included in the payload, computed per Section 7.
- [ ] Given Formspree returns `422` with an `errors` array, when the response
      is received, then a non-blocking error banner is shown, entered data is
      preserved, and the user can retry.
- [ ] Given the Formspree endpoint is unreachable (network error), when the
      user submits, then a retry-safe error banner with a fallback contact
      email is shown and the user's entered data is not lost.
- [ ] Given the screen is navigated with keyboard only, when tabbing through
      all fields, then every field and the submit button are reachable and
      operable without a mouse.
- [ ] Given the site is built (`npm run build`), then the Formspree endpoint
      is not accidentally exposed as an editable/config value elsewhere and
      matches the one specified in this document.
- [ ] Given all Project & Solution Details fields (#15–22) are left empty,
      when the user submits an otherwise-valid form, then submission succeeds
      exactly as before v1.2 (these fields never block submission).
- [ ] Given one or more Project & Solution Details fields are filled in, when
      the form is submitted, then their values are included in the payload
      under the field names defined in Section 8, without altering
      `leadScore`/`leadGrade` (Section 7 is unchanged in v1.2).
- [ ] Given "Current Database / Platform", "Data Volume (approx.)", and
      "Primary Use Case / Interest" have been removed, when the form is
      rendered, then none of these fields, their options, or their former
      payload keys (`currentPlatform`, `dataVolume`, `useCases`) appear
      anywhere in the UI or the submitted JSON.

## 12. Implementation Notes (inherits `specs/personal-website/spec.md`)

This feature is built inside the existing site; it does not redefine the
project-wide conventions, only the parts specific to this screen.

**Commands** (unchanged, see parent spec):
```
Dev:    npm run dev
Test:   npm test -- --coverage
Lint:   npm run lint --fix
Build:  npm run build
```

**Project Structure (new/changed files only):**
```
src/sections/RequestDemo.tsx        → new section, id="request-demo"
src/sections/RequestDemo.test.tsx   → colocated tests
src/content/navigation.ts           → add { id: "request-demo", label: "Request a Demo" }
src/App.tsx                         → render <RequestDemo /> in <main>, after Contact (or per design)
```

**Code Style:** follow the existing `Contact.tsx` section-wrapper/button
classes (Section 4 note in the design agent findings: `mx-auto max-w-3xl
px-6 py-20`, heading `text-3xl font-semibold text-slate-900`, primary button
`rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white
hover:bg-blue-700`). No form/input styling convention exists yet in this
codebase — this feature establishes it; keep inputs consistent with the
existing blue-600 accent (e.g. `rounded-md border border-slate-300 px-3 py-2
text-sm focus:border-blue-600 focus:outline-none`) and reuse it for every
field rather than inventing per-field styles.

**Testing Strategy** (Vitest + React Testing Library, colocated
`RequestDemo.test.tsx`, mirrors Acceptance Criteria in Section 11):
- Unit: field validators (email domain blocklist, phone normalization,
  lead-score calculator) as pure functions, tested in isolation.
- Component: renders all required fields and labels; submit disabled until
  required fields + consent are valid; inline errors appear on invalid
  blur/submit; honeypot field is present and visually hidden
  (`display:none`/`aria-hidden`) but still submitted.
- Integration (mocked `fetch`): success path renders confirmation copy;
  `422` path renders error banner and preserves entered values; network
  failure path renders retry-safe banner with fallback email.
- No live network calls to the real Formspree endpoint in tests — always
  mock `global.fetch`.

**Boundaries:**
- **Always:** run `npm test` and `npm run lint` after implementing the
  section; keep the Formspree endpoint as a single named constant (not
  duplicated across files); keep all copy/labels reusable via a
  content-like structure rather than scattering literals, consistent with
  `src/content/*.ts` conventions where practical.
- **Ask first:** adding any new npm dependency (e.g., a phone-formatting or
  date-picker library) beyond what's already in `package.json`; changing the
  Formspree endpoint/form ID; enabling CAPTCHA or third-party bot-scoring
  scripts.
- **Never:** log full form payloads (PII) to the browser console in
  production code; hardcode the free-email blocklist or scoring weights in
  more than one place (centralize as constants); silently swallow a `422`/
  network error without surfacing it to the user.

## 13. Open Questions

1. **Rate limiting & duplicate detection** are not implementable without a
   backend or a paid Formspree/Zapier tier — confirmed accepted risk for v1.
   Revisit if spam/duplicate volume becomes a problem post-launch (options:
   upgrade Formspree plan, add a serverless function proxy, or add a small
   backend).
2. Which email address(es)/distribution list should Formspree notify for
   this form, and who owns configuring that in the Formspree dashboard?
3. Should any no-code integration (Zapier → CRM/Slack/Sheets) be enabled at
   launch, or added reactively later? If yes, which CRM/tool and who
   configures the Zap?
4. Is Formspree's built-in reCAPTCHA sufficient at launch, or should we also
   keep the client-side honeypot as a second layer (current spec keeps both)?
5. Confirm the exact `leadScore`/`leadGrade` thresholds and target-account
   domain list from Section 7 with sales/marketing before build — these
   remain a client-side, non-authoritative triage hint given the
   static-site constraint. (The former competitor-platform criterion no
   longer applies since "Current Database / Platform" was removed.)
6. Formspree's free-plan monthly submission cap could not be officially
   confirmed (third-party sources suggest ~50/month) — confirm actual plan
   tier and cap before launch to avoid silently dropped leads once the cap is
   hit.
7. Should the Project & Solution Details fields (#15–22) contribute
   additional points to Lead Quality Scoring (Section 7) — e.g. a bonus for
   "detailed enterprise context provided"? Not added in this update to
   avoid changing the already-implemented scoring formula without explicit
   confirmation.
8. ~~The current Department/Owner header metadata predates the broader
   custom-software/logistics use case...~~ **Resolved (v1.2):** Department
   and Owner are now `Business Department (Sales)`, reflecting the wider
   scope introduced by fields #15–22 (renumbered in v1.3).
9. Should any of the new select/multi-select option lists (Customer
   Industry, Solution Type, Integrations Needed, Special Requirements) be
   confirmed/finalized with sales or solutioning teams before build, similar
   to the target-account list in Question 5?
10. Now that "Current Database / Platform" and "Data Volume (approx.)" are
    removed, does the codebase's existing implementation
    (`src/sections/RequestDemo.tsx`, `src/lib/requestDemo.ts`,
    `src/content/requestDemo.ts`) need to be updated in the same pass, or
    tracked as a separate follow-up task? (This spec update does not modify
    code by itself.)
