import { CreateNoteForm } from "@/components/workspace/create-note-form"
import { CreateTaskFromNoteForm } from "@/components/workspace/create-task-from-note-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/formatting"

type NoteRow = {
  id: string
  title: string | null
  body: string
  noteType: string | null
  isPinned: boolean | null
  createdAt: Date
  authorName: string | null
}

type WorkspaceNotesTabProps = {
  workspaceId: string
  accountId: string
  profileId: string
  notes: NoteRow[]
}

export function WorkspaceNotesTab({
  workspaceId,
  accountId,
  profileId,
  notes,
}: WorkspaceNotesTabProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notes.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No notes yet. Add a note to capture context for this event.
              </p>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl border border-line bg-canvas p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-juniper-strong">
                        {note.title ?? "Untitled note"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(note.createdAt)}
                        {note.authorName ? ` · ${note.authorName}` : ""}
                        {note.noteType ? ` · ${note.noteType}` : ""}
                        {note.isPinned ? " · Pinned" : ""}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
                    {note.body}
                  </p>
                  <CreateTaskFromNoteForm
                    accountId={accountId}
                    workspaceId={workspaceId}
                    profileId={profileId}
                    noteId={note.id}
                    defaultTitle={note.title ?? note.body.slice(0, 80) ?? "Task from note"}
                  />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add note</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateNoteForm
            accountId={accountId}
            workspaceId={workspaceId}
            profileId={profileId}
          />
        </CardContent>
      </Card>
    </div>
  )
}
