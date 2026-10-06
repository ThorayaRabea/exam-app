import {
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowUpAZ,
  CalendarArrowDown,
  CalendarArrowUp,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AuditLogSortDropdownProps {
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
    sortBy: "createdAt",
    sortOrder: "asc",
    label: "Action",
  },
  { icon: ArrowUpAZ, sortBy: "createdAt", sortOrder: "desc", label: "Action" },
  { icon: ArrowUpAZ, sortBy: "createdAt", sortOrder: "desc", label: "User" },
  { icon: ArrowDownAZ, sortBy: "createdAt", sortOrder: "asc", label: "User" },
  { icon: ArrowUpAZ, sortBy: "createdAt", sortOrder: "desc", label: "Entity" },
  { icon: ArrowDownAZ, sortBy: "createdAt", sortOrder: "asc", label: "Entity" },

  {
    icon: CalendarArrowDown,
    sortBy: "createdAt",
    sortOrder: "desc",
    label: "Newest ",
  },
  {
    icon: CalendarArrowUp,
    sortBy: "createdAt",
    sortOrder: "asc",
    label: "Newest ",
  },
];

export default function AuditLogSortDropdown({
  onSortByChange,
  onSortOrderChange,
}: AuditLogSortDropdownProps) {
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
        
          className="absolute right-0 top-full  mt-1 w-fit rounded-lg border border-gray-100  py-1.5 text-gray-700 shadow-lg z-50 bg-white  "
        >
          {sortOptions.map((option) => {
            return (
              <button
                key={`${option.label}-${option.sortBy}-${option.sortOrder}`}
                type="button"
                onClick={() => {
                  onSortByChange(option.sortBy);
                  onSortOrderChange(option.sortOrder);
                  setIsOpen(false);
                }}
                className="flex w-fit items-center gap-1 px-4 py-2 text-left hover:bg-gray-50"
              >
                <option.icon size={14} />
                {option.label}
                <span className="text-gray-400 text-xs">
                  ({option.sortOrder})
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
