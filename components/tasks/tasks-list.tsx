import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { TaskStatusForm } from "@/components/workspace/task-status-form"
import { formatDate } from "@/lib/formatting"
import type { TaskListItem } from "@/lib/tasks/queries"

type TasksListProps = {
  tasks: TaskListItem[]
  accountId: string
  profileId: string
}

export function TasksList({
  tasks,
  accountId,
  profileId,
}: TasksListProps) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-line bg-canvas p-3"
        >
          <div className="min-w-0 flex-1">
            <p
              className={
                task.status === "completed"
                  ? "text-sm font-medium text-muted-foreground line-through"
                  : "text-sm font-medium text-juniper-strong"
              }
            >
              {task.title}
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="font-normal">
                {task.status}
              </Badge>
              <Badge variant="outline" className="font-normal">
                {task.priority}
              </Badge>
              {task.dueAt ? (
                <span>Due {formatDate(task.dueAt)}</span>
              ) : null}
              {task.assignedToName ? (
                <span>→ {task.assignedToName}</span>
              ) : null}
              {task.workspaceId && task.workspaceTitle ? (
                <Link
                  href={`/workspace/${task.workspaceId}?tab=tasks`}
                  className="text-juniper hover:underline"
                >
                  {task.workspaceTitle}
                </Link>
              ) : null}
            </p>
          </div>
          <TaskStatusForm
            taskId={task.id}
            accountId={accountId}
            profileId={profileId}
            currentStatus={task.status}
          />
        </li>
      ))}
    </ul>
  )
}
