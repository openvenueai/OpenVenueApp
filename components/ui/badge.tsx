import type { HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
  {
    variants: {
      variant: {
        default: "border-juniper/10 bg-juniper text-white",
        outline: "border-line bg-surface text-juniper-strong",
        muted: "border-line bg-canvas text-juniper",
        success: "border-moss/25 bg-moss/12 text-juniper-strong",
        warning: "border-warm-gold/25 bg-warm-gold/12 text-juniper-strong",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
)

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />
}
