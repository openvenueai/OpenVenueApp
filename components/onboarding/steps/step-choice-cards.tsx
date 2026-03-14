"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Option = { label: string; value: string }

type StepChoiceCardsProps = {
  title: string
  description?: string
  options: Option[]
  defaultValue?: string
  onNext: (value: string) => void
  onBack?: () => void
  isOptional?: boolean
  isPending: boolean
  error?: string | null
}

export function StepChoiceCards({
  title,
  description,
  options,
  defaultValue,
  onNext,
  onBack,
  isOptional,
  isPending,
  error,
}: StepChoiceCardsProps) {
  const [selected, setSelected] = useState<string | null>(defaultValue ?? null)

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
      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setSelected(opt.value)}
            className={cn(
              "w-full rounded-2xl border px-5 py-4 text-left text-sm font-medium transition",
              selected === opt.value
                ? "border-juniper bg-juniper/10 text-juniper-strong"
                : "border-line bg-surface text-foreground hover:border-juniper/40 hover:bg-surface-muted/80",
            )}
          >
            {opt.label}
          </button>
        ))}
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {onBack && (
          <Button variant="outline" onClick={onBack} disabled={isPending}>
            Back
          </Button>
        )}
        <Button
          onClick={() => selected != null && onNext(selected)}
          disabled={isPending || (selected == null && !isOptional)}
        >
          Continue
        </Button>
        {isOptional && (
          <Button
            variant="ghost"
            onClick={() => onNext("")}
            disabled={isPending}
            className="text-muted-foreground"
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  )
}
