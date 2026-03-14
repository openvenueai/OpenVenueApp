"use client"

import { useActionState } from "react"
import { updateTaskStatus } from "@/lib/collaboration/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type TaskStatusFormProps = {
  taskId: string
  accountId: string
  profileId: string
  currentStatus: string
}

export function TaskStatusForm({
  taskId,
  accountId,
  profileId,
  currentStatus,
}: TaskStatusFormProps) {
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      const status = formData.get("status") as
        | "todo"
        | "in_progress"
        | "completed"
        | "cancelled"
      const tid = formData.get("taskId") as string
      const aid = formData.get("accountId") as string
      const pid = formData.get("profileId") as string
      if (!status || !tid || !aid || !pid) return { ok: false }
      await updateTaskStatus({ taskId: tid, accountId: aid, profileId: pid, status })
      return { ok: true }
    },
    null,
  )

  if (currentStatus === "completed" || currentStatus === "cancelled") {
    return (
      <Badge variant="outline" className="shrink-0">
        {currentStatus}
      </Badge>
    )
  }

  return (
    <form action={formAction} className="flex flex-wrap gap-2">
      <input type="hidden" name="taskId" value={taskId} />
      <input type="hidden" name="accountId" value={accountId} />
      <input type="hidden" name="profileId" value={profileId} />
      <input type="hidden" name="status" value="completed" />
      <Button type="submit" variant="outline" size="sm">
        Mark done
      </Button>
    </form>
  )
}
