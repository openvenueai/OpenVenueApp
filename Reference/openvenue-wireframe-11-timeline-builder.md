# OpenVenue Wireframe 11 — Timeline Builder

## Purpose
The Timeline Builder is the planning and run-of-show workspace inside the Event Workspace. It helps venue teams turn booked event details into a complete, executable sequence for planning, coordination, and day-of operations.

This module should do three jobs at once:
1. Organize pre-event planning milestones
2. Build the day-of event flow
3. Feed timing and sequencing into the BEO and operational handoff

It should feel like:
- a structured hospitality run-of-show builder,
- a planning timeline,
- and an operational sequencing tool.

It should **not** feel like:
- a generic calendar,
- a simple checklist,
- or a project-management gantt chart.

---

## Product Goals
The Timeline Builder should allow a user to:

1. Generate a first draft timeline from event context
2. Manage both planning milestones and event-day sequence
3. Add, edit, reorder, and group timeline blocks
4. Assign locations, responsibility, and visibility rules
5. Detect conflicts, timing gaps, and missing operational details
6. Generate client-friendly and internal role-specific versions
7. Feed clean timing data into BEO, Overview, Tasks, and readiness logic

---

## Core UX Principles
1. **Structured, not blank**
   - Timeline should open with event-aware context and suggested sequencing.

2. **Two layers, one system**
   - Planning milestones and day-of run-of-show should coexist in one timeline architecture.

3. **Operations-first clarity**
   - Timing, space, and sequence should be legible at a glance.

4. **AI is assistive and reviewable**
   - AI drafts a first sequence, suggests buffers, and flags conflicts.
   - AI never silently rewrites the final schedule.

5. **One source, many outputs**
   - The same timeline should support internal, client-facing, and staff-specific views.

---

## Shell Placement
This screen lives inside:

**Event Workspace → Timeline**

It inherits:
- the persistent Event Workspace header,
- event context,
- stage logic,
- workspace actions,
- and AI/system rail behavior.

---

## Primary Screen Modes
1. **Builder View**
   - Main editing and sequencing mode

2. **Compact View**
   - Condensed operational list for fast scanning

3. **Role Preview**
   - Internal / staff / client-friendly variants

4. **Version / Change Review**
   - Compare meaningful timing changes over time

---

## Recommended Page Structure
Use a three-zone layout:

### Zone 1 — Main Timeline Canvas
Primary editable sequencing column with grouped blocks and timeline items.

### Zone 2 — Timeline Summary Rail
Persistent right rail showing:
- event start/end
- total duration
- key spaces used
- planning completeness
- day-of readiness
- conflicts
- missing timing details
- preview/export controls

### Zone 3 — AI / Timing Support
Contextual AI modules providing:
- first draft generation
- missing timeline details
- buffer suggestions
- conflict warnings
- alternate version generation
- change summaries

---

## Persistent Workspace Header
### Header contents
- Event name
- Stage
- Event type
- Event date
- Guest count
- Key spaces
- Timeline status
- Last updated
- Day-of readiness indicator

### Header actions
- Generate draft
- Add timeline item
- Preview by role
- Compare changes
- Save draft
- Finalize timeline

---

## Timeline Header Row
Inside the Timeline tab, place a timeline-specific header row.

### Contents
- Timeline title
- Status badge
- Last updated timestamp
- Source summary (event details / proposal / notes)
- Total event duration
- Number of timeline blocks

### Statuses
- Draft
- In Review
- Finalized
- Archived

### Header actions
- Add item
- Add phase
- Generate draft
- Preview
- Export / Print
- More actions menu

---

## Opening State / Starting Flow
When a user opens Timeline for the first time, do not start with an empty list.

### Opening module
Show:
- suggested event structure
- planning milestone suggestions
- day-of sequence suggestion
- missing details before generation
- event context used for the draft

### Suggested starting actions
- Generate full timeline
- Generate planning milestones only
- Generate day-of run of show
- Start from template
- Build manually

### AI labels
- Suggested starting point
- Based on event details and selected spaces
- Missing details before finalizing
- Review before applying

---

# Timeline Architecture

## Two-layer model
Timeline Builder should support two layers within one module:

### A. Planning Timeline
Pre-event milestones and coordination items.

### B. Event-Day Timeline
The actual day-of sequence and operational run of show.

These should be part of the same system, not separate disconnected tools.

---

# Main Builder Structure

## Recommended phase grouping
The builder should support grouped phases such as:
1. Pre-event planning
2. Venue access / load-in
3. Setup
4. Guest arrival
5. Main event
6. Closeout / breakdown

Users should be able to:
- collapse/expand phases
- reorder phases when appropriate
- add custom phases
- move items between phases

---

## Timeline Item Types
The builder should support flexible event-native block types:

- Planning Milestone
- Internal Reminder
- Venue Access
- Vendor Arrival
- Setup
- Client Arrival
- Ceremony
- Cocktail Hour
- Room Flip
- Dinner Service
- Speech / Toast
- Entertainment
- Dancing
- Dessert
- Last Call
- Breakdown
- Cleanup
- Other

The product should not force these into generic appointment logic.

---

## Timeline Item Fields
Each timeline item should support:

- Title
- Item type
- Start time
- End time
- Duration
- Location / space
- Responsible party
- Visibility
- Status
- Internal notes
- Client-facing notes if relevant
- Dependency / linked item optional
- Source reference if generated

### Visibility options
- Internal only
- Client-visible
- Staff-visible
- Kitchen-visible
- Manager-visible
- Custom role logic later

### Status options
- Draft
- Confirmed
- Completed
- Cancelled

---

# Section-by-Section Wireframe

## 1. Planning Timeline Section
This section holds pre-event milestones and preparation checkpoints.

### Common items
- tasting scheduled
- final guest count due
- floorplan due
- final payment due
- final walkthrough
- vendor confirmations
- staffing review
- BEO review
- rental confirmation
- internal review milestone

### Behavior
- Can include date-only or date-time items
- Can optionally create linked tasks
- Can be filtered separately from day-of items

### AI support
- Suggest missing milestones based on event type
- Flag deadlines that appear too late
- Recommend task creation from milestone gaps

---

## 2. Event-Day Timeline Section
This is the operational run-of-show sequence.

### Common items
- venue access
- vendor load-in
- florist arrival
- photography arrival
- couple / host arrival
- ceremony
- cocktail hour
- dinner service
- speeches
- first dance
- open dancing
- final send-off
- vendor breakdown
- venue close

### Layout
Use vertically stacked time blocks with strong time labels.

### Behavior
- Drag to reorder
- Edit start/end
- Link to specific space
- Add internal notes
- Add role visibility
- Duplicate recurring patterns if useful later

---

## 3. Space & Location Layer
Timeline should strongly reflect where each event phase occurs.

### For each item, support:
- linked venue space
- fallback / backup space
- location notes
- transition notes between spaces

### Why this matters
The flow between ceremony, cocktail, reception, kitchen, loading, and breakdown areas is critical to operational execution.

### Validation
- overlapping items in same space
- impossible room transitions
- no assigned space for a key event block

---

## 4. Responsibility / Ownership Layer
Each timeline item should optionally show who owns or executes it.

### Responsible party examples
- Venue Manager
- Event Coordinator
- Kitchen
- Service Team
- Bar Team
- Rental Company
- Florist
- DJ / Band
- Photographer
- Client / Planner
- Other Vendor

### Purpose
This improves handoff and makes the timeline usable operationally, not just visually.

---

## 5. Notes and Visibility Layer
Timeline blocks should support notes without becoming cluttered.

### Notes types
- internal notes
- staff execution notes
- client-facing notes
- kitchen notes
- manager notes

### Behavior
Use expandable notes areas or secondary rows to keep the primary timeline scannable.

---

# Timeline Summary Rail

## Purpose
The right rail acts as the sequencing truth panel.

## Recommended content order
1. Timeline status
2. Event start / end
3. Total scheduled duration
4. Key spaces used
5. Planning completeness
6. Day-of readiness
7. Missing timing details
8. Conflict summary
9. Role preview controls
10. Export / print actions

## Missing detail examples
- no venue access time
- no breakdown block
- no staff arrival block
- no room-flip timing
- no final walkthrough milestone
- no assigned space for cocktail hour
- no responsible party on critical blocks

## Conflict examples
- overlapping blocks in one space
- ceremony ends after cocktail hour begins
- meal service too compressed for guest count
- vendor arrival after setup start
- timeline conflicts with master calendar times

---

# AI / Timing Support Panel

## Purpose
AI should make the timeline easier to build and safer to finalize.

## Recommended modules
- Generate first draft timeline
- Suggest buffer times
- Detect conflicts
- Missing details before finalizing
- Generate client-friendly version
- Generate staff / kitchen / manager version
- Changes since last update

## Example labels
- Suggested first draft
- Based on selected spaces and event format
- Buffer recommended here
- Missing details before finalizing
- Review before applying
- Recommended next step

## Rules
- AI outputs must remain editable
- AI should never auto-apply timing changes without review
- AI should explain why it is making a suggestion when helpful

---

# Role Preview / Output Variants

## Purpose
The same core timeline should support multiple views.

## Role variants
- Internal master timeline
- Client-facing timeline
- Staff timeline
- Kitchen timing summary
- Manager overview

## Behavior
These should be generated views from the same source timeline, not separate duplicate records.

### Client-facing version
Should:
- simplify operational detail
- focus on the guest-visible sequence
- hide internal staffing/logistics notes

### Staff version
Should:
- emphasize setup, transitions, service flow, and cue points
- include internal execution notes
- hide irrelevant financial/sales details

### Kitchen version
Should:
- emphasize service windows
- menu timing
- dietary timing notes
- kitchen prep coordination
- hide non-culinary noise

### Manager version
Should:
- include full event flow
- escalation notes
- staffing notes
- risk/conflict awareness

---

# Main Builder Interaction Model

## Item interaction
Each item row or block should support:
- drag/reorder handle
- time editing
- duration editing
- location editing
- visibility control
- responsible party assignment
- expand for notes
- duplicate
- delete

## Phase interaction
Each phase should support:
- collapse/expand
- rename
- reorder
- add item within phase
- add note / summary for phase if needed

## Save behavior
- Auto-save drafts with explicit saved indicator
- Preserve unsent edits when switching tabs
- Warn before discarding major reordering changes if needed

---

# Version / Change Review

## Purpose
Show timeline evolution over the planning lifecycle.

## Compare should show
- changed times
- added blocks
- removed blocks
- changed spaces
- changed visibility
- changed responsibility assignments
- changed notes on critical items

## AI summary
A concise revision summary should explain:
- what changed
- what operational impact it may have
- whether staff communication is recommended

---

# Finalize / Export / Print

## Purpose
Provide stable outputs for day-of use.

## Export types
- Internal timeline
- Client-facing timeline
- Staff timeline
- Kitchen summary
- Manager summary

## Print rules
- strong time hierarchy
- scannable grouping by phase
- clear location labels
- low-decoration, high-contrast layout
- sensible page breaks

---

# Supporting Objects and Data Dependencies

## Timeline depends on
- Event details
- Proposal selections
- Selected spaces
- Notes
- Tasks
- Venue settings
- Contact details
- Calendar context when relevant

## Timeline writes into
- BEO timing sections
- Overview readiness state
- Tasks
- Activity log
- day-of execution summaries
- role-specific exports

---

# Key States

## Empty state
### Content
- Headline: Build the event timeline
- Body: Turn event details, selected spaces, and services into a complete planning and day-of sequence.
- Actions:
  - Generate full timeline
  - Start with planning milestones
  - Start day-of run of show

## Loading state
- Skeleton timeline blocks
- Skeleton summary rail
- Skeleton AI panel
- No blank canvas

## Error state
- Calm inline warnings
- Clear validation around timing conflicts or missing source data
- Direct links to source tabs where relevant

---

# Key Interaction Rules
1. Timeline must support both planning and day-of sequencing
2. Critical items should always display time, type, and space clearly
3. Drag-and-drop should not compromise keyboard accessibility
4. Role previews must not create duplicate timeline records
5. Timeline changes should propagate to dependent modules thoughtfully
6. Missing timing details should be surfaced before finalization
7. Finalized timeline should remain version-aware

---

# Accessibility Rules
1. Time, location, and status must not rely on color alone
2. Timeline rows/blocks need visible focus states
3. Drag/reorder controls must have keyboard-accessible alternatives
4. Phase headings should create strong navigation landmarks
5. Dense schedules must remain readable at zoomed sizes and in print

---

# Component Inventory
- Timeline header row
- Phase group container
- Timeline item block / row
- Add item control
- Add phase control
- Space tag
- Responsibility tag
- Visibility chip
- Summary rail
- AI timing card
- Conflict banner
- Role preview selector
- Version compare drawer
- Export / print controls

---

# Notes for Visual Direction
This screen should follow the OpenVenue UI Direction System:
- Dark Juniper as the anchor
- neutral surfaces
- white/alabaster content planes
- quiet borders
- minimal shadow
- strong time hierarchy
- highly legible operational spacing
- no generic project-management styling

The Timeline Builder should feel like:
**a refined hospitality run-of-show workspace**

---

# Summary Definition
The Timeline Builder is:

**planning milestones + day-of sequence + space logic + responsibility + visibility + AI timing support**

It is the operational backbone between booking, coordination, and event execution.
