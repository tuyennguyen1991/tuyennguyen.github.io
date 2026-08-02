---
id: capacity-aware-production-planning
title: 'Why Static Capacity Numbers Quietly Break Every Production Plan Downstream'
date: 2024-05-22
domain: manufacturing
summary: The single most common root cause of planning breakdown in discrete manufacturing is a capacity figure that never gets recalculated — here is the planning cascade that fixes it.
tags: [Manufacturing, Production Planning, APS]
---

## The bottleneck everyone disagrees about

Ask Sales, Planning, and Production where the plant's real bottleneck is, and in a manufacturer running on Excel-based planning, you'll get three different answers. That's not usually a communication problem — it's a data problem. Each department is maintaining its own separate, non-synchronized capacity view, and none of them are recalculating capacity as product mix shifts.

Capacity is not a number you calculate once. It's a function of process type, shift and useful time, defect (NG) rate, and current model mix — and it needs to be recomputed continuously, not treated as a static master-data field. A capacity figure calculated in January and never touched again silently invalidates every plan built on top of it the moment product mix changes in February.

## The planning cascade that actually holds together

The pattern that scales is a three-level cascade, each level with a distinct purpose:

- **Monthly Plan** — demand allocated by line/process, the baseline commitment.
- **Daily Plan** — adjusted for shift changes, material arrival timing, and scenario effects.
- **Hourly Plan** — per-hour output detail for shop-floor execution.

The cascade only works if you enforce a hard line between **Minor** changes (daily/hourly recalculation that never touches the monthly baseline) and **Major** changes (structural, requiring re-approval of the baseline). Blur that line even once and you lose the audit trail for why a monthly commitment moved — which is exactly the traceability question that comes up in every post-mortem when a customer order slips.

## Material ordering should be a formula, not a parallel process

The order quantity for imported or local parts is a deterministic function of demand, stock on hand, standard stock, and lot size — something like `Ceiling((Demand − Stock + Standard Stock) / Lot Size) × Lot Size`. When material ordering runs as its own manually-maintained process instead of a derived output of the approved plan, it becomes the second source of truth that eventually disagrees with the first. Any manual override of the formula should be a logged exception, not a routine occurrence.

## Simulate before you commit

When demand exceeds calculated capacity — and it will — the answer isn't a single scramble decision. Build short/mid/long-term response scenarios with visible cost and risk indicators, and let a human choose between them with the tradeoffs in front of them. The goal of the system isn't to make the decision; it's to make the tradeoff visible enough that the decision doesn't need a war-room meeting every time.

## The lesson that generalizes beyond automotive

Every planning breakdown I've traced back far enough ends at the same root cause: a number that stopped being recalculated. Whether it's capacity, lead time, or yield, if it's not wired into a live recalculation loop, treat it as already stale.
