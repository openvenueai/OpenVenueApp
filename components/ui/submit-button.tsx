"use client"

import type { ReactNode } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"

type SubmitButtonProps = {
  children: ReactNode
  pendingLabel: string
  className?: string
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
}

export function SubmitButton({
  children,
  pendingLabel,
  className,
  size = "lg",
  variant = "default",
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      className={className}
      disabled={pending}
      size={size}
      type="submit"
      variant={variant}
    >
      {pending ? pendingLabel : children}
    </Button>
  )
}
