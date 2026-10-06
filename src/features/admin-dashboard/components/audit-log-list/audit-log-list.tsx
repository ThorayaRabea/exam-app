import { useState } from "react";
import { useAuditLogAdmin } from "../../apis/queries/use-audit-log-admin";
import AuditLogHeader from "./audit-log-header";
import AuditLogSearchAndFilters from "./audit-log-search-filters";
import AuditLogTable from "./audit-log-table";

export default function AuditLogList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [actorUserId, setActorUserId] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading } = useAuditLogAdmin({
    page,
    limit: 12,
    search,
    actorUserId,
    action,
    category,
    sortBy,
    sortOrder,
  });

  const totalPages = data?.payload?.metadata?.totalPages ?? 1;
  const totalAudits = data?.payload?.metadata?.total ?? 0;
 
  const audits = data?.payload?.data ?? [];
  return (
    <div className="p-6">
      <AuditLogHeader
        page={page}
        totalPages={totalPages}
        totalAudits={totalAudits}
        limit={12}
        onPageChange={setPage}
      
      />
      <AuditLogSearchAndFilters
        action={action}
        actorUserId={actorUserId}
        category={category}
        onApply={(newCategory, newAction, newActorUserId) => {
          setAction(newAction);
          setCategory(newCategory);
          setActorUserId(newActorUserId);
          setPage(1);
        }}
        onClear={() => {
          setAction("");
          setCategory("");
          setActorUserId("");
          setPage(1);
        }}
      />
      <AuditLogTable
        audits={audits}
        isLoading={isLoading}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByChange={(value) => {
          setSortBy(value);
          setPage(1);
        }}
        onSortOrderChange={(value) => {
          setSortOrder(value);
          setPage(1);
        }}
      />
    </div>
  );
}
