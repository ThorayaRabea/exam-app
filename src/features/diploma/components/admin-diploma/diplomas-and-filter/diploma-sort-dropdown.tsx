import {
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowUpAZ,
  CalendarArrowDown,
  CalendarArrowUp,
  type LucideIcon,

} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DiplomaSortDropdownProps {
  sortBy: string;
  sortOrder: string;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
}

const sortOptions: {
  icon: LucideIcon;
  sortBy: "title" | "createdAt";
  sortOrder: "asc" | "desc";
  label: string;
}[] = [
  {
    icon: ArrowDownAZ,
    sortBy: "title",
    sortOrder: "asc",
    label: "Title (A-Z)",
  },
  { icon: ArrowUpAZ, sortBy: "title", sortOrder: "desc", label: "Title (Z-A)" },
  {
    icon: CalendarArrowDown,
    sortBy: "createdAt",
    sortOrder: "desc",
    label: "Newest first",
  },
  {
    icon: CalendarArrowUp,
    sortBy: "createdAt",
    sortOrder: "asc",
    label: "Oldest first",
  },
];

export default function DiplomaSortDropdown({
  onSortByChange,
  onSortOrderChange,
}: DiplomaSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block text-white ">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 "
      >
        Sort <ArrowDownWideNarrow />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full  mt-1 w-fit rounded-lg border border-gray-100  py-1.5 text-gray-700 shadow-lg z-50 bg-white"
        >
          {sortOptions.map((option) => {
            return (
              <button
                key={`${option.sortBy}-${option.sortOrder}`}
                type="button"
                onClick={() => {
                  onSortByChange(option.sortBy);
                  onSortOrderChange(option.sortOrder);
                  setIsOpen(false);
                }}
                className="flex w-fit items-center gap-1 px-4 py-2 text-left hover:bg-gray-50"
              >
                <option.icon size={14}  />
                {option.label}
                <span className="text-gray-400 text-xs">({option.sortOrder })</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
