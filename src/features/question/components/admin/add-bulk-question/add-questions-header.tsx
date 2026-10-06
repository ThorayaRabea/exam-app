import { Button } from "@/components/ui/button/button";
import { CopyPlus, Save, X } from "lucide-react";

interface AddQuestionsHeaderProps {
  onCancel: () => void;
  onSave: () => void;
  isSaving: boolean;
  isBulkMode: boolean;
  onToggleBulkMode: () => void;
}
export default function AddQuestionsHeader({
  onCancel,
  onSave,
  isSaving,
  isBulkMode,
  onToggleBulkMode,
}: AddQuestionsHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <Button
        type="button"
        variant={isBulkMode ? "default" : "secondary"}
        onClick={onToggleBulkMode}
        className="gap-1.5"
      >
        <CopyPlus size={16} />
        Bulk Add Mode
      </Button>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="gap-1.5"
        >
          <X size={16} />
          Cancel
        </Button>
        <Button
          type="button"
          onClick={onSave}
          isLoading={isSaving}
          className="gap-1.5 bg-emerald-500 hover:bg-emerald-600"
        >
          <Save size={16} />
          Save
        </Button>
      </div>
    </div>
  );
}
