# OpenVenue Wireframe 06 — Auth and Onboarding Flow

## Purpose
This wireframe spec defines the authentication, account creation, onboarding questionnaire, plan selection, setup checklist, and team invite flow for OpenVenue.

The goal is to make entry into the product feel fast, premium, and structured while collecting the minimum viable business data needed to configure the account correctly.

This flow should not feel like generic SaaS signup. It should feel like the beginning of a well-run venue operations system.

---

## Product Goals

This flow must accomplish five things:
1. Let a user create an account with low friction.
2. Gather the venue structure needed for later proposals, spaces, and planning.
3. Route the user into the correct plan type.
4. Prepare the account for collaboration.
5. Land the user in a guided setup experience instead of a blank product.

---

## Governing UI Direction

This flow should follow the OpenVenue UI Direction System:
- Dark Juniper is the visual anchor.
- Neutral surfaces do most of the work.
- Microcopy stays calm, direct, and trustworthy.
- AI is not a character in this flow.
- The experience should feel composed and premium, not “growth funnel” oriented.

---

## Flow Map

### Primary sequence
1. Sign up / sign in entry
2. Create account
3. Verify email if email/password signup
4. Company account setup
5. Venue onboarding questionnaire
6. Plan selection
7. Account creation confirmation
8. Setup checklist
9. Invite team members
10. Enter product

### Secondary flows
- Forgot password
- Reset password
- Sign in with Google
- Accept team invite
- Skip invite and continue
- Add another venue later
- Upgrade plan later

---

# Screen 1 — Sign Up / Sign In Entry

## Purpose
Provide two clear entry methods:
- Continue with Google
- Continue with Email

Also provide a clear route for existing users to sign in.

## Layout

### Page shell
- Full-page centered auth layout
- Soft neutral background using Surface 0
- Centered auth card on Surface 1
- Minimal brand chrome
- Logo above or inside card header

### Card structure
1. Brand mark / logo
2. Primary heading
3. Supporting line
4. Google CTA
5. Divider
6. Email CTA
7. Existing account link

## Copy direction
### Heading
Create your OpenVenue account

### Supporting text
Set up your venue workspace in a few steps.

### Primary actions
- Continue with Google
- Continue with Email

### Footer link
Already have an account? Sign in

## Interaction rules
- Google button appears first
- Email button appears second
- No extra marketing clutter inside auth card
- Keep the visual weight calm and premium

## Notes
This screen should feel closer to premium B2B hospitality software than startup landing-page conversion UI.

---

# Screen 2 — Email Sign Up

## Purpose
Create a user identity using email and password.

## Layout

### Card structure
1. Back link
2. Heading
3. Form fields
4. Continue button
5. Existing account sign-in link

### Fields
- First name
- Last name
- Work email
- Password
- Optional: Phone number

## Form rules
- Labels above fields
- 40–44px field height
- Password field with show/hide toggle
- Inline validation under field
- Focus ring in Dark Juniper

## CTA
Continue

## Helper copy
Use your work email so your team can join the same account later.

## Error patterns
- Calm, specific inline validation
- No red-heavy page-level messaging unless necessary

### Example errors
- Enter a valid email address.
- Password must be at least 8 characters.
- We couldn’t create your account. Try again.

---

# Screen 3 — Email Verification

## Purpose
Confirm email ownership for email/password signup.

## Layout
- Centered confirmation card
- Success-state icon or simple envelope icon
- Headline
- Brief instruction text
- Resend button
- Change email link

## Copy
### Heading
Check your inbox

### Supporting text
We sent a verification link to your email address.

### Actions
- Resend email
- Change email

## Notes
- This screen should be quiet and highly legible
- No unnecessary promotional content

---

# Screen 4 — Sign In

## Purpose
Let returning users access OpenVenue with Google or email/password.

## Layout
Same shell as sign-up.

### Contents
- Continue with Google
- Divider
- Email field
- Password field
- Forgot password link
- Sign in button
- Create account link

## CTA
Sign in

## Supporting behaviors
- Remember session
- Clear inline errors
- Fast recovery path for forgotten password

---

# Screen 5 — Forgot Password

## Purpose
Allow user to request a password reset link.

## Layout
- Centered auth card
- Heading
- Single email field
- Send reset link button
- Back to sign in link

## Copy
### Heading
Reset your password

### Supporting text
Enter your email and we’ll send you a reset link.

### CTA
Send reset link

---

# Screen 6 — Reset Password

## Purpose
Allow user to create a new password.

## Layout
- Centered auth card
- Heading
- New password field
- Confirm password or single password with validation preview
- Save password button

## CTA
Save password

## Success state
Password updated

### Supporting line
You can now sign in to OpenVenue.

---

# Screen 7 — Company Account Setup

## Purpose
Collect the company-level information needed before venue setup.

## Layout
This is the first screen after authentication.

### Recommended shell
- Centered onboarding card or narrow step layout
- Progress indicator at top
- “Step X of Y” treatment
- Back and continue controls

### Fields
- Company / venue group name
- Primary business name
- Website (optional)
- Business phone
- Country
- Default timezone
- Currency

## Notes
Country, timezone, and currency should be set early so schedule and pricing logic are correct from the start.

## CTA
Continue

---

# Screen 8 — Venue Onboarding Questionnaire

## Pattern Recommendation
Use a **guided Typeform-style step flow** inside the OpenVenue visual system.

That means:
- one major question per step
- large, calm answer targets
- progress indicator
- short supportive copy
- fast keyboard / click progression
- no cluttered multi-column forms

## Layout

### Page structure
- Full-page onboarding shell
- Top progress bar or progress steps
- Center question panel
- Optional right-side summary panel on desktop
- Footer actions: Back / Continue

### Desktop behavior
- Main question centered with high readability
- Optional summary rail showing:
  - account setup progress
  - venues added
  - spaces added
  - plan eligibility hint

### Mobile behavior
- Single-column, stacked controls
- Summary collapses below or into progress step detail

---

## Question 1 — How many venues do you want to set up?

### Answer options
- One venue
- More than one venue

## Logic
- One venue → Base, Pro, Pro+
- More than one venue → Pro, Pro+ only

## Notes
This should be asked early because it controls plan eligibility downstream.

---

## Question 2 — Venue name

### If one venue
- Venue name

### If multiple venues
- First venue name
- Small note: You can add more venues in the next steps.

---

## Question 3 — Venue location

### Fields
- Street address
- City
- State / region
- Postal code
- Country

## Notes
This information later supports proposal content, timezone defaults, and location context.

---

## Question 4 — What spaces are inside this venue?

## Pattern
This is a repeating structured input step.

### For each space, collect
- Space name
- Space type
- Seated capacity
- Cocktail / standing capacity
- Optional short notes

### Space type options
- Ballroom
- Garden
- Patio
- Rooftop
- Dining Room
- Private Room
- Ceremony Space
- Reception Space
- Other

## Interaction model
- Add first space inline
- Show “Add another space” button
- Render added spaces as compact editable cards below

---

## Question 5 — Add another venue?

Only shown if multi-venue was selected.

### Options
- Yes, add another venue
- No, continue

## Behavior
If yes, repeat:
- venue name
- location
- spaces

---

## Question 6 — Do you offer in-house catering?

### Options
- Yes
- No

### If yes
Show message:
You’ll set up your menus in Account Settings after your account is created.

### Recommended expansion
Also collect catering model:
- Fully in-house
- Preferred partners
- Outside catering allowed
- Outside catering not allowed

This will make qualification and proposal logic much stronger later.

---

## Question 7 — What best describes your venue?

### Options
- Wedding Venue
- Restaurant with Private Events
- Hotel / Resort
- Winery / Brewery / Distillery
- Barn / Farm Venue
- Loft / Industrial Venue
- Garden / Outdoor Venue
- Corporate / Event Center
- Other

## Purpose
This improves setup defaults, templates, and future AI recommendations.

---

## Question 8 — What types of events do you host most often?

### Multi-select options
- Weddings
- Corporate Events
- Social Events
- Nonprofit / Fundraising
- Private Dining
- Holiday Parties
- Other

## Purpose
This supports better defaults for pipelines, proposals, and timelines.

---

## Question 9 — How many team members will need access?

### Options
- Just me
- 2–5
- 6–15
- 16+

## Purpose
Helps personalize onboarding and plan expectations.

---

## Question 10 — Are you moving from another CRM?

### Options
- Yes
- No

### If yes
Follow-up input:
- What CRM are you using today?

## Purpose
Useful for future imports and migration support.

---

# Screen 9 — Plan Selection

## Purpose
Let the user select Base, Pro, or Pro+ with transparent eligibility rules.

## Layout
- Three plan cards in a comparison layout on desktop
- Stacked cards on mobile
- Short heading and summary at top
- Eligibility note above cards if multiple venues selected

## Heading
Choose your OpenVenue plan

## Supporting text
You can change plans later as your venue grows.

## Plan cards
Each card should include:
- Plan name
- Price
- Billing cadence toggle if applicable
- Venue eligibility
- Key features
- Primary CTA

## Eligibility logic
### If one venue
Show:
- Base
- Pro
- Pro+

### If multiple venues
Show:
- Base (disabled)
- Pro
- Pro+

### Disabled Base state
- Muted card style
- Disabled CTA
- Inline note: Available for single-venue accounts only

## Important UX rule
Do not hide Base when user is ineligible. Show it disabled with explanation.

---

# Screen 10 — Account Created Confirmation

## Purpose
Bridge the onboarding questionnaire into the in-app setup experience.

## Layout
- Centered success panel
- Short success message
- Summary bullets
- Continue to setup button

## Copy
### Heading
Your OpenVenue account is ready

### Supporting text
We’ve created your workspace and saved your venue details.

### Summary list
- Company account created
- 1 or more venues added
- Spaces saved
- Plan selected

### CTA
Continue to setup

---

# Screen 11 — Setup Checklist

## Purpose
Land the user in a guided first-run experience instead of a blank dashboard.

## Layout

### Recommended structure
- Standard app shell visible now
- Top nav in Dark Juniper
- Main content panel with setup checklist card group
- Optional right rail for help / tips / next steps

### Page header
- Title
- Supporting line
- Progress indicator

### Title
Finish setting up your account

### Supporting text
Complete these steps to start working in OpenVenue.

## Checklist items
- Confirm venue details
- Review spaces
- Choose or confirm plan
- Set up menus
- Add pricing items
- Connect business email
- Invite team members
- Customize templates
- Review account settings

## Smart logic
- If no in-house catering, de-emphasize menu setup
- If only one user, keep invite team optional and lower priority
- If multiple venues, prioritize venue review

## Visual rules
- Checklist rows should feel calm and actionable
- Use completion states with text and icon
- Keep urgency low; this is setup, not failure

---

# Screen 12 — Invite Team Members

## Purpose
Allow the account owner to invite teammates during setup.

## Layout
- Standard page inside app shell
- Intro header
- Invite table or repeated invite rows
- Role selection
- Venue access selection if multi-venue

## Fields per invite row
- Full name
- Email address
- Role
- Venue access

## Role options
- Admin
- Sales
- Coordinator
- Operations
- Read Only

## Venue access options
### If single-venue account
- Hidden or fixed to current venue

### If multi-venue account
- All venues
- Selected venues

## Actions
- Add another teammate
- Send invites
- Skip for now

## Supporting note
You can manage roles and access later in Settings.

---

# Screen 13 — Invite Acceptance Flow

## Purpose
Allow invited teammates to join the account cleanly.

## Flow
1. User clicks email invite.
2. Invite details screen loads.
3. User chooses Continue with Google or Create password.
4. User joins account.
5. User lands in product with correct permissions.

## Invite details screen contents
- OpenVenue logo
- Inviter name
- Company/account name
- Assigned role
- Venue access summary
- Auth options

## Copy example
You’ve been invited to join OpenVenue as a Coordinator at Cedar Hall Events.

---

# Screen 14 — Users & Roles Settings

## Purpose
Provide longer-term management of team members after onboarding.

## Layout
- Standard settings page shell
- Page header
- Table of users
- Invite button
- Role / status / venue access columns

## Table columns
- Name
- Email
- Role
- Venue access
- Invite status
- Last active
- Actions

## Row actions
- Edit role
- Edit venue access
- Resend invite
- Remove user

---

# Visual System Notes for This Flow

## Auth screens
- Minimal, centered, quiet
- White/alabaster card on soft neutral background
- Limited chrome
- Juniper used for brand anchor and primary actions

## Onboarding questionnaire
- Full-screen guided flow
- Large answer targets
- Premium form rhythm
- Strong progress clarity
- Avoid dense admin-form feeling

## In-app setup screens
- Use the full app shell
- Let user feel they are now inside the product
- Setup checklist becomes the bridge into normal workflow

---

# Interaction Rules

## Progress visibility
Onboarding should always show:
- current step
- total progress
- back navigation
- confidence that setup is manageable

## Save behavior
- Auto-save after each step where possible
- If user exits, they should resume where they left off

## Skip behavior
- Allow skipping only where it does not break account creation
- Menus, invites, and template setup should be deferrable
- Venue identity and plan selection should not be skippable

---

# Microcopy Rules

This flow should use calm, direct, trustworthy language.

## Avoid
- hype language
- aggressive conversion language
- exclamation-heavy copy
- “magic” or anthropomorphic AI language

## Prefer
- short headings
- practical supporting lines
- action-led button text
- explicit eligibility explanations

## Examples
- Continue
- Save and continue
- Skip for now
- Available for single-venue accounts only
- You can update this later in Settings

---

# Edge Cases and System States

## Required flows
- user starts onboarding and leaves
- user verifies email later
- user selects multiple venues and tries to choose Base
- user is invited before finishing their own standalone account creation
- user wants to add more venues later
- user skips team invite
- user has no in-house catering

## State handling
- Persist onboarding progress
- Store plan eligibility state clearly
- Allow returning to incomplete setup checklist

---

# Data Captured in This Flow

## User-level
- first name
- last name
- email
- password or Google auth

## Account-level
- company name
- business name
- phone
- country
- timezone
- currency
- account type

## Venue-level
- venue name
- address
- venue type
- catering model

## Space-level
- space name
- space type
- seated capacity
- cocktail capacity
- notes

## Team-level
- role
- venue access
- invite status

---

# Component Inventory

This flow introduces or uses these components:
- auth card
- social sign-in button
- email/password form
- progress stepper
- Typeform-style question panel
- repeating space-entry cards
- plan comparison cards
- setup checklist rows
- invite row editor
- users table
- disabled plan card state
- success confirmation panel

---

# Final Wireframe Intent

This auth and onboarding flow should feel like:
- a premium operational product,
- a structured venue setup assistant,
- and a calm entry into a multi-user workspace.

It should collect enough information to make OpenVenue immediately useful without front-loading every possible settings decision.

The ideal user feeling at the end of this flow is:
**“My account is set up, my venue structure is in place, and I know exactly what to do next.”**
