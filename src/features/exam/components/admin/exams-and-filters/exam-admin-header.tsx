import { Button } from "@/components/ui/button/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExamAdminHeaderProps {
  page: number;
  totalPages: number;
  limit: number;
  totalExams: number;
  onPageChange: (page: number) => void;
}

export default function ExamAdminHeader({
  page,
  totalPages,
  limit,
  totalExams,
  onPageChange,
}: ExamAdminHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="mb-4 flex items-center justify-between border-y border-dotted py-4 px-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">
          1-{limit} of {totalExams}
        </span>
        <div className="flex items-center">
          <Button
            type="button"
            variant="secondary"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="rounded p-1 hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="flex  items-center border border-x-0 px-3 py-3 text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          <Button
            type="button"
            variant="secondary"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="rounded p-1 hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          className="ml-2 gap-1.5 bg-emerald-500"
          onClick={() => navigate("/admin/exam/add-exam")}
        >
          <Plus size={16} />
          Add New Exam
        </Button>
      </div>
    </div>
  );
}
