---
id: multi-region-failover-lessons
title: 'Designing Multi-Region Failover: What 99.99% Uptime Actually Costs'
date: 2024-05-08
domain: cloud-infrastructure
summary: Practical lessons from building an active-active multi-region deployment that eliminated single-region outages.
tags: [Cloud, AWS, Reliability]
---

## The goal: no single point of regional failure

A single-region outage had taken down our customer-facing platform for two hours the
previous year. The mandate was clear: design an **active-active multi-region architecture**
that could absorb the loss of an entire AWS region without customers noticing. We landed on
99.99% uptime SLA and eliminated single-region outages entirely.

## Building blocks

- **Cross-region data replication.** We picked a replication strategy per data store based on
  its consistency requirements — some data could tolerate eventual consistency, some could
  not, and pretending otherwise would have caused subtle bugs in production.
- **Traffic shifting.** DNS-level and load-balancer-level traffic shifting let us redirect
  load away from an unhealthy region within seconds, driven by automated health checks rather
  than manual intervention.
- **Chaos testing.** We didn't trust the failover until we had broken it on purpose,
  repeatedly, in a controlled environment. Chaos experiments against production-like traffic
  surfaced failure modes that no design review would have caught.

## The real cost of "five nines"

Every additional nine of availability costs disproportionately more than the last. Coordinating
this rollout meant aligning **4 separate teams** on a shared failover runbook — the technical
design was necessary but not sufficient. Without a runbook everyone trusted and had rehearsed,
the failover mechanism would have sat unused during a real incident because nobody wanted to
be the one to trigger it.

## What I'd tell a team starting this today

1. Decide upfront which failures you are actually protecting against — region loss, AZ loss,
   and dependency failure need different designs.
2. Run your failover in production, on a schedule, before you ever need it during an incident.
3. The runbook is part of the architecture. If people don't trust it, the failover capability
   doesn't exist yet.
