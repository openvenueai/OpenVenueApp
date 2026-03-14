"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type StepTextProps = {
  title: string
  description?: string
  placeholder?: string
  defaultValue?: string
  onNext: (value: string) => void
  onBack?: () => void
  isOptional?: boolean
  isPending: boolean
  error?: string | null
}

export function StepText({
  title,
  description,
  placeholder,
  defaultValue = "",
  onNext,
  onBack,
  isOptional,
  isPending,
  error,
}: StepTextProps) {
  const [value, setValue] = useState(defaultValue)

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
      <div className="space-y-4">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onNext(value.trim())}
          aria-invalid={!!error}
          aria-describedby={error ? "step-error" : undefined}
        />
        {error && (
          <p id="step-error" className="text-sm text-destructive" role="alert">
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
          onClick={() => onNext(value.trim())}
          disabled={isPending || (!value.trim() && !isOptional)}
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
