
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface DiplomaSearchFiltersProps {
  search: string;
  immutable: string;
  onApply: (search: string, immutable: string) => void;
  onClear: () => void;
}

export default function DiplomaSearchFilters({
  search,
  immutable,
  onApply,
  onClear,
}: DiplomaSearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchInput, setSearchInput] = useState(search);
  const [immutableInput, setImmutableInput] = useState(immutable);

  const handleApply = () => {
    onApply(searchInput, immutableInput);
  };

  const handleClear = () => {
    setSearchInput("");
    setImmutableInput("");
    onClear();
  };

  return (
    <div className="mb-4 overflow-hidden  border border-blue-100 mx-2 ">
      <div className="bg-white">
        <div className="flex items-center justify-between bg-blue-600 px-4 py-2.5 text-white ">
          <div className="flex items-center gap-2 text-sm font-medium">
            <SlidersHorizontal size={16} />
            Search & Filters
          </div>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-1 text-sm hover:opacity-80"
          >
            <ChevronsUpDown size={14} />
            {isOpen ? "Hide" : "Show"}
          </button>
        </div>

        {isOpen && (
          <div className="flex flex-col gap-3 bg-white p-4">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Search by title"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9"
              />
            </div>

            <select
              value={immutableInput}
              onChange={(e) => setImmutableInput(e.target.value)}
              className="h-11.5 rounded-md border border-gray-200 px-3 text-sm text-gray-700 w-1/3"
            >
              <option value="">Immutability</option>
              <option value="true">Immutable</option>
              <option value="false">Not immutable</option>
            </select>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={handleClear}>
                Clear
              </Button>
              <Button type="button" variant="secondary" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
