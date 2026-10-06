import { Button } from "@/components/ui/button/button";
import { useQuestionDetails } from "@/features/question/apis/queries/use-question-details";
import { ExternalLink, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { IAuditLog } from "../../types/audit.log";
import { ROLES } from "@/features/user/constants/role-constant";
import AuditViewDatails from "./audit-view-details";
import { useState } from "react";
import DeleteOneAuditLog from "../delete-one-audit-log/delete-one-audit-log";

interface AuditViewProps {
  auditData: IAuditLog;

  onDelete: () => void;
}

export default function AuditView({ auditData}: AuditViewProps) {
   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const isQuestion = auditData.category === "QUESTION";
  const { data } = useQuestionDetails(
    auditData.category === "QUESTION" ? auditData.entityId : undefined,
  );
  const examId = data?.payload?.question?.examId;
  return (<>
    <div className="flex items-center justify-between border border-gray-200 bg-white px-4 py-2">
      <div>
        <h2>
          ` ${auditData?.category} ${auditData?.action} By $
          {auditData?.actorUsername}`,
        </h2>
        <Button
          nativeButton={false}
          variant="link"
          render={
            isQuestion ? (
              <Link
                to={`/admin/exam/exam-details/${examId}/questions/${auditData?.entityId}`}
                className=" hover:text-blue-700 hover:underline! text-gray-400 text-sm"
              >
                Entity: {auditData?.category}({auditData?.entityId})
                <ExternalLink size={14} />
              </Link>
            ) : (
              <Link
                to={`/admin/${auditData?.entityType}/${auditData?.entityType}-details/${auditData?.entityId}`}
                className=" hover:text-blue-700 hover:underline! text-gray-400 text-sm"
              >
                Entity: {auditData?.category}({auditData?.entityId})
                <ExternalLink size={14} />
              </Link>
            )
          }
        ></Button>
      </div>

      <div className="flex items-center gap-2">

        {ROLES.ADMIN=== auditData?.actorRole?   <Button
          type="button"
           onClick={() => setIsDeleteOpen(true)}
          className="flex items-center gap-2 bg-red-600 px-3 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 size={14} />
          Delete
        </Button>:null}
      


      </div>
    </div>
    <AuditViewDatails auditData={auditData} />
    <DeleteOneAuditLog open={isDeleteOpen??false} onOpenChange={setIsDeleteOpen} id={auditData.id}/>
  </>);
}
