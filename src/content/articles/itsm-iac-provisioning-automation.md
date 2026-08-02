---
id: itsm-iac-provisioning-automation
title: 'Closing the Loop from Ticket to Terraform Without Breaking Production'
date: 2024-02-15
domain: cloud-infrastructure
summary: Turning a manual, ticket-and-Excel cloud-provisioning process into a self-service ITSM-to-IaC automation chain, while the platform keeps serving live traffic the entire time.
tags: [DevOps, IaC, ITSM, Automation]
---

## Idempotency is the one rule you cannot compromise on

The single non-negotiable constraint on any ITSM-triggered IaC pipeline: a redeploy caused by an unrelated parameter change must never recreate or destroy a resource unless the request is an explicit decommission. Everything else in this kind of automation build is a design choice with tradeoffs. This one isn't. Get it wrong once and the platform team stops trusting the automation, which undoes months of adoption work in a single incident.

## Governance has to be a rule engine, not a person's judgment

Which request types auto-deploy and which require mandatory human review needs to be an explicit, versioned ruleset the system enforces — never something a reviewer decides ad hoc, ticket by ticket. Tribal-knowledge governance doesn't scale past the first reviewer going on leave, and it's impossible to audit after the fact. Encode the rules; let the system apply them consistently.

## The ticketing platform's own limits are architecture, not an implementation detail

A ticketing/workflow platform has an object and field-count ceiling, and it's easy to forget that ceiling is a real architectural constraint until you're a few thousand custom fields deep against a much smaller soft limit. Review headroom explicitly before Detailed Design, especially if the platform is shared across multiple clouds or request-type families — discovering the ceiling mid-program means re-architecting under pressure instead of by choice.

## Some deployments need a queue, not an on-submit trigger

Outage-sensitive resource types — reverse proxies are the classic example — shouldn't deploy the instant a ticket clears review. They need a scheduled, windowed deployment queue that batches changes into an approved change window. Immediate-on-submit execution is the right default for most request types and the wrong default for anything where a mistimed change could take down something customers are using right now.

## The ledger has to reflect reality, automated or not

The Item/configuration ledger — your CMDB-equivalent — needs to update identically whether a change was automated through the pipeline or performed manually by an operator during an emergency fix. A ledger that only reflects automated changes silently drifts from reality the very first time someone has to intervene by hand, and drift discovered during an audit is a much worse conversation than drift prevented by design.

## Resuming after a stalled prior effort needs an honest reset

When you're picking up an automation program after a previous team's partial delivery, the right first move is independently re-assessing what's actually built and tested versus what was only designed — a departing team's "design complete" status report is not the same claim as "built and verified." Skipping this re-assessment and quoting new effort against inherited assumptions is how a resumed program repeats the same schedule slip that stalled it the first time.
