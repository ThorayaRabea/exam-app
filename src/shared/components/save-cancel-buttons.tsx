// src/shared/components/form-actions/form-actions.tsx
import { X, Save } from "lucide-react";
import { Button } from "@/components/ui/button/button";

interface FormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
 
}

export default function SaveAndCancelButtons({
  onCancel,
  onSave,
  isSaving = false,

}: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50 px-4 py-3">
      <Button type="button" variant="secondary" onClick={onCancel} className="gap-1.5">
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
  );
}