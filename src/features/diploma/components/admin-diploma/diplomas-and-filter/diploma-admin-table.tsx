import { useState } from "react";
import { useDiplomasAdminList } from "../../../apis/queries/use-diploma-admin-list";
import DiplomaAdminHeader from "./diploma-admin-header";
import DiplomaSearchFilters from "./diploma-search-filters";
import DiplomaTable from "./diploma-table";

const PAGE_SIZE = 12;

export default function DiplomaAdminTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [immutable, setImmutable] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading } = useDiplomasAdminList({
    page,
    limit: PAGE_SIZE,
    search,
    immutable,
    sortBy,
    sortOrder,
  });

  const totalDiplomas = data?.payload.metadata.total ?? 0;
  const diplomas = data?.payload?.data ?? [];
  const totalPages = data?.payload?.metadata?.totalPages ?? 1;

  return (
    <div className="py-6">
      <DiplomaAdminHeader
        page={page}
        totalPages={totalPages}
        limit={PAGE_SIZE}
        totalDiplomas={totalDiplomas}
        onPageChange={setPage}
      />

      <DiplomaSearchFilters
        search={search}
        immutable={immutable}
        onApply={(newSearch, newImmutable) => {
          setSearch(newSearch);
          setImmutable(newImmutable);
          setPage(1);
        }}
        onClear={() => {
          setSearch("");
          setImmutable("");
          setPage(1);
        }}
      />

      <DiplomaTable
        diplomas={diplomas}
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
