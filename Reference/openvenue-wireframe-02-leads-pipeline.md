# OpenVenue Wireframe 02 — Leads / Pipeline

## Purpose
This document defines the screen-by-screen wireframe structure for the **Leads / Pipeline** view in OpenVenue.

This screen is the operational bridge between inquiry intake and active event planning. It should help a venue manager or sales lead do four things quickly:

1. understand the current shape of the pipeline,
2. find the right lead fast,
3. decide what needs action next,
4. open an Event Workspace and move the opportunity forward.

The screen should feel calm, structured, and highly scannable.

---

## Governing UI Direction

This wireframe follows the OpenVenue UI direction system:
- **Dark Juniper** is the visual anchor for navigation, primary actions, and active emphasis. fileciteturn5file15L8-L18
- page and component surfaces should stay neutral, with white and pale juniper backgrounds doing most of the structural work. fileciteturn5file5L1-L5
- top navigation should stay horizontal because venue teams are already trained on that CRM pattern. fileciteturn5file5L7-L17
- table interaction should use soft row hover, sticky headers, horizontal dividers, and strong scan hierarchy. fileciteturn5file3L1-L18
- labels and actions should remain calm, specific, and action-led rather than promotional or vague. fileciteturn5file0L1-L16 fileciteturn5file1L49-L76
- AI should appear as subtle assistance, with reviewable suggestions and non-theatrical language. fileciteturn5file12L1-L5 fileciteturn5file14L34-L57

---

## Screen Intent

### Primary user
Sales manager, venue manager, or coordinator triaging new opportunities and monitoring in-flight leads.

### Core questions this screen must answer
- Which leads need attention today?
- Where is pipeline value concentrated?
- Which opportunities are at risk of stalling?
- What stage is each lead in?
- What should I open next?

### Screen character
- operational first
- premium but restrained
- dense enough for real work
- faster to scan than the competitor
- AI-enhanced without feeling like a chatbot screen

---

## Page-Level Structure

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Top nav                                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ Page header: title, view switcher, search, primary actions                  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Pipeline overview band                                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ Filter rail / saved views / AI triage row                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ Main content area                                                           │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ Pipeline board view OR list/table view                                  │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────┤
│ Bulk actions / pagination / footer controls                                 │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## App Shell

### Top navigation
Use the same persistent horizontal top navigation established in the dashboard and design guide:

```text
[Logo] [Home] [Inbox] [Calendar] [Tasks] [Express Book] ---- [Reports] [Settings] [Search] [Help] [Account] [Avatar]
```

### Specs
- height: 56–64px
- background: Dark Juniper `#3E4F47`
- text/icons: white
- active item: white underline or soft active pill
- page content max width: 1400px
- horizontal padding: 24–32px

This keeps structural consistency across the product and matches the current CRM training pattern. fileciteturn5file5L7-L17

---

## Page Header

### Layout
A single-row page header with strong left-to-right hierarchy.

```text
[Leads] [Pipeline | List]
                          [Search leads] [Saved view] [Import] [Add lead]
```

### Left side
- page title: **Leads**
- optional muted subtitle below title: `Track inquiries, proposals, and next steps.`
- compact view toggle: `Pipeline` / `List`

### Right side
- global search field for leads and contacts
- saved view dropdown
- secondary action: `Import leads`
- primary action: `Add lead`

### Button hierarchy
- `Add lead` = primary Dark Juniper button
- `Import leads` = secondary outlined juniper button

### Copy rules
Use sentence case for actions and labels, per voice guidance. fileciteturn5file8L27-L39

---

## Pipeline Overview Band

This band replaces a generic metric row with a more pipeline-specific summary.

### Purpose
Give immediate strategic context without turning the page into a dashboard clone.

### Layout
Six horizontally aligned summary cards.

```text
[ New inquiries ] [ Awaiting reply ] [ Qualified ] [ Proposal sent ] [ Negotiation ] [ Likely to book ]
```

### Card contents
Each card includes:
- stage label
- count of leads
- value sum
- optional micro-trend or delta

### Example
```text
Awaiting reply
12 leads
$48,500
3 need follow-up today
```

### Styling
- same surface treatment as dashboard cards
- white cards on pale juniper background
- 1px soft border
- one accent per card only
- active/selected card can use a thin top border or subtle left accent in Dark Juniper

### Interaction
Clicking a card filters the main board/list instantly.

### Accent rules
- only the selected or most critical card gets stronger emphasis
- other cards stay mostly neutral
- overdue attention states may use amber or red inline text only, not full card fills

This follows the design rule that status colors remain functional rather than decorative. fileciteturn5file5L1-L5

---

## Triage Row

This row sits below the pipeline overview and above the main content.

### Purpose
Help the user move from passive viewing into active lead management.

### Layout
Three modules in one row:

```text
[ Filters ] [ Saved view chips ] [ AI triage summary ]
```

### A. Filter trigger cluster
Buttons/chips for:
- owner
- event type
- date range
- source
- budget
- stage
- venue space

### B. Saved view chips
Examples:
- My leads
- Follow-up due
- This week’s tours
- Proposal waiting
- High-value weddings
- Corporate inquiries

### C. AI triage summary
A compact, right-aligned assistive module:

```text
AI triage
4 leads may need follow-up today.
[Review suggestions]
```

### AI language
This module should use calm review-first language, such as:
- `Suggested follow-up`
- `Based on recent activity`
- `Review before sending`

These phrases align with the microcopy rules for AI trust. fileciteturn5file4L1-L7 fileciteturn5file14L34-L57

### Styling
- pale tinted panel or inline chip-style group
- subtle icon only
- never a loud assistant card

---

## Main Content Modes

The Leads screen needs **two primary modes**:

1. **Pipeline board view**
2. **List/table view**

The view switcher should persist at the top of the page header.

---

## Mode 1 — Pipeline Board View

This is the best mode for stage-based lead movement and lightweight triage.

### Board structure
A horizontally scrollable board with stage columns.

```text
[ New lead ] [ Contacted ] [ Qualified ] [ Tour scheduled ] [ Proposal sent ] [ Negotiation ] [ Contract sent ]
```

### Column specs
- width: 280–320px
- background: same as page canvas or very light neutral
- separation: subtle vertical rhythm, not harsh borders
- each column header sticky within the board container

### Column header contents
- stage name
- count
- total value
- small kebab menu for stage options

Example:
```text
Proposal sent
14 leads · $126,000
```

### Lead card structure
Each card should be compact, highly scannable, and action-oriented.

#### Card layout
```text
[Status/priority dot] [Lead name]
Contact name / organization
Event date · guest count · event type
Budget or proposal value
Last activity
Next step
[AI suggestion chip if relevant]
```

### Required card fields
- lead/event title
- primary contact
- event date or date range
- event type
- guest count estimate
- budget or proposal value
- owner avatar
- last activity timestamp
- next step label

### Optional supporting signals
- source tag
- venue space preference
- unread message count
- overdue follow-up indicator

### AI card elements
Subtle, optional chips such as:
- `Suggested follow-up`
- `Pricing question`
- `Tour request`
- `At risk`

These map directly to the AI-native enhancement pattern in the UI guide. fileciteturn5file12L1-L5

### Drag-and-drop behavior
Cards can be dragged between columns to change stage.

### On drop
- stage updates
- a small confirmation toast appears: `Lead updated.`
- if the stage change has workflow consequences, a small modal or inline prompt can ask for one additional detail

Example:
- moving to `Proposal sent` prompts for proposal date if missing
- moving to `Tour scheduled` prompts to link or create a calendar item

### Board interaction notes
- horizontal scrolling is acceptable on desktop
- keep card density moderate
- avoid Trello-like playful styling
- use operational spacing and crisp metadata

---

## Mode 2 — List / Table View

This is the primary mode for high-volume management, sorting, and scanning.

### Table positioning
The table sits inside a white or alabaster content surface with a sticky header row.

### Table toolbar
Above the table:

```text
[Results count] [Sort by] [Columns] ---------------- [My leads] [Export] [Add lead]
```

### Core columns
Recommended columns for the leads table:

| Column | Content | Notes |
|---|---|---|
| Lead | Lead/event name + contact below | primary identifier, two-line cell |
| Stage | colored status badge | rounded pill with text |
| Event date | preferred date + time below if known | two-line cell |
| Event type | wedding, corporate, social, etc. | plain text |
| Guests | estimated guest count | right-aligned |
| Budget / value | budget range or proposal value | right-aligned |
| Next step | next action label + due timing | two-line cell |
| Last activity | relative date + absolute below | muted secondary line |
| Owner | avatar | deterministic muted palette |
| AI | one subtle chip or icon | optional but useful |
| Actions | view / edit / more | low emphasis |

### Table specs
- row height: 64–72px
- row hover: `--juniper-50`
- header row: sticky, pale neutral background
- borders: horizontal only
- sortable columns: visible sort arrows
- pagination or infinite scroll at bottom

These rules follow the data table guidance already defined for OpenVenue. fileciteturn5file3L1-L18

### AI column behavior
Do not overbuild this column. It should act as a subtle operational assist.

Examples:
- `Follow-up due`
- `Hot lead`
- `No reply yet`
- `Tour request`

### Bulk selection
Include row checkboxes for bulk actions.

Bulk actions may include:
- assign owner
- update stage
- add task
- send template
- archive

### Empty state
If no leads match the current filter:
- headline: `No leads match this view.`
- helper: `Try adjusting filters or add a new lead.`
- primary action: `Add lead`

This follows the empty-state voice guidance: state what is missing, explain what appears here, suggest the next action. fileciteturn5file14L14-L25

---

## Recommended Default State

The default state should open in **List view**, not board view.

### Why
- better for daily scanning
- better for multi-column operational comparison
- closer to the CRM habits your users already have
- easier to combine with filters, AI signals, and sorting

### Secondary recommendation
Let the selected saved view persist by user.

Example:
- a sales manager may default to `Follow-up due`
- an owner may default to `All active leads`

---

## Detail Drawer / Quick Preview

From either board or list mode, clicking a lead row/card should support two behaviors:

1. full open into Event Workspace
2. optional quick preview drawer

### Drawer purpose
Allow fast triage without a full page transition.

### Drawer width
- 420–480px from the right side

### Drawer sections
- lead summary
- contact details
- event details
- last message preview
- next step
- task summary
- AI suggestion module
- quick actions

### Quick actions
- Open workspace
- Send email
- Schedule tour
- Add task
- Update stage
- Build proposal

### AI module in drawer
A subtle summary block:

```text
Suggested next step
Follow up on pricing questions from the latest inquiry.
[Draft follow-up]
```

This should preserve human control and reviewability. fileciteturn5file14L34-L57

---

## Filter Architecture

### Primary filters
Visible by default:
- stage
- owner
- event type
- event date
- source
- budget range

### Secondary filters
Hidden in an expandable filter drawer:
- venue space
- guest count
- proposal status
- contract status
- lead temperature
- AI risk flag
- unread messages
- last contacted date

### Filter UX rules
- show active filters as removable chips
- always show current result count
- support save as view
- include `Clear filters` action when one or more filters are active

---

## Saved Views

Saved views are important because lead teams repeat the same slices often.

### Suggested default saved views
- All leads
- My leads
- Follow-up due
- Awaiting reply
- Tour scheduled
- Proposal waiting
- High-value opportunities
- This month’s weddings
- Corporate inquiries

### UI treatment
Saved views can appear as:
- dropdown in page header
- optional pinned chips in the triage row

### Rules
Keep labels straightforward and operational. Avoid clever naming. This matches the naming guidance in the microcopy rules. fileciteturn5file4L18-L25

---

## AI-Native Layer for Leads / Pipeline

This screen is one of the most valuable places for AI because it affects conversion speed.

### AI features to include in the wireframe

#### 1. AI triage summary
A compact module summarizing:
- leads needing response
- leads at risk of ghosting
- leads with missing fields
- likely-to-book leads

#### 2. AI risk indicators
Muted inline flags for:
- no reply in X days
- budget mismatch
- missing date
- proposal sent but not viewed

#### 3. AI categorization tags
Subtle tags like:
- pricing question
- date flexibility
- tour request
- custom package request

#### 4. AI next-step suggestions
Available in row actions, drawer, or expanded card states:
- Draft follow-up
- Ask for missing details
- Schedule tour
- Send proposal reminder

#### 5. AI search support
Search should support natural queries in later iterations, for example:
- `weddings in negotiation`
- `high budget leads with no reply`

### AI visual rule
All AI elements must remain visually quieter than stage, owner, date, and value information.

---

## Notifications and Inline Alerts

### Examples
- `3 leads need follow-up today`
- `Proposal has not been viewed yet`
- `Date still needs confirmation`
- `Tour scheduled for Friday at 2:00 PM`

These examples align with the approved calm operational tone. fileciteturn5file14L59-L73

### Placement
Use these as:
- inline metadata under next step
- compact banner inside the quick drawer
- small summary chips in AI triage row

Avoid loud alert bars unless something truly blocks progress.

---

## Microcopy Recommendations

### Good page actions
- Add lead
- Import leads
- Save view
- Clear filters
- Open workspace
- Update stage
- Draft follow-up
- Schedule tour

### Good helper copy
- `Use filters to narrow the pipeline.`
- `Review suggestions before sending.`
- `This view shows leads assigned to you.`
- `No leads match this view.`

### Avoid
- hype language
- vague labels like `Manage`
- celebratory success copy
- AI language that implies autonomy

These patterns are required by the brand voice rules. fileciteturn5file1L49-L76 fileciteturn5file8L1-L25

---

## Interaction States

### Hover
- row hover: pale juniper tint
- card hover: slightly stronger border or subtle surface shift
- link hover: underline
- button hover: darken by ~10%

### Selected
- row selected: subtle juniper tint + left border or checkbox state
- active view chip: stronger juniper text/border
- selected board column filter: quiet emphasis, not solid color block

### Loading
- skeleton summary cards
- skeleton board cards or table rows
- never show an empty blank content block while loading

### Error
Use calm, specific copy such as:
- `We couldn’t update this lead. Try again.`
- `We couldn’t load this view. Refresh to try again.`

These patterns match the error voice guidance. fileciteturn5file14L1-L13

---

## Responsive Behavior

This is primarily a desktop screen.

### Desktop priority
Design for 1280px–1440px wide work areas first.

### Tablet behavior
- table can scroll horizontally
- board columns narrow slightly
- AI triage row wraps to two lines if needed
- some secondary filters collapse into a drawer

### Minimum supported width
1024px, consistent with the overall guide. fileciteturn5file11L29-L34

---

## Accessibility Notes

- stage is never conveyed by color alone; every badge includes text
- all row actions must be keyboard reachable
- focus ring uses Dark Juniper with visible offset
- AI indicators need readable text or tooltips, not icon-only meaning
- sticky headers must preserve semantic table structure

These requirements align with the OpenVenue accessibility baseline. fileciteturn5file11L35-L41

---

## Recommended Wireframe Order Inside Design

When translating this markdown into visual wireframes, create in this order:

1. page shell + header
2. pipeline overview band
3. triage/filter row
4. list view table
5. board view columns and cards
6. right-side quick preview drawer
7. empty/loading/error variants

This order keeps the primary workflow clear before detail states are added.

---

## Final UX Goal

The Leads / Pipeline screen should feel like the place where venue teams can:
- see the real shape of demand,
- understand what needs movement,
- act on opportunities faster,
- and benefit from AI without changing how they already work.

It should be more structured than a generic kanban board, more actionable than a dashboard, and more elegant than a traditional CRM list.
