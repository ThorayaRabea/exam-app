import { cn } from "@/shared/utils";

export default function SubHeading({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn('font-bold text-2xl text-blue-600 ', className)}>{children}</h1>;
}
