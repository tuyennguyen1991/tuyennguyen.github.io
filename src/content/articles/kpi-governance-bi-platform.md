---
id: kpi-governance-bi-platform
title: 'The KPI Governance Problem Every Manufacturing BI Project Eventually Hits'
date: 2024-09-19
domain: data-business-intelligence
summary: Centralizing KPI definitions from an ERP system of record only works if you also govern what happens when someone wants to change a definition — the technology is the easy part.
tags: [Business Intelligence, KPI, Data Governance]
---

## The real problem isn't dashboards, it's disagreement

Almost every manufacturing KPI project starts with the same complaint: department A and department B report different numbers for what's supposedly the same metric, and nobody can say with confidence which one is right. That's rarely a data-quality problem — it's a governance problem. Each department has been calculating its own version of a "standard" KPI in its own spreadsheet, person-dependently, for years. Centralizing the data platform doesn't fix that unless you also centralize the definition.

## No department gets to silently redefine a shared KPI

A KPI's calculation logic must be centrally owned. Full stop. The moment one department can quietly adjust "how we calculate on-time delivery" for their own reporting convenience, you've recreated the exact fragmentation problem the governance platform was built to eliminate — just with a nicer dashboard on top of it.

## Never blend price, volume, and FX into one number

For financial or cost KPIs, isolating the pure operational effect from currency and volume effects is not optional. A blended cost-variance number that mixes an FX swing with an actual operational efficiency change will send leadership chasing the wrong root cause. Factor decomposition — splitting a KPI's movement into its actual drivers — is the difference between a dashboard that informs decisions and one that misleads them confidently.

## Definition changes need a gate, not a pull request

Every KPI definition change should require impact analysis and re-approval before it propagates to any report. Treat this as a hard governance gate. Without it, a well-intentioned tweak to how "capacity utilization" is calculated silently breaks every historical trend comparison built against the old definition, and nobody notices until a quarterly review meeting turns into a data-archaeology exercise.

## Reproducibility is the real test of "governed"

A KPI value for a past period has to be re-derivable from the same governed logic and lineage-tracked source data — not a frozen snapshot with no formula trace attached. If you can't recalculate last year's number under this year's logic and explain the difference, you don't actually have a governed KPI platform; you have a reporting tool that happens to look organized.

## Role-based access has to survive aggregation

A department-scoped viewer should never see another department's underlying transactional records — even if they're allowed to see an aggregate, company-wide summary number that includes that department's contribution. This distinction (can see the sum, can't see the parts) is easy to get wrong in row-level security design and worth testing explicitly, not just assuming your RBAC implementation handles it correctly.

## The failure mode nobody budgets for

The most common way these platforms fail isn't technical — it's treating the IT implementation as the finish line while the underlying manual work habits (the Excel-based side calculations, the informal cross-checks) never actually go away. A governed platform that coexists with the old manual process indefinitely has delivered infrastructure, not the value it was funded to deliver.
