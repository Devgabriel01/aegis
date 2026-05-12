import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-aegis bg-aegis-elevated text-foreground",
        secondary: "border-transparent bg-aegis-silver-800 text-aegis-silver-300",
        outline: "border-aegis text-muted-foreground",

        // Severity
        critical: "border-aegis-critical/30 bg-aegis-critical/10 text-aegis-critical",
        high: "border-aegis-high/30 bg-aegis-high/10 text-aegis-high",
        medium: "border-aegis-medium/30 bg-aegis-medium/10 text-aegis-medium",
        low: "border-aegis-low/30 bg-aegis-low/10 text-aegis-low",
        info: "border-aegis-silver-700 bg-aegis-silver-800 text-aegis-silver-400",

        // Status
        online: "border-aegis-green-400/30 bg-aegis-green-400/10 text-aegis-green-400",
        offline: "border-aegis-critical/30 bg-aegis-critical/10 text-aegis-critical",
        warning: "border-aegis-medium/30 bg-aegis-medium/10 text-aegis-medium",

        // Brand
        blue: "border-aegis-blue-400/30 bg-aegis-blue-400/10 text-aegis-blue-300",
        cyan: "border-aegis-cyan-400/30 bg-aegis-cyan-400/10 text-aegis-cyan-400",
        purple: "border-aegis-purple-400/30 bg-aegis-purple-400/10 text-aegis-purple-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full",
            variant === "critical" && "bg-aegis-critical",
            variant === "high" && "bg-aegis-high",
            variant === "medium" && "bg-aegis-medium",
            variant === "low" && "bg-aegis-low",
            variant === "online" && "bg-aegis-green-400",
            variant === "offline" && "bg-aegis-critical",
            variant === "warning" && "bg-aegis-medium",
            !["critical","high","medium","low","online","offline","warning"].includes(variant ?? "") && "bg-current",
          )}
        />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
