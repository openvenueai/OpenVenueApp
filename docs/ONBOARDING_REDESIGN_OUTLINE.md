# Onboarding Redesign — Implementation Outline

This outline maps the [conversational onboarding spec](openvenue-conversational-onboarding-spec.md) to the current OpenVenue app and lists the changes to make.

---

## 1. Current state vs target

| Aspect | Current | Target (spec) |
|--------|---------|----------------|
| **Structure** | Single long form, many sections visible | One question per screen, config-driven steps |
| **Data** | `OnboardingInput`: company, business, venues[], spaces[], eventTypes, teamSize, catering, plan, etc. | `OnboardingAnswers`: primaryGoal, userName, companyName, role, businessType, venueCountRange, currentSystem, activationChoice, conditional fields |
| **Submit** | One submit at the end; creates account + venues + spaces + membership | Autosave after every step; final submit maps answers → account/venue/setup and hands off |
| **Routing** | `/onboarding` (one page) | `/onboarding` and `/onboarding/[step]`; resume from `currentStepId` |
| **Navigation** | In-page sections, no progress | Back / Next per step, progress indicator, optional Skip |
| **Branching** | None | Branch on primaryGoal, currentSystem, activationChoice |
| **Persistence** | None until submit | `onboarding_sessions` + `onboarding_events`; resume on return |

---

## 2. Changes to make

### 2.1 Backend / data

- **New tables (Drizzle + migration)**  
  - `onboarding_sessions`: id, user_id (auth), account_id (nullable until complete), current_step_id, answers_json (JSONB), status (in_progress | completed | abandoned), version, started_at, updated_at, completed_at.  
  - `onboarding_events`: id, session_id, user_id, step_id, event_type (step_viewed | step_completed | step_skipped | …), value_json, created_at.  
  - Ensure `user_id` ties to the same auth identity the app uses (e.g. Supabase auth id); account_id can be set when onboarding completes.

- **New types and config**  
  - `OnboardingAnswers` and `OnboardingStep` (and step type union) as in the spec.  
  - A single **step config array** that defines all steps (welcome, text, single-select, review, complete) with `showIf`, `nextStep`, `validate` where needed.

- **Session API**  
  - **Load session:** given auth user, return latest `onboarding_sessions` row (if any) with `current_step_id` and `answers_json`.  
  - **Save step:** receive stepId + answer payload; validate; merge into `answers_json`; update `current_step_id` and `updated_at`; optionally append to `onboarding_events`.  
  - **Complete onboarding:** map `OnboardingAnswers` → existing account/venue creation (or a new “light” creation path); set session status to completed, set `completed_at` and `account_id`; create account, profile, membership, and optionally one venue/pipeline as per activation path.

- **Mapping answers → existing domain**  
  - Reuse or adapt `startOnboardingAction` so that when onboarding is “completed” we still create: account, profile, account_membership, and optionally one venue (from firstVenueName) or minimal placeholder.  
  - Map spec fields to existing fields where possible (e.g. companyName → account name, firstVenueName → first venue name).  
  - Defer full venue/spaces/address detail to post-onboarding (e.g. setup) where the current long form can live or be broken into smaller steps.

### 2.2 Routing and entry

- **Routes**  
  - `app/onboarding/page.tsx`: if user has no account, load session and redirect to `currentStepId` or step 0 (e.g. `/onboarding/welcome`). If session is completed, redirect to `/setup` or handoff target.  
  - `app/onboarding/[step]/page.tsx`: resolve step from config by id; if invalid or not allowed by branching, redirect to correct step or `/onboarding`. Render the single-step UI for that step; progress, Back, Next/Skip, and CTA call the step engine.

- **Guards**  
  - Same auth as now: require authenticated user for `/onboarding` and `/onboarding/[step]`.  
  - If user already has an account (existing `getAccountSnapshot` check), redirect to `/setup` or dashboard so the new flow is only for net-new users.

### 2.3 Frontend — shell and layout

- **OnboardingShell**  
  - Centered, constrained width; no main app nav (no TopNav in this layout).  
  - Optional: small logo or “OpenVenue” text only.  
  - Used by both `/onboarding` (redirect) and `/onboarding/[step]`.

- **ProgressHeader**  
  - Shows progress (e.g. “Step 3 of 12” or a progress bar) derived from step config and current step index.  
  - No need to show future step titles; keep it minimal.

### 2.4 Frontend — step engine and components

- **Step engine (client)**  
  - Reads step config and current `answers` from server (or client state hydrated from session).  
  - Computes current step id (from URL or session), whether to show a step (showIf), and next step id (nextStep or default order).  
  - Handles Back (previous step in history or config order) and Next/Continue (validate → save step → navigate to next or review/complete).  
  - Calls server action to “save step” (and optionally “complete onboarding” on final step).

- **Reusable step components**  
  - **Welcome step:** title, short body, single CTA → next step.  
  - **Text input step:** headline, optional helper, one input, primary CTA, optional Skip.  
  - **Single-select (cards) step:** headline, optional helper, list of choice cards, primary CTA, optional Skip.  
  - **Review step:** summary card(s) from answers, edit links (e.g. go back to step by id), “Finish setup” CTA.  
  - **Completion step:** “Your workspace is ready”, short personalized copy, dynamic CTA (e.g. “Open your first venue” / “View your pipeline”) that runs completion and redirects to handoff URL.

- **Shared step UI**  
  - Each step: progress, headline, optional description, one input area, primary CTA, Back, optional Skip.  
  - Use existing design tokens (juniper, surfaces, spacing) and keep layout calm and minimal.

### 2.5 Step config and branching

- **Implement full step list** per spec:  
  Welcome → Primary goal → Name → Company name → Role → Business type → Venue scope → Current system → (conditional: CRM name, import intent; or spreadsheet import intent) → Activation choice → (conditional: first venue name, or pipeline name, or lead source) → Review → Completion.

- **Conditionals**  
  - 8A/8B only if currentSystem === "Another CRM"; 8C only if currentSystem === "Spreadsheets".  
  - 10A/10B/10C only for the chosen activationChoice.  
  - If primaryGoal === "Just explore", allow shorter path (e.g. default activation, or skip to review with minimal required fields).

- **Validation**  
  - Required per spec for: primaryGoal, userName, companyName, role, businessType, venueCountRange, currentSystem, activationChoice (unless explorer).  
  - Conditional required: currentCrmName, firstVenueName, pipelineName, leadSource as per branches.  
  - Validate on Continue; show short, plain error and keep user on same step.

### 2.6 Completion and handoff

- **On “Finish setup” (review) or completion CTA**  
  - Call server to “complete onboarding”: create account, profile, membership, and optionally one venue or pipeline stub from answers.  
  - Set session status to completed, set account_id, completed_at.  
  - Redirect to handoff URL based on activationChoice (e.g. /setup, /dashboard, /leads, or a dedicated “first venue” page).

- **Map answers to existing `startOnboardingAction` (or equivalent)**  
  - companyName → account name and slug.  
  - userName → profile first/last or full name.  
  - firstVenueName (if any) → one venue name; other venue fields can be defaults or filled later in setup.  
  - Omit or simplify: full address, multiple venues, spaces, event types, team size, catering, plan selection in the initial onboarding; move those to post-onboarding setup or later.

### 2.7 What to remove or defer

- **Remove from initial onboarding**  
  - Single-page long form with all sections visible.  
  - Full venue address, multiple venues, spaces list, event types, team size, catering model, plan selection as required first-step inputs.

- **Keep for later (e.g. /setup or settings)**  
  - Full venue and space details.  
  - Plan selection (can default to “base” and allow upgrade later).  
  - Team size, event types, catering model as optional or post-activation.

### 2.8 Analytics and events

- **Emit from step engine / server**  
  - onboarding_started, step_viewed, step_completed, step_skipped, step_validation_failed, onboarding_completed, handoff_cta_clicked.  
  - Persist in `onboarding_events` (and optionally to an analytics provider later).

---

## 3. Suggested build order

1. **Backend:** Add `onboarding_sessions` and `onboarding_events` (schema + migration); add load/save-step/complete server actions and map completion to account/venue creation.  
2. **Step config:** Define the full step list and branching (showIf, nextStep) in one config (e.g. `lib/onboarding/steps.ts`).  
3. **Shell + routing:** OnboardingShell, hide app nav on onboarding routes, `/onboarding` redirect logic, `/onboarding/[step]` page that resolves step from config.  
4. **Step engine:** Client logic for current step, Back/Next, validate, save step, navigate.  
5. **Step components:** Welcome, text input, single-select cards, review, completion; wire to step config and engine.  
6. **Implement steps 0–9** (welcome through current system + conditionals 8A–8C).  
7. **Implement steps 10A–10C** (activation branches) and review + completion.  
8. **Autosave and resume:** Save after each step; on load, redirect to `currentStepId`.  
9. **Analytics:** Write events to `onboarding_events` (and optional provider).  
10. **Replace entry:** Point new users (no account) to `/onboarding`; remove or deprecate the old single-page form from the main flow.  
11. **QA:** Desktop and mobile, all branches and required/optional validation.

---

## 4. Files to add or touch (summary)

| Area | Add | Modify |
|------|-----|--------|
| DB | `db/schema/onboarding.ts` (sessions, events), migration | `db/schema/index.ts` |
| Config | `lib/onboarding/steps.ts` (step config + types) | — |
| Server | `lib/onboarding/session.ts` (load, save step, complete) | `lib/onboarding/actions.ts` (reuse or call from complete) |
| Routes | `app/onboarding/[step]/page.tsx` | `app/onboarding/page.tsx` (redirect by session) |
| Layout | `app/onboarding/layout.tsx` (no app nav, shell) | — |
| Components | `OnboardingShell`, `ProgressHeader`, `QuestionStep`, `ChoiceCardGroup`, `TextInputStep`, `ReviewStep`, `CompletionStep` | Deprecate or replace usage of current `OnboardingForm` |
| Analytics | Helpers that write to `onboarding_events` | Step engine + completion |

---

## 5. Success criteria (from spec)

- One question visible at a time.  
- Branch logic works (primaryGoal, currentSystem, activationChoice).  
- Progress saved after each step; user can resume.  
- Review and completion screens work; handoff CTA goes to the right place.  
- Key analytics events stored (and optionally surfaced later).  
- No “doctor’s office form”; calm, minimal, premium feel.

This outline is the basis for implementing the conversational onboarding redesign in the existing Next.js app.
