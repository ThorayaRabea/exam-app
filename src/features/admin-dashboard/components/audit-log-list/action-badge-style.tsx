import type { IAuditLog } from "../../types/audit.log";

interface ActionBadgeProps {
  action: IAuditLog["action"];
}

const actionStyles: Record<IAuditLog["action"], string> = {
  CREATE: "bg-green-50 text-green-700 ",
  UPDATE: "bg-yellow-50 text-yellow-700",
  DELETE: "bg-red-50 text-red-700",
  SET_IMMUTABLE: "bg-orange-50 text-orange-700",
  SEED_DATA: "bg-purple-50 text-purple-700",
};

export function ActionBadge({ action }: ActionBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-md  py-1 text-lg font-semibold ${actionStyles[action]}`}
    >
      {action}
    </span>
  );
}