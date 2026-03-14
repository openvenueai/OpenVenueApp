# OpenVenue — Wireframe Structure 01: Dashboard

## Screen name
Dashboard

## Purpose
The Dashboard is the operational home screen for venue managers, sales leads, and coordinators. It should answer two questions within a few seconds:

1. What needs attention today?
2. How is the pipeline performing right now?

This screen is not just a reporting page. It is the launch point for action.

---

## Design intent

**Intent:** A venue manager opens this screen first thing in the morning to understand active demand, overdue work, and the next actions that move revenue and planning forward.

**Feel:** Calm, structured, premium, operational.

**UI expression:**
- Familiar CRM shell with top navigation
- Dark Juniper as the primary visual anchor
- Neutral, lightly botanical surfaces
- Quiet hierarchy through borders and spacing rather than heavy shadows
- AI presented as embedded operational guidance, not a separate assistant experience

---

## Governing UI rules for this screen

- Use the horizontal top navigation pattern with Dark Juniper background.
- Use `--juniper-50` or a similarly pale neutral background for the page canvas.
- Cards and data surfaces sit on white with subtle `--gray-200` borders.
- Pipeline status colors are functional and should appear as small accents only.
- Table rows use a pale juniper hover state.
- Button language stays verb-first and explicit.
- AI panels must be framed as suggested, reviewable, and grounded in recent activity.

---

## Primary user jobs

### Sales manager
- Scan the pipeline
- See leads awaiting response
- Jump into the highest-priority opportunity
- Track proposal and contract momentum

### Event coordinator
- Review urgent planning items
- Check upcoming tours, tastings, and events
- See incomplete tasks and readiness issues

### Owner / GM
- Understand business health at a glance
- Spot stalled revenue or operational risk
- Monitor team responsiveness

---

## Information hierarchy

The Dashboard should follow this order of importance:

1. App shell and page identity
2. Daily action summary
3. Pipeline snapshot
4. High-priority action queue
5. Active events table
6. Supporting panels for calendar, inbox, and payment/contract alerts

This hierarchy intentionally avoids turning the screen into a generic wall of KPI cards.

---

## Layout overview

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Top nav: Logo | Home | Inbox | Calendar | Tasks | Express Book | Reports... │
├──────────────────────────────────────────────────────────────────────────────┤
│ Page header: Dashboard                         [Date range] [My view]       │
│ Supporting line: Today’s overview and next actions                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ AI daily briefing card                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ Pipeline summary row                                                       │
│ [Active events] [Lead] [Qualified] [Proposal sent] [Confirmed] [...]       │
├──────────────────────────────────────────────────────────────────────────────┤
│ Main content split                                                          │
│ ┌───────────────────────────────┬─────────────────────────────────────────┐ │
│ │ Left priority rail            │ Main work surface                       │ │
│ │ - Needs response              │ - Active events table                   │ │
│ │ - Overdue tasks               │ - Filters / sort / add event            │ │
│ │ - Upcoming today              │                                         │ │
│ │ - Payment / contract alerts   │                                         │ │
│ └───────────────────────────────┴─────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────┤
│ Secondary row                                                               │
│ [Upcoming calendar] [Recent inbox activity] [Readiness / risk summary]     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Screen regions

## 1. Top navigation

### Structure
```text
[Logo] [Home] [Inbox badge] [Calendar] [Tasks badge] [Express Book]
                                            [Reports] [Settings] [Search] [Help] [Account] [Avatar]
```

### Specifications
- Height: 56–64px
- Background: Dark Juniper
- Text/icons: white with reduced opacity for inactive tabs
- Active destination: white underline or soft light pill
- Inbox and Tasks may show a small red count badge only in the nav

### Notes
This should match the global shell so the user always feels located within the application.

---

## 2. Page header

### Content
- Title: `Dashboard`
- Supporting text: one line only, for example: `Today’s activity, priorities, and pipeline status.`
- Right-side controls:
  - Date range control
  - Personal/team view switch
  - Optional saved view dropdown later

### Behavior
- Keep this row quiet and compact
- Do not overload with explanatory copy
- Use sentence case for controls and labels

---

## 3. AI daily briefing card

### Purpose
This is the first differentiating module. It replaces the empty top-of-dashboard space common in generic CRMs with a practical AI summary.

### Structure
```text
┌──────────────────────────────────────────────────────────────────────┐
│ AI daily briefing                                                   │
│ Here’s what needs attention today.                                  │
│ - 3 leads have not received a reply                                 │
│ - 2 proposals have not been viewed                                  │
│ - 1 deposit is due tomorrow                                         │
│ - 4 tasks are overdue across 3 events                               │
│                                              [Review priorities]    │
└──────────────────────────────────────────────────────────────────────┘
```

### Styling
- Surface: subtle tinted panel using `--juniper-100` or equivalent
- Border: low-contrast neutral border
- Iconography: one small AI/support icon, muted
- Tone: calm, factual, assistive

### Interaction
- `Review priorities` scrolls the user to the priority rail or opens a filtered task list
- The card can be dismissible for the session later

### Copy rules
Good examples:
- `Suggested priorities based on recent activity`
- `Review before sending`
- `3 leads are still awaiting a reply`

Avoid:
- `Your AI agent has handled this`
- `Urgent!!!`
- `Perfect actions for today`

---

## 4. Pipeline summary row

### Purpose
Provides a quick pipeline and revenue snapshot with immediate filtering behavior.

### Structure
```text
[ Active events ] [ Lead ] [ Qualified ] [ Proposal sent ] [ Confirmed ] [ Balance due ] [ Completed YTD ]
     53              25          8              14              14              3                6
   $772,616       $70,501    $84,000        $379,570        $322,545        $18,200          $26,037
```

### Card anatomy
Each card contains:
- Top line: count + status label
- Bottom line: value or relevant amount
- Left accent: 4px status-colored border or a small dot

### Card behavior
- Clicking a card filters the main table below
- Active filter card gets a stronger border state or tinted fill
- Horizontal scroll allowed on smaller widths, but keep equal rhythm on desktop

### Accent mapping
- Active events: Dark Juniper accent
- Lead: Amber accent
- Qualified: Sky accent
- Proposal sent: Violet accent
- Confirmed: Dark Juniper accent
- Balance due: Orange accent
- Completed YTD: Teal accent

### Layout notes
- This row should feel like structured status control, not celebratory analytics
- Keep all cards visually consistent; do not enlarge one dramatically

---

## 5. Main content area

Use a two-column layout.

### Recommended proportions
- Left rail: 320px
- Main content: fluid remainder
- Gap: 24px

This creates a dashboard that is action-led instead of purely table-led.

---

## 6. Left priority rail

### Purpose
A compact operational rail for what needs immediate action.

### Sections

#### A. Needs response
A stacked list of leads or events awaiting outreach.

Row structure:
```text
[Avatar] Sarah Hanna
Harper’s Bat Mitzvah
Proposal sent 3 days ago • No reply yet
[Draft follow-up]
```

#### B. Overdue tasks
Small list of overdue items with owner and due date.

#### C. Upcoming today
Today’s tours, tastings, meetings, and events.

#### D. Payment / contract alerts
Small list of items such as:
- Deposit due tomorrow
- Contract sent, not signed
- Balance is still outstanding

### Priority rail behavior
- Each block should link into the underlying Event Workspace or task record
- Show at most 3–5 items per block with a `View all` link
- These are compact cards, not giant modules

### Design note
Use white cards with subtle borders and strong internal hierarchy:
- item title
- supporting context
- single action link/button

---

## 7. Active events table

### Purpose
This is the central work surface. It should remain recognizable to users coming from competitor CRMs while being cleaner, more sortable, and more legible.

### Header row
Left side:
- Section title: `Active events`
- Small supporting line: filtered count or saved-view context if needed

Right side:
- `My events` secondary button
- filter button or dropdown
- search field later
- `Add event` primary button

### Table columns
| Column | Content |
|---|---|
| Name | Event name in bold, contact name below |
| Status | Rounded badge with text |
| Event date | Date in first line, time in second |
| Size | Guest count, right-aligned |
| Space | Venue/room name |
| Value | Currency total, two-line if needed |
| Last contacted | Relative date, absolute below |
| Created | Date + relative age |
| Owner | Avatar |
| Actions | Edit, open, more |

### Table rules
- Sticky header
- Horizontal dividers only
- No vertical cell borders
- Row height: 64–72px
- Hover state: pale juniper tint
- Sorting indicators visible in headers
- Pagination or infinite scroll at bottom

### Row anatomy example
```text
[SB] Bridgeport Pride Center Donor Appreciation...
Sarah Beirne

[Lead]  Sat, Jan 24
         6:00 PM – 9:00 PM

40   Taproom Speakeasy   $8,000.00
                         Budget

Last contacted: Jan 29
Created: Feb 19
[Owner avatar] [Edit]
```

### Actions in this area
- Clicking the event name opens the Event Workspace
- Clicking the status badge may optionally open a quick status menu later
- Hover reveals secondary actions if needed

---

## 8. Secondary support row

This row sits below the main table or folds into the left rail depending on implementation.

### A. Upcoming calendar
A compact panel showing the next 5 calendar items.

### B. Recent inbox activity
A compact feed of recent threads, with unread emphasis.

### C. Readiness / risk summary
A compact AI-informed panel showing:
- events with missing details
- proposals with no views
- contracts awaiting signature
- tasks overdue by event

### Rule
These should support the main workflow, not compete with the main table.

---

## Wireframe detail by module

## A. Dashboard header module

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Dashboard                                              [This week ▾]      │
│ Today’s activity, priorities, and pipeline status.     [My view ▾]        │
└────────────────────────────────────────────────────────────────────────────┘
```

## B. AI daily briefing module

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Suggested priorities based on recent activity                              │
│ 3 leads are awaiting a reply. 2 proposals have not been viewed.           │
│ 1 deposit is due tomorrow. 4 tasks are overdue.                            │
│                                                     [Review priorities]    │
└────────────────────────────────────────────────────────────────────────────┘
```

## C. Pipeline summary row

```text
┌────────────┬────────────┬────────────┬───────────────┬────────────┬───────────┐
│Active evts │Lead        │Qualified   │Proposal sent  │Confirmed   │Balance due│
│53          │25          │8           │14             │14          │3          │
│$772,616    │$70,501     │$84,000     │$379,570       │$322,545    │$18,200    │
└────────────┴────────────┴────────────┴───────────────┴────────────┴───────────┘
```

## D. Main content split

```text
┌──────────────────────────────┬──────────────────────────────────────────────┐
│ Needs response               │ Active events                                │
│ Overdue tasks                │ [My events] [Filter] [Add event]             │
│ Upcoming today               │                                              │
│ Payment / contract alerts    │  table                                       │
│                              │                                              │
└──────────────────────────────┴──────────────────────────────────────────────┘
```

---

## AI placement rules on Dashboard

AI should appear in three places only on this screen:

### 1. Daily briefing card
For summary and prioritization.

### 2. Priority rail actions
Examples:
- `Suggested follow-up`
- `Recommended next step`
- `Draft reminder`

### 3. Risk/readiness panel
For passive insight only.

### Explicitly avoid
- Full chatbot box on the dashboard
- Floating AI orb
- Glowing suggestion treatments
- Multiple AI modules repeating the same insight

---

## Microcopy guidance for this screen

### Good labels
- Dashboard
- Active events
- Review priorities
- My events
- Add event
- Deposit due tomorrow
- Suggested follow-up
- Proposal sent successfully

### Avoid
- Magic insights
- Crush your pipeline
- Let’s go
- Perfect reply
- Critical danger

### Empty state examples
- `No active events yet.`
- `When new inquiries are added, they will appear here.`
- `No overdue tasks today.`

---

## States

## Loading state
- Keep top nav visible
- Show skeleton version of pipeline cards
- Show skeleton rows in the main table
- Show placeholder blocks in the priority rail
- Never render a blank canvas

## Empty state
Use when there are no events yet.

```text
No active events yet.
When new inquiries are added, they will appear here.
[Add event]
```

## Error state
Examples:
- `We couldn’t load the dashboard. Try again.`
- `Some activity could not be updated.`

Tone stays calm and specific.

---

## Responsive behavior

### Desktop
- Full two-column layout
- Full table visible

### Narrow desktop / tablet
- Priority rail stacks above the table
- Pipeline cards may horizontally scroll
- Secondary support row may collapse into accordion panels

### Minimum supported width
- 1024px

---

## Interaction notes

- Hover transitions: 150ms ease
- Buttons darken slightly on hover
- Clickable cards or rows get only subtle elevation or background change
- Focus rings use Dark Juniper with clear offset
- Keyboard users should be able to tab into summary cards, action links, filters, and rows

---

## Data requirements for this screen

### Pipeline summary
- counts by stage
- total value by stage

### Priority rail
- unanswered leads
- overdue tasks
- today’s calendar items
- deposit/contract alerts

### Main table
- active events list
- owner
- stage
- event date/time
- contact
- value
- last contacted
- created date

### AI summary layer
- recent activity summary
- urgency scoring
- missing response detection
- contract/payment/task risk detection

---

## Handoff notes for later visual design

When this wireframe becomes UI:
- use Dark Juniper in nav, primary buttons, and the aggregate pipeline card accent
- keep most surfaces white or pale neutral
- make the left rail feel like a purposeful operational assistant column
- do not turn the dashboard into a dense analytics board
- preserve familiarity with current venue CRM patterns while making priority and AI guidance clearer

---

## Build checklist

- [ ] Top navigation matches system shell
- [ ] Dashboard header is compact and calm
- [ ] AI daily briefing is visible but restrained
- [ ] Pipeline cards filter the table
- [ ] Main content uses left priority rail + right table
- [ ] Active events table follows shared table rules
- [ ] Empty/loading/error states are defined
- [ ] AI language remains assistive and reviewable
- [ ] Buttons and labels follow OpenVenue microcopy rules
