---
id: industrial-ehs-compliance-digitization
title: 'One Safety Department, Three Unrelated Systems: Why EHS Digitization Is Not One Project'
date: 2024-01-20
domain: manufacturing
summary: Equipment safety, chemical management, and occupational health share a department but not a data model — treating them as one monolithic system is the most common design mistake in EHS digitization.
tags: [Manufacturing, Compliance, EHS]
---

## Same department, different regulatory universes

A manufacturer's Safety Department typically owns several genuinely distinct, regulation-driven processes at once — strictly-regulated equipment inspection, chemical hazard management, and occupational health screening. They share a business owner. They do not share a data model, a document format, or even a regulatory regime. Equipment inspection certificates and chemical hazard classifications answer to completely different laws. Designing one shared architecture because one department signs off on all three is the single most common mistake I've seen in this space — whichever sub-system gets less design attention ends up under-built.

## Preserve the governed process you already have

Mature EHS functions often already have a versioned, named-approver internal SOP — sometimes with a revision history going back over a decade. The digital system's job is to faithfully implement that governed process, not redesign it because a fresh system build feels like an opportunity to improve everything at once. If the existing SOP works and is already audited, digitizing it as-is is the lower-risk and genuinely correct move.

## A chemical can belong to more than one hazard category

Chemical master data has to support a single substance belonging to multiple regulatory hazard categories simultaneously — banned, hazardous, toxic, flammable, corrosive, whatever the local schedule defines. A single-category data model will misrepresent the compliance status of any chemical that spans categories, which in this domain is most of them. Design for multi-category from the first data model draft, not as a patch after the first customer complaint.

## Routine reporting and government-mandated reporting are different pipelines

Specially-controlled chemicals typically require periodic and ad hoc reporting directly to a government system, on a different cadence and format than routine internal audit reporting. Conflating the two into one reporting module risks missing a mandatory government filing because it got bundled with a report nobody was in a hurry to send.

## Let the customer's own numbers anchor the business case

When an EHS function has already quantified its own manual-effort hours and its incident-risk exposure in local currency, use those figures directly as the business-case anchor. Customer-calculated numbers carry far more evidentiary weight in a business case than a generic vendor efficiency claim, and replacing them with your own estimate doesn't make the case stronger — it makes it less credible.

## Default to one-way sync with the ERP

For the chemical sub-system's purchasing integration specifically, default to one-way sync from the ERP into the EHS system for transactional data the ERP already owns. A bidirectional write-back relationship, without a specific business reason demanding it, increases integration risk against a system of record you don't own — for no benefit you can point to.
