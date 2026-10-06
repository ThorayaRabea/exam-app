import { ROLES } from "@/features/user/constants/role-constant";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, MoreVertical, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ADMIN_KEY } from "../../apis/admin.keys";
import UseDeleteAuditLogById from "../../apis/mutations/use-delete-audit-log-id";

interface AuditRowActionsProps {
  auditId: string;
  auditEntityTitle: string;
  userRole: string;
}

export default function AuditRowActions({
  auditId,
  auditEntityTitle,
  userRole,
}: AuditRowActionsProps) {
  //States
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  //Navigation
  const navigate = useNavigate();
  //Querries
  const queryClient = useQueryClient();
  //Mutation
  const { mutate: deleteAuditLogByIdAPI } = UseDeleteAuditLogById();
  function handleDeleteAuditLog() {
    deleteAuditLogByIdAPI(auditId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ADMIN_KEY.all });
        toast.success("audit has been deleted successfully", {
          duration: 4000,
        });
      },
    });
  }

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded p-1 text-gray-400 hover:bg-gray-100"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full z-10 w-32 rounded-lg border border-gray-100 bg-white py-1.5 shadow-lg"
        >
          <button
            type="button"
            onClick={() =>
              navigate(`/admin/logs/${auditId}`, {
                state: {
                  auditEntityTitle: auditEntityTitle,
                 
                },
              })
            }
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-emerald-600 hover:bg-emerald-50"
          >
            <Eye size={14} />
            View
          </button>
          {userRole === ROLES.SUPER_ADMIN ? (
            <button
              type="button"
              onClick={() => handleDeleteAuditLog()}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 size={14} />
              Delete
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
