import { Button } from "@/components/ui/button/button";
import { Filter } from "lucide-react";
import { useState } from "react";
import { useUserOptions } from "../../apis/queries/use-user-options";
import { ROLES } from "@/features/user/constants/role-constant";

interface AuditLogSearchAndFiltersProps {
  action: string;
  actorUserId: string;
  category: string;
  onApply: (category: string, action: string, actorUserId: string) => void;
  onClear: () => void;
}

export default function AuditLogSearchAndFilters({
  action,
  actorUserId,
  category,
  onApply,
  onClear,
}: AuditLogSearchAndFiltersProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [categoryInput, setCategoryInput] = useState(category);
  const [actionInput, setActionInput] = useState(action);
  const [actorUserIdInput, setActorUserIdInput] = useState(actorUserId);

 const { data: allUsers } = useUserOptions();
const users = (allUsers ?? []).filter(
  (user) => user.role === ROLES.ADMIN || user.role === ROLES.SUPER_ADMIN,
);

  const handleApply = () => {
    onApply(categoryInput, actionInput, actorUserIdInput);
  };

  const handleClear = () => {
    setCategoryInput("");
    setActionInput("");
    setActorUserIdInput("");
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
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="h-11.5 flex-1 rounded-md border border-gray-200 px-3 text-sm text-gray-700"
            >
              <option value="">Category</option>
              <option value="DIPLOMA">Diploma</option>
              <option value="EXAM">Exam</option>
              <option value="QUESTION">Question</option>
              <option value="USER">User</option>
              <option value="SYSTEM">System</option>
            </select>

            <select
              value={actionInput}
              onChange={(e) => setActionInput(e.target.value)}
              className="h-11.5 flex-1 rounded-md border border-gray-200 px-3 text-sm text-gray-700"
            >
              <option value="">Action</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="SET_IMMUTABLE">Set Immutable</option>
              <option value="SEED_DATA">Seed Data</option>
            </select>

            <select
              value={actorUserIdInput}
              onChange={(e) => setActorUserIdInput(e.target.value)}
              className="h-11.5 flex-1 rounded-md border border-gray-200 px-3 text-sm text-gray-700"
            >
              <option value="">User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button type="button" variant="secondary" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}