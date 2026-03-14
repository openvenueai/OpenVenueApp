"use client"

import { useActionState } from "react"
import { ActionNotice } from "@/components/auth/action-notice"
import { SubmitButton } from "@/components/ui/submit-button"
import { initialCreateLeadActionState } from "@/lib/leads/action-state"
import { createLeadAction } from "@/lib/leads/actions"
import {
  LEAD_EVENT_TYPE_LABELS,
  LEAD_EVENT_TYPE_VALUES,
} from "@/lib/leads/constants"
import {
  fieldErrorClassName,
  helperTextClassName,
  inputClassName,
  labelClassName,
  textareaClassName,
} from "@/lib/form-styles"

type VenueOption = {
  id: string
  name: string
}

type CreateLeadFormProps = {
  venues: VenueOption[]
  defaultVenueId?: string
}

function getFieldError(
  fieldErrors: Record<string, string[] | undefined> | undefined,
  path: string,
) {
  return fieldErrors?.[path]?.[0]
}

export function CreateLeadForm({
  venues,
  defaultVenueId,
}: CreateLeadFormProps) {
  const [state, formAction] = useActionState(
    createLeadAction,
    initialCreateLeadActionState,
  )
  const hasVenues = venues.length > 0

  return (
    <form action={formAction} className="space-y-4">
      <ActionNotice message={state.message} status={state.status} />

      <div className="space-y-2">
        <label className={labelClassName} htmlFor="lead-full-name">
          Lead name
        </label>
        <input
          className={inputClassName}
          id="lead-full-name"
          name="fullName"
          placeholder="Jordan Avery"
          type="text"
        />
        {getFieldError(state.fieldErrors, "fullName") ? (
          <p className={fieldErrorClassName}>
            {getFieldError(state.fieldErrors, "fullName")}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="lead-email">
            Email
          </label>
          <input
            className={inputClassName}
            id="lead-email"
            name="email"
            placeholder="jordan@example.com"
            type="email"
          />
          {getFieldError(state.fieldErrors, "email") ? (
            <p className={fieldErrorClassName}>
              {getFieldError(state.fieldErrors, "email")}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className={labelClassName} htmlFor="lead-phone">
            Phone
          </label>
          <input
            className={inputClassName}
            id="lead-phone"
            name="phone"
            placeholder="(555) 555-0187"
            type="tel"
          />
          {getFieldError(state.fieldErrors, "phone") ? (
            <p className={fieldErrorClassName}>
              {getFieldError(state.fieldErrors, "phone")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClassName} htmlFor="lead-company-name">
          Company or planner
        </label>
        <input
          className={inputClassName}
          id="lead-company-name"
          name="companyName"
          placeholder="Avery Events"
          type="text"
        />
        {getFieldError(state.fieldErrors, "companyName") ? (
          <p className={fieldErrorClassName}>
            {getFieldError(state.fieldErrors, "companyName")}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="lead-venue">
            Venue
          </label>
          <select
            className={inputClassName}
            defaultValue={defaultVenueId ?? ""}
            disabled={!hasVenues}
            id="lead-venue"
            name="venueId"
          >
            {hasVenues ? null : <option value="">No venues available</option>}
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
          {getFieldError(state.fieldErrors, "venueId") ? (
            <p className={fieldErrorClassName}>
              {getFieldError(state.fieldErrors, "venueId")}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className={labelClassName} htmlFor="lead-event-type">
            Event type
          </label>
          <select
            className={inputClassName}
            defaultValue="wedding"
            id="lead-event-type"
            name="eventType"
          >
            {LEAD_EVENT_TYPE_VALUES.map((value) => (
              <option key={value} value={value}>
                {LEAD_EVENT_TYPE_LABELS[value]}
              </option>
            ))}
          </select>
          {getFieldError(state.fieldErrors, "eventType") ? (
            <p className={fieldErrorClassName}>
              {getFieldError(state.fieldErrors, "eventType")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2 sm:col-span-2">
          <label className={labelClassName} htmlFor="lead-source">
            Lead source
          </label>
          <input
            className={inputClassName}
            defaultValue="manual"
            id="lead-source"
            name="source"
            placeholder="Website form, planner referral, Instagram..."
            type="text"
          />
          <p className={helperTextClassName}>
            This becomes the first source value on the lead and workspace.
          </p>
          {getFieldError(state.fieldErrors, "source") ? (
            <p className={fieldErrorClassName}>
              {getFieldError(state.fieldErrors, "source")}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className={labelClassName} htmlFor="lead-guest-count">
            Guests
          </label>
          <input
            className={inputClassName}
            id="lead-guest-count"
            min={1}
            name="guestCount"
            placeholder="150"
            type="number"
          />
          {getFieldError(state.fieldErrors, "guestCount") ? (
            <p className={fieldErrorClassName}>
              {getFieldError(state.fieldErrors, "guestCount")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClassName} htmlFor="lead-preferred-date">
          Preferred date
        </label>
        <input
          className={inputClassName}
          id="lead-preferred-date"
          name="preferredDate"
          type="date"
        />
        {getFieldError(state.fieldErrors, "preferredDate") ? (
          <p className={fieldErrorClassName}>
            {getFieldError(state.fieldErrors, "preferredDate")}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className={labelClassName} htmlFor="lead-notes">
          Initial notes
        </label>
        <textarea
          className={textareaClassName}
          id="lead-notes"
          name="notes"
          placeholder="Inquiry summary, budget clues, planner context, or requested dates."
        />
        <p className={helperTextClassName}>
          We use this as the first lead note and workspace summary.
        </p>
        {getFieldError(state.fieldErrors, "notes") ? (
          <p className={fieldErrorClassName}>
            {getFieldError(state.fieldErrors, "notes")}
          </p>
        ) : null}
      </div>

      <SubmitButton
        className="w-full rounded-full"
        pendingLabel="Creating lead and workspace..."
      >
        Create lead
      </SubmitButton>
    </form>
  )
}
