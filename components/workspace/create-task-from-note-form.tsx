"use client"

import { useState } from "react"
import { useActionState } from "react"
import { createTaskFromNote } from "@/lib/collaboration/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type CreateTaskFromNoteFormProps = {
  accountId: string
  workspaceId: string
  profileId: string
  noteId: string
  defaultTitle: string
}

export function CreateTaskFromNoteForm({
  accountId,
  workspaceId,
  profileId,
  noteId,
  defaultTitle,
}: CreateTaskFromNoteFormProps) {
  const [open, setOpen] = useState(false)
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      const title = (formData.get("title") as string)?.trim() || defaultTitle
      await createTaskFromNote({
        accountId,
        workspaceId,
        profileId,
        noteId,
        title,
      })
      setOpen(false)
      return { ok: true }
    },
    null,
  )

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-medium text-juniper hover:underline"
      >
        Create task from this note
      </button>
    )
  }

  return (
    <form action={formAction} className="mt-3 flex gap-2">
      <Input
        name="title"
        placeholder="Task title"
        defaultValue={defaultTitle.slice(0, 100)}
        className="flex-1 text-sm"
      />
      <Button type="submit" size="sm">
        Create task
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
    </form>
  )
}
