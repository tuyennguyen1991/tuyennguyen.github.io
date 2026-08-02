---
id: clustered-database-ha-migration
title: 'Upgrading a Clustered Database Platform Without Ever Actually Testing Failover Is Not Done'
date: 2024-04-09
domain: cloud-infrastructure
summary: A version upgrade on a Windows Failover Cluster / Always On Availability Group platform is only half the job — the other half is proving both failover layers still work.
tags: [Databases, High Availability, Infrastructure]
---

## Two levels of failover, two separate tests

A clustered SQL Server upgrade that preserves High Availability configuration is genuinely a different kind of project than a standalone-instance version bump. The part that's easy to shortcut under schedule pressure is failover validation — and it has to happen at two distinct levels, because either one failing independently is a real production risk the other test wouldn't catch:

- **Cluster level (WSFC)** — node drain/pause, simulated node failure, core-resource movement.
- **Database/AG level** — manual, automatic, and forced failover, with RTO measured and failback confirmed.

An upgrade that reconfigures the Availability Group but skips one of these two test tiers hasn't actually validated High Availability — it's validated that the software installed correctly, which is a different and much smaller claim.

## The objects that don't travel with the AG

Always On Availability Groups replicate database-level objects. They do not replicate SQL Agent Jobs, Linked Servers, Credentials, Proxies, Logins, or Backup Preferences — all of which live at the instance level. Every one of these needs an explicit, separately-tracked re-synchronization step. I've seen teams discover this gap during cutover weekend, which is the worst possible time to discover it. Name it as its own workstream at planning time instead.

## Reconcile your own documents before the customer does

Database tech-refresh projects have an unusual failure mode: the technical scope document and the cost-estimation document are frequently written by different people at different times, and they drift apart on details neither author thinks to double-check against the other — target version, staffing, contingency percentage. I've seen the same engagement describe three different target SQL Server versions across three documents that were all supposedly about the same migration. None of this is caught by testing the migration itself; it's caught by a deliberate cross-document reconciliation pass before anything goes to the customer.

## A staged cutover, not a single leap

The support model that actually reduces cutover risk is staged, not monolithic: standby support during the application team's UAT window, dedicated standby during the weekend production cutover, then a tapering go-live support window (a day or two of intensive online support, easing into remote support). An unstaged "we'll support as needed" commitment sounds flexible but is, in practice, a weaker and much less auditable version of the same idea.

## Say the quiet part about licensing out loud

SQL Server Enterprise licensing is a materially significant cost line. Whether the customer already owns the licenses or the delivery team is expected to provide them needs to be an explicit, written fact in the scope document — silence on this point isn't neutral, it's a red flag that someone will find expensive later.
