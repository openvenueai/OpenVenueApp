"use client"

import { Button } from "@/components/ui/button"

type StepCompleteProps = {
  title: string
  description?: string
  onOpenWorkspace: () => void
  isPending: boolean
  error?: string | null
}

export function StepComplete({
  title,
  description,
  onOpenWorkspace,
  isPending,
  error,
}: StepCompleteProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="text-base leading-7 text-muted-foreground">{description}</p>
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <div className="flex justify-end">
        <Button onClick={onOpenWorkspace} disabled={isPending}>
          Open workspace
        </Button>
      </div>
    </div>
  )
}
