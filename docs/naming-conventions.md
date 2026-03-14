# OpenVenue Naming Conventions

## General

- Use TypeScript everywhere.
- Prefer named exports over default exports outside of route files.
- Avoid `any` unless there is a clear integration boundary that requires it.
- Default to server components. Add `"use client"` only when interaction requires it.

## Files and Folders

- Route segments: `kebab-case`
- Shared utility files: `kebab-case.ts`
- React components: `PascalCase.tsx`
- Hooks: `use-something.ts`
- Database schema files: `snake_case` or domain-oriented names such as `accounts.ts`
- Tests: mirror the source name where practical

## Domain Structure

- Keep shared primitives in `components/`.
- Keep reusable app logic in `lib/`.
- Keep database definitions and migrations in `db/`.
- Keep Supabase-specific platform code in `supabase/`.
- Keep product and implementation notes in `docs/`.

## Data and Naming

- Database tables should use `snake_case`.
- Tenant-owned records must use `account_id` consistently.
- Add `venue_id` where a record belongs to a specific venue or venue space context.
- Prefer explicit status enums and discriminated unions over ambiguous string values.

## UI and Styling

- Reuse shared primitives before creating page-specific variants.
- Use semantic names for tokens and variants.
- Keep copy calm, direct, and operational.
- Avoid generic or decorative SaaS naming in component and section labels.
