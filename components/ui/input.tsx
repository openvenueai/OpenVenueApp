import * as React from "react"
import { cn } from "@/lib/utils"

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl border border-line bg-surface px-4 text-sm text-juniper-strong outline-none transition placeholder:text-juniper/55 focus:border-juniper/40 focus:ring-4 focus:ring-moss/15 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  )
}
