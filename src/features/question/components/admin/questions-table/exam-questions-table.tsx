import { Plus, ArrowDownWideNarrow } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useExamQuestions } from "@/features/question/apis/queries/use-exam-questions";
import ExamQuestionRow from "./exam-question-row";

interface ExamQuestionsTableProps {
  examId: string;
  examTitle: string;
}

export default function ExamQuestionsTable({ examId,examTitle }: ExamQuestionsTableProps) {
  const navigate = useNavigate();
  const { data, isLoading } = useExamQuestions(examId);
  const questions = data?.payload?.questions ?? [];

  return (
    <div className="mx-6 mt-6 overflow-hidden  border border-gray-100">
      <div className="flex items-center justify-between bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
        Exam Questions
        <button
          type="button"
          onClick={() => navigate(`/admin/exam/exam-details/${examId}/questions/add`)}
          className="flex items-center gap-1 text-sm hover:opacity-80"
        >
          <Plus size={14} />
          Add Questions
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="flex items-center justify-end gap-1 text-right">
              Sort <ArrowDownWideNarrow size={14} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-gray-500">
                Loading...
              </TableCell>
            </TableRow>
          ) : questions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-gray-500">
                No questions found.
              </TableCell>
            </TableRow>
          ) : (
            questions.map((question) => (
              <ExamQuestionRow key={question.id} question={question} examId={examId} examTitle={examTitle}/>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}