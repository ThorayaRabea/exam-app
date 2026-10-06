import { TableCell, TableRow } from "@/components/ui/table";
import type { IQuestion } from "@/features/question/types/questions";
import ExamQuestionRowActions from "./exam-question-row-actions";

interface ExamQuestionRowProps {
  question: IQuestion;
  examId: string;
  examTitle: string;
}

export default function ExamQuestionRow({ question, examId,examTitle }: ExamQuestionRowProps) {
  return (
    <TableRow>
      <TableCell className="text-gray-800">{question.text}</TableCell>
      <TableCell className="text-right">
        <ExamQuestionRowActions questionId={question.id} examId={examId} examTitle={examTitle} />
      </TableCell>
    </TableRow>
  );
}