---
id: incumbent-platform-functional-enhancement
title: 'Enhancing a Live Platform: Why the Quote-vs-Estimate Cross-Check Matters More Than the Feature List'
date: 2025-02-11
domain: retail-supply-chain
summary: Adding AI OCR, reporting, and digital workflow to an already-live retail operations platform surfaces a specific risk generic feature-add projects rarely mention: pricing drift between the quote and the internal estimate.
tags: [Retail, Platform Engineering, Estimation]
---

## Capability gaps trigger different scoping than new sites

Extending an already-live tenant/mall management platform with new capabilities — self-service analytics, AI-assisted data entry, digital workflow — is a fundamentally different trigger than rolling the platform out to a new site. Site rollouts are about replication; capability enhancement is about a specific operational pain point that's finally matured into a funded business case. That distinction should shape how you scope the engagement: enhancement work needs its own gap analysis against the incumbent platform's known limitations, not a copy-paste of a site-rollout template.

## AI OCR needs a tiered accuracy claim, not one number

Any AI-assisted document extraction capability should disclose a tiered complexity-acceptance model — easy, medium, hard bands based on layout stability and scan quality — with distinct, disclosed success rates per band. A single blended accuracy number overstates confidence in the hardest documents and understates it in the easiest ones. The honest, and frankly more sellable, position is naming the hardest tier as deferred until real production results justify expanding to it.

## Digital approval means nothing if it doesn't reach the physical world

When a workflow enhancement includes something like QR-based entrance approval — bridging a digital approval decision to physical access control — the validity rules, one-time-versus-reusable configuration, and entry/exit logging all need explicit design *and* explicit confirmation with the actual security/operations process before go-live. A digitally "approved" status that a security guard's scanner can't actually act on is a named, recurring failure mode in this kind of project, not a hypothetical edge case.

## Cross-check the quote against your own estimate before the customer sees it

This is the finding that generalizes furthest beyond retail: before a customer-facing quotation goes out, cross-check it against the internal per-function effort estimation's own implied rate. I've seen a customer-facing quote and an internal cost basis for the same scope diverge by a factor of two or more — not from bad faith, but because different line items (a T&M requirement-definition rate here, a fixed-price implementation rate there) were built by different people at different times and nobody reconciled them before submission. That reconciliation step is cheap. Skipping it is not.

## Variable-cost AI capabilities need variable-cost pricing

Foundation-model API costs for an OCR capability are usage-variable by nature — priced per token or per page. Stating "AI cost included" as a flat line item hides that variability from the customer and from your own margin. State the volume basis explicitly and build a proportional overage mechanism tied to the API provider's actual published pricing.
