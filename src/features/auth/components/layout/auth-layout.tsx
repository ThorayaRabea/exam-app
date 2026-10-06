import { cn } from "@/shared/lib/tailwind-merge";
import { Outlet } from "react-router-dom";
import AuthShowcase from "../authShowCase/auth-showcase";

export function AuthLayout() {
  return (
    <div
      className={cn(
        // layout
        "grid grid-cols-1 md:grid-cols-2",
        // sizing
      )}
    >
      <div
        className={cn(
          // layout
          "flex flex-col justify-center items-center overflow-hidden",
          // spacing
          "gap-2 px-7",
          "h-screen ",
          // effects
          "backdrop-blur-[200px]",

          // before pseudo-element
          "before:content-[''] before:absolute before:top-14 before:-right-10 before:size-70 before:rounded-full before:bg-blue-200 before:blur-[200px] before:-z-10",

          // after pseudo-element
          "after:content-[''] after:absolute after:bottom-14 after:-left-10 after:size-70 after:rounded-full after:bg-blue-300 after:blur-[200px] after:-z-10",
        )}
      >
        <AuthShowcase />
      </div>

      <div
        className={cn(
          // layout
          "flex items-center justify-center",
          "gap-2 px-7 sm:py-4",
          "h-screen ",
        )}
      >
        <div
          className={cn(
            // sizing
            "max-w-113 w-full ",
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
