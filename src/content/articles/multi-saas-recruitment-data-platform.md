---
id: multi-saas-recruitment-data-platform
title: 'Building a BI Platform With No Single Source of Truth'
date: 2025-01-16
domain: data-business-intelligence
summary: When a recruitment-funnel data platform has to integrate a CRM, an SIS, a finance system, and half a dozen ad-platform APIs, "pick your ERP-anchored medallion pattern" is not enough.
tags: [Business Intelligence, Data Platform, Analytics]
---

## No dominant system of record changes the whole design

Most enterprise BI platforms I've built anchor to one dominant system — usually an ERP. A higher-education recruitment/marketing data platform doesn't get that luxury: the data lives across a CRM, a Student Information System, a narrowly-scoped finance system, and a handful of genuinely independent ad-platform APIs, each with its own data model, refresh cadence, and authentication method. The first mistake is designing as if one of these is "the" source and the others are just feeds into it. None of them is. Integration effort has to be estimated per source, not assumed uniform.

## Funnel-shaped KPIs need cross-system joins named explicitly

Recruitment funnel metrics — Lead to MQL to Opportunity to Application to Enrollment — sound like a single conceptual KPI, but the underlying calculation frequently spans two systems (a lead created in the CRM, an application recorded in the SIS). Every funnel-stage conversion metric that crosses a system boundary needs its join key and join logic explicitly documented. Treating it as "one KPI, one source" because it feels like one metric is how you end up with a dashboard nobody trusts because the number moves inconsistently with reality.

## When the customer asks for a platform comparison, give them one

If a client's own RFI explicitly requires a side-by-side, criteria-scored comparison between two platform architectures, the compliant response is a visible, per-criterion scored table for both options — not a single confident recommendation with the comparison implied. I've seen technically excellent proposals score lower simply because they answered a different, easier question than the one actually asked.

## AI-ready and AI-delivered are two different promises

It's tempting to let "we're building an AI-ready data foundation" blur into implying AI features are part of the current scope. They're not the same commitment. A Gold-layer model can be genuinely capable of supporting future AI/Copilot-style capabilities while AI feature delivery itself stays explicitly out of the current engagement. State both facts precisely, every time, in every document — conflating them oversells what the client is actually receiving this phase.

## Dashboards need a named audience, not a generic label

"Build a reporting layer" undersells what a recruitment-funnel platform actually needs: an executive strategic view, an operational campaign view, a programme-level drill-down, a sales-pipeline view, and an attribution/lead-quality view — each with different granularity, different refresh frequency, and a different primary consumer. Designing one generic dashboard and letting every audience squint at the same numbers is how self-service analytics initiatives quietly fail to get used.

## Validate the API limits before you commit to the integration design

Every ad-platform and CRM API has real, source-specific constraints — rate limits, incomplete historical backfill, undocumented pagination quirks. A short technical validation spike on each source, before committing to full-scope integration architecture, catches the constraint that would otherwise surface as a "why is this dashboard three days stale" ticket after go-live.
