import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAuditLogAPI } from "../admin.apis";
import { ADMIN_KEY } from "../admin.keys";

export default function UseDeleteAllAuditLog() {
    const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAuditLogAPI,
    onSuccess: () => {
      toast.success("audit has been deleted successfully", {
        duration: 4000,
      });
      QueryClient.invalidateQueries({ queryKey: ADMIN_KEY.all });
    },
  });
}
