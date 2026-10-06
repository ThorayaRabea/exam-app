import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { IExamItem } from "@/features/exam/types/exam";
import ExamSortDropdown from "./exam-sort-dropdown";
import ExamTableRow from "./exam-table-row";

interface ExamTableProps {
  exams: IExamItem[];
  isLoading: boolean;
  sortBy: string;
  sortOrder: string;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
}

export default function ExamTable({
  exams,
  isLoading,
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: ExamTableProps) {
  return (
    <div className="px-2">
      <Table className=" mt-6">
        <TableHeader className="bg-blue-600 ">
          <TableRow className="hover:bg-blue-600">
            <TableHead className=" text-white">Image</TableHead>
            <TableHead className=" text-white">Title</TableHead>
            <TableHead className=" text-white lg:table-cell hidden">Diploma</TableHead>
            <TableHead className=" text-white lg:table-cell hidden">No. of Questions</TableHead>
            <TableHead className="text-right">
              <ExamSortDropdown
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
          ) : exams.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No exams found.
              </TableCell>
            </TableRow>
          ) : (
            exams.map((exam) => (
              <ExamTableRow key={exam.id} exam={exam} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
