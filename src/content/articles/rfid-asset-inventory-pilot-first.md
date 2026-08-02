---
id: rfid-asset-inventory-pilot-first
title: 'Why We Piloted the RFID Rollout Before Pricing the Full Deployment'
date: 2024-11-21
domain: manufacturing
summary: RFID asset-tracking projects are a hardware-software hybrid where read performance in your actual server room is unproven until you test it there — pricing the full rollout before that test is a bet, not an estimate.
tags: [Manufacturing, RFID, Asset Management]
---

## This is a hardware decision as much as a software one

Replacing a fully manual physical-asset-count process with RFID tags, handheld readers, and a management platform is not a typical software integration project. The RFID hardware — tags, readers, printers — comes from a specialist third-party manufacturer, and selecting that partner is a first-class, often-unresolved project risk in its own right, not a commodity purchasing decision to handle after the software architecture is locked in.

## Spec sheets don't survive contact with a server room

Manufacturer-published read-range and read-rate figures are a starting point, not a commitment. Metal-dense environments — server rooms, dense equipment racks — are exactly where RFID read performance is empirically unproven until you actually test it on-site. This is a genuine open technical question, not a documentation gap, and it should never be treated as confirmed simply because a spec sheet states a number.

## Pilot first, price second

The commercial structure that actually protects both sides: separate pilot/validation pricing from full-scale rollout pricing. Committing to a multi-thousand-asset rollout price before pilot read-performance results exist risks either under-pricing — if performance in your specific environment is worse than the spec sheet implied — or over-pricing, if a cheaper hardware configuration would have worked just as well. A small pilot, sized to what the customer's own guidance suggests as representative (a single building or department, a few hundred assets), answers the question before the money commits.

## Attribute the KPI targets to whoever actually set them

When a customer's own RFP already states quantified success targets — time reduction, accuracy improvement, manpower reduction — adopt those targets and explicitly attribute them as customer-sourced, rather than re-deriving or restating them as if independently discovered. This preserves traceability and avoids implying the read-performance and accuracy claims were independently validated before any field testing actually happened.

## Don't let "to discuss" quietly become "in scope"

Small-accessory categories a customer explicitly flags as "to discuss" — USB drives, cables, SD cards — should stay a distinct, separately-tracked open item. It's tempting to fold them into the core asset-category scope for a tidier-looking proposal, but doing so commits to cost and timeline for a feasibility question (can these even be reliably tagged) that hasn't actually been resolved yet.

## The takeaway for any hardware-software hybrid project

Anywhere physical-world performance is genuinely unproven until tested in the customer's actual environment, resist pricing pressure to commit to full-scale numbers before that test happens. A pilot isn't a delay tactic — it's the only honest way to price what comes next.
