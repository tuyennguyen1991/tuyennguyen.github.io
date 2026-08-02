---
id: ai-in-incident-response
title: Bringing AI into Incident Response Without Losing Trust
date: 2024-06-20
domain: ai-automation
summary: How we rolled out AI-assisted triage while keeping engineers in the loop.
tags: [AI, SRE, Automation]
---

## The problem: too many alerts, too little context

On-call engineers were spending most of their mean-time-to-acknowledge (MTTA) just figuring
out *what kind* of incident they were looking at before they could even start fixing it. We
built an **LLM-based system that classifies and routes production incidents**, backed by a
**RAG pipeline over historical incident data** and integrated directly into our on-call
tooling. MTTA dropped by 45%.

## Design principle: augment, don't replace

The system's job was never to decide what the fix should be — it was to compress the time
between "an alert fires" and "an engineer has the context to act." Every classification came
with the retrieved historical incidents it was based on, so the on-call engineer could verify
the reasoning instead of blindly trusting a black box.

## Rollout without losing trust

Trust was the real constraint, not model accuracy. We partnered closely with SRE leadership to
define the rollout and guardrails:

- The model's suggestions were **advisory only** during the first two months — it ran
  alongside the existing manual triage process, and we measured agreement rate before turning
  off the manual path.
- Every miss was reviewed in the weekly SRE sync, and misclassifications fed back into the
  retrieval corpus rather than being silently ignored.
- Engineers could always see *why* the system reached a conclusion — the retrieved incidents,
  not just a confidence score.

## What made this stick

The 45% MTTA improvement mattered less than the fact that engineers kept using the system
after the rollout period ended. That only happened because the tool was transparent about its
own reasoning and because we treated the guardrails as part of the product, not an
afterthought bolted on for compliance.
