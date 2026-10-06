import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IDiplomaItem } from "@/features/diploma/types/diploma";
import DiplomaSortDropdown from "./diploma-sort-dropdown";
import DiplomaTableRow from "./diploma-table-row";

interface DiplomaTableProps {
  diplomas: IDiplomaItem[];
  isLoading: boolean;
  sortBy: string;
  sortOrder: string;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
}

export default function DiplomaTable({
  diplomas,
  isLoading,
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: DiplomaTableProps) {
  return (
    <div className="px-2 ">
      <Table className=" mt-6   ">
        <TableHeader className="bg-blue-600 ">
          <TableRow className="hover:bg-blue-600">
            <TableHead className=" text-white">Image</TableHead>
            <TableHead className=" text-white">Title</TableHead>
            <TableHead className=" hidden text-white lg:table-cell">Description</TableHead>
            <TableHead className="text-right">
              <DiplomaSortDropdown
                sortBy={sortBy}
                sortOrder={sortOrder}
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
          ) : diplomas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No diplomas found.
              </TableCell>
            </TableRow>
          ) : (
            diplomas.map((diploma) => (
              <DiplomaTableRow key={diploma.id} diploma={diploma} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
