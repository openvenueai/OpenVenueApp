# OpenVenue Wireframe 09 — BEO (Banquet Event Orders)

## Purpose
The BEO module is the operational handoff system inside the Event Workspace. It compiles approved event details from Proposal, Timeline, Notes, Tasks, and core event data into role-specific execution documents.

OpenVenue should support:
- a master BEO,
- and role-specific BEO views for managers, kitchen, and event staff.

The BEO should **not** require duplicate data entry wherever structured data already exists in the Event Workspace.

---

## Product Goals
The BEO module should allow a team to:
1. Generate a first BEO draft from existing event data
2. Review operational completeness before finalizing
3. Produce role-specific views for managers, kitchen, and service staff
4. Track BEO version history
5. Flag missing details before the event
6. Export, print, or share operational packets
7. Keep the BEO connected to the live Event Workspace

---

## Core UX Principles
1. **Compiled, not rebuilt**
   - The BEO should pull from Proposal, Timeline, Notes, Spaces, and Contacts.

2. **Operational clarity first**
   - BEO layouts should optimize for fast scanning, not decorative presentation.

3. **Role-based relevance**
   - Managers, kitchen, and floor staff should see different summaries of the same event.

4. **Version control matters**
   - Finalized BEOs must be preserved even if later changes occur.

5. **AI should improve completeness**
   - AI flags missing details, summarizes changes, and creates role-specific summaries.
   - AI should not silently finalize documents.

---

## Shell Placement
This screen lives inside:

**Event Workspace → BEO**

It inherits:
- the persistent Event Workspace header,
- event context,
- stage logic,
- workspace actions,
- and AI/system rail behavior.

---

## Primary Screen Modes
1. **Master BEO Edit**
2. **Role Preview**
   - Manager
   - Kitchen
   - Staff / Service
3. **Version Compare**
4. **Finalized / Print Preview**

---

## Recommended Page Structure
Use a three-zone layout:

### Zone 1 — Main BEO Canvas
The main editable and reviewable operational content.

### Zone 2 — Event Readiness Rail
Persistent right rail with:
- BEO status
- readiness score
- missing details
- timeline completeness
- staffing completeness
- proposal alignment
- final review checklist
- role output controls

### Zone 3 — AI / Handoff Support
Contextual AI modules that provide:
- missing operational details
- change summary from latest proposal/timeline edits
- role-specific summary generation
- final handoff checklist
- issue/risk alerts

---

## Persistent Workspace Header
### Header contents
- Event name
- Stage
- Event date
- Guest count
- Event type
- Assigned owner / coordinator
- BEO status
- Version number
- Last updated

### Header actions
- Save draft
- Generate BEO
- Preview by role
- Finalize BEO
- Create new version
- Compare versions
- Export / Print

---

## BEO Header Row
Inside the BEO tab, place a BEO-specific header row.

### Contents
- BEO title
- Version number
- Status badge
- Last updated timestamp
- Generated from proposal version
- Generated from timeline version if relevant

### Statuses
- Draft
- Internal Review
- Finalized
- Archived

---

## Opening State / Starting Flow
When the user opens BEO for the first time:

### Opening module
Show:
- generate first BEO button
- summary of available source data
- missing information before generation
- warning if proposal/timeline data is incomplete

### Suggested starting actions
- Generate from current event details
- Generate from latest approved proposal
- Generate from template
- Review missing details first

### AI labels
- Ready to generate
- Missing details before finalizing
- Based on the latest event details
- Review before publishing

---

# Master BEO Structure

## 1. Event Summary
### Contents
- Event name
- Event type
- Event date
- Event start/end times
- Venue / property
- Primary spaces
- Guest count
- Booking contact
- Planner / secondary contacts
- Internal event owner
- Coordinator
- Important phone numbers

---

## 2. Schedule / Run of Show
### Contents
- Venue access time
- Vendor arrival times
- Setup blocks
- Ceremony timing
- Cocktail hour timing
- Dinner/service timing
- Key moments
- Breakdown / exit timing

### Interaction
- Pull from Timeline
- Support manual override
- Show unresolved timing conflicts inline

---

## 3. Space Plan / Location Summary
### Contents
- Ceremony space
- Cocktail space
- Reception space
- Prep areas
- Backup / rain plan space
- Location notes
- Access constraints
- Setup / breakdown notes by space

---

## 4. Menu and Beverage Summary
### Contents
- Selected menu package(s)
- Passed apps / stations / courses
- Beverage package
- Signature items
- Dietary accommodations summary
- Child/vendor meals if needed
- Service assumptions

---

## 5. Rentals, Staffing, and Service Notes
### Contents
- Furniture / rental inclusions
- Linen / tabletop summary
- AV / lighting needs
- Staffing assumptions
- Bar staffing
- Security
- Valet / parking
- Setup and cleanup responsibilities

---

## 6. Financial / Contract Snapshot
This is a limited ops summary, not a billing workspace.

### Contents
- Proposal total
- Deposit status
- Balance status
- Contract status
- Final payment due flag
- Internal-only concession notes if permitted

### Rules
For staff-facing views, financial content should usually be hidden.
For manager view, it may remain visible.

---

## 7. Special Instructions and Risks
### Contents
- Accessibility notes
- Weather/rain plan notes
- VIP handling notes
- Security concerns
- Vendor restrictions
- Kitchen/service alerts
- Client sensitivities
- Escalation instructions

---

## 8. Internal Operational Notes
### Contents
- final reminders
- known exceptions
- team coordination notes
- manager-only notes
- kitchen-only notes
- service-only notes if needed

### Visibility
Each note block should support visibility scoping:
- All internal roles
- Managers only
- Kitchen only
- Staff only

---

## 9. Final Checklist
### Items
- Proposal aligned
- Timeline aligned
- Spaces confirmed
- Menu confirmed
- Dietary notes complete
- Staffing notes complete
- Vendor timing confirmed
- Contract signed
- Payment status reviewed
- Final review complete

### Actions
- Mark complete
- Assign follow-up task
- Jump to source tab

---

# Role-Based BEO Outputs

## A. Manager BEO
### Purpose
Supports oversight, troubleshooting, and final accountability.

### Includes
- full event summary
- schedule
- space use
- menu summary
- staffing notes
- financial snapshot
- contract / payment status flags
- special instructions
- escalation notes
- internal coordination notes

### Important characteristics
- comprehensive
- decision-oriented
- includes risks and unresolved items
- includes internal notes not shown to staff

---

## B. Kitchen BEO
### Purpose
Gives kitchen leadership a focused food-and-service view.

### Includes
- event summary
- service times
- headcount assumptions
- menu by course / station
- dietary accommodations
- special meal notes
- plating / service notes
- kitchen timing considerations
- kitchen-specific internal notes

### Excludes or minimizes
- sales commentary
- broader financial detail
- non-relevant client notes
- excessive staffing/admin detail outside food service

---

## C. Staff / Service BEO
### Purpose
Helps event staff understand where to be, when to be there, and what the guest experience needs.

### Includes
- event summary
- space assignments
- schedule
- service flow
- setup responsibilities
- cue points
- special guest-facing notes
- staffing reminders
- escalation contact

### Excludes or minimizes
- contract/payment detail
- negotiation history
- kitchen-only detail
- excess internal finance/admin notes

---

# Role Preview Selector
At the top of the BEO canvas or in the header, provide:

### Role preview toggle
- Master
- Manager
- Kitchen
- Staff

### Behavior
- Switching previews changes visible sections and emphasis
- Underlying source data remains one shared BEO record
- Visibility rules determine which notes/fields appear

---

# Main Builder / Edit Model

## Edit zones
The master BEO canvas should support:
- structured sections
- inline notes
- scoped visibility
- manual overrides
- source references

## Source references
Where useful, show small references such as:
- From Proposal
- From Timeline
- From Event Details
- From Notes

## Override behavior
Users should be able to override compiled text without breaking the source record.

---

# Right Event Readiness Rail

## Purpose
Operational truth panel for finalization readiness.

## Recommended content order
1. BEO status
2. Event readiness score
3. Missing details
4. Timing conflicts
5. Menu completeness
6. Staffing completeness
7. Space completeness
8. Payment/contract flags
9. Final review checklist
10. Role export controls

## Missing detail examples
- No final guest count
- Menu package missing dietary notes
- No staff arrival times
- Rain plan not defined
- Contract unsigned
- Final payment due
- Setup notes missing for reception space

---

# AI / Handoff Support Panel

## Purpose
AI should accelerate operational completeness.

## Recommended modules
- Missing operational details
- Role-specific summary generation
- Changes since last version
- Potential execution risks
- Final review suggestions
- Handoff summary for today / upcoming event

## Example labels
- Missing details before finalizing
- Changes from the latest proposal
- Kitchen summary draft
- Staff summary draft
- Review before publishing

## Rules
- Keep AI outputs concise
- Make all generated content editable
- Never finalize automatically
- Never hide what changed

---

# Client / Staff Visibility Rules

## Visibility levels
- Internal all roles
- Managers only
- Kitchen only
- Staff only

## Examples
- Financial snapshot: managers only
- Dietary execution notes: kitchen + managers
- Guest-facing service reminders: staff + managers
- Concession notes: managers only

---

# Version Compare Mode

## Purpose
Shows changes between BEO versions.

## Compare should show
- timing changes
- space changes
- menu changes
- staffing note changes
- special instruction changes
- role-output differences

## AI summary
A concise summary should explain:
- what changed
- what teams may need to know
- whether re-communication is recommended

---

# Finalize / Print Preview

## Purpose
Produce a clean operational output for printing or sharing.

## Print structure
- role-specific title
- event summary header
- structured sections
- page breaks at sensible boundaries
- high-contrast, low-decoration layout

## Actions
- Export PDF
- Print
- Share with team
- Archive version

---

# Supporting Objects and Data Dependencies

## BEO depends on
- Event details
- Spaces
- Timeline
- Proposal
- Notes
- Tasks
- Contact details
- Payment / contract statuses
- Venue settings

## BEO writes into
- Activity log
- Tasks
- Finalized handoff state
- Role-specific exports
- Overview readiness state

---

# Key States

## Empty state
### Content
- Headline: Generate the first BEO
- Body: Compile proposal, timeline, and event details into operational handoff documents.
- Actions:
  - Generate BEO
  - Review missing details
  - Open timeline

## Loading state
- Skeleton sections
- Skeleton readiness rail
- Do not show blank screen

## Error state
- Calm inline warnings
- Missing source data clearly identified
- Clear next action links

---

# Key Interaction Rules
1. BEO should compile from source data by default
2. Manual edits must be preserved per version
3. Role previews should never alter source data
4. Financial data visibility must be role-aware
5. Finalize should be intentional and explicit
6. Changes after finalization should prompt new version creation
7. Missing source data should deep-link to the relevant tab

---

# Accessibility Rules
1. Role labels must be text, not icon-only
2. Section headings should create strong navigation landmarks
3. Visibility scopes should be explicit in text
4. Print/export layouts must preserve readable contrast
5. Timing and counts must remain legible at print size

---

# Component Inventory
- BEO header row
- Role preview toggle
- Structured section blocks
- Scoped note block
- Readiness rail
- AI handoff card
- Version compare drawer
- Finalize modal
- Print preview
- Missing details banner
- Source reference chip

---

# Notes for Visual Direction
This screen should follow the OpenVenue UI Direction System:
- Dark Juniper as the anchor
- neutral surfaces
- white/alabaster content planes
- quiet borders
- minimal shadow
- highly legible operations-first typography
- no decorative document styling

The BEO should feel like:
**a refined operational binder inside the app**

---

# Summary Definition
The BEO module is:

**compiled event data + timeline + proposal + operational notes + role-based visibility + version control**

It is the handoff bridge between planning and execution.
