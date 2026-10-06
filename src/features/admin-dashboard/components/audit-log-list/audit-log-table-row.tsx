import { TableCell, TableRow } from "@/components/ui/table";
import type { IAuditLog } from "../../types/audit.log";
import { ActionBadge } from "./action-badge-style";
import { ActionRole } from "./action-role-style";
import AuditRowActions from "./audit-row-action";
interface AuditLogTableRowProps {
  audit: IAuditLog;
}
export default function AuditLogTableRow({ audit }: AuditLogTableRowProps) {
  return (
    <TableRow>
      <TableCell className=" font-medium text-gray-800">
        <ActionBadge action={audit.action} />{" "}
        <div className="mt-1 text-sm text-gray-500">
          Method: {audit.httpMethod}
        </div>
      </TableCell>

      <TableCell className="max-w-md">
        <p className="line-clamp-none text-black text-lg">{audit.actorUsername}</p>
        <p className="line-clamp-none text-gray-500">{audit.actorEmail}</p>
        <ActionRole actorRole={audit.actorRole} />
      </TableCell>
      <TableCell className="max-w-md">
        <p className="line-clamp-5 text-black text-lg ">{audit.entityType}</p>
        <p className="line-clamp-5 text-gray-500 ">{audit.entityId}</p>
      </TableCell>
      <TableCell className="max-w-md">
        <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-800">
      {new Date(audit.createdAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      })}
    </span>

    <span className="text-sm text-gray-500">
      {new Date(audit.createdAt).toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </span>
  </div>
      </TableCell>

      <TableCell className="text-right">
        <AuditRowActions
          auditId={audit.id}
          auditEntityTitle={audit.entityType}
          userRole={audit.actorRole}
          // auditAction={audit.action}
          // auditName={audit.actorUsername}
          // auditEntityId={audit.entityId}
        />
      </TableCell>
    </TableRow>
  );
}
