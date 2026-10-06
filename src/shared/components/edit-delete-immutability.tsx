import { Button } from "@/components/ui/button/button";
import { Ban, Pencil, Trash2 } from "lucide-react";

interface ActionRowProps {
  title: string;
  immutable: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function EditDeleteImmutabilityButtons({
  title,
  immutable,
  onEdit,
  onDelete,
}: ActionRowProps) {
  return (
    <div className="flex items-center justify-between border border-gray-200 bg-white px-4 py-2">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <div className="flex items-center gap-2">
        {immutable && (
          <span className="flex items-center gap-2 rounded bg-gray-100 px-3 py-2 text-xs font-medium text-gray-500">
            <Ban size={14} />
            Immutable
          </span>
        )}

        <Button
          type="button"
          onClick={onEdit}
          disabled={immutable}
          className="flex items-center gap-2 bg-blue-600 px-3 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Pencil size={14} />
          Edit
        </Button>

        <Button
          type="button"
          onClick={onDelete}
          disabled={immutable}
          className="flex items-center gap-2 bg-red-600 px-3 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 size={14} />
          Delete
        </Button>
      </div>
    </div>
  );
}