"use client"

import { useActionState } from "react"
import { createMessage } from "@/lib/collaboration/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type CreateMessageFormProps = {
  accountId: string
  workspaceId: string
  profileId: string
}

export function CreateMessageForm({
  accountId,
  workspaceId,
  profileId,
}: CreateMessageFormProps) {
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      const subject = (formData.get("subject") as string) || null
      const body = (formData.get("body") as string) || ""
      if (!body.trim()) return { ok: false }
      await createMessage({
        accountId,
        workspaceId,
        profileId,
        subject: subject?.trim() || null,
        body: body.trim(),
      })
      return { ok: true }
    },
    null,
  )

  return (
    <form action={formAction} className="space-y-4">
      <Input
        name="subject"
        placeholder="Subject (optional)"
        className="w-full"
      />
      <textarea
        name="body"
        placeholder="Message..."
        required
        rows={4}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Button type="submit">Send message</Button>
      {state?.ok ? (
        <p className="text-sm text-muted-foreground">Message sent.</p>
      ) : null}
    </form>
  )
}
