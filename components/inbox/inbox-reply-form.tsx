"use client"

import { useActionState } from "react"
import { createMessage } from "@/lib/collaboration/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type InboxReplyFormProps = {
  accountId: string
  workspaceId: string
  profileId: string
  threadKey: string
}

export function InboxReplyForm({
  accountId,
  workspaceId,
  profileId,
  threadKey,
}: InboxReplyFormProps) {
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      const subject = (formData.get("subject") as string) || null
      const body = (formData.get("body") as string) || ""
      if (!body.trim()) return { ok: false }
      await createMessage({
        accountId,
        workspaceId,
        profileId,
        subject,
        body: body.trim(),
        threadKey,
      })
      return { ok: true }
    },
    null,
  )

  return (
    <form action={formAction} className="space-y-4 border-t border-line pt-6">
      <h4 className="font-medium text-juniper-strong">Reply</h4>
      <Input name="subject" placeholder="Subject (optional)" className="w-full" />
      <textarea
        name="body"
        placeholder="Your message..."
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
