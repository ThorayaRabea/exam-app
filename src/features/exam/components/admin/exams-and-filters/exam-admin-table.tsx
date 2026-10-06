import { useState } from "react";
import ExamAdminHeader from "./exam-admin-header";
import ExamSearchFilters from "./exam-search-filters";
import ExamTable from "./exam-table";
import { useExamsAdminList } from "@/features/exam/apis/queries/use-exam-admin-list";

const PAGE_SIZE = 12;

export default function ExamAdminTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [immutable, setImmutable] = useState("");
  const [diplomaId, setDiplomaId] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading } = useExamsAdminList({
    page,
    limit: PAGE_SIZE,
    search,
    immutable,
    diplomaId,
    sortBy,
    sortOrder,
  });

  const exams = data?.payload?.data ?? [];
  const totalPages = data?.payload?.metadata?.totalPages ?? 1;
  const totalExams = data?.payload?.metadata?.total ?? 0;

  return (
    <div className="p-6">
      <ExamAdminHeader
        page={page}
        totalPages={totalPages}
        totalExams={totalExams}
        limit={PAGE_SIZE}
        onPageChange={setPage}
      />

      <ExamSearchFilters
        search={search}
        immutable={immutable}
        diplomaId={diplomaId}
        onApply={(newSearch, newImmutable, newDiplomaId) => {
          setSearch(newSearch);
          setImmutable(newImmutable);
          setDiplomaId(newDiplomaId);
          setPage(1);
        }}
        onClear={() => {
          setSearch("");
          setImmutable("");
          setDiplomaId("");
          setPage(1);
        }}
      />

      <ExamTable
        exams={exams}
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