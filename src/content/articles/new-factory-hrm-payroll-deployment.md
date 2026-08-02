---
id: new-factory-hrm-payroll-deployment
title: 'Standing Up HR and Payroll for a Factory That Does Not Exist Yet'
date: 2024-08-30
domain: manufacturing
summary: A new-factory HRM deployment has no legacy system to migrate away from, but also nothing to build on — and the hardware lead time, not the software, is usually the real critical path.
tags: [Manufacturing, HR Systems, Infrastructure Planning]
---

## Zero legacy, zero infrastructure — a different risk profile entirely

Deploying HR and payroll systems for a brand-new manufacturing site is not a smaller version of an HRM upgrade project. There's no legacy system pulling data out of, but there's also no existing server room, network capacity, or rack space to build on. Everything — server sizing, UPS capacity, physical space — has to be planned from zero. That's a materially different risk profile than "replace the HRM at an established site," and treating it with the same playbook underestimates the infrastructure workstream badly.

## The hardware order is the critical path, not the software configuration

This is the lesson that surprises people most: server hardware lead time — commonly ten to sixteen weeks — is frequently the actual binding constraint on go-live, not the software implementation. If the hardware order doesn't go in at or near contract signing, running in parallel with the four-to-six-month software workstream, it becomes the thing everyone's waiting on at the end. Plan the procurement timeline before you plan the configuration timeline.

## Statutory integration is the point, not a feature

Direct integration with a government online tax/social-insurance filing platform isn't optional scope you can defer to a later phase — it's the primary risk driver that justifies the whole platform investment. Any deployment lacking that direct integration just reintroduces manual double-entry and regulatory filing risk, which is exactly the pain point the project was funded to eliminate. If it's in the requirements list as "nice to have," it's mis-scoped.

## Office-oriented attendance modules don't survive contact with a factory floor

A generic HRM/Attendance module built around a fixed 9-to-5, single-shift assumption will not fit a manufacturing workforce. Multi-shift and consecutive-day roster support, plus GPS-based check-in for staff without access to a physical time clock, are non-negotiable — and worth validating explicitly during vendor selection rather than discovering the gap after go-live.

## Plan for headcount growth as a normal event

Factory headcount ramps aren't an exception to plan around later — they're expected. Sizing bands (employee count, admin-user count) need a pre-agreed overage mechanism from the contract stage: a percentage of contract value per additional employee block, a fixed fee per additional admin-user block. Negotiating overage terms after the third hundred employees join is a worse conversation than agreeing on the formula up front.

## Security is the baseline, not the differentiator

Encryption of salary and personal data in transit and at rest, plus vendor-side penetration testing, is the minimum bar for any platform handling tax and social-insurance data — treat it as a baseline expectation in every proposal, not something to highlight as a selling point.
