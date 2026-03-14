# OpenVenue Wireframe 12 — Notes, Internal Messages, and Activity

## Purpose
This module is the internal collaboration and memory layer of the Event Workspace.

It combines three distinct but related systems:
1. **Notes** — durable event context
2. **Internal Messages** — team communication and coordination
3. **Activity** — system-generated event history and audit trail

These should feel connected, but they should not be merged into one undifferentiated feed.

This module should answer:
- What should we remember?
- What is the team discussing?
- What changed in the record?

---

## Product Goals
This module should allow a team to:

1. Capture durable event context that should live with the record
2. Communicate internally without losing important decisions
3. Track system-generated changes across the Event Workspace
4. Search and filter collaboration history effectively
5. Turn notes or messages into tasks
6. Generate summaries and handoff views using AI
7. Preserve trust with a clear audit trail

---

## Core UX Principles
1. **Different information types need different containers**
   - Notes, Messages, and Activity should be distinct in purpose and presentation.

2. **Memory, conversation, and audit trail must coexist**
   - The event record should support long-term context, active collaboration, and traceability.

3. **Collaboration should feel event-native**
   - This is not a generic chat tool and not a generic notes app.

4. **AI should improve clarity, not add noise**
   - AI summarizes, extracts decisions, and identifies unresolved items.
   - AI should not flood the module with verbose text.

5. **Important context should not get buried**
   - Durable notes and decisions should remain easy to find later.

---

## Shell Placement
This screen lives inside:

**Event Workspace → Notes / Messages / Activity**

This can be implemented as:
- a single collaboration module with internal tabs,
- or separate tabs in the Event Workspace that follow the same shared design logic.

For the wireframe spec, treat it as one combined collaboration surface with clearly separated sections.

It inherits:
- the persistent Event Workspace header,
- event context,
- stage logic,
- workspace actions,
- and AI/system rail behavior.

---

## Recommended Information Architecture
Use a tabbed collaboration structure inside the module:

- **Notes**
- **Messages**
- **Activity**

This is the clearest model for MVP.

### Why this structure works
- It keeps information types separate
- It reduces cognitive load
- It avoids one noisy mixed stream
- It preserves trust in what is user-written vs system-generated

---

## Primary Screen Modes
1. **Notes View**
   - durable event memory and structured context

2. **Messages View**
   - internal event conversation and collaboration

3. **Activity View**
   - system audit trail and record history

4. **Collaboration Summary View**
   - optional AI-generated rollup of key decisions, unresolved items, and recent changes

---

## Recommended Page Structure
Use a three-zone layout:

### Zone 1 — Main Collaboration Canvas
Primary content area that changes based on selected tab:
- Notes list / detail
- Message thread list / detail
- Activity stream

### Zone 2 — Context / Detail Rail
Persistent right rail showing:
- key event context
- pinned notes
- linked tasks
- unresolved items
- recent collaboration highlights
- role/visibility details
- quick actions

### Zone 3 — AI / Summary Support
Contextual AI modules providing:
- note summaries
- message thread summaries
- recent change summaries
- extracted decisions
- unresolved items
- task suggestions
- handoff summary generation

---

## Persistent Workspace Header
### Header contents
- Event name
- Stage
- Event date
- Assigned owner / coordinator
- Last collaboration activity
- Open tasks count
- Collaboration status indicator optional

### Header actions
- Add note
- New message
- Create task
- Generate summary
- Filter / search
- Export collaboration summary optional later

---

## Collaboration Header Row
Inside the module, place a collaboration-specific header row.

### Contents
- Current sub-tab label
- Search input
- Filter button
- Sort control
- View options if relevant
- Result counts

### Common actions
- Add note
- Start message
- Generate summary
- Create task from selected item

---

# 1. Notes View

## Purpose
Notes are the durable memory layer of the event record.

Use Notes for information that should remain important over time:
- client preferences
- family dynamics
- vendor preferences
- planning considerations
- operational watchouts
- exceptions and approvals
- internal reminders with lasting relevance

Notes are **not** the same as chat messages.

---

## Notes View Layout
Use a two-panel layout within the main collaboration canvas:

### Left side
- Notes list
- Filters
- Search results
- Note type grouping optional

### Right side
- Selected note detail
- Metadata
- Related tasks
- Visibility
- AI summary/actions

### Alternative mobile/narrow behavior
List → detail flow

---

## Note Card / Row Structure
Each note entry should show:
- Note title or first-line summary
- Note type
- Author
- Timestamp
- Visibility scope
- Tags optional
- Task indicator if linked
- Pinned indicator if pinned

### Optional visual markers
- small type badge
- subtle pinned icon
- visibility label

---

## Note Types
Recommended note categories:
- General
- Client Context
- Planning
- Operations
- Financial
- VIP / Sensitivity
- Vendor
- Post-Event

These help users avoid one long unstructured note archive.

---

## Note Fields
Each note should support:
- Title optional but recommended
- Body
- Note type
- Visibility
- Author
- Created timestamp
- Updated timestamp
- Linked tasks optional
- Linked objects optional
- Pinned state
- AI summary optional

### Visibility options
- Internal all
- Managers only
- Operations only
- Sales only
- Kitchen only where relevant later

---

## Note Actions
- Add note
- Edit note
- Delete note
- Pin note
- Change type
- Change visibility
- Convert to task
- Link to timeline / proposal / BEO if needed
- Copy/share internally

---

## Notes Filters
Support filters such as:
- Note type
- Visibility
- Author
- Date range
- Pinned only
- Has linked task
- Unresolved only optional later

---

## Notes AI Support
AI should help with:
- Summarize note history
- Extract key decisions
- Identify unresolved issues
- Suggest tasks
- Generate rolling event brief
- Generate manager handoff summary

### Example labels
- Key takeaways
- Unresolved items
- Suggested tasks
- Rolling event brief
- Review before creating tasks

---

# 2. Internal Messages View

## Purpose
Internal Messages are the team conversation layer tied to the event.

Use Messages for:
- active discussion
- clarifications
- coordination
- handoff communication
- quick decisions
- status checks

Messages are **not** the same as durable Notes, although some messages may later be promoted into notes or tasks.

---

## Messages View Layout
Use a split-view collaboration model.

### Left side
- Thread list or message stream list
- Unread indicators
- Mentions / assigned-to-me filters
- Search results

### Right side
- Selected thread
- Message composer
- Related object references
- AI summary / extracted decisions

### Recommendation
For MVP, support a lightweight thread model rather than fully complex Slack-like channels.

---

## Message Thread Structure
Each thread or message group should show:
- Thread title or derived topic
- Latest message preview
- Author of latest message
- Timestamp
- Unread count
- Mention indicator
- Related object label optional

---

## Message Fields
Each message should support:
- Body
- Author
- Timestamp
- Edited timestamp if edited
- Mention(s)
- Linked object reference optional
- Task conversion state optional

### Linked object examples
- Proposal
- Timeline
- BEO
- Payment milestone
- Task
- General event context

---

## Message Actions
- New message / start thread
- Reply
- Edit own message
- Mention teammate
- Convert to task
- Pin message
- Copy link to message/thread
- Mark resolved optional later

---

## Message Composer
The composer should be lightweight and operational.

### Composer features
- Text input
- Mention user
- Link to object
- Create task from message
- Send

Avoid overbuilding rich chat features in MVP.

---

## Message Filters
Support filters such as:
- All messages
- Unread
- Mentions
- By author
- Linked to proposal
- Linked to timeline
- Linked to BEO
- Recent only

---

## Messages AI Support
AI should help with:
- Summarize long threads
- Extract decisions
- Extract assignments
- Suggest next step
- Turn thread into handoff summary
- Suggest tasks

### Example labels
- Thread summary
- Decisions captured
- Suggested tasks
- Recommended next step
- Review before creating tasks

---

# 3. Activity View

## Purpose
Activity is the system-generated history of what happened inside the Event Workspace.

This is the audit trail.

It should include actions such as:
- workspace created
- stage changed
- email sent / received
- proposal created / updated / sent
- payment recorded
- task completed
- timeline updated
- BEO generated
- note added
- contract marked signed

Users should be able to trust this history as the factual record of system actions.

---

## Activity View Layout
Use a chronological stream.

### Structure
- newest first by default
- filterable
- grouped by date
- expandable where details matter

### Recommendation
This should feel like a clean audit/history timeline, not like a chat feed.

---

## Activity Entry Structure
Each entry should show:
- Action label
- Actor
- Timestamp
- Related object
- Before/after summary where relevant
- Optional metadata detail on expand

### Examples
- Stage changed from Qualified to Proposal Sent
- Proposal v2 sent to client
- Deposit marked paid
- Timeline updated
- Note added by Sarah
- Contract status changed to Signed

---

## Activity Filters
Support filters such as:
- All activity
- Stage changes
- Emails
- Proposal actions
- Payment actions
- Contract actions
- Task activity
- Timeline activity
- BEO activity
- Collaboration activity

---

## Activity AI Support
AI should help with:
- Summarize recent changes
- Explain what changed since last review
- Highlight risky recent changes
- Generate “what changed this week” summary
- Generate readiness-impact summary

### Example labels
- Recent changes summary
- What changed since your last review
- Potential risk changes
- Changes affecting readiness

---

# Context / Detail Rail

## Purpose
The right rail keeps important collaboration context visible while the main canvas changes.

## Recommended content order
1. Pinned notes
2. Open follow-up items
3. Linked tasks
4. Recent collaboration highlights
5. Visibility / audience info for selected item
6. Related objects
7. Quick actions

### Pinned note examples
- VIP sensitivity note
- planner communication preference
- weather backup note
- manager approval note

### Quick actions
- Add note
- Create task
- Start thread
- Jump to Timeline / Proposal / BEO
- Generate summary

---

# AI / Summary Support Panel

## Purpose
AI should create clarity across collaboration content.

## Recommended modules
- Rolling event brief
- Key decisions summary
- Unresolved items
- Suggested tasks
- Thread summary
- Recent changes summary
- Handoff summary draft

## Example labels
- Rolling event brief
- Key decisions
- Unresolved items
- Suggested tasks
- Changes since last review
- Review before creating tasks

## Rules
- AI summaries should remain concise
- Suggested tasks should require review
- AI should clearly distinguish summaries from source content
- AI should never overwrite user-authored notes or messages

---

# Collaboration Summary View (Optional but Recommended)
This can be a lightweight summary mode or a generated panel.

## Purpose
Give users a fast answer to:
- What matters most right now?
- What changed?
- What still needs attention?

## Should include
- Key notes
- Recent decisions
- Unresolved items
- Linked open tasks
- Major recent activity changes

This is especially useful before final walkthroughs, manager review, or operations handoff.

---

# Search and Findability

## Purpose
This module will become hard to use if historical information cannot be found quickly.

## Search should support
- note titles and note body
- message body
- author names
- note types
- linked object labels
- activity event labels

## Search result behavior
- grouped by Notes / Messages / Activity
- quick jump into source item
- matched term highlight optional
- filters remain usable after search

---

# Task Conversion Behavior

## Purpose
Important context often needs to become action.

## Users should be able to create tasks from:
- note
- message
- AI unresolved item
- activity review summary where relevant

## Task creation modal should support
- task title
- due date
- assignee
- linked object
- source reference back to note/message/activity summary

This is one of the most valuable interactions in the module.

---

# Supporting Objects and Data Dependencies

## Collaboration module depends on
- Event Workspace
- Users / roles
- Tasks
- linked objects such as Proposal, Timeline, BEO, Payments
- activity events from across the workspace

## Collaboration module writes into
- Notes records
- Internal message records
- Activity log display
- Tasks
- Overview summaries
- AI rolling event brief

---

# Key States

## Empty state — Notes
- Headline: Capture event context
- Body: Save important planning, operations, and client context so the team can find it later.
- Actions:
  - Add note
  - Create first planning note

## Empty state — Messages
- Headline: Start the internal conversation
- Body: Keep event-specific questions, updates, and coordination tied to this record.
- Actions:
  - Start thread
  - Mention teammate

## Empty state — Activity
- Headline: Activity will appear here
- Body: System events, updates, and major record changes will be tracked here automatically.

## Loading state
- Skeleton list rows
- Skeleton detail panel
- Skeleton AI summary cards
- No blank collaboration surface

## Error state
- Calm inline error language
- Clear retry action
- Preserve draft note/message input where possible

---

# Key Interaction Rules
1. Notes, Messages, and Activity must remain clearly distinct
2. Important items should be pinnable
3. AI summaries should never replace source content
4. Task conversion should preserve source references
5. Search should work across all three collaboration types
6. Visibility rules should be explicit on notes and relevant messages
7. Activity should remain read-only and system-generated
8. Collaboration should support the event workflow, not become a separate communication platform

---

# Accessibility Rules
1. Tabs for Notes, Messages, and Activity must be keyboard navigable
2. Visibility labels must be text, not icon-only
3. Unread, pinned, and mentioned states must not rely on color alone
4. Timestamps and metadata must remain legible at smaller sizes
5. Search and filter controls need clear labeling
6. Long threads and notes must remain readable with strong typographic hierarchy

---

# Component Inventory
- Collaboration tab switcher
- Notes list
- Note detail panel
- Note type badge
- Visibility badge
- Pinned note marker
- Message thread list
- Message composer
- Mention token
- Activity stream item
- Context rail
- AI summary card
- Task conversion modal
- Search bar
- Filter drawer

---

# Notes for Visual Direction
This screen should follow the OpenVenue UI Direction System:
- Dark Juniper as the anchor
- neutral surfaces
- quiet borders
- minimal shadow
- strong readability for dense text content
- no Slack-like playful styling
- no messy mixed feed treatment

The collaboration module should feel like:
**a refined internal event memory and coordination workspace**

---

# Summary Definition
The Notes / Internal Messages / Activity module is:

**durable event context + team conversation + system history + AI clarity tools**

It is the internal memory, collaboration, and audit layer of the Event Workspace.
