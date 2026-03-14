"use client"

import { Button } from "@/components/ui/button"

type StepWelcomeProps = {
  title: string
  description?: string
  onNext: () => void
  isPending: boolean
}

export function StepWelcome({ title, description, onNext, isPending }: StepWelcomeProps) {
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
      <div className="flex justify-end">
        <Button onClick={onNext} disabled={isPending}>
          Get started
        </Button>
      </div>
    </div>
  )
}
