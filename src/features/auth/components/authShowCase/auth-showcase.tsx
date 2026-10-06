import {
  BookOpenCheck,
  Brain,
  FolderCode,
  RectangleEllipsis,
} from "lucide-react";
import { cn } from "@/shared/utils";

const features = [
  {
    icon: Brain,
    title: "Tailored Diplomas",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
  {
    icon: BookOpenCheck,
    title: "Focused Exams",
    description:
      "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
  },
  {
    icon: RectangleEllipsis,
    title: "Smart Multi-Step Forms",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
];

export default function AuthShowcase() {
  return (
    <section className={cn(
      // sizing
      "max-w-115 w-full",
    )}>
      {/* Logo */}
      <div className={cn(
        // layout
        "flex items-center",
        // spacing
        "gap-2 md:gap-4",
      )}>
        <FolderCode className={cn(
          // layout
          "shrink-0",
          // typography
          "text-blue-600",
        )} size={24} />
        <span className={cn(
          // typography
          "font-geist-mono font-semibold text-base md:text-xl leading-none text-blue-600",
        )}>
          Exam App
        </span>
      </div>

      <div className={cn(
        // layout
        "flex flex-col items-start",
        // spacing
        "gap-4 md:gap-6 mt-4 md:mt-34",
      )}>
        <h1 className={cn(
          // sizing
          "w-full",
          // typography
          "font-bold text-lg md:text-3xl leading-tight md:leading-none text-gray-900",
        )}>
          Empower your learning journey with our smart exam platform.
        </h1>

        <div className={cn(
          // layout
          "flex flex-col",
          // spacing
          "gap-3 md:gap-9 mt-3 md:mt-10 ",
        )}>
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className={cn(
              // layout
              "flex",
              // sizing
              "w-full",
              // spacing
              "gap-4",
            )}>
              <Icon className={cn(
                // layout
                "shrink-0",
                // typography
                "text-blue-600",
              )} size={24} />
              <div className={cn(
                // layout
                "flex flex-col",
                // spacing
                "gap-1",
              )}>
                <p className={cn(
                  // typography
                  "font-geist-mono font-semibold text-sm md:text-xl leading-none text-blue-600",
                )}>
                  {title}
                </p>
                <p className={cn(
                  // typography
                  "font-geist-mono font-normal text-xs md:text-base leading-snug md:leading-none text-gray-700",
                )}>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
