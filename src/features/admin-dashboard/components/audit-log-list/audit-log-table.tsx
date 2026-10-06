import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IAuditLog } from "../../types/audit.log";
import AuditLogSortDropdown from "./audit-log-sort-dropdown";
import AuditLogTableRow from "./audit-log-table-row";

interface AuditLogTableProps {
  audits: IAuditLog[];
  isLoading: boolean;
  sortBy: string;
  sortOrder: string;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
}

export default function AuditLogTable({
  audits,
  isLoading,
 
  onSortByChange,
  onSortOrderChange,
}: AuditLogTableProps) {
  return (
    <div className="px-2">
      <Table className=" mt-6">
        <TableHeader className="bg-blue-600 ">
          <TableRow className="hover:bg-blue-600">
            <TableHead className=" text-white">Action</TableHead>
            <TableHead className=" text-white">User</TableHead>
            <TableHead className=" text-white">Entity</TableHead>
            <TableHead className=" text-white">Time</TableHead>
            <TableHead className="text-right">
              <AuditLogSortDropdown
                onSortByChange={onSortByChange}
                onSortOrderChange={onSortOrderChange}
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                Loading...
              </TableCell>
            </TableRow>
          ) : audits.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No audits found.
              </TableCell>
            </TableRow>
          ) : (
            audits.map((audit) => (
              <AuditLogTableRow key={audit.id} audit={audit} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
