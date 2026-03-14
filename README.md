# OpenVenue App

OpenVenue is an AI-native CRM and event operations workspace for wedding and event venues.

This repository is the single-app implementation for the product defined in the planning documents under `Reference/`.

## Current Status

**Build plan Phases 0–10 are implemented.** The app is ready for staging and Vercel deployment.

Completed:
- **Phases 0–4**: Repo bootstrap, platform tooling, Supabase + schema, auth/roles/onboarding, app shell and design system
- **Phase 5**: Dashboard, Leads, Event Workspace shell and Overview tab
- **Phase 6**: Notes, Messages, Activity, task-from-note, Tasks screen (CRUD), Calendar (month view), Inbox shell (thread list, detail, reply)
- **Phase 7**: Proposal and Payments & Contract (proposals, proposal items, contracts, payment milestones)
- **Phase 8**: Timeline Builder (timelines, timeline items), BEO (draft/content)
- **Phase 9**: AI infrastructure (lib/ai, daily briefing, ai_runs/artifacts/summaries/suggestions schema)
- **Phase 10**: Deployment docs (`docs/deployment.md`), migrations for commercial and AI tables

## Core References

- `BUILD_PLAN.md`
- `Reference/openvenue-project-overview-and-mvp.md`
- `Reference/openvenue-codex-implementation-roadmap.md`
- `Reference/openvenue-master-codex-kickoff-prompt.md`

## Tech Direction

- Node.js 20 LTS
- Next.js App Router
- TypeScript
- pnpm
- Tailwind CSS
- Supabase
- Drizzle ORM

For deployment to Vercel and environment setup, see **`docs/deployment.md`**.

## Getting Started

Install dependencies:

```bash
nvm use
pnpm install
```

Verify the local Supabase configuration:

```bash
pnpm supabase:check
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
pnpm test
pnpm test:coverage
pnpm test:e2e
pnpm build
pnpm db:generate
pnpm db:push
pnpm db:studio
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

To get a live link, connect the repo to Vercel, set the required env vars (see `docs/deployment.md`), run database migrations, then deploy.
