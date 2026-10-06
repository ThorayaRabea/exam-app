import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/shared/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        // sizing
        "h-11.5 w-full min-w-0",
        // spacing
        "px-2.5 py-1",
        // typography
        "text-base md:text-sm placeholder:text-muted-foreground",
        // background & border
        "border border-input bg-transparent",
        // effects
        "transition-colors outline-none",
        // file input
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // focus state
        "focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-50/50",
        // disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
        // invalid state
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        // dark mode
        "dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
