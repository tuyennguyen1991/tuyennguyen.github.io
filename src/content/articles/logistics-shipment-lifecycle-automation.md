---
id: logistics-shipment-lifecycle-automation
title: 'One Shipment Lifecycle, Two Variants: Designing Import/Export Without Duplicating Logic'
date: 2024-02-29
domain: retail-supply-chain
summary: Import and export shipments look like different processes until you model them as one lifecycle with variant execution steps — the difference saves real engineering effort.
tags: [Logistics, Supply Chain, Workflow]
---

## Resist building two systems

The instinct when a logistics team asks for "an import module and an export module" is to build two workflows. Don't. Import and export are two variants of one lifecycle — create, document, execute, settle, track, close — that diverge only in their execution sub-steps. Import branches into declaration application, declaration confirmation, tax payment, and clearance. Export branches into booking, shipping instruction/verified gross mass, bill of lading, and certificate of origin. Everything else — the ticket model, the document management, the financial settlement pattern, the status tracking — is shared.

Model it as one state machine with a variant flag, and you get consistent reporting, consistent audit trails, and half the maintenance surface of two parallel systems that will inevitably drift apart.

## Financial gates depend on documents that may not exist yet

A downstream financial step — say, a tax payment request — is often gated by the existence of an upstream artifact, like an official customs declaration. It's tempting to assume that because step 3 happened, the artifact step 3 was supposed to produce is now available. Don't assume it. Model the gate explicitly as "does artifact X exist," not "has step Y completed" — the two aren't always the same thing when external parties (customs brokers, forwarders) are involved in producing the artifact.

## External visibility needs a harder boundary than internal roles

A delivery partner or forwarder tracking a shipment should never see internal financial data — tax amounts, vendor fees, settlement figures. This isn't a permissions nuance to configure later; it's a data-model boundary that needs to exist from the first schema design, because retrofitting it after external users already have API access is a much harder migration.

## The dashboard that actually gets used

The single biggest adoption win in shipment-tracking systems I've built isn't a feature — it's giving non-operational stakeholders (Sales, most commonly) a real-time status view they didn't have before. Before that dashboard exists, "where's my shipment" is a Slack message to Logistics. After it exists, that Slack message mostly disappears, and Logistics gets hours back every week that used to go to status-update requests instead of actual shipment execution.

## Every process instance needs a name

A unique, human-readable tracking identifier per shipment ticket sounds obvious, but it's the single most load-bearing piece of the whole design — every document, every financial sub-process, every status update anchors back to that ID. Get the ID scheme wrong (not unique enough, not memorable enough for a phone call with a customs broker) and every downstream integration inherits the pain.
