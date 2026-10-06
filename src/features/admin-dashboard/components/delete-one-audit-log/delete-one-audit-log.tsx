import { Button } from "@/components/ui/button/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UseDeleteAuditLogById from "../../apis/mutations/use-delete-audit-log-id";

interface DeleteOneAuditLogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

export default function DeleteOneAuditLog({
  open,
  onOpenChange,
  id,
}: DeleteOneAuditLogProps) {
  //Navigation
  const navigate = useNavigate();

  //Mutation
  const { mutate: deleteAuditLogByIdAPI } = UseDeleteAuditLogById();
  function handleDeleteAccount() {
    onOpenChange(false);
    deleteAuditLogByIdAPI(id, {
      onSuccess: () => {
        toast.success("audit has been deleted successfully", {
          duration: 4000,
        });
      },
    });
    navigate("/admin/logs");
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <TriangleAlert className="text-red-600" size={28} />
        </div>
        <h2 className="text-lg font-bold text-red-600">
          Are you sure you want to clear this audit log?
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          This action is permanent and cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="flex-1"
            onClick={handleDeleteAccount}
          >
            Yes, clear
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
