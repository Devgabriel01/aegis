import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-aegis-blue-500 text-white hover:bg-aegis-blue-400 shadow-sm hover:shadow-glow-blue active:scale-[0.98]",
        destructive:
          "bg-aegis-critical/10 text-aegis-critical border border-aegis-critical/30 hover:bg-aegis-critical/20 hover:border-aegis-critical/50",
        outline:
          "border border-aegis bg-transparent text-foreground hover:border-aegis-bright hover:bg-aegis-elevated hover:text-aegis-blue-300 active:scale-[0.98]",
        secondary:
          "bg-aegis-elevated border border-aegis text-foreground hover:border-aegis-bright hover:bg-aegis-overlay active:scale-[0.98]",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-aegis-elevated active:scale-[0.98]",
        link:
          "text-aegis-blue-400 underline-offset-4 hover:underline hover:text-aegis-blue-300 p-0 h-auto",
        cyan:
          "bg-aegis-cyan-500/10 text-aegis-cyan-400 border border-aegis-cyan-500/30 hover:bg-aegis-cyan-500/20 hover:border-aegis-cyan-500/50 hover:shadow-glow-cyan active:scale-[0.98]",
        purple:
          "bg-aegis-purple-500/10 text-aegis-purple-400 border border-aegis-purple-500/30 hover:bg-aegis-purple-500/20 hover:border-aegis-purple-500/50 active:scale-[0.98]",
        critical:
          "bg-aegis-critical text-white hover:bg-red-500 shadow-critical hover:shadow-glow-red active:scale-[0.98]",
        premium:
          "relative overflow-hidden bg-aegis-blue-500 text-white hover:bg-aegis-blue-400 active:scale-[0.98] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500",
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-7 rounded-md px-2.5 text-xs",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 text-base",
        xl: "h-13 rounded-xl px-8 text-base font-semibold",
        icon: "h-9 w-9",
        "icon-sm": "h-7 w-7",
        "icon-xs": "h-6 w-6 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
