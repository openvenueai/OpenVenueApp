"use client"

import { useActionState, useState } from "react"
import { ActionNotice } from "@/components/auth/action-notice"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/ui/submit-button"
import {
  CATERING_MODEL_VALUES,
  EVENT_TYPE_VALUES,
  SPACE_TYPE_VALUES,
  TEAM_SIZE_VALUES,
  VENUE_TYPE_VALUES,
} from "@/lib/auth/schemas"
import type { OnboardingInput } from "@/lib/auth/schemas"
import { initialOnboardingActionState } from "@/lib/onboarding/action-state"
import { startOnboardingAction } from "@/lib/onboarding/actions"
import {
  getEligiblePlans,
  getRecommendedPlan,
  type PlanTierOption,
} from "@/lib/onboarding/plans"
import {
  fieldErrorClassName,
  helperTextClassName,
  inputClassName,
  labelClassName,
  textareaClassName,
} from "@/lib/form-styles"
import { cn } from "@/lib/utils"

type VenueTypeValue = (typeof VENUE_TYPE_VALUES)[number]
type CateringModelValue = (typeof CATERING_MODEL_VALUES)[number]
type TeamSizeValue = (typeof TEAM_SIZE_VALUES)[number]
type EventTypeValue = (typeof EVENT_TYPE_VALUES)[number]
type SpaceTypeValue = (typeof SPACE_TYPE_VALUES)[number]

const venueTypeOptions: Array<{ value: VenueTypeValue; label: string }> = [
  { value: "wedding_venue", label: "Wedding venue" },
  { value: "restaurant_private_events", label: "Restaurant private events" },
  { value: "hotel_resort", label: "Hotel or resort" },
  { value: "winery_brewery_distillery", label: "Winery, brewery, or distillery" },
  { value: "barn_farm", label: "Barn or farm" },
  { value: "loft_industrial", label: "Loft or industrial" },
  { value: "garden_outdoor", label: "Garden or outdoor venue" },
  { value: "corporate_event_center", label: "Corporate event center" },
  { value: "other", label: "Other" },
]

const cateringModelOptions: Array<{
  value: CateringModelValue
  label: string
}> = [
  { value: "in_house", label: "In-house catering" },
  { value: "preferred_partners", label: "Preferred partners" },
  { value: "outside_allowed", label: "Outside catering allowed" },
  { value: "outside_not_allowed", label: "Outside catering not allowed" },
]

const teamSizeOptions: Array<{ value: TeamSizeValue; label: string }> = [
  { value: "just_me", label: "Just me" },
  { value: "2_5", label: "2-5 people" },
  { value: "6_15", label: "6-15 people" },
  { value: "16_plus", label: "16+ people" },
]

const eventTypeOptions: Array<{ value: EventTypeValue; label: string }> = [
  { value: "weddings", label: "Weddings" },
  { value: "corporate_events", label: "Corporate events" },
  { value: "social_events", label: "Social events" },
  { value: "nonprofit_fundraising", label: "Nonprofit fundraising" },
  { value: "private_dining", label: "Private dining" },
  { value: "holiday_parties", label: "Holiday parties" },
  { value: "other", label: "Other" },
]

const spaceTypeOptions: Array<{ value: SpaceTypeValue; label: string }> = [
  { value: "ballroom", label: "Ballroom" },
  { value: "garden", label: "Garden" },
  { value: "patio", label: "Patio" },
  { value: "rooftop", label: "Rooftop" },
  { value: "dining_room", label: "Dining room" },
  { value: "private_room", label: "Private room" },
  { value: "ceremony_space", label: "Ceremony space" },
  { value: "reception_space", label: "Reception space" },
  { value: "other", label: "Other" },
]

const sectionClassName =
  "rounded-[28px] border border-line bg-surface px-5 py-5 shadow-[0_18px_50px_rgba(28,43,38,0.05)] sm:px-6"

function createSpace() {
  return {
    name: "",
    spaceType: "ballroom" as SpaceTypeValue,
    seatedCapacity: 150,
    cocktailCapacity: 220,
    notes: "",
  }
}

function createVenue() {
  return {
    name: "",
    addressLine1: "",
    city: "",
    stateRegion: "",
    postalCode: "",
    country: "United States",
    spaces: [createSpace()],
  }
}

function createInitialState(timezone: string): OnboardingInput {
  return {
    companyName: "",
    businessName: "",
    businessPhone: "",
    websiteUrl: "",
    country: "United States",
    timezone,
    currencyCode: "USD",
    venueCountChoice: "one",
    venues: [createVenue()],
    cateringModel: "in_house",
    venueType: "wedding_venue",
    eventTypes: ["weddings"],
    teamSize: "2_5",
    migratingFromCrm: false,
    currentCrm: "",
    planTier: "base",
  }
}

function getFieldError(
  fieldErrors: Record<string, string[] | undefined> | undefined,
  path: string,
) {
  return fieldErrors?.[path]?.[0]
}

type OnboardingFormProps = {
  userEmail?: string | null
}

export function OnboardingForm({ userEmail }: OnboardingFormProps) {
  const browserTimezone =
    typeof window === "undefined"
      ? "America/New_York"
      : Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York"

  const [form, setForm] = useState<OnboardingInput>(() =>
    createInitialState(browserTimezone),
  )
  const [state, formAction] = useActionState(
    startOnboardingAction,
    initialOnboardingActionState,
  )

  const eligiblePlans = getEligiblePlans(form.venues.length)
  const recommendedPlan = getRecommendedPlan(form.venues.length)

  function updateForm<Key extends keyof OnboardingInput>(
    key: Key,
    value: OnboardingInput[Key],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function updateVenue(
    venueIndex: number,
    key: keyof OnboardingInput["venues"][number],
    value: string | OnboardingInput["venues"][number]["spaces"],
  ) {
    setForm((current) => ({
      ...current,
      venues: current.venues.map((venue, index) =>
        index === venueIndex ? { ...venue, [key]: value } : venue,
      ),
    }))
  }

  function updateSpace(
    venueIndex: number,
    spaceIndex: number,
    key: keyof OnboardingInput["venues"][number]["spaces"][number],
    value: string | number,
  ) {
    setForm((current) => ({
      ...current,
      venues: current.venues.map((venue, currentVenueIndex) =>
        currentVenueIndex === venueIndex
          ? {
              ...venue,
              spaces: venue.spaces.map((space, currentSpaceIndex) =>
                currentSpaceIndex === spaceIndex
                  ? { ...space, [key]: value }
                  : space,
              ),
            }
          : venue,
      ),
    }))
  }

  function addVenue() {
    setForm((current) => {
      const nextVenues = [...current.venues, createVenue()]

      return {
        ...current,
        venueCountChoice: "multiple",
        planTier:
          current.planTier === "base" ? getRecommendedPlan(nextVenues.length) : current.planTier,
        venues: nextVenues,
      }
    })
  }

  function removeVenue(venueIndex: number) {
    setForm((current) => {
      const nextVenues = current.venues.filter((_, index) => index !== venueIndex)
      const nextChoice = nextVenues.length <= 1 ? "one" : current.venueCountChoice
      const venueCount = Math.max(nextVenues.length, 1)

      return {
        ...current,
        venueCountChoice: nextChoice,
        venues: nextVenues.length > 0 ? nextVenues : [createVenue()],
        planTier:
          venueCount > 1 && current.planTier === "base"
            ? getRecommendedPlan(venueCount)
            : current.planTier,
      }
    })
  }

  function addSpace(venueIndex: number) {
    setForm((current) => ({
      ...current,
      venues: current.venues.map((venue, index) =>
        index === venueIndex
          ? { ...venue, spaces: [...venue.spaces, createSpace()] }
          : venue,
      ),
    }))
  }

  function removeSpace(venueIndex: number, spaceIndex: number) {
    setForm((current) => ({
      ...current,
      venues: current.venues.map((venue, index) =>
        index === venueIndex
          ? {
              ...venue,
              spaces:
                venue.spaces.length > 1
                  ? venue.spaces.filter((_, currentSpaceIndex) => currentSpaceIndex !== spaceIndex)
                  : venue.spaces,
            }
          : venue,
      ),
    }))
  }

  function toggleEventType(value: EventTypeValue) {
    setForm((current) => {
      const exists = current.eventTypes.includes(value)

      return {
        ...current,
        eventTypes: exists
          ? current.eventTypes.filter((eventType) => eventType !== value)
          : [...current.eventTypes, value],
      }
    })
  }

  function setVenueCountChoice(value: "one" | "multiple") {
    setForm((current) => {
      const nextVenues =
        value === "one"
          ? current.venues.slice(0, 1)
          : current.venues.length >= 2
            ? current.venues
            : [...current.venues, createVenue()]

      return {
        ...current,
        venueCountChoice: value,
        venues: nextVenues,
        planTier:
          value === "multiple" && current.planTier === "base"
            ? getRecommendedPlan(nextVenues.length)
            : current.planTier,
      }
    })
  }

  return (
    <form action={formAction} className="space-y-6">
      <input name="payload" type="hidden" value={JSON.stringify(form)} />

      <div className="grid gap-3 rounded-[28px] border border-line bg-[linear-gradient(180deg,rgba(70,87,79,0.95),rgba(48,64,57,0.98))] px-5 py-5 text-white shadow-[0_22px_70px_rgba(28,43,38,0.12)] sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/64">
              Phase 3 onboarding
            </p>
            <h2 className="font-display text-4xl tracking-tight">
              Set up your first account and venue.
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-white/76 sm:text-base">
              This creates the shared account, memberships, venues, and setup
              checklist that everything else in OpenVenue will build on.
            </p>
          </div>

          {userEmail ? (
            <div className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white/80">
              Signed in as {userEmail}
            </div>
          ) : null}
        </div>
      </div>

      <ActionNotice message={state.message} status={state.status} />

      <section className={sectionClassName}>
        <div className="mb-5 space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-juniper">
            Business profile
          </p>
          <h3 className="font-display text-3xl text-juniper-strong">
            Define the operating account.
          </h3>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <label className={labelClassName} htmlFor="company-name">
              Company name
            </label>
            <input
              className={inputClassName}
              id="company-name"
              onChange={(event) => updateForm("companyName", event.target.value)}
              placeholder="OpenVenue Hospitality Group"
              type="text"
              value={form.companyName}
            />
            {getFieldError(state.fieldErrors, "companyName") ? (
              <p className={fieldErrorClassName}>
                {getFieldError(state.fieldErrors, "companyName")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className={labelClassName} htmlFor="business-name">
              Primary business name
            </label>
            <input
              className={inputClassName}
              id="business-name"
              onChange={(event) => updateForm("businessName", event.target.value)}
              placeholder="OpenVenue Events"
              type="text"
              value={form.businessName}
            />
            {getFieldError(state.fieldErrors, "businessName") ? (
              <p className={fieldErrorClassName}>
                {getFieldError(state.fieldErrors, "businessName")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className={labelClassName} htmlFor="business-phone">
              Business phone
            </label>
            <input
              className={inputClassName}
              id="business-phone"
              onChange={(event) => updateForm("businessPhone", event.target.value)}
              placeholder="(555) 555-0187"
              type="tel"
              value={form.businessPhone}
            />
            {getFieldError(state.fieldErrors, "businessPhone") ? (
              <p className={fieldErrorClassName}>
                {getFieldError(state.fieldErrors, "businessPhone")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className={labelClassName} htmlFor="website-url">
              Website
            </label>
            <input
              className={inputClassName}
              id="website-url"
              onChange={(event) => updateForm("websiteUrl", event.target.value)}
              placeholder="https://www.yourvenue.com"
              type="url"
              value={form.websiteUrl}
            />
          </div>

          <div className="space-y-2">
            <label className={labelClassName} htmlFor="account-country">
              Country
            </label>
            <input
              className={inputClassName}
              id="account-country"
              onChange={(event) => updateForm("country", event.target.value)}
              type="text"
              value={form.country}
            />
            {getFieldError(state.fieldErrors, "country") ? (
              <p className={fieldErrorClassName}>
                {getFieldError(state.fieldErrors, "country")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className={labelClassName} htmlFor="timezone">
              Timezone
            </label>
            <input
              className={inputClassName}
              id="timezone"
              onChange={(event) => updateForm("timezone", event.target.value)}
              type="text"
              value={form.timezone}
            />
            {getFieldError(state.fieldErrors, "timezone") ? (
              <p className={fieldErrorClassName}>
                {getFieldError(state.fieldErrors, "timezone")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className={labelClassName} htmlFor="currency-code">
              Currency
            </label>
            <select
              className={inputClassName}
              id="currency-code"
              onChange={(event) => updateForm("currencyCode", event.target.value)}
              value={form.currencyCode}
            >
              <option value="USD">USD</option>
              <option value="CAD">CAD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="AUD">AUD</option>
            </select>
            {getFieldError(state.fieldErrors, "currencyCode") ? (
              <p className={fieldErrorClassName}>
                {getFieldError(state.fieldErrors, "currencyCode")}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className={sectionClassName}>
        <div className="mb-5 space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-juniper">
            Operating model
          </p>
          <h3 className="font-display text-3xl text-juniper-strong">
            Capture venue context.
          </h3>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className={labelClassName}>Venue count</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { value: "one" as const, label: "One venue" },
                { value: "multiple" as const, label: "Multiple venues" },
              ].map((option) => (
                <button
                  key={option.value}
                  className={cn(
                    "rounded-3xl border px-4 py-4 text-left transition",
                    form.venueCountChoice === option.value
                      ? "border-juniper bg-juniper text-white"
                      : "border-line bg-canvas text-juniper-strong hover:border-juniper/30",
                  )}
                  onClick={() => setVenueCountChoice(option.value)}
                  type="button"
                >
                  <p className="text-sm font-semibold">{option.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClassName} htmlFor="venue-type">
              Venue type
            </label>
            <select
              className={inputClassName}
              id="venue-type"
              onChange={(event) =>
                updateForm("venueType", event.target.value as VenueTypeValue)
              }
              value={form.venueType}
            >
              {venueTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className={labelClassName} htmlFor="catering-model">
              Catering model
            </label>
            <select
              className={inputClassName}
              id="catering-model"
              onChange={(event) =>
                updateForm(
                  "cateringModel",
                  event.target.value as CateringModelValue,
                )
              }
              value={form.cateringModel}
            >
              {cateringModelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className={labelClassName} htmlFor="team-size">
              Team size
            </label>
            <select
              className={inputClassName}
              id="team-size"
              onChange={(event) =>
                updateForm("teamSize", event.target.value as TeamSizeValue)
              }
              value={form.teamSize}
            >
              {teamSizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <label className={labelClassName}>Primary event types</label>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {eventTypeOptions.map((option) => {
              const selected = form.eventTypes.includes(option.value)

              return (
                <button
                  key={option.value}
                  className={cn(
                    "rounded-3xl border px-4 py-4 text-left transition",
                    selected
                      ? "border-juniper bg-juniper text-white"
                      : "border-line bg-canvas text-juniper-strong hover:border-juniper/30",
                  )}
                  onClick={() => toggleEventType(option.value)}
                  type="button"
                >
                  <p className="text-sm font-semibold">{option.label}</p>
                </button>
              )
            })}
          </div>
          {getFieldError(state.fieldErrors, "eventTypes") ? (
            <p className={fieldErrorClassName}>
              {getFieldError(state.fieldErrors, "eventTypes")}
            </p>
          ) : null}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-3">
            <label className={labelClassName}>Migrating from another CRM?</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "No", value: false },
                { label: "Yes", value: true },
              ].map((option) => (
                <button
                  key={option.label}
                  className={cn(
                    "rounded-3xl border px-4 py-4 text-left transition",
                    form.migratingFromCrm === option.value
                      ? "border-juniper bg-juniper text-white"
                      : "border-line bg-canvas text-juniper-strong hover:border-juniper/30",
                  )}
                  onClick={() => {
                    updateForm("migratingFromCrm", option.value)
                    if (!option.value) {
                      updateForm("currentCrm", "")
                    }
                  }}
                  type="button"
                >
                  <p className="text-sm font-semibold">{option.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClassName} htmlFor="current-crm">
              Current CRM
            </label>
            <input
              className={inputClassName}
              disabled={!form.migratingFromCrm}
              id="current-crm"
              onChange={(event) => updateForm("currentCrm", event.target.value)}
              placeholder="HoneyBook, Tripleseat, Salesforce..."
              type="text"
              value={form.currentCrm}
            />
            <p className={helperTextClassName}>
              This helps us prepare import and migration touchpoints later.
            </p>
            {getFieldError(state.fieldErrors, "currentCrm") ? (
              <p className={fieldErrorClassName}>
                {getFieldError(state.fieldErrors, "currentCrm")}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className={sectionClassName}>
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-juniper">
              Venues and spaces
            </p>
            <h3 className="font-display text-3xl text-juniper-strong">
              Add the physical footprint.
            </h3>
          </div>

          {form.venueCountChoice === "multiple" ? (
            <Button
              className="rounded-full"
              onClick={addVenue}
              size="lg"
              type="button"
              variant="outline"
            >
              Add venue
            </Button>
          ) : null}
        </div>

        {getFieldError(state.fieldErrors, "venues") ? (
          <p className={`${fieldErrorClassName} mb-4`}>
            {getFieldError(state.fieldErrors, "venues")}
          </p>
        ) : null}

        <div className="space-y-5">
          {form.venues.map((venue, venueIndex) => (
            <article
              key={`venue-${venueIndex}`}
              className="rounded-[28px] border border-line bg-canvas px-4 py-4 sm:px-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-juniper">
                    Venue {venueIndex + 1}
                  </p>
                  <p className="mt-1 text-sm text-juniper">
                    Use one venue card per physical property you manage.
                  </p>
                </div>

                {form.venueCountChoice === "multiple" && form.venues.length > 2 ? (
                  <Button
                    className="rounded-full"
                    onClick={() => removeVenue(venueIndex)}
                    size="sm"
                    type="button"
                    variant="ghost"
                  >
                    Remove venue
                  </Button>
                ) : null}
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <label className={labelClassName}>Venue name</label>
                  <input
                    className={inputClassName}
                    onChange={(event) =>
                      updateVenue(venueIndex, "name", event.target.value)
                    }
                    placeholder="The Foundry at Willow Creek"
                    type="text"
                    value={venue.name}
                  />
                  {getFieldError(state.fieldErrors, `venues.${venueIndex}.name`) ? (
                    <p className={fieldErrorClassName}>
                      {getFieldError(state.fieldErrors, `venues.${venueIndex}.name`)}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label className={labelClassName}>Street address</label>
                  <input
                    className={inputClassName}
                    onChange={(event) =>
                      updateVenue(venueIndex, "addressLine1", event.target.value)
                    }
                    placeholder="100 Meadow Lane"
                    type="text"
                    value={venue.addressLine1}
                  />
                  {getFieldError(state.fieldErrors, `venues.${venueIndex}.addressLine1`) ? (
                    <p className={fieldErrorClassName}>
                      {getFieldError(state.fieldErrors, `venues.${venueIndex}.addressLine1`)}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label className={labelClassName}>City</label>
                  <input
                    className={inputClassName}
                    onChange={(event) =>
                      updateVenue(venueIndex, "city", event.target.value)
                    }
                    type="text"
                    value={venue.city}
                  />
                  {getFieldError(state.fieldErrors, `venues.${venueIndex}.city`) ? (
                    <p className={fieldErrorClassName}>
                      {getFieldError(state.fieldErrors, `venues.${venueIndex}.city`)}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2 sm:col-span-1">
                    <label className={labelClassName}>State / region</label>
                    <input
                      className={inputClassName}
                      onChange={(event) =>
                        updateVenue(venueIndex, "stateRegion", event.target.value)
                      }
                      type="text"
                      value={venue.stateRegion}
                    />
                    {getFieldError(state.fieldErrors, `venues.${venueIndex}.stateRegion`) ? (
                      <p className={fieldErrorClassName}>
                        {getFieldError(state.fieldErrors, `venues.${venueIndex}.stateRegion`)}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2 sm:col-span-1">
                    <label className={labelClassName}>Postal code</label>
                    <input
                      className={inputClassName}
                      onChange={(event) =>
                        updateVenue(venueIndex, "postalCode", event.target.value)
                      }
                      type="text"
                      value={venue.postalCode}
                    />
                    {getFieldError(state.fieldErrors, `venues.${venueIndex}.postalCode`) ? (
                      <p className={fieldErrorClassName}>
                        {getFieldError(state.fieldErrors, `venues.${venueIndex}.postalCode`)}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2 sm:col-span-1">
                    <label className={labelClassName}>Country</label>
                    <input
                      className={inputClassName}
                      onChange={(event) =>
                        updateVenue(venueIndex, "country", event.target.value)
                      }
                      type="text"
                      value={venue.country}
                    />
                    {getFieldError(state.fieldErrors, `venues.${venueIndex}.country`) ? (
                      <p className={fieldErrorClassName}>
                        {getFieldError(state.fieldErrors, `venues.${venueIndex}.country`)}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-juniper">
                      Spaces
                    </p>
                    <p className="mt-1 text-sm text-juniper">
                      These become the first selectable venue spaces for leads
                      and event workspaces.
                    </p>
                  </div>

                  <Button
                    className="rounded-full"
                    onClick={() => addSpace(venueIndex)}
                    size="sm"
                    type="button"
                    variant="outline"
                  >
                    Add space
                  </Button>
                </div>

                {venue.spaces.map((space, spaceIndex) => (
                  <div
                    key={`space-${venueIndex}-${spaceIndex}`}
                    className="rounded-[24px] border border-line bg-white/75 px-4 py-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-juniper-strong">
                        Space {spaceIndex + 1}
                      </p>

                      {venue.spaces.length > 1 ? (
                        <Button
                          className="rounded-full"
                          onClick={() => removeSpace(venueIndex, spaceIndex)}
                          size="sm"
                          type="button"
                          variant="ghost"
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.8fr_0.6fr_0.6fr]">
                      <div className="space-y-2">
                        <label className={labelClassName}>Space name</label>
                        <input
                          className={inputClassName}
                          onChange={(event) =>
                            updateSpace(venueIndex, spaceIndex, "name", event.target.value)
                          }
                          placeholder="Grand Ballroom"
                          type="text"
                          value={space.name}
                        />
                        {getFieldError(state.fieldErrors, `venues.${venueIndex}.spaces.${spaceIndex}.name`) ? (
                          <p className={fieldErrorClassName}>
                            {getFieldError(
                              state.fieldErrors,
                              `venues.${venueIndex}.spaces.${spaceIndex}.name`,
                            )}
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <label className={labelClassName}>Type</label>
                        <select
                          className={inputClassName}
                          onChange={(event) =>
                            updateSpace(
                              venueIndex,
                              spaceIndex,
                              "spaceType",
                              event.target.value as SpaceTypeValue,
                            )
                          }
                          value={space.spaceType}
                        >
                          {spaceTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClassName}>Seated</label>
                        <input
                          className={inputClassName}
                          min={0}
                          onChange={(event) =>
                            updateSpace(
                              venueIndex,
                              spaceIndex,
                              "seatedCapacity",
                              Number(event.target.value),
                            )
                          }
                          type="number"
                          value={space.seatedCapacity}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={labelClassName}>Cocktail</label>
                        <input
                          className={inputClassName}
                          min={0}
                          onChange={(event) =>
                            updateSpace(
                              venueIndex,
                              spaceIndex,
                              "cocktailCapacity",
                              Number(event.target.value),
                            )
                          }
                          type="number"
                          value={space.cocktailCapacity}
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <label className={labelClassName}>Notes</label>
                      <textarea
                        className={textareaClassName}
                        onChange={(event) =>
                          updateSpace(venueIndex, spaceIndex, "notes", event.target.value)
                        }
                        placeholder="Ceremony reveal doors, preferred floor plan, AV notes..."
                        value={space.notes ?? ""}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClassName}>
        <div className="mb-5 space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-juniper">
            Plan selection
          </p>
          <h3 className="font-display text-3xl text-juniper-strong">
            Choose the starting tier.
          </h3>
          <p className={helperTextClassName}>
            We can change this later, but using the right tier now keeps setup
            aligned with your venue footprint.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {eligiblePlans.map((plan) => {
            const selected = form.planTier === plan.id

            return (
              <button
                key={plan.id}
                className={cn(
                  "rounded-[28px] border px-5 py-5 text-left transition",
                  selected
                    ? "border-juniper bg-juniper text-white shadow-[0_20px_50px_rgba(48,64,57,0.16)]"
                    : "border-line bg-canvas text-juniper-strong hover:border-juniper/35",
                  !plan.eligible && "cursor-not-allowed opacity-55",
                )}
                disabled={!plan.eligible}
                onClick={() => updateForm("planTier", plan.id as PlanTierOption)}
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                      {plan.name}
                    </p>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-7",
                        selected ? "text-white/74" : "text-juniper",
                      )}
                    >
                      {plan.description}
                    </p>
                  </div>

                  {recommendedPlan === plan.id ? (
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                        selected
                          ? "bg-white/12 text-white/82"
                          : "bg-warm-gold/12 text-warm-gold",
                      )}
                    >
                      Recommended
                    </span>
                  ) : null}
                </div>

                <p
                  className={cn(
                    "mt-4 text-xs uppercase tracking-[0.18em]",
                    selected ? "text-white/60" : "text-juniper",
                  )}
                >
                  {plan.venues}
                </p>

                <div className="mt-4 space-y-2">
                  {plan.highlights.map((highlight) => (
                    <p
                      key={highlight}
                      className={cn(
                        "text-sm leading-7",
                        selected ? "text-white/82" : "text-juniper-strong",
                      )}
                    >
                      {highlight}
                    </p>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
        {getFieldError(state.fieldErrors, "planTier") ? (
          <p className={`${fieldErrorClassName} mt-4`}>
            {getFieldError(state.fieldErrors, "planTier")}
          </p>
        ) : null}
      </section>

      <div className="sticky bottom-4 z-10 rounded-[28px] border border-line bg-surface/96 px-5 py-4 shadow-[0_18px_60px_rgba(28,43,38,0.08)] backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-juniper-strong">
              Ready to create your OpenVenue account?
            </p>
            <p className="text-sm leading-6 text-juniper">
              This will create your account, primary membership, venues, and
              initial setup checklist.
            </p>
          </div>

          <SubmitButton className="rounded-full px-6" pendingLabel="Creating account setup...">
            Finish setup
          </SubmitButton>
        </div>
      </div>
    </form>
  )
}
