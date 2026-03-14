"use client"

import { useActionState } from "react"
import { createTask } from "@/lib/collaboration/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type CreateTaskFormStandaloneProps = {
  accountId: string
  profileId: string
  workspaceOptions: { id: string; title: string }[]
}

export function CreateTaskFormStandalone({
  accountId,
  profileId,
  workspaceOptions,
}: CreateTaskFormStandaloneProps) {
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      const title = (formData.get("title") as string)?.trim()
      const description = (formData.get("description") as string)?.trim() || null
      const dueStr = formData.get("dueAt") as string
      const dueAt = dueStr ? new Date(dueStr) : null
      const workspaceId = (formData.get("workspaceId") as string) || null
      if (!title) return { ok: false }
      await createTask({
        accountId,
        workspaceId: workspaceId || null,
        profileId,
        assignedToProfileId: profileId,
        title,
        description,
        dueAt,
      })
      return { ok: true }
    },
    null,
  )

  return (
    <form action={formAction} className="space-y-4">
      <Input name="title" placeholder="Task title" required className="w-full" />
      <textarea
        name="description"
        placeholder="Description (optional)"
        rows={2}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Input name="dueAt" type="date" className="w-full" />
      {workspaceOptions.length > 0 ? (
        <select
          name="workspaceId"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">No workspace</option>
          {workspaceOptions.map((w) => (
            <option key={w.id} value={w.id}>
              {w.title}
            </option>
          ))}
        </select>
      ) : null}
      <Button type="submit">Add task</Button>
      {state?.ok ? (
        <p className="text-sm text-muted-foreground">Task added.</p>
      ) : null}
    </form>
  )
}
