import { TableCell, TableRow } from "@/components/ui/table";
import ExamRowActions from "./exam-row-actions";
import type { IExamItem } from "@/features/exam/types/exam";

interface ExamTableRowProps {
  exam: IExamItem;
}

export default function ExamTableRow({ exam }: ExamTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <img
          src={exam.image ?? ""}
          alt={exam.title}
          className="h-12 w-12 rounded-md object-cover"
        />
      </TableCell>
      <TableCell
        className=" font-medium text-gray-800"
        title={exam.title}
      >
        {exam.title}
      </TableCell>
      <TableCell className="hidden max-w-md lg:table-cell">
        <p className="line-clamp-none text-gray-500">{exam.diploma.title}</p>
      </TableCell>
      <TableCell className="hidden max-w-md lg:table-cell">
        <p className="line-clamp-5 text-gray-500">{exam.questionsCount}</p>
      </TableCell>
      <TableCell className="text-right">
        <ExamRowActions
          examId={exam.id}
          examTitle={exam.title}
          immutable={exam.immutable}
        />
      </TableCell>
    </TableRow>
  );
}
