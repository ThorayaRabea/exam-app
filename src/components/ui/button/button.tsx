import { cn } from "@/shared/lib/tailwind-merge"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { buttonVariants } from "./variant"
import { Loader } from "lucide-react"

//import { cn } from "@/lib/utils"

interface IButtonProps extends ButtonPrimitive.Props , VariantProps<typeof buttonVariants>{
  isLoading?: boolean
}

function Button({
  disabled,
  isLoading=false,
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}: IButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      disabled={disabled || isLoading}
    >
      {isLoading?<Loader className="animate-spin"/>:children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
