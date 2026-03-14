-- OpenVenue Phase 2 RLS policy stubs
-- These are scaffolding notes for the first account-scoped tables.
-- Full production policies will be implemented after auth and membership flows
-- are complete in later phases.

-- Recommended pattern:
-- 1. enable RLS on every tenant-owned table
-- 2. scope reads/writes by account membership
-- 3. restrict venue-scoped rows by membership venue access

-- Example helper shape:
-- create function public.is_account_member(target_account_id uuid)
-- returns boolean ...

-- Tables that should receive account-scoped policies:
-- accounts
-- venues
-- venue_spaces
-- profiles
-- account_memberships
-- contacts
-- event_workspaces
-- tasks
-- notes
-- internal_messages
-- activity_log

-- Example policy template:
-- alter table public.event_workspaces enable row level security;
--
-- create policy "event workspaces are visible to account members"
-- on public.event_workspaces
-- for select
-- using (public.is_account_member(account_id));
--
-- create policy "event workspaces can be modified by allowed members"
-- on public.event_workspaces
-- for all
-- using (public.is_account_member(account_id))
-- with check (public.is_account_member(account_id));
