---
id: erp-requirement-definition-blueprint
title: 'Why the Requirement Definition Phase Deserves Its Own Contract, Not a Rough Estimate'
date: 2024-06-27
domain: erp-enterprise-systems
summary: Separating ERP Requirement Definition from Implementation as its own priced, scheduled engagement protects both sides from the scope surprises that show up after Blueprint sign-off.
tags: [ERP, Requirement Definition, Consulting]
---

## Two phases, two contracts, on purpose

The single structural decision that protects an ERP replacement project from scope-creep disputes later is separating Requirement Definition (RD) / Blueprint from Implementation, contractually, from the very first proposal. RD gets its own price and schedule as a Time & Material engagement. Implementation gets re-estimated *after* Blueprint sign-off, using the Blueprint as the confirmed scope baseline — never quoted as if it were fixed before RD even starts.

I've reviewed proposals that quote both phases under a single number with no caveat. That's not confidence — it's a scope dispute waiting for the Blueprint to reveal how much actual customization the To-Be process requires.

## Three tiers, not two

Fit/Gap scoring against ERP standard functions works best on a three-tier scale: Fully-standard, Feasible-with-customization, and Cannot-support. Collapsing this to a binary Fit/Gap loses exactly the middle tier that drives most of the real cost and schedule risk in an ERP replacement. "Feasible with customization" is where budgets actually go wrong — not in the clean fits, and not in the outright gaps that get flagged immediately.

## Regulated industries need modules that aren't optional

For a distributor in a regulated space — pharmaceuticals is the clearest example — batch/lot/expiry tracking and quality-control record-keeping (incoming inspection, outgoing inspection, supplier audit) aren't nice-to-have add-ons layered onto a standard Finance/Sales/Inventory scope. They're the actual reason the ERP replacement is happening. A generic ERP scope without them will pass every functional demo and still fail the customer's compliance requirements on day one.

## Data migration defaults matter more than people expect

The reusable default across this kind of engagement: migrate master data and opening balances only; treat historical transactional data migration as explicitly out of scope unless separately negotiated. Stating this default early avoids a very specific late-stage argument about whether "migrate the data" implicitly meant five years of transaction history.

## Multi-party delivery needs a three-party RACI

When you're a subcontracted BA/consulting partner delivering under a prime systems integrator's contract, a two-party RACI — "customer" and "us" — understates the actual coordination overhead. You need three explicit roles: the end customer, the prime SI who owns the contract and overall PM, and the subcontracted delivery partner executing RD-phase work. Skipping this distinction is how "who approved this requirement" becomes an unanswerable question three weeks after a hearing session.

## The number that actually predicts schedule risk

More than any other single indicator, the presence or absence of a numeric, capped interface list predicts whether an ERP program stays on schedule. "Integration with the bank and e-invoicing systems" is a scope risk. "One e-invoice interface, one bank interface" is a commitment you can actually manage change control against.
