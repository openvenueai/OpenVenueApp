# OpenVenue Schema Overview

This document describes the first domain schema created in Phase 2.

## Design Goals

- Multi-tenant by default
- Event Workspace as the central record
- Strong account scoping from the start
- Venue-aware data model
- Auditability for collaboration and operational records

## Core Tables

### accounts
- top-level tenant object
- stores plan tier, onboarding state, and account-wide settings

### profiles
- internal user profile records linked to Supabase Auth users
- stores display and contact details used across the app

### account_memberships
- joins profiles to accounts
- stores role, membership status, and venue access scope

### venues
- venue records under an account
- stores venue identity and location data

### venue_spaces
- spaces inside a venue
- supports later proposal, calendar, timeline, and BEO workflows

### contacts
- lead/client/planner/vendor contacts tied to the account
- acts as the CRM contact layer for Event Workspaces

### event_workspaces
- the central domain object
- a record that begins as a lead and matures into a booked event

### tasks
- shared accountability records
- can attach to an Event Workspace and later other objects

### notes
- durable internal event context

### internal_messages
- internal team discussion records

### activity_log
- system and user activity trail for the Event Workspace and related records

## Shared Field Conventions

Most tenant-owned tables include:

- `id`
- `account_id`
- `venue_id` where relevant
- `created_at`
- `updated_at`
- `created_by`
- `updated_by`

## Enums Added

The Phase 2 schema introduces enums for:

- plan tier
- account type
- onboarding status
- app role
- membership status
- venue type
- catering model
- space type
- contact type
- event type
- workspace stage and status
- task status, priority, and source
- note type
- internal message type
- visibility scope

## Next Schema Areas

Later phases will extend the schema with:

- inbox/email records
- proposal and pricing tables
- contract and payment records
- timeline tables
- BEO tables
- AI tracking tables
- exports and notifications
