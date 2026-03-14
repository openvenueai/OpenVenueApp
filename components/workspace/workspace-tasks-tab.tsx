import { CreateTaskForm } from "@/components/workspace/create-task-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/formatting"
import { updateTaskStatus } from "@/lib/collaboration/actions"
import { TaskStatusForm } from "@/components/workspace/task-status-form"

type TaskRow = {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  dueAt: Date | null
  completedAt: Date | null
  assignedToName: string | null
}

type WorkspaceTasksTabProps = {
  workspaceId: string
  accountId: string
  profileId: string
  tasks: TaskRow[]
}

export function WorkspaceTasksTab({
  workspaceId,
  accountId,
  profileId,
  tasks,
}: WorkspaceTasksTabProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No tasks yet. Add a task to track follow-ups and to-dos.
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-line bg-canvas p-4"
                >
                  <div>
                    <p
                      className={
                        task.status === "completed"
                          ? "font-medium text-muted-foreground line-through"
                          : "font-medium text-juniper-strong"
                      }
                    >
                      {task.title}
                    </p>
                    {task.description ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    ) : null}
                    <p className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline">{task.status}</Badge>
                      <Badge variant="outline">{task.priority}</Badge>
                      {task.dueAt ? (
                        <span>Due {formatDate(task.dueAt)}</span>
                      ) : null}
                      {task.assignedToName ? (
                        <span>→ {task.assignedToName}</span>
                      ) : null}
                    </p>
                  </div>
                  <TaskStatusForm
                    taskId={task.id}
                    accountId={accountId}
                    profileId={profileId}
                    currentStatus={task.status}
                  />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add task</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateTaskForm
            accountId={accountId}
            workspaceId={workspaceId}
            profileId={profileId}
          />
        </CardContent>
      </Card>
    </div>
  )
}
