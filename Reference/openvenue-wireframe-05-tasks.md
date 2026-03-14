# OpenVenue Wireframe 05 — Tasks

## Purpose
The Tasks screen is the operational accountability layer of OpenVenue.

It should help venue teams answer four questions quickly:
- What needs to be done today?
- What is overdue?
- Who owns each next step?
- Which tasks are tied to leads, bookings, meetings, or upcoming events?

This screen should feel like a calm execution workspace, not a generic to-do list.

It must support both:
- individual daily focus,
- and shared team coordination.

---

## UX Goals
- Make urgent and overdue work easy to identify.
- Keep task creation and completion friction low.
- Tie tasks clearly back to Event Workspaces and calendar items.
- Let users move between personal work management and team visibility.
- Surface AI suggestions without making the page feel automated or noisy.

---

## Governing UI Direction
This screen should follow the OpenVenue UI Direction System:
- Dark Juniper is the anchor color for navigation, primary actions, active tabs, and focus states.
- Neutral surfaces carry most of the interface structure.
- AI appears as quiet recommendations, summaries, and suggested next actions.
- Status colors stay functional and limited.
- Copy stays calm, direct, and operational.

---

## Primary User Jobs

### Sales Manager
- See follow-ups due today
- Track proposal and contract follow-up tasks
- Convert email/note activity into tasks
- Avoid missed lead responses

### Event Coordinator
- Track planning tasks for booked events
- Monitor timeline-related tasks and handoff items
- Keep event details moving toward readiness

### Operations Team
- Review execution prep tasks for upcoming events
- See assigned setup and logistics tasks
- Confirm completion before event day

### Owner / GM
- Check overdue team work
- Identify blocked events or neglected leads
- Review team accountability at a glance

---

## Screen-Level Structure
Use a standard top-nav application shell with a page body below.

### Page layout
- Top navigation bar
- Page header
- KPI strip / filter summary
- Main task workspace

### Main workspace layout
Use a **three-zone layout**:
- Left rail: views and filters
- Center: task list / grouped list / board
- Right rail: task detail / AI recommendations / quick context

This should create a task screen that feels like a control center rather than a single flat table.

---

# 1. Top Navigation

## Structure
- OpenVenue logo
- Home
- Inbox
- Calendar
- Tasks (active)
- Express Book
- Reports
- Settings
- Search
- Help
- User avatar

## Visual rules
- Dark Juniper background
- White nav labels
- Tasks highlighted as active
- Minimal visual noise

---

# 2. Page Header

## Layout
Left side:
- Page title: `Tasks`
- Supporting line: `Track follow-ups, planning work, and team action items.`

Right side:
- Search tasks
- `New task` primary button
- Overflow actions menu

## Overflow actions menu
- Export tasks
- Save current view
- Duplicate view
- Manage automations later

---

# 3. KPI / Summary Strip

Place directly below the page header.

## Cards
Use 4 to 5 compact summary cards.

### Card 1 — Due today
- large count
- subtitle: `Assigned to you`

### Card 2 — Overdue
- large count
- subtitle: `Needs attention`

### Card 3 — Upcoming this week
- count
- subtitle: `Next 7 days`

### Card 4 — Waiting / blocked
- count
- subtitle: `Pending response or dependency`

### Card 5 — Completed today
- count
- subtitle: `Closed by team`

## Card behavior
- clicking a card filters the main view
- active card gets subtle juniper emphasis
- overdue card may use a red accent badge but not a red background fill

---

# 4. Left Rail — Views and Filters

The left rail should be fixed within the Tasks screen and should feel highly practical.

## Section A — Saved Views
- My Tasks
- Due Today
- Overdue
- This Week
- Upcoming Events
- Team Tasks
- Completed

### Active state
- pale juniper fill or left border
- dark juniper label text

## Section B — Filter Groups
### Assignment
- Assigned to me
- Assigned by me
- Unassigned
- Team

### Status
- To Do
- In Progress
- Waiting
- Completed
- Cancelled

### Priority
- Low
- Medium
- High
- Urgent

### Source
- Manual
- AI Suggested
- Email Extraction
- Note Extraction
- Workflow Automation
- Calendar Prep

### Linked object
- Lead / New Inquiry
- Proposal Follow-Up
- Contract / Payment
- Booked Event
- Calendar Item
- BEO / Operations Prep

### Due date
- Today
- Tomorrow
- This week
- Next week
- No due date
- Custom

## Section C — Team / Owner Filter
- multi-select user list
- avatar + name

## Section D — AI queue shortcut
A small panel labeled:
`Suggested tasks`

With text like:
`4 recommendations based on recent activity`

Clicking opens the right-side AI panel or filters the center list.

---

# 5. Center Workspace — Primary Task View

## Recommended default
Default to a **grouped list view** rather than a board.

Why:
- task work is often time-sensitive and detail-heavy
- grouped lists are better for scanning due dates and ownership
- venue teams need operational clarity more than kanban aesthetics

## View switcher
Provide a segmented control above the list:
- List
- Grouped
- Board

### Default
`Grouped`

---

# 6. Main Toolbar Above Task List

## Controls
Left side:
- View switcher
- Group by dropdown
- Sort dropdown

Right side:
- Bulk select toggle
- Filter chip summary
- Clear filters

## Group by options
- Due date
- Event / workspace
- Assignee
- Priority
- Status

## Sort options
- Due soonest
- Recently created
- Priority
- Recently updated

---

# 7. Grouped List View Spec

## Recommended default grouping
`Due date`

### Group sections
- Overdue
- Today
- Tomorrow
- This week
- Later
- No due date

Each section should include:
- group title
- task count
- collapse/expand affordance

## Task row anatomy
Each task row should include:
- checkbox / completion control
- task title
- optional one-line description preview
- linked workspace or event name
- due date
- priority badge
- status badge
- assignee avatar
- source icon / label
- more actions button

### Secondary row metadata
Below or beside the main title, show:
- linked object label
- event date or key context if relevant
- contact or stage if useful

### Visual hierarchy
Primary:
- task title
- due date

Secondary:
- linked workspace
- assignee
- task source
- status details

## Row states
### Standard
- white row background
- horizontal divider

### Hover
- pale juniper tint

### Selected
- soft juniper border / background emphasis

### Overdue
- small red dot or red badge treatment
- due text in red
- never full-row red fill

### Completed
- checkbox marked
- title struck lightly or muted
- row remains readable

---

# 8. Board View Spec

Board view is optional but useful for some teams.

## Columns
- To Do
- In Progress
- Waiting
- Completed

## Card contents
- task title
- due date
- linked workspace
- assignee
- small priority badge

## Rules
- keep cards compact
- limit metadata
- use this as an alternative management view, not the primary task surface

---

# 9. Right Rail — Task Detail and Context

The right rail should open when a row is selected.

## Section A — Task detail
- Title
- Description
- Status
- Priority
- Due date
- Assignee
- Created by
- Source type
- Created date

## Section B — Linked context
If linked to an Event Workspace, show:
- workspace title
- current stage
- event date
- guest count
- next milestone
- quick link to open workspace

If linked to a calendar item, show:
- event / tour / tasting title
- date and time
- related workspace

## Section C — Activity log
Show lightweight task history:
- created
- reassigned
- due date changed
- completed
- reopened

## Section D — Quick actions
- Mark complete
- Reassign
- Edit task
- Open linked workspace
- Add note
- Convert to follow-up email draft later

---

# 10. AI Panel Behavior

AI should be visible but not dominant.

## Placement
Inside the right rail, below task detail, or as a collapsible section above linked context.

## AI section title
`Recommended support`

## AI modules
### Suggested next tasks
Example:
- `Create a proposal follow-up for Smith Wedding`
- `Confirm guest count for April tasting`
- `Send balance reminder for Rivera Event`

### Why suggested
Small supporting text such as:
- `Based on an overdue proposal sent 3 days ago`
- `Based on notes added this morning`
- `Based on an event happening in 5 days`

### AI actions
- Create suggested task
- Draft follow-up
- Mark as not needed
- Snooze suggestion

## AI language rules
Use calm, transparent labels:
- Suggested task
- Based on recent activity
- Review before creating
- Recommended next step

Avoid:
- “AI handled this”
- “Autonomously created”
- “Smart action engine”

---

# 11. New Task Creation Pattern

## Interaction model
New tasks should open in a right-side drawer or modal.

## Required fields
- Task title
- Assignee
- Due date

## Optional fields
- Description
- Priority
- Status
- Linked workspace
- Linked calendar item
- Source type auto-filled if AI-created

## Suggested helper patterns
If a workspace is selected, show:
`This task will appear on the event workspace and in the global Tasks view.`

If no due date is selected, show:
`You can add a due date later.`

---

# 12. Bulk Actions

When rows are selected, show a bulk action bar.

## Bulk actions
- Mark complete
- Change assignee
- Change due date
- Change priority
- Change status
- Delete

## Design rules
- keep bar compact
- place above list
- use calm language
- destructive actions should require confirmation when appropriate

---

# 13. Task-to-Workspace Relationship Rules

Tasks should feel deeply connected to the rest of OpenVenue.

## Rules
- Tasks created in a workspace should automatically appear in global Tasks.
- Tasks created in global Tasks can optionally link to a workspace.
- Calendar-related tasks should display the associated event/meeting date.
- Email-derived tasks should show the related contact or thread context.
- AI-suggested tasks should never be inserted silently without user review.

---

# 14. Empty States

## Empty state — No tasks in current filter
Headline:
`No tasks match this view`

Body:
`Try changing your filters or create a new task.`

Primary action:
`New task`

Secondary action:
`Clear filters`

## Empty state — My tasks complete
Headline:
`You’re caught up for now`

Body:
`There are no open tasks assigned to you in this view.`

Optional supporting module:
`Suggested tasks based on recent activity`

---

# 15. Loading and Error States

## Loading
- skeleton KPI cards
- skeleton grouped sections
- skeleton right rail detail panel if task selected

## Error
Example copy:
`We couldn’t load tasks right now. Try again.`

For save failure:
`We couldn’t save this task. Try again.`

For completion failure:
`We couldn’t update this task. Try again.`

Tone should remain calm, specific, and non-blaming.

---

# 16. Responsive Behavior

## Desktop
- full three-zone layout
- left filters, center list, right detail panel

## Laptop / smaller desktop
- narrower left rail
- right panel may collapse into drawer

## Tablet
- left rail collapses behind filter button
- task detail opens in full-height side sheet

## Mobile later
For MVP, mobile can be simplified and secondary.

---

# 17. Accessibility Rules

- All status indicators must include text, not just color.
- Completion checkboxes must be keyboard accessible.
- Focus state should use visible juniper outline.
- Group headers should be readable by screen readers.
- Assignee avatars must include names in accessible labels.
- Priority and due state must not rely on color alone.

---

# 18. Microcopy Direction

## Buttons
- New task
- Mark complete
- Reassign
- Save changes
- Clear filters

## Helpful sublabels
- Due today
- Waiting on reply
- Linked to event workspace
- Suggested from recent activity

## Avoid
- cheerful productivity language
- exclamation points in normal UI
- vague labels like “Process” or “Do item”

---

# 19. Wireframe Hierarchy Summary

## Primary hierarchy
1. Due and overdue accountability
2. Task list clarity
3. Linked event/workspace context
4. Quick completion and reassignment
5. AI recommendations as optional support

## Visual emphasis order
- page title
- KPI strip
- grouped task sections
- overdue due dates
- task title
- linked workspace context
- right-rail detail
- AI suggestion module

---

# 20. Why This Screen Matters in OpenVenue

The Tasks module is where OpenVenue becomes operationally trustworthy.

If the Dashboard answers **what needs attention**, the Tasks screen answers:
- what exactly needs to happen,
- who owns it,
- by when,
- and what it is connected to.

This is a critical bridge between:
- lead management,
- proposal follow-up,
- event planning,
- and operations readiness.

The screen should therefore feel disciplined, fast, and quietly intelligent.

---

# 21. Recommended Future Enhancements

Not required for MVP, but compatible with this structure:
- recurring task templates
- stage-based task automation
- dependency chains
- SLA tracking for lead response
- team workload balancing
- AI-generated pre-event checklist bundles
- timeline-to-task conversion

---

# 22. Component Inventory

## Required components
- top navigation
- page header
- summary cards
- left filter rail
- segmented view switcher
- grouped list sections
- task rows
- status badges
- priority badges
- assignee avatar chips
- right detail rail
- AI recommendation module
- new task drawer/modal
- bulk action bar
- empty state block
- skeleton loaders

---

# 23. Final Wireframe Intent

The Tasks screen should feel like:
**a quiet execution command center for venue teams**

Not a consumer to-do app.
Not a generic project board.
Not a noisy automation hub.

It should feel operational, accountable, and deeply connected to the lifecycle of each event.
