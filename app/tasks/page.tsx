import { redirect } from "next/navigation"
import { AppShell } from "@/components/app-shell/app-shell"
import { TasksList } from "@/components/tasks/tasks-list"
import { CreateTaskFormStandalone } from "@/components/tasks/create-task-form-standalone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAccountSnapshot } from "@/lib/account-context"
import { canAccessAppPath } from "@/lib/app-shell/navigation"
import { requireAuthenticatedUser } from "@/lib/auth/session"
import { getTasksForAccount } from "@/lib/tasks/queries"
import { getWorkspaceOptionsForAccount } from "@/lib/workspace/queries"

export default async function TasksPage() {
  const user = await requireAuthenticatedUser("/tasks")
  const snapshot = await getAccountSnapshot(user.id)

  if (!snapshot?.account || !snapshot.membership) {
    redirect("/onboarding")
  }

  if (!canAccessAppPath(snapshot.membership.role, "/tasks")) {
    redirect("/dashboard")
  }

  const [myTasks, overdueTasks, allTasks, workspaceOptions] = await Promise.all([
    getTasksForAccount(snapshot.account.id, {
      assignedToProfileId: snapshot.profile.id,
    }),
    getTasksForAccount(snapshot.account.id, { overdueOnly: true }),
    getTasksForAccount(snapshot.account.id),
    getWorkspaceOptionsForAccount(snapshot.account.id),
  ])

  const todoTasks = allTasks.filter((t) => t.status !== "completed" && t.status !== "cancelled")

  return (
    <AppShell activePath="/tasks" snapshot={snapshot}>
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {overdueTasks.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Overdue</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {overdueTasks.length} task
                    {overdueTasks.length === 1 ? "" : "s"} past due
                  </p>
                </CardHeader>
                <CardContent>
                  <TasksList
                    tasks={overdueTasks}
                    accountId={snapshot.account.id}
                    profileId={snapshot.profile.id}
                  />
                </CardContent>
              </Card>
            ) : null}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">My tasks</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Tasks assigned to you
                </p>
              </CardHeader>
              <CardContent>
                {myTasks.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    No tasks assigned to you.
                  </p>
                ) : (
                  <TasksList
                    tasks={myTasks}
                    accountId={snapshot.account.id}
                    profileId={snapshot.profile.id}
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Team tasks</CardTitle>
                <p className="text-sm text-muted-foreground">
                  All active tasks ({todoTasks.length})
                </p>
              </CardHeader>
              <CardContent>
                {todoTasks.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    No active tasks.
                  </p>
                ) : (
                  <TasksList
                    tasks={todoTasks}
                    accountId={snapshot.account.id}
                    profileId={snapshot.profile.id}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add task</CardTitle>
              <p className="text-sm text-muted-foreground">
                Create a task with or without a workspace.
              </p>
            </CardHeader>
            <CardContent>
              <CreateTaskFormStandalone
                accountId={snapshot.account.id}
                profileId={snapshot.profile.id}
                workspaceOptions={workspaceOptions}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
