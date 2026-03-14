# OpenVenue App

OpenVenue is an AI-native CRM and event operations workspace for wedding and event venues.

This repository is the single-app implementation for the product defined in the planning documents under `Reference/`.

## Current Status

Phase 0 is in progress.

Completed so far:
- local git repository initialized
- GitHub remote attached to `openvenueai/OpenVenueApp`
- Next.js App Router app scaffolded with TypeScript, pnpm, Tailwind, and ESLint
- baseline project folders and repo docs added

## Core References

- `BUILD_PLAN.md`
- `Reference/openvenue-project-overview-and-mvp.md`
- `Reference/openvenue-codex-implementation-roadmap.md`
- `Reference/openvenue-master-codex-kickoff-prompt.md`

## Tech Direction

- Next.js App Router
- TypeScript
- pnpm
- Tailwind CSS
- Supabase
- Drizzle ORM

More dependencies will be added in Phase 1 and Phase 2 according to the build plan.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Useful Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

## Project Structure

```text
app/          Next.js routes and layouts
components/   Shared UI and domain components
db/           Database schema and migration-related code
docs/         Repo conventions and internal implementation notes
lib/          Shared utilities, services, and helpers
Reference/    Product and UX source-of-truth documents
scripts/      Local scripts and automation helpers
supabase/     Supabase functions and platform setup artifacts
tests/        Automated test suites
```

## Working Rules

- Treat `Event Workspace` as the central domain object.
- Build multi-tenant, role-aware foundations before feature depth.
- Keep AI outputs separate from canonical business data.
- Reuse structured data across Proposal, Timeline, Payments, BEO, Notes, Tasks, and Calendar.
- Follow `BUILD_PLAN.md` instead of building modules out of sequence.

## Next Step

Move from Phase 0 into Phase 1:
- add platform dependencies
- configure Supabase and Drizzle
- establish the first domain schema
- prepare auth and tenancy foundations

For the full sequence, use `BUILD_PLAN.md`.
