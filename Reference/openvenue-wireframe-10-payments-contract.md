# OpenVenue Wireframe 10 — Payments & Contract

## Purpose
The Payments & Contract module is the commercial commitment workspace inside the Event Workspace. It tracks contract status, invoice/deposit milestones, payment progress, reminders, and readiness to move a lead from proposal to booked event.

For MVP, Payments and Contract should live together in one tab because they are operationally linked during booking.

This module should feel like:
- a commitment and status workspace,
- not full accounting software,
- and not a legal-document repository only.

---

## Product Goals
The Payments & Contract module should allow a team to:
1. Generate contract and invoice records from proposal data
2. Track contract status from draft to signed
3. Track deposit, milestone, and balance payment statuses
4. Send reminders for unsigned contracts and overdue payments
5. Give the team a clean financial/status snapshot
6. Keep commercial progress visible on Overview and Dashboard
7. Support future integrations without overbuilding MVP

---

## Core UX Principles
1. **Status clarity first**
   - Users should immediately know what is signed, what is paid, and what is overdue.

2. **Proposal-connected, not manually rebuilt**
   - Totals and assumptions should come from the proposal wherever possible.

3. **Operational, not accounting-heavy**
   - The screen should support venue workflow without mimicking a full finance system.

4. **AI helps with reminders and risk detection**
   - AI drafts reminder language, summarizes outstanding items, and flags booking risk.

5. **Explicit milestone logic**
   - Deposits, milestone payments, and final balances should be visible and understandable.

---

## Shell Placement
This screen lives inside:

**Event Workspace → Payments & Contract**

It inherits:
- the persistent Event Workspace header,
- event context,
- stage logic,
- workspace actions,
- and AI/system rail behavior.

---

## Primary Screen Modes
1. **Overview**
2. **Contract Detail**
3. **Invoice / Payment Schedule Detail**
4. **Reminder / Follow-Up**

---

## Recommended Page Structure
Use a three-zone layout:

### Zone 1 — Main Commercial Canvas
Primary content showing contract status, payment schedule, and payment history.

### Zone 2 — Commitment Rail
Persistent right rail with:
- proposal total
- deposit due
- outstanding balance
- contract status
- payment status
- overdue alerts
- next milestone
- booking readiness

### Zone 3 — AI / Reminder Support
Contextual AI modules for:
- unsigned contract reminders
- overdue payment reminders
- risk alerts
- plain-language summary of obligations
- next best action

---

## Persistent Workspace Header
### Header contents
- Event name
- Stage
- Event date
- Guest count
- Proposal total
- Contract status
- Payment status
- Outstanding balance

### Header actions
- Create / Update contract
- Create invoice schedule
- Send contract
- Send reminder
- Mark payment received
- Move to Booked when criteria are satisfied

---

## Module Header Row
### Contents
- Contract status badge
- Payment status badge
- Contract version / reference
- Invoice summary
- Last updated timestamp

### Statuses
#### Contract
- Draft
- Sent
- Viewed
- Signed
- Expired
- Cancelled

#### Payment
- Not Started
- Deposit Pending
- Partially Paid
- Paid
- Overdue
- Cancelled

---

# Main Screen Structure

## 1. Commercial Snapshot
A top summary area that answers the booking question immediately.

### Show
- Proposal total
- Deposit due
- Deposit paid or unpaid
- Outstanding balance
- Contract status
- Next payment due date
- Booking readiness status

### Booking readiness examples
- Ready to mark booked
- Waiting on contract signature
- Waiting on deposit
- Waiting on both signature and deposit

---

## 2. Contract Panel
### Purpose
Track the contract as a commitment object.

### Show
- Contract title / version
- Status
- Sent date
- Viewed date
- Signed date
- Expiration date
- Document link / file reference
- Internal notes

### Actions
- Create draft
- Update draft
- Send contract
- Resend contract
- Mark signed
- Mark cancelled
- View activity

### MVP behavior
If full e-sign is not implemented yet, the module should still support:
- status tracking
- send/resend tracking
- signed date capture
- external document link or uploaded file reference

---

## 3. Payment Schedule Panel
### Purpose
Show the full payment milestone structure.

### Recommended layout
Use a table or stacked milestone cards.

### Each milestone row should include
- Label
- Amount
- Due date
- Status
- Payment received date
- Balance remaining
- Internal notes

### Common milestone examples
- Initial deposit
- Second payment
- Final balance
- Custom milestone

### Actions
- Add milestone
- Edit milestone
- Reorder milestone
- Mark paid
- Record partial payment
- Remove milestone
- Send reminder

---

## 4. Payment History
### Purpose
Show all recorded payment activity.

### Each payment record should show
- Payment date
- Amount
- Applied to milestone
- Method
- Reference number
- Status
- Notes

### Common methods
- ACH
- Check
- Credit card
- Cash
- Wire
- Other

### Actions
- Add payment record
- Edit payment record
- View audit activity

---

## 5. Terms and Policy Summary
### Purpose
Keep key terms visible without turning the screen into a legal editor.

### Show
- Deposit policy summary
- Refund/cancellation summary
- Payment terms summary
- Late fee policy if applicable
- Internal exceptions/concessions

---

## 6. Internal Notes / Exceptions
### Show
- approved concessions
- payment plan exceptions
- manager approvals
- client negotiation notes
- special billing instructions

### Visibility
Internal-only, role-aware.

---

# Right Commitment Rail

## Purpose
Commercial truth panel for booking progress.

## Recommended content order
1. Proposal total
2. Deposit due
3. Paid to date
4. Outstanding balance
5. Next payment due
6. Contract status
7. Payment status
8. Overdue alert
9. Booking readiness
10. Reminder actions

## Alert examples
- Contract sent but not viewed
- Contract viewed but not signed
- Deposit overdue
- Final balance due soon
- Payment plan incomplete
- Outstanding balance remains after event date

---

# AI / Reminder Support Panel

## Purpose
AI should support collections and follow-up with calm, reviewable language.

## Recommended modules
- Suggested contract follow-up
- Suggested deposit reminder
- Suggested overdue payment reminder
- Plain-language commercial summary
- Booking risk warning
- Next best action

## Example labels
- Suggested follow-up
- Contract still needs signature
- Payment due soon
- Review before sending
- Recommended next step

## Rules
- All reminder drafts must be editable
- AI should not send automatically
- Tone should remain calm, specific, and professional

---

# Reminder / Follow-Up Flow

## Entry points
- Send reminder button in header
- Reminder action from payment milestone row
- Reminder action from AI panel

## Reminder modal contents
- Recipient
- Reminder type
- Subject
- Body
- Related milestone / contract reference
- Optional internal note
- Follow-up task toggle

## Reminder types
- Contract follow-up
- Deposit reminder
- Payment due soon
- Payment overdue
- Final balance reminder

---

# Booking Logic

## Purpose
This tab should support the move from proposal to booked.

## Recommended logic
A booking readiness module should evaluate:
- contract signed?
- deposit paid?
- required milestones configured?
- proposal approved / accepted?
- any blocking issues?

## Output states
- Not ready to book
- Ready after signature
- Ready after deposit
- Ready to mark booked

## Action
- Mark as Booked

This action should require confirmation and write to Activity Log.

---

# Supporting Objects and Data Dependencies

## Payments & Contract depends on
- Proposal total
- Payment assumptions
- Event date
- Client contact
- Venue/account settings
- Contract template setup if used
- Reminder templates

## Payments & Contract writes into
- Overview financial snapshot
- Dashboard alerts
- Activity log
- Tasks
- Booking stage progression
- BEO visibility for manager-facing summary

---

# Key States

## Empty state
### Content
- Headline: Set up contract and payment tracking
- Body: Track signature status, deposits, milestones, and reminders in one place.
- Actions:
  - Create contract
  - Build payment schedule
  - Use proposal total

## Loading state
- Skeleton contract panel
- Skeleton milestone rows
- Skeleton commitment rail

## Error state
- Clear save/send failures
- Specific validation messages
- Calm recovery guidance

---

# Key Interaction Rules
1. Proposal totals should flow in automatically where possible
2. Contract and payment statuses must remain visible at all times
3. Milestone totals should reconcile clearly against proposal total
4. Overdue states should be visible but not visually overwhelming
5. Reminder actions should be available from both summary and row level
6. Marking paid should update all rollup totals immediately
7. Moving to Booked should be an explicit action, not automatic

---

# Accessibility Rules
1. Contract/payment statuses require text labels
2. Due and overdue states must not rely on color only
3. Milestone rows need strong keyboard/focus handling
4. Money values should be aligned and readable
5. Reminder actions should be labeled explicitly by purpose

---

# Component Inventory
- Commercial snapshot card
- Contract panel
- Payment milestone table
- Payment history list
- Commitment rail
- AI reminder card
- Reminder modal
- Booking readiness card
- Mark booked confirmation
- Internal notes block

---

# Notes for Visual Direction
This screen should follow the OpenVenue UI Direction System:
- Dark Juniper as the anchor
- neutral surfaces
- quiet borders
- restrained status usage
- high readability for monetary values and due dates
- no accounting-software clutter
- no alarmist color overload

The module should feel like:
**a clean commercial commitment workspace for venue teams**

---

# Summary Definition
The Payments & Contract module is:

**proposal-connected commercial tracking + contract status + payment milestones + reminders + booking readiness**

It is the bridge between proposal acceptance and confirmed booking.
