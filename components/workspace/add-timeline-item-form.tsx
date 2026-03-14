"use client"

import { useActionState } from "react"
import { createTimeline, addTimelineItem } from "@/lib/timeline/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type AddTimelineItemFormProps = {
  workspaceId: string
  accountId: string
  profileId: string
  timelineId: string | null
}

export function AddTimelineItemForm({
  workspaceId,
  accountId,
  profileId,
  timelineId,
}: AddTimelineItemFormProps) {
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      const title = (formData.get("title") as string)?.trim()
      const startStr = formData.get("startAt") as string
      const endStr = formData.get("endAt") as string
      const location = (formData.get("location") as string)?.trim() || null
      if (!title) return { ok: false }
      let tid = timelineId
      if (!tid) {
        tid = await createTimeline({
          accountId,
          workspaceId,
          profileId,
          title: "Day-of timeline",
        })
      }
      if (tid) {
        await addTimelineItem({
          accountId,
          timelineId: tid,
          profileId,
          title,
          startAt: startStr ? new Date(startStr) : null,
          endAt: endStr ? new Date(endStr) : null,
          location,
        })
      }
      return { ok: true }
    },
    null,
  )

  return (
    <form action={formAction} className="space-y-4">
      <Input name="title" placeholder="Item title" required />
      <Input name="startAt" type="datetime-local" />
      <Input name="endAt" type="datetime-local" />
      <Input name="location" placeholder="Location" />
      <Button type="submit">
        {timelineId ? "Add item" : "Create timeline & add item"}
      </Button>
      {state?.ok ? (
        <p className="text-sm text-muted-foreground">Added.</p>
      ) : null}
    </form>
  )
}
