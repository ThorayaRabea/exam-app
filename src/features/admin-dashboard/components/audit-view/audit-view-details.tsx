import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { IAuditLog } from "../../types/audit.log";
import { ActionBadge } from "../audit-log-list/action-badge-style";
import { ActionRole } from "../audit-log-list/action-role-style";


interface AuditViewProps {
  auditData: IAuditLog;
}

function formatDateTime(date: string) {
  const value = new Date(date);

  const time = value.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });

  const dateText = value.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    time,
    date: dateText,
  };
}

export default function AuditViewDatails({ auditData }: AuditViewProps) {
  const { time, date } = formatDateTime(auditData.createdAt);

  return (
    <div className="mx-6 mt-6 rounded-lg border border-gray-200 bg-white p-6">
      {/* Action */}
      <div className="mb-5">
        <p className="mb-1 text-xs text-gray-400">Action</p>

        <ActionBadge action={auditData.action} />
      </div>

      {/* Method */}
      <div className="mb-5">
        <p className="mb-1 text-xs text-gray-400">Method</p>

        <p className="text-sm font-medium text-gray-700">
          {auditData.httpMethod}
        </p>
      </div>

      {/* User */}
      <div className="mb-5">
        <p className="mb-2 text-xs text-gray-400">User</p>

        <div className="space-y-1 font-mono text-xs">
          <p className="text-gray-700">
            {auditData.actorUsername}
          </p>

          <p>
            <span className="text-gray-400">Email: </span>
            <span className="text-gray-600">
              {auditData.actorEmail}
            </span>
          </p>

          <p>
            <span className="text-gray-400">IP Address: </span>
            <span className="text-gray-600">
              {auditData.ipAddress}
            </span>
          </p>

          <p className="flex items-center gap-1">
            <span className="text-gray-400">Role: </span>
            <ActionRole actorRole={auditData.actorRole} />
          </p>
        </div>
      </div>

      {/* Entity */}
      <div className="mb-5">
        <p className="mb-2 text-xs text-gray-400">Entity</p>

        <p className="flex items-center gap-1 font-mono text-xs text-gray-700">
          <span>
            {auditData.entityType}: {auditData.entityId}
          </span>

          <Link
            to={`/admin/${auditData.entityType}/${auditData.entityId}`}
            className="text-gray-500 hover:text-blue-600"
          >
            <ExternalLink size={14} />
          </Link>
        </p>
      </div>

      {/* Date & Time */}
      <div className="mb-5">
        <p className="mb-1 text-xs text-gray-400">Date & Time</p>

        <p className="font-mono text-xs text-gray-700">
          {time} | {date}
        </p>
      </div>

      {/* Updated Fields */}
      {auditData.action === "UPDATE" ?  (
        <div className="mb-5">
          <p className="mb-1 text-xs text-gray-400">
            Updated Fields
          </p>

          <p className="font-mono text-xs text-gray-700">
            {auditData?.metadata?.keys.join(", ")}
          </p>
        </div>
      ) : null}

      {/* Metadata */}
      {auditData.metadata && (
        <div>
          <p className="mb-1 text-xs text-gray-400">Metadata</p>

          <pre className="overflow-x-auto rounded-none bg-gray-200 px-3 py-2 font-mono text-xs leading-5 text-gray-700">
         
            {auditData.metadata.title}
          </pre>
        </div>
      )}
    </div>
  );
}