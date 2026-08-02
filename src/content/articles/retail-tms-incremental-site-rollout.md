---
id: retail-tms-incremental-site-rollout
title: 'Adding the Third Site to a Retail Platform: What Should Never Change'
date: 2025-02-25
domain: retail-supply-chain
summary: Rolling out an already-live tenant management platform to a new site should be routine — the discipline is in explicitly separating what a new site actually needs from what a general roadmap review might suggest.
tags: [Retail, Platform Engineering, Rollout]
---

## Site onboarding and platform enhancement are not the same activity

The most useful discipline in an incremental site rollout is separating, explicitly, "add this new site's data to an existing platform" from "extend the platform's capabilities." The first should be routine and repeatable by the third or fourth time you've done it. The second is genuinely new development. Conflating them — treating every new site as an excuse to also improve unrelated functionality — is how a two-month rollout becomes a four-month scope negotiation.

## Enhancements are tenant-driven, not roadmap-driven, in this domain

A new rental-option type on a mall tenant-management platform almost always exists because one specific incoming tenant's commercial contract requires it — not because someone decided the platform needed a general feature. Every enhancement in a site-rollout engagement should trace back to the specific triggering tenant and requirement. If you can't name the tenant behind a requested change, that change probably belongs in a separate, explicitly-scoped request, not bundled into routine site onboarding.

## "No change to existing functions" is the default, not a request

The default assumption when adding a new site should be exactly that: no change to existing functions and reports. Anything beyond what the new site's specific tenant mix requires is a separate, explicitly-scoped change request. This default protects the schedule far more than any amount of careful requirement gathering, because it gives everyone a shared, low-friction answer to "can we also just quickly add..."

## Test both ends of the billing cycle, every time

Rent and turnover calculation logic changes need validation with both mid-period and end-period test scenarios. Mall tenant billing has different calculation triggers within a cycle — testing only one checkpoint risks missing a calculation error that only surfaces at the other one. This is a cheap test to add and an expensive one to skip.

## Don't assume existing logic survives a new site unmodified

Calculation logic that worked correctly for the platform's first two sites is not automatically guaranteed to produce correct results for the third. Different sites have different tenant and operational patterns that can expose edge cases dormant logic never had to handle before. An explicit logic-review workstream — not an assumption that "it already works" — belongs in every new-site rollout, however routine the rollout otherwise feels.

## Infrastructure scaling stops being a risk once the pattern is proven

Pay-as-you-go cloud scaling for a new site is a routine, low-risk operational step once an established pattern exists from prior rollouts — it shouldn't be modeled as a project risk at that point, though it's a legitimate first-time risk for a platform's very first site. Knowing which risks have graduated from "real" to "routine" as a platform matures is its own useful skill.
