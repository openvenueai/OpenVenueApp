# OpenVenue Wireframe 07 — Event Workspace

## Purpose
The Event Workspace is the core operating screen in OpenVenue.

It is the single record where a lead becomes a booked event and where sales, planning, finance, and operations stay connected throughout the lifecycle.

This screen should feel like the control center for one event, not a collection of disconnected tabs.

It should answer four questions quickly:
1. What is this event?
2. Where does it currently stand?
3. What needs to happen next?
4. What information is still missing?

The Event Workspace should preserve a familiar CRM detail-page model while adding an AI-native layer that is contextual, restrained, and operational.

---

## Primary Jobs To Be Done
- Review the lead or event at a glance
- Understand stage, readiness, risks, and next actions
- Move between communication, proposal, planning, payment, BEO, notes, and tasks without losing context
- Take fast actions from the header
- Let AI summarize, draft, and recommend without taking over the workflow
- Keep sales and operations aligned inside one record

---

## Design Direction Alignment
This screen should follow the OpenVenue UI Direction System:
- Dark Juniper is the anchor for active states, navigation, and primary actions
- Surfaces are neutral and lightly tinted
- Cards use subtle borders, not heavy shadows
- AI appears as recommendation panels and summary modules, not a chat-first interface
- The layout should feel calm, structured, and premium rather than dense or flashy

---

## Screen Type
Detailed workspace / record detail view

---

## Primary Layout Pattern
Use a three-level hierarchy:

### Level 1 — Global shell
- Top navigation bar
- Global search
- User menu

### Level 2 — Workspace frame
- Persistent workspace header
- Tab navigation
- Optional right-side intelligence rail on desktop

### Level 3 — Active tab content
- Overview, Inbox, Proposal, Timeline, Payments & Contract, BEO, Notes, Messages, Tasks

---

## Recommended Desktop Layout

### Top navigation
Full-width Dark Juniper bar.

Contents:
- OpenVenue logo
- Home
- Inbox
- Calendar
- Tasks
- Express Book
- Reports
- Settings
- Global search
- Help
- User avatar

### Workspace container
Centered but wide content area with generous horizontal breathing room.

Recommended structure:
- 24px outer page padding
- Full-width header card
- Tabs below header
- Main content zone below tabs

### Main content mode
For the Overview tab and detail-heavy tabs, use:
- Main content column: 8/12
- Intelligence rail: 4/12

For dense tabs like Inbox or Proposal, the content area may temporarily shift into purpose-built layouts, but the workspace header and tab model remain stable.

---

## Mobile / Narrow Screen Behavior
- Header stacks into compact summary blocks
- Primary actions collapse into overflow menu plus one pinned CTA
- Tabs become horizontally scrollable
- Right-side intelligence rail collapses into in-flow cards beneath the main content
- Financial and planning cards stack vertically

---

## Persistent Workspace Header
The header is always visible at the top of the workspace and should provide the record identity plus the most important action context.

### Header structure
Use a full-width card with three zones.

#### Zone A — Identity
- Record title
- Event type badge
- Stage badge
- Venue / space label if assigned
- Event date and time
- Guest count
- Budget range

#### Zone B — Status strip
Compact inline metadata:
- Owner
- Coordinator
- Source
- Last activity
- Next action due
- Contract status
- Payment status

#### Zone C — Actions
Primary and secondary actions aligned right:
- Send Email
- Build Proposal
- Schedule
- Add Task
- More

### Header title rules
Format example:
`Smith Wedding — June 14, 2027`

The title should read like a refined internal record name.

### Header badges
Use pills for:
- Stage
- Event type
- Space or venue label
- Urgent risk if present

### Header visual behavior
- White or alabaster surface
- Subtle border
- No strong shadow
- Dark Juniper used only for emphasis, not as full-card fill

---

## Header Quick Metrics Row
Directly beneath the main header content, include a horizontal metrics row.

### Metrics
- Proposal total
- Deposit due or paid
- Outstanding balance
- Timeline status
- BEO status
- Tasks open

Each metric should be compact and scannable, not oversized KPI cards.

---

## Global Workspace Tabs
Tabs appear directly below the header.

### Tab order
1. Overview
2. Inbox
3. Proposal
4. Timeline
5. Payments & Contract
6. BEO
7. Notes
8. Messages
9. Tasks

### Tab behavior
- Active tab indicated with Dark Juniper underline or pill emphasis
- Small count badges allowed on Inbox, Tasks, Notes where useful
- Tab labels remain stable and plain-language

### Sticky behavior
On desktop, the tab bar should remain sticky after the user scrolls past the header.

---

# Overview Tab

## Purpose
The Overview tab is the command center for the event.

It is not a summary page only. It should actively help the user understand event health and decide what to do next.

## Overview desktop layout
Two-column layout:
- Main column 8/12
- Right intelligence rail 4/12

## Main column modules
Top-to-bottom order:

### 1. Opportunity Snapshot / Event Summary
A prominent summary card at the top.

Contents:
- AI-generated summary of the lead or event
- Event vision or high-level context
- Major constraints or preferences
- Most recent client signal

Actions:
- Refresh summary
- Copy summary
- Expand detail

Copy treatment:
- Calm, factual, concise
- Prefaced with a label like “Event summary” or “Based on recent activity”

### 2. Next Best Actions
A task-like card with 3 to 5 recommended actions.

Each action row includes:
- Recommendation label
- Short reason
- Suggested owner
- Due timing
- Quick action button

Examples:
- Follow up on proposal
- Confirm guest count range
- Schedule tasting
- Review unsigned contract
- Finalize timeline draft

### 3. Key Dates and Milestones
A compact timeline strip or stacked list.

Include:
- Inquiry received
- Tour date
- Proposal sent date
- Contract sent date
- Deposit due date
- Event date
- Final review date if set

### 4. Financial Snapshot
A structured card with:
- Proposal total
- Deposit status
- Outstanding balance
- Contract status
- Payment reminders if relevant

### 5. Planning Status
A readiness card showing:
- Timeline completion
- Missing operational details
- BEO readiness
- Open planning tasks
- Unresolved notes

### 6. Recent Activity
An activity feed preview.

Include:
- Email received/sent
- Note added
- Stage changed
- Proposal viewed/sent
- Task completed
- Payment recorded

Show 5 to 8 items with “View all activity” link.

## Right intelligence rail modules

### 1. AI Health / Readiness Card
Displays:
- Event readiness score
- Confidence note
- Top blockers

### 2. Missing Information
Checklist style.

Examples:
- Final guest count not confirmed
- Setup time missing
- Ceremony location not assigned
- Dietary needs not noted

Each row should have:
- label
- why it matters
- quick action link

### 3. Risk Signals
Only appears when relevant.

Examples:
- No client response in 9 days
- Proposal sent but not viewed
- Deposit overdue
- Timeline incomplete within 14 days of event

### 4. Quick Links
Small utility card:
- Open latest proposal
- Open calendar item
- Open latest invoice
- Generate BEO

---

# Inbox Tab Within Workspace

## Purpose
Handle communication tied to this single event without leaving the workspace.

## Layout
Split view:
- Left thread list: 4/12
- Center email thread: 5/12
- Right AI reply / context panel: 3/12

### Left thread list
For this workspace, show all related email threads.

Thread row contents:
- Contact avatar
- Subject or thread title
- Preview line
- Timestamp
- Unread dot
- Sentiment or urgency badge if needed

### Center thread panel
Show full thread in chronological order.

Top toolbar:
- Reply
- Reply all
- Forward
- Mark unread
- Link attachments
- More

Composer behaviors:
- Inline composer at bottom
- Templates/snippets access
- Attach files
- Schedule send later

### Right AI panel
Modules:
- Thread summary
- Suggested reply
- Objection cues
- Extracted action items
- Recommended next step

AI actions:
- Draft reply
- Shorten
- Make warmer
- Handle pricing objection
- Confirm availability
- Ask follow-up questions

Important rule:
All output is explicitly reviewable before sending.

---

# Proposal Tab Within Workspace

## Purpose
Build, revise, review, and send client-facing proposals from the event record.

## Layout
Two-panel builder layout:
- Main builder column: 8/12
- Right summary and AI rail: 4/12

### Main builder sections
- Proposal version switcher
- Proposal metadata bar
- Package picker / catalog drawer trigger
- Line item editor table
- Section grouping by rental, food, beverage, staffing, fees, add-ons
- Client summary text editor

### Proposal metadata bar
Display:
- Proposal status
- Version number
- Last updated
- Sent date
- Viewed date

### Line item table columns
- Item
- Category
- Quantity
- Pricing method
- Unit price
- Total
- More actions

### Right rail
- Proposal total summary
- Budget alignment note
- AI recommendations
- Upsell suggestions
- Save / Send actions

AI modules:
- Generate first draft
- Recommend package mix
- Flag budget mismatch
- Explain proposal fit
- Suggest upsells

---

# Timeline Tab Within Workspace

## Purpose
Manage both planning milestones and the event run-of-show.

## Layout
Main timeline canvas with secondary side panel.

### Main column
Two view modes:
- Planning milestones view
- Day-of timeline view

### Controls
- Add timeline item
- Filter by type
- Toggle client/staff view
- Duplicate from template
- Generate draft with AI

### Timeline row contents
- Time range
- Title
- Type
- Assigned owner or vendor
- Location
- Status
- Expand chevron

### Side panel
- Timeline health summary
- Missing timing details
- Conflict alerts
- AI suggestions

---

# Payments & Contract Tab Within Workspace

## Purpose
Track financial and agreement milestones in one place.

## Layout
Dual-section page with invoices/payments on left and contract on right.

### Left section
- Invoice list
- Payment history
- Outstanding balances
- Record payment button
- Reminder actions

### Right section
- Contract status card
- Version history
- Sent/signed timestamps
- Plain-language contract summary
- Reminder controls

AI support:
- Draft payment reminder
- Explain open items
- Flag overdue risk
- Generate client-friendly summary

---

# BEO Tab Within Workspace

## Purpose
Generate and manage the operational event document.

## Layout
Document preview with side controls.

### Main area
- BEO version switcher
- Printable preview canvas
- Section navigation

### BEO sections
- Event summary
- Contacts
- Timeline
- Menu summary
- Rentals
- Staffing notes
- Floorplan notes
- Special instructions

### Side rail
- Generate / refresh BEO
- Missing operational details
- Department summaries
- Finalization controls

---

# Notes Tab Within Workspace

## Purpose
Store durable internal context tied to the event.

## Layout
Left filter column plus notes feed.

### Features
- Add note
- Filter by type
- Pin important notes
- Search notes

### Note card contents
- Note type badge
- Author
- Timestamp
- Body preview
- Convert to task

AI support:
- Summarize note history
- Extract decisions
- Convert note to checklist

---

# Messages Tab Within Workspace

## Purpose
Enable lightweight internal conversation about the event.

## Layout
Simple thread view with composer.

### Features
- Team-only thread
- Mention teammates
- Link to task or note
- Mark resolution where helpful

AI support:
- Summarize discussion
- Extract actions
- Draft handoff summary

Important constraint:
Do not let this turn into a full Slack clone.

---

# Tasks Tab Within Workspace

## Purpose
Track work tied to this event without leaving the record.

## Layout
Task list with compact detail panel.

### Features
- Filter by status, owner, due date
- Add task
- Bulk complete
- Group by due date or assignee

### Task row contents
- Checkbox
- Task title
- Priority
- Due date
- Owner
- Source tag
- Quick complete action

### Right detail panel
- Full description
- Linked context
- Activity history
- AI suggestions

---

# Activity Model

## Optional workspace activity drawer
The Event Workspace should support an all-activity view even if it is not a primary tab.

Recommended access points:
- “View all activity” from Overview
- Activity icon in header

Contents:
- system actions
- email actions
- proposal changes
- timeline changes
- payments
- notes
- stage changes

This improves trust and gives AI an auditable source of context.

---

## Cross-Tab Persistent Patterns

### 1. Right-side intelligence rail
Where space allows, use a right-side rail to hold AI summaries, risks, and quick links.

### 2. Quick actions
Across all tabs, preserve access to:
- Send Email
- Add Task
- Schedule
- Generate Proposal or BEO where relevant

### 3. Stage awareness
Every tab should preserve visibility into current stage and readiness state.

### 4. Linked object visibility
Users should never wonder whether an item belongs to the current workspace.
All proposals, payments, notes, tasks, and calendar items should visibly show their connection.

---

## Workspace States

### State 1 — New Lead
Emphasis on summary, contact, and qualification.

Priority modules:
- Opportunity Snapshot
- Next Best Actions
- Inbox preview
- Missing Information

### State 2 — Active Sales / Proposal
Emphasis on proposal, follow-up, and conversion.

Priority modules:
- Financial Snapshot
- Proposal status
- Risks
- Thread summary

### State 3 — Booked / Planning
Emphasis on timeline, tasks, and operational readiness.

Priority modules:
- Planning Status
- Upcoming dates
- Missing Information
- BEO progress

### State 4 — Final Review / Near Event
Emphasis on completion and execution.

Priority modules:
- Final checklist
- Timeline complete status
- BEO finalized state
- Payment status
- Day-of schedule access

### State 5 — Completed
Emphasis on archive, reporting, and follow-up.

Priority modules:
- Final financial summary
- Event recap
- Activity archive
- Post-event actions

---

## Empty States

### Empty Overview
Should rarely be fully empty. Use setup prompts if the record is brand new.

### Empty Inbox
Headline: `No messages yet`
Body: `Start the conversation from this event record so communication stays connected.`
CTA: `Send first email`

### Empty Proposal
Headline: `No proposal created`
Body: `Build the first proposal from your catalog and event details.`
CTA: `Create proposal`
Secondary: `Generate draft with AI`

### Empty Timeline
Headline: `No timeline yet`
Body: `Create a planning schedule or generate a first draft from the event details.`
CTA: `Add timeline item`
Secondary: `Generate draft`

### Empty BEO
Headline: `No BEO generated`
Body: `Generate a BEO when proposal, timeline, and planning details are ready.`
CTA: `Generate BEO`

---

## Loading States
- Skeleton header blocks
- Skeleton metrics row
- Skeleton cards in Overview
- Skeleton line items in Proposal
- Skeleton messages in Inbox

Never show a blank white workspace during load.

---

## Error States
Language should remain calm and specific.

Examples:
- `We couldn’t load this event workspace. Try again.`
- `We couldn’t save the stage change.`
- `The proposal draft wasn’t generated. Review the event details and try again.`

No dramatic language. No blame.

---

## Interaction Notes

### Header actions
Primary CTA should change based on stage where useful.

Examples:
- New Lead: `Send Email`
- Qualified: `Build Proposal`
- Booked: `Generate Timeline`
- Planning: `Generate BEO`

### Stage changes
Changing stage should open a compact modal or menu with:
- New stage selector
- Optional reason
- Suggested follow-up task prompt if relevant

### AI actions
AI actions should always show source framing when possible.

Examples:
- `Based on the latest inquiry`
- `Based on recent activity`
- `Missing from timeline and notes`

---

## Accessibility Rules
- Tabs must be keyboard navigable
- Header actions must remain accessible at narrow widths
- Status badges must include text, not color alone
- AI modules must not use color as sole indicator
- Tables and lists must preserve sufficient contrast
- Sticky tab behavior must not trap keyboard focus

---

## Component Inventory

### Header components
- Title block
- Stage badge
- Event type badge
- Metrics chips
- Action button group

### Overview components
- Summary card
- Recommended action list
- Milestone list
- Financial snapshot
- Planning status card
- Activity feed
- Missing info checklist
- Risk card

### Shared components
- Section header
- Badge
- Metric chip
- Empty state card
- Inline AI suggestion card
- Right rail utility card
- Detail drawer

---

## What This Screen Must Feel Like
The Event Workspace should feel like:
- a premium operations binder translated into software
- a calm CRM record page with much stronger intelligence
- the center of gravity for one event
- familiar enough to trust immediately
- elevated enough to feel distinctly OpenVenue

It should not feel like:
- a generic CRM detail page
- a chat app with tabs
- a cluttered control panel
- a decorative wedding app

---

## Wireframe Acceptance Criteria
The Event Workspace wireframe is successful if:
- the record identity is immediately clear
- the current stage and readiness are visible in under 3 seconds
- the user can access any major workflow without losing context
- AI support appears useful and quiet
- the screen supports both sales-stage and planning-stage work
- the design language feels calm, structured, and premium

---

## Suggested Next Files After This
- 08 — Proposal Builder (deep screen)
- 09 — Reports
- 10 — Settings / Catalog / Venue Setup
- 11 — Mobile workspace adaptation
