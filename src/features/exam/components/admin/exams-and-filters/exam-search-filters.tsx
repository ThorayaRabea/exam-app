import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { useDiplomaOptions } from "@/features/diploma/apis/queries/use-diploma-options";

interface ExamSearchFiltersProps {
  search: string;
  immutable: string;
  diplomaId: string;
  onApply: (search: string, immutable: string, diplomaId: string) => void;
  onClear: () => void;
}

export default function ExamSearchFilters({
  search,
  immutable,
  diplomaId,
  onApply,
  onClear,
}: ExamSearchFiltersProps) {
  //States
  const [isOpen, setIsOpen] = useState(true);
  const [searchInput, setSearchInput] = useState(search);
  const [immutableInput, setImmutableInput] = useState(immutable);
  const [diplomaInput, setDiplomaInput] = useState(diplomaId);
//Queries
  const { data: diplomaOptions } = useDiplomaOptions();
  const diplomas = diplomaOptions?.payload?.data ?? [];

  //Handle Apply Function
  const handleApply = () => {
    onApply(searchInput, immutableInput, diplomaInput);
  };

  //Handle Clear Function
  const handleClear = () => {
    setSearchInput("");
    setImmutableInput("");
    setDiplomaInput("");
    onClear();
  };

  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-blue-100">
      <div className="flex items-center justify-between bg-blue-600 px-4 py-2.5 text-white">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter size={16} />
          Search & Filters
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-sm hover:opacity-80"
        >
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

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={diplomaInput}
              onChange={(e) => setDiplomaInput(e.target.value)}
              className="h-11.5 flex-1 rounded-md border border-gray-200 px-3 text-sm text-gray-700"
            >
              <option value="">Diploma</option>
              {diplomas.map((diploma) => (
                <option key={diploma.id} value={diploma.id}>
                  {diploma.title}
                </option>
              ))}
            </select>

            <select
              value={immutableInput}
              onChange={(e) => setImmutableInput(e.target.value)}
              className="h-11.5 flex-1 rounded-md border border-gray-200 px-3 text-sm text-gray-700"
            >
              <option value="">Immutability</option>
              <option value="true">Immutable</option>
              <option value="false">Not immutable</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={handleClear}>
              Clear
            </Button>
            <Button type="button" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}