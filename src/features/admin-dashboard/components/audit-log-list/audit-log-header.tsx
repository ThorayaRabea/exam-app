import { Button } from "@/components/ui/button/button";
import { ChevronLeft, ChevronRight, Shredder } from "lucide-react";
import { useState } from "react";
import DeleteAllAuditLog from "../delete-all-audit-logs/delete-all-audit-logs";
import useUserProfile from "@/features/user/apis/queries/use-user-profile";
import { ROLES } from "@/features/user/constants/role-constant";

interface AuditAdminHeaderProps {
  page: number;
  totalPages: number;
  limit: number;
  totalAudits: number;
  onPageChange: (page: number) => void;
  // userRole: string;
}

export default function AuditLogHeader({
  page,
  totalAudits,
  limit,
  totalPages,
  onPageChange,
  // userRole,
}: AuditAdminHeaderProps) {
  //States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  //Queries
const {data}=useUserProfile()
const userRole=data?.payload?.user?.role??""
  console.log(userRole);
  return (
    <div className="mb-4 flex items-center justify-between border-y border-dotted py-4 px-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">
          1-{limit} of {totalAudits}
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
      {userRole === ROLES.ADMIN ? (
        <div className="flex items-center gap-2">
          <Button
            variant={"destructive"}
            type="button"
            className="ml-2 gap-1.5"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Shredder size={16} />
            Clear All Logs
          </Button>
        </div>
      ) : null}
      <DeleteAllAuditLog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
    </div>
  );
}
