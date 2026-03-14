# OpenVenue Wireframe 04 — Calendar Module

## Purpose
The Calendar is the shared operational view for everything that is scheduled across the venue team.

It must support both **sales scheduling** and **event execution planning**.
That means it needs to work equally well for:
- tours,
- tastings,
- client meetings,
- holds,
- rehearsals,
- and confirmed events.

The Calendar should help users answer four questions quickly:
1. What is happening today, this week, or this month?
2. Where do we still have availability?
3. What needs preparation next?
4. What conflicts, overlaps, or risks need review?

This wireframe spec uses the OpenVenue UI direction, the uploaded UI guide, and the brand voice rules as the governing system.

---

## Core UX Goal
The Calendar should feel like a **master venue operations calendar**, not a generic personal planner.

It should preserve the familiar CRM calendar model users already know while improving:
- clarity under heavy schedule density,
- space-level visibility,
- event-type distinction,
- and AI-assisted prep and conflict support.

---

## Design Intent for This Screen
The Calendar should feel:
- structured,
- calm,
- highly scannable,
- spatially aware,
- and operationally dependable.

It should **not** feel like:
- a consumer calendar app,
- an overdecorated booking calendar,
- or a dense unreadable grid of pills.

---

## Primary User Jobs
- View all scheduled venue activity in one place
- Filter by room, owner, stage, or event type
- Check availability before making commitments
- Open an Event Workspace directly from the calendar
- Create tours, tastings, meetings, holds, or events
- See upcoming prep items for the next few days
- Identify scheduling conflicts or space collisions
- Shift between month, week, and day views without losing context

---

## Governing Reference Decisions
The uploaded UI guide already establishes the baseline calendar pattern:
- a collapsible left filter rail,
- month/week views,
- centered month-year header,
- a `Today` button,
- space-colored event pills,
- and a `+N more` overflow pattern for crowded days. fileciteturn8file10L18-L31 fileciteturn8file19L1-L5

The guide also makes clear that OpenVenue should outperform the competitor through stronger hierarchy, visible interaction feedback, calmer brand color usage, and AI layered onto familiar patterns rather than replacing them. fileciteturn8file12L3-L13

The voice rules require the calendar language to stay calm, concise, and operational, with short status labels and time-specific alerts instead of dramatic notification language. fileciteturn8file17L27-L40

---

## Page-Level Layout Direction

### Shell
Use the standard OpenVenue app shell:
- Dark Juniper top navigation
- pale juniper or neutral page background
- white and alabaster content planes
- subtle borders rather than heavy shadows
- consistent 24px section spacing

### Recommended page structure
```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Top nav                                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ Calendar                                            [Search] [Add item]     │
│                                                                              │
│ [Filter rail]  [Calendar header controls]                                   │
│ [spaces]       [<] [Today] [>] [March 2026 ▾] [Month|Week|Day] [My events] │
│ [status]       ------------------------------------------------------------ │
│ [owner]        [calendar grid / week lanes / day schedule]                  │
│ [legend]       [event pills / time blocks / +N more]                        │
│ [AI prep]                                                                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Main structural choice
Use a **collapsible left rail + adaptive main calendar area**.

This stays aligned to the uploaded UI guide, but for MVP the rail should do slightly more than filtering. It should also provide:
- a compact legend for spaces,
- a small “up next” prep list,
- and a conflict summary when relevant.

That makes the page more operational without breaking the familiar calendar frame.

---

## Page Header

### Left side
- Page title: `Calendar`
- Secondary text: optional, such as `All venue activity`

### Right side actions
- Global search / jump field
- `Add calendar item` primary button
- optional overflow menu: `More options`

### Header behavior
The header should remain simple. Most calendar manipulation belongs in the calendar toolbar below, not in the global header.

### Microcopy examples
- `Add calendar item`
- `Search events, tours, or contacts`
- `All venue activity`

These phrases follow the product voice requirement for clear, action-led, non-gimmicky labels. fileciteturn8file16L43-L55

---

## Left Filter Rail

### Width
- 240px expanded
- collapsible to icon-only or hidden state

The uploaded UI guide already defines a 240px collapsible filter sidebar for calendar view. fileciteturn8file10L22-L26

### Sections
#### 1. Venue / Space
Checkbox list for rooms and spaces.
Each item includes:
- colored dot,
- room/space name,
- optional count of visible items.

#### 2. Status
Checkbox list for lifecycle stages or calendar status groupings.
Examples:
- Lead activity
- Tentative
- Confirmed
- Planning
- Completed
- Cancelled

#### 3. Owner
Checkbox list for venue team members.
Each row includes:
- avatar,
- owner name,
- optional count.

#### 4. Item type
Recommended MVP addition:
- Event
- Tour
- Tasting
- Client meeting
- Internal meeting
- Hold
- Soft hold
- Reminder

#### 5. Compact legend
A small section clarifying the event-color logic:
- colors represent **space**, not stage
- badges or labels represent stage/status

This is important because the UI guide explicitly assigns calendar pill color to venue/space instead of status for better at-a-glance room awareness. fileciteturn8file10L31-L35

#### 6. Up next
A compact, optional list of the next 3–5 upcoming items:
- `Tour · Today at 3:00 PM`
- `Client meeting · Tomorrow at 11:00 AM`
- `Wedding · Friday at 5:00 PM`

This is an OpenVenue-specific improvement that adds operational usefulness without changing the core calendar pattern.

### Rail behavior
- each section can collapse/expand,
- the full rail can collapse with a chevron control,
- on screens below 1200px it should be collapsed by default.

That last rule is directly supported by the responsive guidance in the UI guide. fileciteturn8file14L42-L45

---

## Calendar Toolbar
This sits above the calendar surface and below the page header.

### Left cluster
- previous arrow
- `Today` button
- next arrow

### Center cluster
- current month / week / day label
- dropdown jump selector

### Right cluster
- view toggle: `Month` / `Week` / `Day`
- optional `My events` filter button
- optional `Availability` toggle

The uploaded guide already supports the `Today` button, dark juniper nav arrows, centered month-year label, and pill-style month/week toggle. fileciteturn8file10L27-L31 fileciteturn8file19L1-L5

### Style rules
- `Today` uses outlined juniper style
- active view uses solid Dark Juniper pill
- inactive views are bordered or ghost style
- all controls maintain 40–44px touch targets
- toolbar surface remains white or alabaster with a subtle border

---

## View System
The Calendar must support three primary views.

### 1. Month view
Best for:
- occupancy patterns,
- availability scanning,
- seeing event density,
- high-level planning.

### 2. Week view
Best for:
- coordination,
- prep sequencing,
- tours/tastings/meetings,
- staff awareness.

### 3. Day view
Best for:
- run-of-show,
- venue access timing,
- setup and breakdown coordination,
- overlapping internal activity.

### Default view
For most venue teams, default to **Month** on first entry and remember the user’s last-used view after that.

---

## Month View Wireframe Structure

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Mon        Tue        Wed        Thu        Fri        Sat        Sun        │
├──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬───────────┤
│ 1        │ 2        │ 3        │ 4        │ 5        │ 6        │ 7         │
│ 6p Tour  │          │ 11a Meet │          │ 4p Hold  │ 5p Smith │ +2 more   │
│          │          │          │          │          │ Wedding  │           │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼───────────┤
│ ...                                                                         │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Month view rules
- standard 7-column grid
- 5–6 rows depending on month
- date number in the top-left of each cell
- event pills listed below the date
- show up to 2–3 pills per day
- use `+N more` for overflow

The `+N more` rule is one of the clearest competitive improvements in your design guide and should be preserved exactly. fileciteturn8file10L33-L35 fileciteturn8file12L3-L6

### Day cell behavior
- hover uses `--juniper-50`
- clicking empty space opens create-item flow for that date
- clicking a pill opens the linked Event Workspace or calendar item drawer

The hover state is directly supported in the guide. fileciteturn8file19L1-L4

---

## Week View Wireframe Structure

```text
┌────────────┬────────────┬────────────┬────────────┬────────────┬────────────┬────────────┐
│ Mon 12     │ Tue 13     │ Wed 14     │ Thu 15     │ Fri 16     │ Sat 17     │ Sun 18     │
├────────────┼────────────┼────────────┼────────────┼────────────┼────────────┼────────────┤
│ 8:00 AM    │            │            │            │            │            │            │
│ 9:00 AM    │ Tour       │            │            │            │            │            │
│ 10:00 AM   │            │ Meeting    │            │            │            │            │
│ 11:00 AM   │            │            │            │            │            │            │
│ 12:00 PM   │            │            │            │            │            │            │
│ ...                                                                                      │
└────────────┴────────────┴────────────┴────────────┴────────────┴────────────┴────────────┘
```

### Week view goals
- show exact time placement,
- reveal overlaps,
- support prep planning,
- make tours/tastings/meetings easier to schedule.

### Week view rules
- time grid on the vertical axis
- day columns across the horizontal axis
- timed items render as blocks
- all-day or loose-timing items render in an all-day strip at the top
- overlapping items tile or stack cleanly
- current time indicator appears in a subtle but visible style

### OpenVenue-specific enhancement
Add an optional **space grouping mode** in week view later, where users can toggle between:
- time-first view,
- or space-first scheduling view.

For MVP wireframing, note the future mode but keep the primary layout simple.

---

## Day View Wireframe Structure

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Thursday, March 19                                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ All day: [Soft hold — Garden Room]                                         │
│------------------------------------------------------------------------------│
│ 8:00 AM   Setup block                                                        │
│ 9:00 AM   Tour — Main Hall                                                   │
│ 10:00 AM  Client meeting — Conservatory                                      │
│ 11:00 AM  Internal prep reminder                                             │
│ ...                                                                          │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Day view goals
- support execution and prep,
- provide the clearest view of overlaps,
- act as the closest thing to a venue operations run sheet without fully becoming one.

### Day view enhancement
When the selected day has one primary event, show a compact contextual side panel:
- event name,
- stage,
- venue space,
- key contact,
- next prep task,
- quick link to Event Workspace.

This is a valuable operational addition because it keeps the day view from feeling detached from the event record.

---

## Event Pill / Time Block Design

### Color logic
Calendar color should primarily represent **venue space** or **room**, not status. This follows the UI guide’s explicit direction for room-at-a-glance scanning. fileciteturn8file10L31-L35

### Pill contents in month view
- optional time prefix: `6p`
- event name or short item title
- truncation after roughly 28–30 characters

### Pill contents in week/day view
- title
- time range if room allows
- optional short location tag

### Layered meaning system
Because color is already committed to space, status should be shown through:
- a small badge,
- border pattern,
- icon,
- or drawer metadata,
not by changing the primary pill color.

### Event pill examples
- `6p Smith wedding`
- `11a Tour — Main Hall`
- `2p Client tasting`
- `Soft hold — Garden Room`

### Interaction states
- default: soft fill based on space color
- hover: slightly darker or bordered emphasis
- selected: stronger border or subtle shadow
- keyboard focus: visible focus ring

---

## Create Calendar Item Flow

### Entry points
- `Add calendar item` button
- click on empty day cell
- click-and-drag in week/day view
- quick action from Event Workspace

### Create modal or drawer fields
Minimum MVP fields:
- item type
- linked Event Workspace optional
- title
- date
- start time
- end time
- venue space
- owner
- notes
- status

### Item types
- Event
- Tour
- Tasting
- Client meeting
- Internal meeting
- Hold
- Soft hold
- Reminder
- Other

### Microcopy examples
- `Add calendar item`
- `Link to an event workspace`
- `Visible to your internal team only.`
- `Use a hold when the date is not yet confirmed.`

These examples follow the microcopy guidance for concise labels and helper text that explain visibility or consequence. fileciteturn8file16L56-L73

---

## Item Detail Drawer
Instead of always navigating away immediately, clicking a calendar item should first open a **detail drawer**.

### Drawer contents
- title
- item type
- stage or status
- linked workspace name
- contact name
- date/time
- space
- owner
- notes
- quick actions

### Drawer actions
- `Open event workspace`
- `Edit details`
- `Schedule follow-up`
- `Create task`
- `Copy details`
- `Cancel item` if allowed

### Why a drawer first
This keeps the calendar usable as a planning tool and prevents unnecessary context switching. Users can still jump to the Event Workspace when needed.

---

## AI Layer for Calendar
The UI guide emphasizes that AI should be overlaid onto familiar layouts rather than replacing them. fileciteturn8file12L6-L10

For the Calendar, AI should appear in three subtle ways.

### 1. Prep signals
Show a small contextual card in the left rail or above the grid:
- `Upcoming prep`
- `Two events need final review this week`
- `One tasting has no follow-up scheduled`

### 2. Conflict review
When overlaps or likely issues are detected, show a calm inline panel:
- `Two events overlap in the Garden Room on Friday.`
- `A tour is scheduled during event setup.`
- `One hold expires tomorrow.`

### 3. Suggested scheduling support
When creating or rescheduling an item, AI may suggest:
- best times for a tour,
- lower-conflict tasting windows,
- prep reminders before high-value events,
- or a next-best date when availability is tight.

### AI copy examples
- `Suggested prep reminder`
- `Based on upcoming activity`
- `Review before saving`
- `Possible conflict`
- `Suggested time window`

These labels follow the voice rules for AI transparency and human review. fileciteturn8file17L27-L40

---

## Search and Jump Behavior
The design guide recommends a global command palette for quick navigation. fileciteturn8file12L10-L13

Within the Calendar, the search field should support:
- event names,
- contact names,
- owners,
- spaces,
- and direct date jumps.

### Example behaviors
- typing `Smith` highlights relevant calendar items and offers a jump
- typing `Garden Room` filters to that space
- typing `Apr 12` jumps the calendar to that date

This makes the calendar more navigable under heavy record volume.

---

## Availability Treatment
Availability matters more in a venue CRM than in a generic calendar.

### MVP recommendation
Add a lightweight `Availability` toggle in the toolbar.

When active:
- heavily booked days receive a stronger occupancy cue,
- completely open days remain clean,
- holds and tentative bookings still appear,
- and the user can quickly assess whether to offer dates.

### Important note
Do not overbuild this into a full capacity engine yet. For MVP wireframes, availability is a visual assist layer, not a full scheduling optimizer.

---

## States and Feedback

### Empty month/day state
When nothing is scheduled for the selected period:
- headline: `No calendar items yet`
- support text: `Tours, meetings, and events will appear here.`
- primary action: `Add calendar item`

This matches the empty-state guidance to state what is missing, explain what appears here, and suggest the next action. fileciteturn8file17L10-L26

### Loading state
- skeleton toolbar
- skeleton grid structure
- placeholder pills or time blocks
- never a blank page while loading

This is directly supported by the UI guide. fileciteturn8file14L33-L39

### Error state
Examples:
- `We couldn’t load the calendar. Try again.`
- `We couldn’t save this item. Try again.`
- `Add a start time before saving.`

These follow the required calm, specific, non-blaming error style. fileciteturn8file17L1-L8

### Success state
Examples:
- `Calendar item created.`
- `Availability updated.`
- `Tour rescheduled.`

These align with the success-message guidance to confirm the object and action without celebration language. fileciteturn8file17L10-L18

---

## Accessibility and Legibility Rules
The calendar must remain usable under high density.

### Rules
- color never carries meaning by itself,
- every pill must also include text,
- keyboard navigation moves between cells and items,
- focus rings remain clearly visible,
- smaller secondary text should use gray-900 or strong contrast,
- day cells and blocks must have sufficient hit area.

These requirements align with the uploaded accessibility guidance. fileciteturn8file14L47-L54

---

## Responsive Guidance
This is still primarily a desktop screen.

### Desktop priority
The calendar should be designed first for wide-screen venue operators.

### Smaller widths
- collapse filter rail by default,
- preserve the toolbar,
- allow horizontal scroll in week/day as needed,
- and keep month cells readable instead of compressing too far.

The uploaded guide already sets the minimum supported width at 1024px and specifically calls for the calendar sidebar to be collapsed below 1200px. fileciteturn8file14L42-L45

---

## Recommended Wireframe Priorities
When this screen is translated into actual visual wireframes, the most important elements to get right are:
1. the proportion between filter rail and calendar surface,
2. the clarity of the toolbar,
3. event pill density and overflow behavior,
4. the distinction between space color and status label,
5. and the subtle placement of AI prep / conflict support.

If those five are solved well, the calendar will already feel like OpenVenue rather than a template.

---

## Final Screen Summary
The OpenVenue Calendar should be a **space-aware, operations-first master schedule**.

It keeps the familiar venue CRM calendar model users already understand, but improves it through:
- calmer hierarchy,
- better overflow handling,
- stronger room visibility,
- direct links to Event Workspaces,
- and subtle AI support for prep, reminders, and conflicts.

That makes it not just a place to view dates, but a daily coordination surface for the full venue team.
