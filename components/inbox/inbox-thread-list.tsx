import Link from "next/link"
import { formatDate } from "@/lib/formatting"
import type { InboxThread } from "@/lib/inbox/queries"
import { cn } from "@/lib/utils"

type InboxThreadListProps = {
  threads: InboxThread[]
  selectedWorkspaceId: string | null
  selectedThreadKey: string
}

export function InboxThreadList({
  threads,
  selectedWorkspaceId,
  selectedThreadKey,
}: InboxThreadListProps) {
  return (
    <ul className="space-y-1">
      {threads.map((thread) => {
        const isSelected =
          selectedWorkspaceId === thread.workspaceId &&
          selectedThreadKey === thread.threadKey
        return (
          <li key={`${thread.workspaceId}:${thread.threadKey}`}>
            <Link
              href={`/inbox?workspaceId=${encodeURIComponent(thread.workspaceId)}&threadKey=${encodeURIComponent(thread.threadKey)}`}
              className={cn(
                "block rounded-lg border px-3 py-3 transition",
                isSelected
                  ? "border-juniper bg-moss/10"
                  : "border-line bg-canvas hover:border-juniper/30",
              )}
            >
              <p className="font-medium text-juniper-strong">
                {thread.workspaceTitle}
              </p>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {thread.preview || "No preview"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatDate(thread.lastMessageAt)} · {thread.messageCount} message
                {thread.messageCount === 1 ? "" : "s"}
              </p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
