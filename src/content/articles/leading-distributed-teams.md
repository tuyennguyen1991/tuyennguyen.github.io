---
id: leading-distributed-teams
title: Leading Distributed Engineering Teams Through Ambiguity
date: 2023-11-02
domain: leadership
summary: Practical lessons on leading globally distributed teams through major migrations.
tags: [Leadership, Distributed Teams]
---

## Ambiguity is the default, not the exception

Every major migration I have led — a monolith-to-microservices rewrite, a multi-region
failover rollout, an org-wide SDK adoption — started without a complete plan, because a
complete plan wasn't possible until the team learned things only production could teach.
Leading through that ambiguity, across time zones, is a different skill than leading a team
that sits in one room.

## What worked

1. **Over-communicate decisions, not just status.** Distributed teams don't lose sync on
   *what* is happening as much as *why* a decision was made. Writing down the reasoning behind
   a call — not just the call itself — let engineers in other time zones make consistent
   follow-on decisions without waiting for a meeting.
2. **Make asynchronous the default, synchronous the exception.** If a decision required a
   live meeting to move forward, that was treated as a process failure to fix, not a normal
   cost of doing business across time zones.
3. **Give teams a shared definition of "done" before the ambiguous part starts.** On the SDK
   adoption effort, driving adoption through internal workshops and an RFC process worked
   because every team knew what "adopted" meant before the rollout began — there was no
   room for quiet, inconsistent interpretations.

## Mentorship inside the ambiguity

Migrations are also where engineers grow the fastest, because the answers aren't already
written down. Part of leading these efforts was deliberately handing ownership of ambiguous
sub-problems to engineers who were ready to stretch, then backing their decisions in front of
other teams — even when I would have made a slightly different call myself.

## The takeaway

Technical leadership through ambiguity is mostly a communication design problem: reduce the
number of decisions that require someone to be awake at the same time, and make the reasoning
behind every major call visible to people who weren't in the room when it was made.
