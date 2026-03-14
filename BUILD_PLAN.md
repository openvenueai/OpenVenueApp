# OpenVenue Repo Build Plan

## Current Repo State

This repository is currently at true project-start state:

- only the planning/reference markdown files exist
- there is no application scaffold yet
- there is no git repository initialized yet
- there is no package manager, config, schema, or environment setup yet

That means our plan should start from zero and follow the implementation order described in the reference docs.

## Source of Truth

This build plan is derived from the reference documents already in this repo, especially:

- `Reference/openvenue-project-overview-and-mvp.md`
- `Reference/openvenue-codex-implementation-roadmap.md`
- `Reference/openvenue-master-codex-kickoff-prompt.md`
- the module wireframes in `Reference/openvenue-wireframe-*.md`

## Working Rules

- Build one production-minded Next.js app, not separate frontend/backend repos.
- Treat `Event Workspace` as the central domain object.
- Build multi-tenant and role-aware foundations before feature depth.
- Use shared structured data across Proposal, Timeline, Payments, BEO, Notes, Tasks, and Calendar.
- Keep AI outputs separate from canonical business data.
- Finish each phase in a usable state before moving forward.

## Phase 0 - Repository Bootstrap

### Goal
Create the initial codebase and repo conventions.

### Key work
- Initialize git for the repo.
- Create a Next.js app with App Router, TypeScript, pnpm, and Tailwind.
- Establish the base folder structure:
  - `app`
  - `components`
  - `lib`
  - `db`
  - `supabase`
  - `tests`
  - `scripts`
  - `docs`
- Add linting, formatting, and TypeScript path aliases.
- Add `.env.example`, starter `README.md`, and repo conventions docs.

### Exit criteria
- App runs locally.
- Folder structure is stable.
- Team has one obvious place to add new code.

## Phase 1 - Platform and Tooling

### Goal
Install and configure the full base stack before feature work.

### Key work
- Add Supabase SSR/client packages.
- Add Drizzle ORM and drizzle-kit.
- Add Zod, react-hook-form, shadcn/ui, lucide-react, class-variance-authority, and tailwind-merge.
- Add Vercel AI SDK, Resend, Sentry, Vitest, Testing Library, and Playwright.
- Configure Tailwind, shadcn/ui, test setup, and utility helpers for dates, currency, and class names.

### Exit criteria
- Dependencies are installed and configured.
- Local lint/test/dev commands work.
- Shared utilities are ready for the rest of the build.

## Phase 2 - Supabase, Schema, and Tenancy Foundation

### Goal
Create the backend and data foundation before screen-level implementation.

### Key work
- Set up Supabase browser/server/middleware clients.
- Add session-aware middleware and protected-route support.
- Create the first Drizzle schema for:
  - accounts
  - venues
  - profiles
  - account_memberships
  - contacts
  - event_workspaces
  - tasks
  - notes
  - internal_messages
  - activity_log
- Add tenant ownership fields consistently.
- Generate the first migration.
- Add seed data for a demo account, venue, users, and event workspace.
- Draft RLS-aware patterns and authorization helpers.

### Exit criteria
- Supabase is connected.
- Schema exists and migrates cleanly.
- Seeded data supports realistic UI development.
- All tenant data is account-scoped by design.

## Phase 3 - Auth, Roles, and Onboarding

### Goal
Get users into the product correctly and create the tenant shape of the app.

### Key work
- Build auth routes for sign in, sign up, forgot password, reset password, and auth callback.
- Support email/password plus Google sign-in.
- Add account creation flow after signup.
- Implement role model:
  - account_admin
  - sales_manager
  - coordinator
  - operations
  - read_only
- Build the onboarding flow:
  - company setup
  - venue count
  - venue details
  - spaces
  - catering model
  - venue type
  - event types
  - team size
  - CRM migration question
  - plan selection
- Add setup checklist and invite-team foundation.

### Exit criteria
- A new user can create an account and land in a usable tenant.
- Plan eligibility logic works.
- Team invites and role-aware redirects are scaffolded.

## Phase 4 - App Shell and Design System

### Goal
Build the OpenVenue shell once and use it everywhere.

### Key work
- Implement the authenticated top navigation.
- Add global page layout and width rules.
- Define the visual token system:
  - Dark Juniper primary
  - neutral surfaces
  - quiet borders
  - spacing
  - radius
  - typography
- Create shared primitives:
  - Button
  - Card
  - Badge
  - Input
  - Select
  - Tabs
  - Table primitives
  - Section headers
  - Empty states
  - Skeletons
- Add role-safe navigation structure.

### Exit criteria
- The app has a stable branded shell.
- Core UI primitives are reusable.
- New screens can be built without redesigning layout each time.

## Phase 5 - CRM Core

### Goal
Ship the first real operational slice of the product.

### Key work
- Build Dashboard.
- Build Leads / Pipeline with list and board views.
- Build the Event Workspace shell and Overview tab.
- Add stage/status models, summary cards, next-action areas, and activity previews.
- Ensure seeded data drives the UI.

### Exit criteria
- A user can view pipeline state, open a lead, and work inside a persistent Event Workspace.
- Dashboard, Leads, and Workspace feel like one connected system.

## Phase 6 - Collaboration and Operations Foundation

### Goal
Add the cross-cutting tools teams use every day.

### Key work
- Build Notes, Internal Messages, and Activity as distinct systems.
- Add task creation from notes/messages.
- Build Tasks screen and task CRUD flows.
- Build Calendar with month/week/day views, filters, and workspace links.
- Build Inbox shell with thread list, detail pane, and reply/send structure.

### Exit criteria
- Teams can communicate, capture context, assign work, and manage schedule in one app.
- Event Workspace becomes operationally useful beyond basic CRM tracking.

## Phase 7 - Commercial Layer

### Goal
Build the sales-to-booking workflow that turns demand into committed revenue.

### Key work
- Add proposal tables and pricing adjustment models.
- Build the Proposal Builder with:
  - spaces
  - food
  - beverage
  - rentals/staffing/add-ons
  - fees
  - surcharges
  - discounts
  - tax
  - client-facing notes
  - internal notes
  - preview
  - versioning
- Build Payments & Contract with:
  - contract tracking
  - milestone schedules
  - payment history
  - reminders
  - booking readiness

### Exit criteria
- A lead can move from proposal drafting to contract/payment tracking inside the same workspace.
- Pricing logic is structured and reusable.

## Phase 8 - Planning and Operational Handoff

### Goal
Support the booked-event workflow through execution readiness.

### Key work
- Build Timeline Builder for planning milestones and day-of run-of-show.
- Add timing groups, locations, ownership, role visibility, and conflict scaffolding.
- Build BEO with:
  - master BEO
  - manager view
  - kitchen view
  - staff view
  - versioning
  - readiness review
- Connect Proposal, Timeline, Notes, and event data into BEO outputs.

### Exit criteria
- A booked event can be planned, reviewed, and handed off for execution in OpenVenue.
- Timeline and BEO reuse structured data instead of duplicating it.

## Phase 9 - AI Infrastructure and AI Rollout

### Goal
Add AI in a reusable, controlled way after core modules are stable.

### Key work
- Create `lib/ai` and model/provider wrappers.
- Add prompt structure, schema validation, retries, and usage logging.
- Create AI tables:
  - `ai_runs`
  - `ai_artifacts`
  - `ai_summaries`
  - `ai_suggestions`
- Roll AI into each module as reviewable support:
  - dashboard briefings
  - inbox summaries and drafts
  - proposal suggestions and pricing warnings
  - timeline draft generation and conflict checks
  - BEO completeness checks
  - collaboration summaries and task extraction

### Exit criteria
- AI feels embedded and useful, not bolted on.
- No AI feature silently overwrites canonical records.

## Phase 10 - Exports, Reminders, and Hardening

### Goal
Make the product reliable, deployable, and useful in real venue operations.

### Key work
- Add HTML/React document templates for proposal, BEO, and timeline outputs.
- Add PDF generation and document storage in Supabase Storage.
- Add reminders/jobs for stale leads, unsigned contracts, overdue payments, daily tasks, and readiness checks.
- Add unit tests for pricing, permissions, transitions, and AI schemas.
- Add Playwright coverage for auth, onboarding, workspace creation, proposal editing, and task creation.
- Add error boundaries, Sentry, accessibility review, loading/empty-state polish, and deployment docs.

### Exit criteria
- Core exports work.
- Key reminders work.
- Critical flows are tested.
- The app is ready for staging and Vercel deployment.

## Recommended Milestones

### Milestone A - Platform Ready
Complete Phases 0 through 4.

### Milestone B - CRM Core Ready
Complete Phase 5.

### Milestone C - Collaboration and Ops Ready
Complete Phase 6.

### Milestone D - Commercial Core Ready
Complete Phase 7.

### Milestone E - Planning and Handoff Ready
Complete Phase 8.

### Milestone F - AI-Native MVP Ready
Complete Phases 9 and 10.

## Immediate Next Step

Start with Phase 0 in this exact order:

1. initialize git
2. scaffold the Next.js app
3. create the base folder structure
4. add repo conventions and environment template
5. verify the app runs locally

Once that is done, move directly into Phase 1 and Phase 2 before building any feature screens.
