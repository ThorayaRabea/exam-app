import { useMutation } from "@tanstack/react-query";
import { deleteAuditLogByIdAPI } from "../admin.apis";

export default function UseDeleteAuditLogById() {
  return useMutation({
    mutationFn: deleteAuditLogByIdAPI,
  });
}
