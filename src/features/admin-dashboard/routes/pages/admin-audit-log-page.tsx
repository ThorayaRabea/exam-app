import Navbar from "@/shared/components/navbar/navbar";
import AuditLogList from "../../components/audit-log-list/audit-log-list";

export default function AdminAuditLogPage() {
  return (
    <>
      <Navbar items={[{ label: "Audit Logs" }]} />
      <AuditLogList />
    </>
  );
}
