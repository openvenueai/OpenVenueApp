# OpenVenue — Project Overview and MVP

## Purpose of This Document
This document is the top-level reference for **OpenVenue**.

It explains:
- what OpenVenue is,
- the problem it solves,
- who it is for,
- how the product should work,
- what the MVP includes,
- what is intentionally out of scope,
- the product and design principles,
- the technical direction,
- and the phased roadmap.

This file should be treated as the **master product overview** that sits above the module specs, UI direction docs, technical stack docs, and implementation roadmap.

---

# 1. Product Summary

## Product name
**OpenVenue**

## Product definition
OpenVenue is an **AI-native CRM and event operations workspace for wedding and event venues**.

It helps venue teams manage the full lifecycle of an event from:
- lead capture,
- to sales and proposal,
- to booking and contract/payment tracking,
- to planning and timeline building,
- to BEO generation and operational handoff,
- to event execution readiness.

## Product vision
OpenVenue should become the operating system for venues that need one system for:
- sales,
- planning,
- coordination,
- and execution.

It should feel like a venue-native product rather than a generic CRM adapted for events.

---

# 2. The Problem OpenVenue Solves

Venue teams often manage work across fragmented systems or CRMs that are not deeply built for event operations.

Common problems include:
- slow response time to leads
- disconnected lead and event records
- duplicate data entry across proposal, planning, and operations
- weak sales-to-operations handoff
- poor visibility into next steps
- generic pricing workflows that do not reflect venue reality
- scattered notes and internal communication
- limited or non-contextual AI support
- operational documents that have to be rebuilt manually

The result is:
- slower conversion,
- more administrative work,
- more internal confusion,
- and more room for mistakes.

OpenVenue is designed to reduce that friction by creating one structured system that carries a venue team from inquiry to execution.

---

# 3. Product Vision

## High-level vision
OpenVenue should be the **AI-native workspace for venue sales and event operations**.

It should unify:
- CRM
- planning
- pricing
- coordination
- and handoff

inside one event-centered workflow.

## What makes it different
OpenVenue should not just be a CRM with AI features added on top.

It should be AI-native in the sense that:
- every record can be summarized,
- every communication thread can become actionable,
- every workflow can surface the next best step,
- proposals, timelines, and BEOs can be generated from shared context,
- and users can work faster without leaving the place where the work is happening.

---

# 4. Target Users

## Primary users

### 1. Sales Manager / Venue Manager
Responsible for:
- lead response
- qualification
- tours
- tastings
- meetings
- proposals
- follow-up
- conversion

### 2. Event Coordinator
Responsible for:
- post-booking planning
- timeline details
- client coordination
- internal notes
- readiness
- final event organization

### 3. Operations / Kitchen / Service Team
Responsible for:
- using BEOs
- understanding timing
- preparing for execution
- receiving role-specific event information

### 4. Owner / General Manager
Responsible for:
- performance oversight
- team visibility
- pipeline visibility
- booking status
- event readiness confidence

---

# 5. Core Product Philosophy

## Principle 1 — Event Workspace is the center
The product should revolve around one central object:
**Event Workspace**

This record begins as a lead and matures into a booked and executed event.

## Principle 2 — Familiar workflow, better execution
The product should preserve the mental model venue teams already understand:
- leads
- inbox
- proposal
- timeline
- payments
- BEO
- notes
- tasks
- calendar

But it should improve the experience with:
- better structure
- better data reuse
- better visibility
- and embedded AI support

## Principle 3 — No duplicate data entry when avoidable
Proposal, Timeline, Payments, BEO, Notes, and Overview should reuse shared structured data wherever possible.

## Principle 4 — AI should be embedded, not theatrical
AI should appear as:
- suggestions
- summaries
- drafts
- risk flags
- next-step support
- extraction and generation tools

AI should not feel like a separate gimmicky chatbot layer.

## Principle 5 — Premium restraint
The product should feel calm, structured, and refined, not flashy or generic.

---

# 6. Core Workflow

## Current venue workflow being preserved and improved
1. Lead submits website inquiry
2. CRM creates a lead profile
3. Team communicates with lead
4. Team builds proposal
5. Team schedules tours/tastings/meetings
6. Team tracks contract and invoice/payment progress
7. Event moves into planning
8. Team builds timeline
9. Team creates BEO
10. Team manages notes, tasks, and internal communication
11. Operations executes event

## OpenVenue workflow
1. Lead is captured
2. Event Workspace is created
3. AI structures the intake and drafts the first response
4. Team qualifies the lead and schedules next steps
5. Proposal is built using venue spaces, menu/catalog items, pricing rules, and AI assistance
6. Contract and payments are tracked
7. Event planning moves into Timeline, Tasks, Notes, and collaboration
8. BEO is generated from shared data
9. Role-based operational outputs are reviewed
10. Team executes the event with better visibility and less duplicate work

---

# 7. What OpenVenue Is Building Toward

OpenVenue is intended to become:
- a venue CRM,
- an event planning workspace,
- a commercial proposal engine,
- a coordination layer,
- and an operational handoff system.

It should eventually support a venue from:
- first inquiry
- to event completion
- inside one connected product.

---

# 8. MVP Definition

## MVP objective
The MVP should prove that OpenVenue can support the core venue workflow from lead to booked event to operational readiness.

## MVP success criteria
The MVP is successful if a venue team can:
- capture and qualify leads,
- manage a pipeline,
- communicate and track follow-up,
- build proposals with flexible pricing,
- track contract and payment status,
- manage planning and timelines,
- generate BEOs,
- coordinate internally,
- and use one calendar and one workspace to manage the event lifecycle.

---

# 9. MVP In-Scope Features

## 1. Authentication and account setup
- Email/password sign up
- Google sign-in
- Password reset
- Team member invites
- Account creation
- Venue onboarding
- Multi-venue account logic
- Plan selection logic

## 2. Onboarding workflow
- venue location
- venue spaces
- seated and cocktail capacities
- in-house catering yes/no
- number of venues
- account type selection

## 3. Dashboard
- tasks today
- leads awaiting response
- follow-up due
- pipeline snapshot
- upcoming calendar items
- AI daily briefing placeholder

## 4. Leads / Pipeline
- lead list view
- pipeline board view
- filters
- stage updates
- create/open Event Workspace

## 5. Event Workspace
- persistent workspace header
- Overview tab
- stage/status model
- summary and next-step structure

## 6. Inbox
- thread list
- thread detail
- reply/send shell
- history inside workspace
- AI support later / progressively

## 7. Proposal Builder
- spaces
- menu/catalog items
- rentals/staffing/add-ons
- fees
- surcharges
- discounts
- sales tax
- client-facing notes
- preview
- versioning

## 8. Payments & Contract
- contract status tracking
- milestone payment schedule
- deposit tracking
- payment history
- reminders
- booking readiness

## 9. Timeline Builder
- planning milestones
- day-of run-of-show
- grouped phases
- space assignment
- responsibility assignment
- role-aware outputs

## 10. BEO
- master BEO
- manager BEO
- kitchen BEO
- staff BEO
- versioning
- readiness review

## 11. Notes / Internal Messages / Activity
- durable notes
- internal team messaging
- system activity history
- search/filter
- task creation from context

## 12. Tasks
- task creation
- task assignment
- due dates
- priority/status
- dashboard visibility
- linking to event or calendar context

## 13. Calendar
- month/week/day views
- events/tours/tastings/meetings/holds
- filter rail
- link calendar items to Event Workspace

## 14. AI-native support layer
Initial AI support should focus on:
- summaries
- draft generation
- missing info detection
- next-best-action suggestions
- task extraction
- proposal/timeline/BEO drafting support
- conflict/risk support

---

# 10. Out of Scope for MVP

These features are intentionally not required for the first launch:

- full client portal
- vendor portal
- advanced floorplan/diagramming tools
- deep guest list / RSVP system
- full accounting platform behavior
- fully mature e-sign platform built in-house
- advanced SMS/WhatsApp communications
- advanced enterprise multi-property resource planning
- extremely deep analytics/reporting suite
- highly advanced live collaborative editing everywhere

These may become later expansion areas, but they should not slow down the MVP.

---

# 11. Event Workspace as the Central Object

## Foundational product decision
OpenVenue should use **Event Workspace** as the central object.

That means:
- the record starts as a lead
- the same record evolves into a booked event
- sales, planning, and operations stay connected
- all major modules attach to one source of truth

## Benefits
- no lead-to-event duplication problem
- cleaner history
- better AI context
- simpler navigation
- stronger handoff from sales to operations

---

# 12. AI-Native Product Philosophy

## AI should exist in four ways

### 1. Copilot actions
Examples:
- Draft reply
- Summarize thread
- Generate proposal draft
- Generate timeline
- Generate BEO
- Suggest next step

### 2. Background intelligence
Examples:
- lead scoring
- ghosting risk
- missing detail detection
- readiness scoring
- budget mismatch flags
- conflict detection

### 3. Workflow automation support
Examples:
- follow-up reminders
- overdue payment reminders
- stale lead alerts
- readiness alerts

### 4. Search / ask behavior
Examples:
- What am I waiting on for this event?
- What changed since last review?
- Draft a reply to this pricing objection
- Generate a kitchen summary

## AI rules
- AI outputs must be reviewable
- AI should not silently overwrite canonical business data
- AI language should remain calm, transparent, and assistive
- AI should be embedded into each workflow, not isolated in a separate novelty interface

---

# 13. Design Direction Summary

## Product design direction
OpenVenue should feel like:
**calm hospitality operations software with editorial restraint**

## Design signature
**Grounded Juniper + Soft Editorial Neutrals + Structured Hospitality UI**

## Visual principles
- Dark Juniper as the anchor
- neutral surfaces do most of the work
- premium restraint
- structured data views
- familiar CRM shell
- calm status treatment
- AI presented subtly and contextually

## UI direction goals
The product should not feel like:
- generic blue/purple SaaS
- decorative wedding software
- loud AI assistant software
- a cluttered enterprise admin panel

---

# 14. Technical Direction Summary

## Recommended stack
- Next.js with App Router and TypeScript
- Vercel
- Supabase
- Supabase Postgres
- Supabase Auth
- Supabase Storage
- Supabase Realtime
- pgvector
- Drizzle ORM
- Tailwind CSS
- shadcn/ui
- Zod
- Vercel AI SDK
- Resend
- Sentry
- Vitest
- Playwright
- pnpm

## Architecture approach
Use a **single Next.js application** rather than splitting frontend/backend repos for v1.

## Key technical principles
- strongly typed everywhere
- server components by default
- multi-tenant from the start
- RLS-aware design
- AI outputs stored separately from canonical business data
- reusable domain components
- production-minded foundation

---

# 15. Core Data / Domain Summary

The product revolves around these major data areas:

- Accounts
- Venues
- Users / memberships / roles
- Event Workspaces
- Contacts
- Email threads/messages
- Proposals
- Pricing adjustments
- Timeline items
- Payments / contracts
- BEOs
- Notes
- Internal messages
- Activity log
- Tasks
- Calendar items
- AI artifacts/summaries

This domain model should support:
- one account with one or many venues
- multiple team members with roles
- shared operational data
- clear history and auditability

---

# 16. MVP Roadmap by Phase

## Phase 0 — Foundation
- Next.js scaffold
- dependency setup
- Supabase integration
- Drizzle setup
- env config
- auth/session structure

## Phase 1 — Schema and tenancy
- accounts
- venues
- memberships
- core domain schema
- RLS-ready structure
- seed data

## Phase 2 — Auth and onboarding
- auth routes
- account creation
- onboarding flow
- venue setup
- team invite foundation

## Phase 3 — Shell and design system
- top navigation shell
- page layout
- design tokens
- shared UI primitives

## Phase 4 — CRM foundation
- dashboard
- leads/pipeline
- Event Workspace shell
- Overview tab

## Phase 5 — Collaboration and operations layer
- notes/messages/activity
- tasks
- calendar
- inbox shell

## Phase 6 — Commercial layer
- proposal builder
- payments & contract

## Phase 7 — Planning and handoff
- timeline builder
- BEO

## Phase 8 — AI layer
- AI infrastructure
- AI feature rollout by module

## Phase 9 — Exports, reminders, hardening
- document exports
- reminders/jobs
- testing
- polish
- deployment readiness

---

# 17. MVP Outcomes We Want

OpenVenue should create these outcomes for customers:

## Sales outcomes
- faster first response
- better follow-up consistency
- cleaner qualification
- stronger proposal workflows
- better conversion support

## Planning outcomes
- less scattered information
- stronger coordination
- clearer event sequencing
- fewer missed details

## Operations outcomes
- cleaner BEOs
- role-specific event handoff
- more confidence before event day
- less manual document rebuilding

## Business outcomes
- one connected workflow
- less admin overhead
- stronger visibility into what needs attention
- better foundation for AI leverage

---

# 18. Success Metrics for MVP

Potential early success metrics include:
- time to first response
- proposal turnaround time
- percentage of events with complete timeline before final review
- percentage of events with finalized BEO before execution
- internal task completion rate
- lead-to-booked conversion support indicators
- number of duplicate manual entry points reduced
- user adoption across sales/planning/ops workflows

The MVP does not need a massive analytics suite, but it should eventually be measured by these outcomes.

---

# 19. Long-Term Expansion Areas

After the MVP, OpenVenue could expand into:
- client portal
- vendor portal
- floorplans / diagrams
- digital guest management
- richer automation builder
- deeper reporting and forecasting
- more advanced document workflows
- more advanced AI retrieval and knowledge systems
- richer communications support

These should be treated as later opportunities, not v1 blockers.

---

# 20. How This Document Should Be Used

This file should be used as:
- the top-level product overview for Codex,
- the entry point for new collaborators,
- the framing document for technical decisions,
- and the context setter above the wireframe and implementation docs.

If a future implementation detail is unclear, this document should help answer:
- what OpenVenue is,
- what the MVP is trying to accomplish,
- and what tradeoffs matter most.

---

# 21. Summary

OpenVenue is an AI-native CRM and event operations workspace for venues.

The MVP should prove that one system can carry a venue team from:
**lead capture → proposal → booking → planning → BEO → readiness**

with:
- one Event Workspace,
- structured data reuse,
- premium but calm UX,
- and embedded AI support that helps teams move faster without losing control.

This is the foundation the rest of the reference files should build on.
