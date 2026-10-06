
import { cn } from "@/shared/lib/tailwind-merge";

interface StepperProps {
  totalSteps?: number;
  currentStep: number;
}

export function Stepper({
  totalSteps = 2,
  currentStep,
}: StepperProps) {
  return (
    <div className="flex items-center w-full h-9 mt-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;

        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div
              className={cn(
                "relative flex h-5 w-5 items-center justify-center",
                isActive &&
                  "h-5.5 w-5.5  bg-blue-100 rotate-45"
              )}
            >
              <div
                className={cn(
                  "h-2.5 w-2.5 rotate-45 border border-blue-600  transition-all",
                  isCompleted && "bg-blue-600 ",
                  isActive && "h-2.5 w-2.5 bg-blue-600 rotate-0"
                )}
              />
            </div>

            {step !== totalSteps && (
              <div className="flex-1 px-2">
                <div
                  className={cn(
                    " w-full h-px ",
                    isCompleted
                      ? "bg-blue-600"
                      : "bg-[repeating-linear-gradient(to_right,#60A5FA_0_4px,transparent_4px_8px)]"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}