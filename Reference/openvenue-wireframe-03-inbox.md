# OpenVenue Wireframe 03 — Inbox Module

## Purpose
The Inbox is one of the highest-frequency workspaces in OpenVenue. It should feel as fast and familiar as an email client while still functioning as an event-aware CRM surface.

The Inbox must help users do four things quickly:
1. identify which conversations need action,
2. understand the event context behind each message,
3. respond confidently without leaving the workflow,
4. use AI support without losing human control.

This wireframe spec uses the OpenVenue UI direction, the uploaded UI guide, and the brand voice rules as the governing system.

---

## Core UX Goal
The Inbox should answer three questions immediately:
- What is unread?
- What is urgent?
- What should I respond to next?

It must preserve the familiar email-client pattern from existing venue CRMs while improving hierarchy, interaction speed, and AI-assisted response workflows.

---

## Design Intent for This Screen
The Inbox should feel:
- calm,
- fast,
- operational,
- clearly prioritized,
- and tightly connected to each event record.

It should **not** feel like a separate messaging product or a chatbot interface.

---

## Primary User Jobs
- Review new inquiries
- Continue active client conversations
- Identify at-risk leads or delayed replies
- Draft replies and follow-ups
- Jump from conversation to Event Workspace
- Understand event context without opening multiple pages
- Use AI suggestions to save time on repetitive communication

---

## Page-Level Layout Direction

### Shell
Use the standard OpenVenue app shell:
- Dark Juniper top navigation
- pale juniper or neutral page background
- white content surfaces with subtle borders
- consistent 24px spacing between major sections

### Recommended page structure
Instead of a pure single-column list only, use a **two-state inbox layout**:

#### State A — List-first view
Default state for triage.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Top nav                                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ Inbox   21 unread · 242 conversations         [Search] [My events] [Hide read] │
│------------------------------------------------------------------------------│
│ Priority strip: [Needs reply 8] [Unread 21] [At risk 4] [Tours requested 3] │
│------------------------------------------------------------------------------│
│ Conversation list                                                            │
│ [row]                                                                        │
│ [row]                                                                        │
│ [row]                                                                        │
└──────────────────────────────────────────────────────────────────────────────┘
```

#### State B — Split view
Activated when a row is selected.

```text
┌───────────────────────────────┬──────────────────────────────────────────────┐
│ Conversation list             │ Selected conversation panel                 │
│ (420–480px)                   │ (remaining width)                           │
│                               │                                              │
│ search / filters              │ event header                                │
│ rows                          │ AI summary                                  │
│ rows                          │ thread                                      │
│ rows                          │ suggested reply                             │
│                               │ composer                                    │
└───────────────────────────────┴──────────────────────────────────────────────┘
```

### Why this adjustment
The uploaded guide establishes the Inbox as a familiar email-client list and emphasizes subtle AI overlays rather than replacement patterns. It also recommends smart replies, sentiment badges, priority indicators, and auto-categorization as visual overlays to the core layout. fileciteturn7file0

For MVP wireframing, the split view is the strongest extension of that principle because it preserves list-based scanning while letting users read and answer from the same surface.

---

## Page Header

### Left side
- Page title: `Inbox`
- Secondary count text: `21 unread · 242 conversations`

### Right side controls
- Search field
- `My events` button
- `Hide read` toggle button
- Optional overflow menu: `More filters`

### Header specs
- Title size: 24px
- Metadata text: 13–14px muted gray
- Buttons follow standard OpenVenue button system
- Search should support people, event names, email addresses, and message text

The base UI guide already defines the page title pattern, unread/event count text, and `My Events` plus `Hide Read` filtering controls. fileciteturn7file0

---

## Priority Strip
This is an OpenVenue-specific improvement over the base guide.

### Purpose
Give users a quick operational filter layer before entering the full list.

### Structure
A horizontal row of compact filter pills/cards below the page header:
- `Needs reply`
- `Unread`
- `At risk`
- `Tours requested`
- `Pricing questions`
- `Proposal follow-up`

### Behavior
- Clicking a pill filters the list
- Only one can be active at a time by default
- Active state uses Juniper emphasis
- Counts appear inside each pill

### Visual treatment
- white or alabaster surface
- subtle border
- 9999px pill radius
- small status dot or icon optional
- no large saturated fills

### Why it belongs
This supports the AI-native triage model without turning the inbox into a dashboard. It makes the page action-oriented rather than archive-oriented.

---

## Conversation List Panel

### Width
- In split view: 420–480px
- In list-only state: full width

### Structure per row
```text
[Checkbox] [Avatar] [Name + Event name]
          [Event date/time] [Message preview]
          [AI tags]                           [Timestamp] [Owner avatar]
```

### Row content hierarchy

#### Primary line
- Contact name
- Event name

#### Secondary line
- Event date + time
- Message preview

#### Inline support metadata
- AI category tag
- sentiment badge
- priority marker if present

#### Right-aligned metadata
- timestamp
- owner avatar

### Row specs
- Height: 72–80px
- Unread rows use a 3–4px Dark Juniper left border
- Unread rows use slightly stronger type and/or pale juniper background
- Read rows stay on white
- Hover state uses `--juniper-50`
- Horizontal dividers only
- Entire row is clickable

These row mechanics are directly supported in the uploaded UI guide, including the unread Juniper border, row height, truncated preview, hover behavior, and owner avatar placement. fileciteturn7file0

---

## Row-Level Content Details

### Avatar
- 40px circular avatar
- deterministic muted color background
- white uppercase initials

### Name + event block
Two-line hierarchy:
- line 1: contact name, semibold
- line 2: event name, muted but still readable

### Event date/time
- concise date pattern
- use operationally clean formatting such as `Friday, April 12 · 6:00 PM`

### Message preview
- single-line truncation
- gray-500 text
- should not visually compete with the sender/event block

### Timestamp
- right aligned
- relative for recent items
- absolute for older items

### Owner avatar
- 32px avatar
- appears at far right
- optional tooltip on hover

These formatting patterns align with both the UI guide and the microcopy rules, which call for concise status/date language and stable, familiar workflow object naming. fileciteturn7file1

---

## AI Indicators Inside Rows
AI must remain subtle and secondary.

### Allowed row-level AI elements
- small priority dot or flame/clock icon
- small sentiment badge: `positive`, `neutral`, `hesitant`
- auto-category tags like `Follow-up`, `Pricing question`, `Tour request`

### Rules
- max 2 AI tags visible before truncation to `+1`
- use low-saturation fills or outlined pills
- avoid bright gradients or large colored zones
- do not place AI labels before sender name

The uploaded guide explicitly states that these AI-native inbox signals should be subtle and never overpower the core email-client layout. fileciteturn7file0

---

## Selected Conversation Panel
When a row is selected, the right panel opens.

### Panel structure
1. Event/context header
2. AI summary card
3. Conversation thread
4. Suggested reply module
5. Manual composer

---

## Event/Context Header
This sits at the top of the selected conversation panel.

### Contents
- Contact name
- Event name
- stage badge
- event date/time
- guest count
- owner
- quick action links

### Quick actions
- `Open event workspace`
- `Schedule tour`
- `Create task`
- `Log activity`

### Visual treatment
- white surface
- subtle bottom border
- compact but information-rich
- no large hero card treatment

### Why this matters
The Inbox should always remind users that they are not just emailing — they are moving an opportunity or event forward.

---

## AI Summary Card
This is the first AI surface in the selected state.

### Purpose
Summarize what matters before the user reads the full thread.

### Content
- 2–3 sentence summary of current conversation state
- latest client intent or request
- any unresolved questions
- recommended next step

### Example labels
- `Conversation summary`
- `Based on the latest inquiry and recent activity`
- `Recommended next step`

### Example body pattern
- Client is asking about fall Saturday availability for 120 guests.
- They mentioned budget sensitivity and asked whether bar service can be customized.
- Recommended next step: confirm availability and send a tailored proposal outline.

### Visual treatment
- Surface 2 light-tint background
- subtle border
- no chatbot bubbles
- small AI icon only

### Copy rules
AI copy must remain assistive, transparent, and review-oriented. The microcopy rules explicitly prefer labels such as `Suggested follow-up`, `Drafted from the latest inquiry`, and `Review before sending`, while rejecting autonomous or overly confident phrasing. fileciteturn7file1

---

## Conversation Thread

### Structure
Each message appears as a vertically stacked thread item.

### Per-message layout
```text
[Avatar] Sender name      To: recipient                     [Timestamp] [⋯]
Muted metadata line: opens / clicks / delivery status if applicable
Message body
------------------------------------------------------------
```

### Thread rules
- newest message can be pinned or visually emphasized at top if reverse chronological is maintained
- each message separated by quiet divider or lightly bordered card
- maintain readable body width
- preserve standard paragraph formatting
- attachments appear inline below message body

### Metadata support
- delivery state if relevant
- open/click data if supported
- internal flags such as `client replied after proposal`

The uploaded event-detail email tab already defines the message-block pattern, including avatar, sender line, timestamp alignment, muted tracking metadata, and the reply/mark-read/log-activity action model. fileciteturn7file0

---

## Suggested Reply Module
This is the core AI assist layer for the inbox.

### Position
Above the manual composer, below the thread.

### Contents
- section label: `Suggested reply`
- helper line: `Drafted from the latest inquiry and event details`
- editable draft text area
- optional alternate suggestion chips:
  - `Availability response`
  - `Pricing response`
  - `Tour follow-up`

### Controls
- `Use draft`
- `Insert into composer`
- `Regenerate`
- `Create another version`

### Rules
- always editable
- never auto-send
- never imply finality or perfection
- keep explanation short

### Supporting copy examples
- `Review before sending.`
- `You can edit this before it goes out.`

These patterns come directly from the brand voice and microcopy rules for AI behavior. fileciteturn7file1

---

## Manual Composer
The composer is where the user remains in control.

### Structure
- recipients row
- subject field if needed
- body editor
- attachments row
- send controls

### Bottom action bar
Left side:
- `Send email`
- `Save draft`

Right side:
- `Mark all read`
- `Log activity`

### Input styling
- 40–44px control height for structured fields
- bordered white controls
- Juniper focus state
- helper text only where needed

The UI guide establishes the standard button/input system and the event-detail email tab action bar. fileciteturn7file0

---

## Filter System

### Minimum MVP filters
- My events
- Hide read
- Owner
- Stage
- Event date
- AI category
- Priority

### Advanced filter drawer later
- Sentiment
- Awaiting reply
- Has attachments
- Proposal sent
- Contract sent

### Filter behavior
- filters appear as chips above the list when active
- clear all option at far right
- avoid large sidebar filter panel in MVP

---

## Search Behavior

### Search should return
- contact names
- event names
- email addresses
- message body text
- subject lines

### Search UI
- inline field in page header
- keyboard shortcut later: `Cmd+K` for global search
- local inbox search can remain separate from global command palette

The UI guide recommends a global command palette as a modern improvement over the competitor; the inbox should remain compatible with that larger search system. fileciteturn7file0

---

## Empty States

### Empty inbox state
Headline:
- `No conversations yet.`

Description:
- `When new inquiries and replies arrive, they will appear here.`

Primary action:
- `Open leads`

### Empty filtered state
Headline:
- `No unread conversations.`

Description:
- `Try another filter or review recent activity.`

### Empty selected panel state
Headline:
- `Select a conversation`

Description:
- `Open a message to review the thread and draft a reply.`

The tone follows the microcopy rules for empty states: useful, calm, and directional rather than playful or vague. fileciteturn7file1

---

## Loading States
- skeleton rows matching inbox row structure
- skeleton header and filter pills
- skeleton thread blocks in selected panel
- never show blank content while loading

The UI guide explicitly requires skeletons for list/card states and avoids blank-page loading behavior. fileciteturn7file0

---

## Error and Validation Language

### Examples
- `We couldn’t load this conversation. Try again.`
- `We couldn’t send the email. Try again.`
- `Enter at least one recipient.`

### Rules
- calm
- specific
- non-blaming
- actionable

This matches the brand voice rules for validation and error moments. fileciteturn7file1

---

## Success Messages

### Examples
- `Email sent successfully.`
- `Draft saved.`
- `Conversation marked as read.`

### Rules
- short
- object + action
- no celebratory language

These patterns align with the uploaded microcopy rules. fileciteturn7file1

---

## Accessibility Requirements
- full keyboard navigation across list rows, filters, and composer
- visible focus rings with Juniper outline and offset
- unread state must not rely on color alone; pair border with text weight/icon
- status and sentiment indicators must include text labels, not color-only signals
- row hover/selection states should remain readable with high contrast
- screen-reader labels required for avatars, buttons, kebab menus, and attachment actions

These accessibility rules are consistent with the uploaded UI guide requirements. fileciteturn7file0

---

## Responsive Behavior
This is a desktop-first module.

### Desktop
- split view supported
- list and selected panel visible together

### Tablet
- selected conversation becomes a full-width drill-in view
- back button returns to list

### Minimum supported width
- 1024px

The desktop-first constraint and responsive fallback approach follow the broader UI guide. fileciteturn7file0

---

## Recommended Component Breakdown
- `InboxPage`
- `InboxHeader`
- `InboxPriorityStrip`
- `InboxFilters`
- `ConversationList`
- `ConversationRow`
- `ConversationPanel`
- `ConversationContextHeader`
- `AiConversationSummaryCard`
- `MessageThread`
- `MessageItem`
- `SuggestedReplyCard`
- `EmailComposer`

This componentized approach is consistent with the UI guide’s recommendation to mirror component architecture to the page structure and shared systems. fileciteturn7file0

---

## Wireframe Summary
The OpenVenue Inbox should be a familiar CRM inbox upgraded into an event-aware response workspace.

Its defining characteristics are:
- fast list scanning,
- clear unread and priority hierarchy,
- event context visible at the moment of reply,
- subtle AI categorization and triage,
- editable suggested replies,
- and a calm, polished interaction model.

The inbox should feel like a composed venue-operations communication center — not like a generic support desk and not like a flashy AI chat product.
