import { cn } from "@/lib/utils"

type ActionNoticeProps = {
  message?: string
  status?: "idle" | "success" | "error"
}

export function ActionNotice({ message, status = "idle" }: ActionNoticeProps) {
  if (!message) {
    return null
  }

  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm leading-6",
        status === "success"
          ? "border-moss/35 bg-moss/12 text-juniper-strong"
          : "border-destructive/20 bg-destructive/8 text-destructive",
      )}
    >
      {message}
    </div>
  )
}
