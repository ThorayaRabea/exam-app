import type { IAuditLog } from "../../types/audit.log";

interface ActionRoleProps {
  actorRole: IAuditLog["actorRole"];
}

const actionStyles: Record<IAuditLog["actorRole"], string> = {
  ADMIN: "bg-blue-50 text-blue-700",
  SUPER_ADMIN: "bg-red-50 text-red-700",
 
};

export function ActionRole({ actorRole }: ActionRoleProps) {
  return (
    <span
      className={`inline-flex rounded-md  py-1 text-sm  ${actionStyles[actorRole]}`}
    >
      {actorRole}
    </span>
  );
}