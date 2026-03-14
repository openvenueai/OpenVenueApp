import type { ReactNode } from "react"

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-juniper">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 font-display text-5xl tracking-tight text-juniper-strong">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-base leading-8 text-juniper">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  )
}
