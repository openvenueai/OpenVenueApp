# OpenVenue — Step-by-Step Implementation Roadmap for Codex

## Purpose
This file is the execution roadmap for building the first version of **OpenVenue** in a fresh environment.

It is designed to work alongside:
- the OpenVenue product planning docs,
- the wireframe specs,
- and the Codex build starter file.

This roadmap is intentionally ordered to:
1. establish the platform foundation first,
2. reduce rework,
3. protect data model integrity,
4. and let Codex build features in a sequence that matches real product dependencies.

---

# 1. Build Strategy

## Core principle
Build OpenVenue in **vertical slices on top of a stable foundation**.

Do **not** try to build every module at once.

Instead:
- create the platform shell,
- lock auth and tenancy,
- define schema and permissions,
- build shared UI primitives,
- then add feature modules in dependency order.

## Guiding rule
At every phase, prefer:
- strong schema,
- clean route structure,
- reusable UI patterns,
- and role-aware permissions

over fast but brittle one-off implementations.

---

# 2. Execution Order Overview

Build in this order:

1. Project foundation
2. Environment and tooling
3. Supabase integration
4. Database schema and migrations
5. Auth and account system
6. App shell and design tokens
7. Core shared primitives
8. Dashboard
9. Leads / Pipeline
10. Event Workspace shell
11. Collaboration foundation
12. Calendar and Tasks
13. Proposal Builder
14. Payments & Contract
15. Timeline Builder
16. BEO
17. AI infrastructure
18. AI features by module
19. Exports / PDF generation
20. QA, hardening, and deployment polish

---

# 3. Phase 0 — Project Foundation

## Goal
Create a clean, production-minded Next.js codebase with consistent conventions from the start.

## Codex tasks
1. Initialize a new Next.js app using:
   - App Router
   - TypeScript
   - pnpm
   - Tailwind CSS
2. Add core folders:
   - `app`
   - `components`
   - `lib`
   - `db`
   - `supabase`
   - `tests`
   - `scripts`
   - `docs`
3. Set formatting and linting:
   - ESLint
   - Prettier if desired
4. Add base TypeScript path aliases
5. Add `.env.example`
6. Add starter `README.md`
7. Add a consistent naming convention guide in `/docs`

## Deliverable
A runnable local app with a clean folder structure.

---

# 4. Phase 1 — Environment and Tooling

## Goal
Install the full technical base before feature work begins.

## Codex tasks
1. Install core dependencies:
   - Supabase SSR/client packages
   - Drizzle ORM + drizzle-kit
   - Zod
   - react-hook-form
   - shadcn/ui base setup
   - lucide-react
   - class-variance-authority
   - tailwind-merge
   - Resend
   - Sentry
   - Vercel AI SDK
2. Configure Tailwind
3. Configure shadcn/ui
4. Add shared utility functions:
   - classnames helper
   - date formatting
   - currency formatting
   - role helper stubs
5. Add `drizzle.config.ts`
6. Add test setup:
   - Vitest
   - Testing Library
   - Playwright scaffold

## Deliverable
A working development environment with all primary dependencies installed and configured.

---

# 5. Phase 2 — Supabase Integration

## Goal
Set up the backend platform properly before business logic.

## Codex tasks
1. Create Supabase project integration helpers:
   - browser client
   - server client
   - middleware client
2. Add auth session handling for App Router
3. Add `middleware.ts` for protected routes
4. Create Supabase config and setup docs in the repo
5. Add starter storage bucket plan comments
6. Add placeholder edge function folder structure inside `/supabase/functions`

## Deliverable
Supabase connected cleanly to the app, with session-aware routing ready.

---

# 6. Phase 3 — Database Schema and Migrations

## Goal
Create the first stable domain model.

## Rule
Do not start feature screens before the initial schema exists.

## Codex tasks
1. Create Drizzle schema files for:
   - accounts
   - venues
   - profiles / user linkage
   - account_memberships
   - contacts
   - event_workspaces
   - tasks
   - notes
   - internal_messages
   - activity_log
2. Add common fields to tenant-owned tables:
   - `id`
   - `account_id`
   - `venue_id` where relevant
   - `created_at`
   - `updated_at`
   - `created_by`
   - `updated_by`
3. Generate first migration
4. Add seed script for:
   - demo account
   - demo venue
   - demo users
   - demo event workspace
5. Add basic indexes for common lookups
6. Add schema docs to `/docs/schema-overview.md`

## Deliverable
Usable first database schema with migration and seed support.

---

# 7. Phase 4 — Authorization and Multi-Tenant Access

## Goal
Lock the tenancy and role system early.

## Codex tasks
1. Define roles:
   - account_admin
   - sales_manager
   - coordinator
   - operations
   - read_only
2. Create membership-aware access helpers
3. Add route protection helpers
4. Add server-side authorization utility layer
5. Create Supabase Row Level Security policy stubs or SQL files for all first-phase tables
6. Ensure every read/write path is account-scoped

## Deliverable
A secure multi-tenant foundation ready for real feature work.

---

# 8. Phase 5 — Authentication and Account Creation

## Goal
Build the auth entry points and onboarding gate.

## Codex tasks
1. Build auth routes:
   - sign in
   - sign up
   - forgot password
   - reset password
   - auth callback
2. Support:
   - email/password
   - Google sign-in
3. Add email verification handling
4. Add account creation flow after sign-up
5. Add invite acceptance placeholder flow for team members
6. Add role-aware post-login redirect logic

## Deliverable
Working authentication and first account creation flow.

---

# 9. Phase 6 — Onboarding Workflow

## Goal
Create the first-run setup flow for venue/account data.

## Codex tasks
1. Build onboarding wizard or Typeform-style in-app flow for:
   - venue location
   - venue count
   - venue names
   - spaces per venue
   - seated capacity
   - cocktail capacity
   - in-house catering yes/no
   - account plan selection
2. Add logic:
   - Base plan allowed only for single-venue accounts
   - Pro / Pro+ allowed for single or multi-venue accounts
3. Persist onboarding results to:
   - account
   - venues
   - venue_spaces or equivalent starter table
4. Add setup checklist state
5. Add users/team invite step at the end of onboarding

## Deliverable
A complete first-run onboarding experience that creates the tenant shape of the app.

---

# 10. Phase 7 — App Shell and Design System Foundation

## Goal
Build the OpenVenue shell once and reuse it everywhere.

## Codex tasks
1. Build authenticated top navigation shell
2. Add global layout:
   - top nav
   - page container
   - content width rules
   - background surface rules
3. Implement OpenVenue design tokens:
   - Dark Juniper primary
   - neutral surfaces
   - border tokens
   - radius tokens
   - spacing tokens
   - typography tokens
4. Create shared primitives:
   - Button
   - Card
   - Badge
   - Input
   - Select
   - Tabs
   - Table primitives
   - Empty states
   - Loading skeletons
   - Section header
5. Create role-safe navigation structure:
   - Dashboard
   - Leads
   - Calendar
   - Tasks
   - Reports
   - Settings

## Deliverable
A reusable, branded application shell aligned with the UI direction system.

---

# 11. Phase 8 — Dashboard

## Goal
Build the first operational landing screen.

## Codex tasks
1. Create `/dashboard`
2. Implement starter widgets:
   - My tasks today
   - Leads awaiting response
   - Follow-up due
   - Upcoming calendar items
   - Pipeline snapshot
3. Add placeholder AI briefing card
4. Connect to real seeded/demo data
5. Add empty/loading/error states

## Deliverable
A working dashboard built on real schema and reusable UI patterns.

---

# 12. Phase 9 — Leads / Pipeline

## Goal
Build the lead management entry point.

## Codex tasks
1. Create `/leads`
2. Support:
   - list/table view
   - pipeline board view
3. Add filters:
   - stage
   - owner
   - venue
   - event type
   - source
4. Add lead row / card primitives
5. Link rows/cards to Event Workspace route
6. Add create-workspace flow
7. Add stage update actions
8. Add seeded sample states

## Deliverable
A functional leads screen with pipeline and list structures.

---

# 13. Phase 10 — Event Workspace Shell

## Goal
Build the core record shell that everything else attaches to.

## Codex tasks
1. Create `/workspace/[id]`
2. Build persistent workspace header
3. Add top-level tab structure:
   - Overview
   - Inbox
   - Proposal
   - Timeline
   - Payments & Contract
   - BEO
   - Notes
   - Messages
   - Tasks
4. Build Overview tab first with:
   - summary cards
   - next step placeholder
   - key dates
   - readiness placeholder
5. Add activity summary preview block
6. Ensure role-aware loading and access checks

## Deliverable
A stable Event Workspace shell ready for module-by-module expansion.

---

# 14. Phase 11 — Collaboration Foundation

## Goal
Build the internal memory and collaboration layer early because many later modules depend on it.

## Codex tasks
1. Build Notes module
2. Build Internal Messages module
3. Build Activity stream module
4. Add search/filter foundations
5. Add create-task-from-note/message flow
6. Add pinned note support
7. Add visibility labels and role-awareness
8. Add activity writes from key system actions

## Deliverable
A real collaboration layer inside the Event Workspace.

---

# 15. Phase 12 — Calendar and Tasks

## Goal
Build the operational coordination layer used across the product.

## Codex tasks for Calendar
1. Create `/calendar`
2. Build:
   - month view
   - week view
   - day view
3. Add filter rail
4. Add calendar item create/edit drawer
5. Support event types:
   - Event
   - Tour
   - Tasting
   - Meeting
   - Hold
6. Link calendar items back to workspace

## Codex tasks for Tasks
1. Create `/tasks`
2. Build grouped task views:
   - My tasks
   - Team tasks
   - Overdue
3. Add create/edit task flows
4. Support task creation from other modules
5. Add task status and priority updates

## Deliverable
Calendar and Tasks working as cross-cutting operational features.

---

# 16. Phase 13 — Inbox Foundation

## Goal
Build the communication shell before deeper AI messaging features.

## Codex tasks
1. Build Inbox tab inside Event Workspace
2. Create email thread and message UI scaffolds
3. Add thread list + message view split layout
4. Support placeholder send/reply flow structure
5. Add activity logging for message events
6. Prepare integration points for real email sending later

## Deliverable
A structured inbox module, even if external email sync is still limited in first pass.

---

# 17. Phase 14 — Proposal Builder

## Goal
Build the commercial workspace that connects sales to operations.

## Codex tasks
1. Add proposal tables:
   - proposals
   - proposal_items
   - pricing_adjustments
2. Build Proposal tab layout:
   - builder canvas
   - pricing summary rail
   - AI/support rail placeholder
3. Add sections:
   - proposal setup
   - spaces
   - food
   - beverage
   - rentals/staffing/add-ons
   - fees/surcharges/discounts/tax
   - client-facing notes
   - internal notes
4. Support:
   - add item
   - edit item
   - remove item
   - reorder item
   - add custom adjustment
5. Add proposal totals calculation logic
6. Add versioning model
7. Add preview mode

## Deliverable
A working proposal builder with pricing rules and version-aware state.

---

# 18. Phase 15 — Payments & Contract

## Goal
Build booking commitment tracking from proposal outputs.

## Codex tasks
1. Add tables:
   - contracts
   - invoices or payment schedules
   - payment_records
2. Build Payments & Contract tab
3. Add:
   - contract panel
   - milestone schedule
   - payment history
   - booking readiness card
4. Support:
   - create contract record
   - mark sent / viewed / signed
   - add payment milestone
   - mark paid
   - add reminder placeholder flow
5. Roll up totals from Proposal where appropriate
6. Add dashboard/overview financial alerts

## Deliverable
A clean commercial tracking module tied to proposal data.

---

# 19. Phase 16 — Timeline Builder

## Goal
Build the planning and run-of-show system.

## Codex tasks
1. Add tables:
   - timelines
   - timeline_items
2. Build Timeline tab layout
3. Support:
   - planning timeline
   - day-of timeline
   - grouped phases
   - item create/edit/delete
   - reorder within phases
   - role visibility flags
   - location assignment
   - responsibility assignment
4. Add summary rail:
   - start/end
   - conflicts placeholder
   - missing timing details
5. Add export/preview placeholder modes

## Deliverable
A dual-layer timeline system for planning and execution.

---

# 20. Phase 17 — BEO

## Goal
Build the operational handoff layer after Timeline and Proposal are in place.

## Codex tasks
1. Add tables:
   - beos
   - beo_versions
   - beo_role_outputs if needed
2. Build BEO tab layout
3. Add:
   - master BEO view
   - role preview toggles
   - manager view
   - kitchen view
   - staff view
4. Pull in:
   - event details
   - selected spaces
   - proposal summary
   - timeline summary
   - operational notes
5. Add readiness rail
6. Add finalize/version flow
7. Add print/export structure

## Deliverable
A compiled operational handoff system with role-based views.

---

# 21. Phase 18 — AI Infrastructure

## Goal
Create one reusable AI architecture before adding AI to each module.

## Codex tasks
1. Create `lib/ai`
2. Add:
   - provider wrapper
   - model config
   - prompt file structure
   - structured schema helpers
   - usage logging
   - safe retry helpers
3. Add database tables for AI tracking:
   - ai_runs
   - ai_artifacts
   - ai_summaries
   - ai_suggestions
4. Create route handlers or server actions for AI requests
5. Ensure AI outputs are stored separately from canonical business data

## Deliverable
A reusable AI backend layer for the whole app.

---

# 22. Phase 19 — AI Feature Rollout by Module

## Goal
Add AI features only after the underlying module is stable.

## Inbox AI
- summarize thread
- draft reply
- extract action items
- objection classification

## Proposal AI
- suggest starting package
- generate intro copy
- flag budget mismatch
- explain pricing structure

## Timeline AI
- generate first draft
- suggest buffers
- detect conflicts
- generate role-specific views

## BEO AI
- generate draft BEO
- identify missing operational details
- role-based summary generation

## Collaboration AI
- summarize notes/messages
- extract decisions
- suggest tasks
- generate rolling event brief

## Dashboard / Overview AI
- daily briefing
- next best action
- readiness summary

## Deliverable
AI embedded into the workflow rather than bolted on as a separate chat page.

---

# 23. Phase 20 — Exports and Documents

## Goal
Support printable/shareable operational and commercial outputs.

## Codex tasks
1. Create HTML/React-based document templates for:
   - proposal preview
   - BEO
   - timeline summary
2. Add PDF generation flow
3. Store generated documents in Supabase Storage
4. Add document metadata references in DB
5. Add export/download actions in relevant modules

## Deliverable
Real document output for core venue workflows.

---

# 24. Phase 21 — Notifications, Reminders, and Jobs

## Goal
Automate the most important operational follow-ups.

## Codex tasks
1. Add notification/reminder service layer
2. Create cron-safe job entry points for:
   - stale lead reminders
   - unsigned contract reminders
   - overdue payment reminders
   - daily task summaries
   - upcoming event readiness checks
3. Add Resend integration
4. Log reminder activity to Activity stream

## Deliverable
A functional reminder system for key business workflows.

---

# 25. Phase 22 — QA and Hardening

## Goal
Stabilize the product before broader rollout.

## Codex tasks
1. Add unit tests for:
   - pricing calculations
   - permissions helpers
   - status transitions
   - AI output schema validation
2. Add Playwright coverage for:
   - auth
   - onboarding
   - create workspace
   - proposal editing
   - task creation
3. Add seed reset/dev scripts
4. Add error boundaries
5. Add Sentry integration
6. Add loading and empty-state polish
7. Review accessibility on key screens

## Deliverable
A more reliable, testable MVP foundation.

---

# 26. Phase 23 — Deployment and Launch Readiness

## Goal
Ensure the app is clean to deploy on Vercel and usable in staging/production.

## Codex tasks
1. Finalize environment variable documentation
2. Add deployment notes for Vercel
3. Add migration and seed instructions
4. Add staging/production environment guidance
5. Add first admin bootstrap instructions
6. Add smoke test checklist
7. Confirm auth callback URLs and domain config
8. Confirm storage bucket and policy setup

## Deliverable
A deployable, documented v1 codebase.

---

# 27. Implementation Rules for Codex

## Rules
1. Build server components by default
2. Use client components only when interaction demands them
3. Keep schema and UI aligned with the product wireframes
4. Prefer reusable domain components over page-specific hacks
5. Use Zod on all important inputs
6. Keep AI outputs separate from canonical business data
7. Respect multi-tenancy in every table and query
8. Do not bypass authorization in the UI or server layer
9. Add activity logging for important state changes
10. Keep each phase working before moving on

---

# 28. Recommended Milestones

## Milestone A — Platform Ready
Complete through:
- foundation
- schema
- auth
- onboarding
- app shell

## Milestone B — CRM Core Ready
Complete through:
- dashboard
- leads
- workspace shell
- collaboration
- tasks
- calendar

## Milestone C — Commercial Core Ready
Complete through:
- inbox shell
- proposal builder
- payments & contract

## Milestone D — Planning & Ops Ready
Complete through:
- timeline
- BEO
- exports

## Milestone E — AI-Native Layer Ready
Complete through:
- AI infrastructure
- AI by module
- reminders/jobs
- QA hardening

---

# 29. Suggested First Prompt Sequence for Codex

## Prompt 1
Create the project scaffold, dependencies, app shell, and Supabase/Drizzle setup.

## Prompt 2
Implement schema, tenancy, memberships, auth routes, and onboarding.

## Prompt 3
Build dashboard, leads, workspace shell, notes/messages/activity, tasks, and calendar.

## Prompt 4
Build proposal builder, payments & contract, and inbox shell.

## Prompt 5
Build timeline, BEO, exports, and AI infrastructure.

## Prompt 6
Add AI feature pass, reminders/jobs, and testing/hardening.

This staged prompting is safer than asking Codex to build the whole app in one leap.

---

# 30. Summary

This roadmap is designed to help Codex build OpenVenue in the right order:

**foundation → tenancy → shell → CRM core → commercial workflows → planning workflows → AI layer → hardening**

That sequence is the most efficient and least fragile way to get from zero to a usable v1.
