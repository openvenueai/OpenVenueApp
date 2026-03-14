# OpenVenue — Master Codex Kickoff Prompt

Use the following prompt as the primary instruction to Codex when starting the OpenVenue project in a fresh environment.

---

## Codex Prompt

You are helping build a new application called **OpenVenue**.

This project is being started from scratch in a fresh environment.

A folder has been provided that contains the project planning, product architecture, UI direction, wireframe specs, technical stack recommendations, and implementation roadmap.

Your first job is to **read and understand the files in the folder before making implementation decisions**.

You must treat the files in that folder as the source of truth for:
- what OpenVenue is,
- how the product should behave,
- how the UI should feel,
- what modules exist,
- and how the app should be built.

---

# 1. Product Context

OpenVenue is an **AI-native CRM for wedding and event venues**.

It is designed to help venues manage:
- lead capture
- event workspaces
- communication
- proposals
- pricing rules
- timelines
- payments and contracts
- BEOs
- tasks
- collaboration
- and calendar-based coordination

The product should feel like:
- calm hospitality operations software
- structured, premium, and operational
- familiar in CRM workflow
- deeply customizable for venue use cases
- AI-native, but not AI-gimmicky

AI should be embedded as contextual support:
- summaries
- suggested next steps
- draft generation
- task extraction
- conflict detection
- objection handling
- and readiness support

AI must **never silently overwrite canonical business data**.

---

# 2. Your First Responsibility

Before building anything substantial, you must do the following:

## Step 1 — Read the files in the provided folder
Read every relevant planning/specification file in the folder, including but not limited to:
- product blueprint files
- UI direction/system files
- wireframe spec markdown files
- technical stack recommendation files
- implementation roadmap files

## Step 2 — Synthesize understanding
Create a short internal summary for yourself of:
- the product purpose
- major modules
- UI and interaction rules
- architecture constraints
- build order
- design system expectations
- AI behavior expectations

## Step 3 — Respect the documented sequence
Do not jump randomly between modules.
Follow the project roadmap and module dependencies.

---

# 3. Technical Requirements

Build the project as a **single Next.js application**.

## Required stack
- Next.js with App Router
- TypeScript
- Vercel deployment readiness
- Supabase for:
  - Postgres
  - Auth
  - Storage
  - Realtime
  - pgvector
- Drizzle ORM + drizzle-kit
- Tailwind CSS
- shadcn/ui
- Zod
- Vercel AI SDK
- Resend
- Sentry
- Vitest
- Playwright
- pnpm

## Architecture rules
- Use server components by default
- Use client components only where needed
- Use a single repo
- Build for multi-tenant SaaS from the start
- Use `account_id` and `venue_id` consistently
- Prepare for Supabase Row Level Security
- Use reusable domain components
- Keep business logic modular and strongly typed

---

# 4. Core Product Rules

You must respect these product rules while implementing:

## Rule 1 — Event Workspace is the central object
Everything should roll up to the Event Workspace.

## Rule 2 — Preserve familiar CRM patterns
The app should feel operationally familiar to venue teams.

## Rule 3 — AI is embedded, not theatrical
AI should appear as reviewable support, not a loud chatbot layer.

## Rule 4 — Premium restraint in UI
Use the documented OpenVenue visual system:
- Dark Juniper as anchor
- neutral surfaces
- quiet borders
- refined spacing
- highly scannable workflows

## Rule 5 — No duplicate data entry when avoidable
Proposal, Timeline, BEO, Payments, and Overview should reuse shared structured data.

## Rule 6 — Versioned outputs matter
Proposal and BEO should support version-aware architecture.

## Rule 7 — Pricing flexibility is core
Proposal Builder must support:
- service charges
- surcharges
- fees
- discounts
- sales tax
- venue-specific pricing logic
- proposal-level overrides

## Rule 8 — Collaboration types stay distinct
Notes, Internal Messages, and Activity are separate systems, not one mixed feed.

---

# 5. Build Behavior Instructions

When working in this repository, follow this exact behavior:

## A. Start with foundation first
You must first verify or create:
- project scaffold
- dependencies
- Supabase helpers
- Drizzle config
- database schema foundation
- auth flow foundation
- app shell foundation

## B. Build in vertical slices
Build each module in a way that includes:
- schema support
- UI route/screen
- reusable components
- loading/empty/error states
- permissions awareness
- basic data wiring

## C. Do not fake core architecture
Do not hardcode or bypass:
- tenancy
- role logic
- auth guards
- canonical data structure

## D. Prefer clean placeholders over broken complexity
If a feature needs future integrations later, create a clean placeholder architecture rather than a misleading fake full implementation.

Example:
- create contract status scaffolding even if full e-sign is not yet implemented
- create inbox shell even if deep email sync comes later

## E. Keep AI separated from canonical business fields
If implementing AI support:
- store suggestions separately
- require user review
- do not directly overwrite source-of-truth business objects

---

# 6. Required Work Sequence

Follow this sequence unless the current repository already contains completed work for a given phase.

## Phase 0
- Project scaffold
- dependency install
- app structure
- env example
- README

## Phase 1
- Supabase integration
- Drizzle config
- starter schema
- migrations
- seed data
- RLS-aware design

## Phase 2
- Auth
- account creation
- onboarding
- venue setup
- team invite foundation

## Phase 3
- app shell
- design tokens
- shared UI primitives

## Phase 4
- Dashboard
- Leads / Pipeline
- Event Workspace shell

## Phase 5
- Notes / Messages / Activity
- Tasks
- Calendar
- Inbox shell

## Phase 6
- Proposal Builder
- Payments & Contract

## Phase 7
- Timeline Builder
- BEO

## Phase 8
- AI infrastructure
- AI feature rollout by module

## Phase 9
- exports / PDFs
- reminders / jobs
- testing
- hardening
- deployment polish

Do not try to build everything at once.

---

# 7. How to Use the Folder of Specs

When reading the folder, treat each file type appropriately.

## Product/system docs
Use these to understand:
- feature intent
- workflow
- data relationships
- product priorities

## UI direction docs
Use these to understand:
- colors
- spacing
- shell structure
- component style
- AI presentation style
- tone and restraint

## Wireframe spec docs
Use these to implement:
- route/page structure
- section hierarchy
- rail layouts
- tab organization
- state behavior
- component requirements

## Technical docs
Use these for:
- stack choices
- repo structure
- implementation order
- architecture constraints

If two files seem to conflict:
1. preserve the higher-level product architecture,
2. preserve the UI direction system,
3. preserve the implementation roadmap sequence,
4. then make the smallest reasonable implementation decision.

---

# 8. Output Expectations for Each Major Step

For each major phase/module you work on, do the following:

## Before implementation
State briefly:
- what phase/module you are building
- what files/specs you are using
- what dependencies or schema pieces it requires

## During implementation
Keep the work modular:
- reusable components
- typed helpers
- route structure
- loading states
- empty states
- error states

## After implementation
Summarize:
- what was built
- what files were changed
- what still remains
- any assumptions or placeholders

---

# 9. File and Code Quality Rules

## Code rules
- TypeScript throughout
- avoid `any` unless absolutely necessary
- use Zod for important input validation
- keep functions small and composable
- avoid deeply coupled page-level logic
- prefer domain-oriented folders where reasonable

## UI rules
- follow the OpenVenue design direction
- do not use loud generic SaaS styling
- do not improvise a completely different navigation model
- use reusable primitives consistently

## Data rules
- all tenant data should be account-scoped
- venue-specific objects should include venue linkage where relevant
- activity logging should be considered for major state changes

## Security rules
- do not rely on UI-only permissions
- prepare for or implement server-side authorization
- respect multi-tenant data boundaries from the beginning

---

# 10. Important Module Expectations

## Event Workspace
This is the central screen and domain object.

## Proposal Builder
This is not a simple quote form.
It is a pricing and sales workspace with:
- spaces
- catering/menu data
- add-ons
- pricing rules
- taxes
- discounts
- client-facing narrative
- version support

## Timeline Builder
This must support:
- planning milestones
- day-of run-of-show
- grouped phases
- role-aware outputs

## BEO
This must support:
- compiled event data
- manager view
- kitchen view
- staff view
- version support
- readiness checks

## Payments & Contract
This is a status-and-commitment workspace, not full accounting software.

## Notes / Messages / Activity
These are distinct collaboration systems and should remain clearly separated.

---

# 11. If the Repository Already Has Partial Work

If some parts of the project already exist:
1. inspect the current implementation,
2. compare it against the provided spec files,
3. preserve good work,
4. refactor where needed,
5. then continue from the next unfinished phase.

Do not rewrite working code unnecessarily.
Do not ignore the architecture if partial code is misaligned.

---

# 12. First Action to Take Right Now

Your first action should be:

1. Inspect the repository and the provided spec folder
2. Identify the key markdown/spec files
3. Read and summarize them
4. Confirm the current project state
5. Determine which phase is the correct starting point
6. Then begin implementing only that phase

If the repository is completely empty, begin with:
- project scaffold
- dependency setup
- environment file
- Supabase + Drizzle foundation
- auth/account/onboarding groundwork

---

# 13. Final Instruction

Build OpenVenue like a real production-minded product:
- modular
- secure
- typed
- elegant
- and aligned with the planning docs

Do not optimize for flashy shortcuts.
Optimize for a strong foundation and clean feature sequencing.

Start by reading the folder and summarizing what you found before beginning implementation.
