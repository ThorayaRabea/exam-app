import { cn } from "@/shared/lib/tailwind-merge";
import { CircleX } from "lucide-react";
import React, { useState } from "react";
export default function FormFeedback({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;
  return (
    <div
      className={cn(
        "text-sm text-red-500 relative h-9.5 flex items-center justify-center bg-red-50 border-red-600 mt-3",
        className,
      )}
      {...props}
    >
      {/* icon */}
      <CircleX
        size={18}
        onClick={() => setVisible(false)}
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
      />
      {/* message */}
      {children}
    </div>
  );
}
