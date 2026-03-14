import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type EmptyStateProps = {
  eyebrow?: string
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  eyebrow,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-dashed border-line bg-canvas/80 px-6 py-8 text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="mt-3 font-display text-3xl tracking-tight text-juniper-strong">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  )
}
