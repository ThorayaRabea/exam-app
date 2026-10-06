import Navbar from "@/shared/components/navbar/navbar";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ADMIN_KEY } from "../../apis/admin.keys";
import UseDeleteAuditLogById from "../../apis/mutations/use-delete-audit-log-id";
import UseAuditLogByID from "../../apis/queries/use-audit-log-by-id";
import AuditView from "../../components/audit-view/audit-view-page";

export default function AdminAuditLogViewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { auditLogId } = useParams();
  const { mutate: deleteAuditLogByIdAPI } = UseDeleteAuditLogById();
  const { data } = UseAuditLogByID(auditLogId);
  const auditData = data?.payload?.auditLog ;

  //functions
  function handleDeleteAuditLogById() {
    deleteAuditLogByIdAPI(auditLogId!, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ADMIN_KEY.all });
        navigate("/admin/logs");
        toast.success("audit has been deleted successfully", {
          duration: 4000,
        });
      },
    });
  }
  if (!auditData) {
  return <div>Loading...</div>;
}
  return (
    <>
      <Navbar
        items={[
          { label: "admin", to: "/admin/logs" },
          {
            label: ` ${auditData?.category} ${auditData?.action} By ${auditData?.actorUsername}`,
            to: undefined,
          },
        ]}
      />

      <AuditView onDelete={handleDeleteAuditLogById} auditData={auditData} />
    </>
  );
}
