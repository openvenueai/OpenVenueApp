# OpenVenue Wireframe 08 — Proposal Builder

## Purpose
The Proposal Builder is a guided sales-and-pricing workspace inside the Event Workspace. It helps venue teams turn event context, venue spaces, menus, pricing rules, and client-facing language into a polished proposal that can be previewed, versioned, sent, and reused downstream across Payments & Contract, Timeline, BEO, Overview, Inbox, and Tasks.

This module should feel like:
- a commercial workspace,
- a proposal composer,
- and a pricing rules engine.

It should **not** feel like:
- a blank invoice form,
- a spreadsheet-first editor,
- or a detached PDF generator.

---

## Product Goals
The Proposal Builder should allow a user to:

1. Start from existing event context instead of a blank screen
2. Select proposal structure (package, itemized, or hybrid)
3. Add venue spaces, food, beverage, rentals, staffing, and add-ons
4. Apply flexible service charges, surcharges, discounts, fees, and sales tax
5. Edit client-facing proposal language
6. Preview exactly what the client will see
7. Send and version proposals without losing prior revisions
8. Feed approved information into the rest of the Event Workspace

---

## Core UX Principles
1. **Event-aware, not blank**
   - Proposal opens with guest count, event type, date, budget, and venue details already in context.

2. **Composition first, document second**
   - The user builds the commercial structure first, then previews the final client proposal.

3. **Flexible pricing is a first-class feature**
   - Custom fees, surcharges, service charges, discounts, and tax behavior are core to the builder.

4. **AI is assistive and reviewable**
   - AI suggests packages, identifies issues, drafts language, and summarizes changes.
   - AI never silently alters pricing or terms.

5. **Version history matters**
   - Proposal revisions should be explicit, comparable, and recoverable.

---

## Shell Placement
This screen lives inside:

**Event Workspace → Proposal**

The Proposal tab should inherit:
- the persistent Event Workspace header,
- event context,
- stage logic,
- workspace-level actions,
- and the AI/system rail behavior established elsewhere in the app.

---

## Primary Screen Modes
The Proposal Builder should support these primary modes:

1. **Edit Mode**
   - Main composition mode
   - Item, fee, and wording edits

2. **Client Preview Mode**
   - Simulates exactly what the client sees
   - Uses polished document layout
   - Hides internal controls

3. **Version Compare Mode**
   - Compare current proposal to prior versions
   - Highlights pricing and content changes

4. **Send / Share Mode**
   - Review email/send flow and proposal delivery state

---

## Recommended Page Structure
Use a three-zone layout:

### Zone 1 — Main Builder Canvas
Primary editable column where the proposal is assembled.

### Zone 2 — Summary / Pricing Rail
Persistent right rail showing:
- current total
- subtotal
- service charges
- surcharges
- discounts
- taxable subtotal
- sales tax
- grand total
- deposit amount
- payment milestone preview
- missing details
- send readiness

### Zone 3 — AI / Guidance Layer
A contextual panel or collapsible stack that provides:
- suggested starting package
- recommended upsells
- pricing warnings
- budget mismatch signals
- capacity warnings
- suggested client-facing intro
- send-readiness checks
- revision summary

The AI panel should remain subtle, review-first, and clearly secondary to the builder itself.

---

## Persistent Workspace Header
The Proposal tab should sit below the persistent Event Workspace header.

### Header contents
- Event / lead name
- Stage
- Event type
- Preferred date
- Guest count
- Budget range
- Assigned owner
- Last activity
- Proposal status
- Proposal total

### Header actions
- Save changes
- Preview proposal
- Send proposal
- Create new version
- Duplicate proposal
- Compare versions

---

## Proposal Header Row
Inside the Proposal tab, place a proposal-specific header row above the builder.

### Contents
- Proposal title
- Version number
- Proposal status badge
- Last updated timestamp
- Proposal owner
- Current total

### Statuses
- Draft
- Internal Review
- Sent
- Viewed
- Revised
- Accepted
- Declined
- Expired

### Header actions
- Save draft
- Preview
- Send
- Export PDF
- Compare version
- More actions menu

---

## Opening State / Starting Flow
When a user opens Proposal for the first time, do not drop them into a blank form.

### Opening module
A top module should summarize:
- suggested proposal structure
- recommended spaces
- likely package fit
- stated budget range
- missing information
- pricing readiness issues

### Suggested starting actions
- Start with package
- Start itemized proposal
- Start hybrid proposal
- Generate first draft
- Build from template

### AI labels
- Suggested starting point
- Based on the latest inquiry
- Missing details before sending
- Review before applying

---

## Proposal Composition Structure
The main builder canvas should be organized into sections in this order:

1. Proposal setup
2. Spaces
3. Food
4. Beverage
5. Rentals, staffing, and add-ons
6. Fees, surcharges, discounts, and tax
7. Client-facing notes and inclusions
8. Internal notes
9. Payment summary preview

Each section should support:
- expand/collapse
- reorder where relevant
- add item
- edit item
- remove item
- inline totals
- quick validation

---

# Section-by-Section Wireframe

## 1. Proposal Setup
This section defines the structure and assumptions of the proposal.

### Fields
- Proposal title
- Proposal structure
- Venue selection
- Event date
- Guest count assumption
- Seating style / event format
- Currency
- Internal reference notes

### Proposal structure options
- Package
- Itemized
- Hybrid

### Behavior
- If Package is selected, the builder emphasizes package selection first.
- If Itemized is selected, the builder emphasizes category-by-category composition.
- If Hybrid is selected, package blocks and custom item groups may coexist.

---

## 2. Spaces
Spaces should appear before food and beverage.

### Why
The selected space often determines:
- event feasibility,
- capacity constraints,
- rental cost,
- and proposal structure.

### Layout
Use cards or grouped rows for selected spaces.

### Addable space types
- Ceremony space
- Cocktail space
- Reception space
- Prep suite / ready room
- Additional private room
- Rain plan space
- Other venue space

### Each selected space should show
- Internal space name
- Client-facing label
- Seated capacity
- Cocktail capacity
- Pricing method
- Space fee
- Included time / notes
- Space-specific description
- Availability assumptions

### Actions
- Add space
- Edit details
- Override price
- Remove space
- Add note
- Mark included

### Validation / AI checks
- Guest count exceeds seated capacity
- Cocktail capacity is valid but seated is not
- Missing required main event space
- Space selected is inconsistent with event type

---

## 3. Food
This section should appear only if the venue has in-house catering enabled.

### Layout
Grouped blocks by menu structure:
- menu package
- hors d’oeuvres
- dinner service
- dessert
- late-night additions
- child/vendor meals if needed

### Each item row shows
- Item name
- Category
- Pricing method
- Quantity / guest count basis
- Unit price
- Line total
- Notes / customization

### Actions
- Add from catalog
- Add custom item
- Duplicate item
- Edit quantity
- Apply override
- Remove item

### If in-house catering is disabled
Replace the Food section with a policy/configuration block:
- Outside catering allowed
- Preferred caterer note
- Kitchen use fee if applicable
- Catering policy language

---

## 4. Beverage
Separate from Food, since many venues price beverage independently.

### Common item groups
- Standard bar package
- Premium bar upgrade
- Beer and wine package
- Consumption bar
- Signature cocktails
- Non-alcoholic package
- Champagne toast
- Specialty add-ons

### Controls
- Add package
- Add custom beverage item
- Add staffing if beverage-specific
- Mark as hosted or cash bar if needed later

### Validation
- Bar selection missing for event type that typically includes beverage
- Beverage total out of line with stated budget
- Consumption bar requires internal notes or assumptions

---

## 5. Rentals, Staffing, and Add-Ons
This section captures the customizable operational and commercial extras.

### Common groups
- Staffing
- Rentals
- Ceremony add-ons
- AV / lighting
- Setup / cleanup
- Coordination add-ons
- Outside vendor fees
- Corkage / cake cutting
- Parking / valet
- Security
- Other services

### Interaction model
Allow:
- grouped accordion categories
- reusable defaults from settings
- one-off custom additions
- optional client-visible descriptions

---

## 6. Fees, Surcharges, Discounts, and Tax
This is a core section, not an afterthought.

### Purpose
This section acts as the pricing rules engine of the Proposal Builder.

### It must support
- service charges
- administrative fees
- facility fees
- hospitality charges
- surcharges
- room-specific fees
- peak-date fees
- holiday surcharges
- staffing fees
- cleanup fees
- discounts
- sales tax
- fully custom charges

### Layout
A dedicated adjustment table or stack with clear distinction between:
- fees and surcharges
- discounts
- tax rules

### Adjustment controls
Each adjustment should support:

- Name
- Internal label
- Client-facing label
- Type
- Flat or percentage
- Amount
- Application scope
- Taxable yes/no
- Visible to client yes/no
- Default or one-off
- Editable per proposal
- Sort order

### Adjustment types
- Service charge
- Surcharge
- Fee
- Discount
- Tax
- Custom adjustment

### Application scope options
- Entire proposal
- Spaces only
- Food only
- Beverage only
- Staffing only
- Rentals only
- Selected line items only

### Per-proposal flexibility
Even if defaults come from Settings, the user must be able to:
- add a one-off fee
- add a one-off discount
- remove a default fee
- override percentage or amount
- rename a charge for this proposal
- hide or show a charge to the client
- change taxability

### Tax controls
At minimum, MVP should support:
- default account-level sales tax
- venue-level tax override
- line-item taxable / non-taxable behavior
- fee taxable / non-taxable behavior
- proposal-level tax override

### Inline summaries
This section should always display:
- subtotal before adjustments
- total fees/surcharges
- total discounts
- taxable subtotal
- sales tax
- grand total

### AI support
- Detect duplicate or conflicting fees
- Flag unusually high adjustment stacks
- Identify when tax appears inconsistent
- Suggest simplified client explanation of charges
- Flag total exceeding stated budget

---

## 7. Client-Facing Notes and Inclusions
A proposal is not only a pricing artifact. It is also a sales document.

### This section should support
- Welcome / intro paragraph
- Package explanation
- Included details summary
- Why this proposal fits the event
- Assumptions
- Next steps
- Optional exclusions / terms summary

### Controls
- Write manually
- Generate with AI
- Rewrite shorter
- Rewrite warmer
- Rewrite more concise
- Reset to template
- Insert standard section

### AI recommendations
- Draft intro based on inquiry
- Explain selected package clearly
- Summarize included spaces and services
- Draft client-facing price explanation
- Draft response to likely objection

---

## 8. Internal Notes
This section remains internal to the team.

### Typical content
- pricing rationale
- concessions
- negotiation notes
- exception approvals
- assumptions not shown to client
- follow-up strategy

### UI
A simple bordered note area with timestamped save behavior.

---

## 9. Payment Summary Preview
This should not replace the Payments & Contract tab, but it should provide an early commercial summary.

### Show
- Proposal total
- Deposit amount
- Estimated payment schedule preview
- Payment terms summary
- Contract needed indicator

### Actions
- Push totals to Payments & Contract
- Save deposit assumption
- Edit payment milestone assumptions

---

# Right Summary Rail

## Purpose
The right rail should remain visible while editing and act as the commercial truth panel.

## Recommended content order
1. Proposal total
2. Subtotal
3. Fees and surcharges
4. Discounts
5. Taxable subtotal
6. Sales tax
7. Grand total
8. Deposit due
9. Estimated remaining balance
10. Payment preview
11. Missing details
12. Send readiness

## Missing detail examples
- Event date is not confirmed
- Guest count is still an estimate
- No primary event space selected
- Tax settings are incomplete
- Proposal exceeds stated budget
- No payment terms added

## Send readiness labels
- Ready to preview
- Needs review before sending
- Missing required details

---

# AI Recommendation Panel

## Purpose
AI should support the proposal workflow without taking over the screen.

## Recommended modules
- Suggested package
- Recommended spaces
- Upsell suggestions
- Budget mismatch warning
- Capacity warning
- Missing details
- Draft client intro
- Suggested follow-up after send
- Revision summary

## Example labels
- Suggested package
- Based on guest count and budget
- Missing details before sending
- Review before applying
- Recommended next step
- Changes from last version

## Rules
- Keep this panel quieter than the builder
- Make all outputs editable
- Never auto-apply pricing changes
- Never imply autonomous action

---

# Client Preview Mode

## Purpose
Allows the user to see the client-facing proposal without leaving the Event Workspace.

## Preview structure
- Proposal title
- Venue / event summary
- Welcome note
- Selected spaces
- Included services
- Pricing summary
- Fees and tax presentation
- Deposit / payment summary
- Next steps

## Preview rules
- Hide internal notes
- Hide internal labels
- Hide non-client-visible fees
- Present line items with polished visual grouping
- Keep typography calm and premium

## Actions
- Return to edit
- Print / export
- Send proposal
- Create new version

---

# Version Compare Mode

## Purpose
Shows what changed between proposal versions.

## Layout
Use side-by-side or structured diff summary.

## Compare should show
- Total price delta
- Added items
- Removed items
- Changed quantities
- Changed fees / surcharges / discounts
- Changed tax behavior
- Changed client-facing notes

## AI summary
A compact revision summary should explain:
- what changed
- price impact
- likely negotiation implication

---

# Send / Share Flow

## Entry points
- Send proposal button in header
- Send from preview mode
- Resend from version list

## Send modal contents
- Recipient
- Subject
- Email body
- Proposal attachment or linked view
- Send timing
- Internal note / reminder options

## AI assistance
- Draft send email
- Draft follow-up reminder
- Suggest reply if proposal is not viewed after X days

## Delivery states
- Sent
- Viewed
- Not viewed
- Accepted
- Declined
- Expired

---

# Supporting Objects and Data Dependencies

## Proposal Builder depends on
- Event type
- Event date
- Guest count
- Budget range
- Venue selection
- Venue spaces from onboarding/settings
- Catalog items
- Pricing rules
- Tax rules
- Client contact details
- Account plan and venue structure

## Proposal Builder writes into
- Event Workspace Overview
- Payments & Contract
- Tasks
- Inbox history
- Activity log
- Timeline hints
- BEO data source

---

# Key States

## Empty state
Use when no proposal exists yet.

### Content
- Headline: Build the first proposal
- Body: Use event details, spaces, and pricing rules to create a client-ready proposal.
- Actions:
  - Start with package
  - Start itemized proposal
  - Generate first draft

## Loading state
- Skeleton builder sections
- Skeleton right rail totals
- Do not show blank canvas

## Error state
- Clear inline save error
- Specific validation warnings
- Calm corrective language

---

# Key Interaction Rules

1. Auto-save drafts with clear saved state
2. Do not lose edits when switching between tabs
3. Right rail totals update immediately
4. Fees and tax changes should visibly recalculate the pricing summary
5. Client-visible vs internal-only fields must be visually distinguishable
6. Per-item and per-proposal overrides should be obvious
7. Version creation should require intentional action
8. Preview mode should mirror the actual client output closely

---

# Accessibility Rules

1. All price changes should be reflected with text, not color alone
2. Status badges require text labels
3. Focus order should move logically through the builder
4. Interactive rows must have clear hover and focus states
5. Totals and adjustment labels must be screen-reader legible
6. Hidden/internal fields should be programmatically distinguished where relevant

---

# Component Inventory

## Core components
- Proposal header row
- Builder section accordion
- Space card / row
- Catalog item row
- Custom item modal
- Adjustment row
- Tax rule selector
- Pricing summary rail
- AI recommendation card
- Version history drawer
- Compare view
- Preview toggle
- Send modal
- Validation banner

---

# Notes for Visual Direction
This screen should follow the OpenVenue UI Direction System:

- Dark Juniper remains the visual anchor
- neutral surfaces carry the structure
- white/alabaster content planes
- quiet borders
- minimal shadow
- premium but restrained typography
- no loud finance-software styling
- no theatrical AI treatment

The Proposal Builder should feel like:
**a refined commercial workspace for hospitality teams**

not:
- accounting software
- a spreadsheet editor
- or a decorative brochure builder

---

# Summary Definition
The Proposal Builder is:

**event context + spaces + catalog items + pricing rules + client-facing narrative + AI guidance + version control**

This is one of the most strategically important screens in OpenVenue because it connects:
- sales conversion,
- pricing flexibility,
- client communication,
- and downstream event operations.
