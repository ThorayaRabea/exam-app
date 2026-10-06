import type { IQuestion } from "@/features/question/types/questions";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface QuestionDetailsProps {
  question?: IQuestion;
  examId: string;

}

export default function QuestionDetails({ question, examId}: QuestionDetailsProps) {
  return (
    <div className="mx-6 mt-6 bg-white p-4">
      <p className="mb-1 text-[16px] font-mono text-gray-400">Headline</p>
      <p className="text-[16px] font-mono text-gray-900">{question?.text}</p>

      <div className="mt-3">
        <p className="mb-1 text-[16px] font-mono text-gray-400">Exam</p>
        <Link
          to={`/admin/exam/exam-details/${examId}`}
          className="flex items-center gap-1 text-[16px] font-mono text-blue-600 hover:underline"
        >
          {question?.exam?.title}
          <ExternalLink size={14} />
        </Link>
      </div>

      <div className="mt-3">
        <p className="mb-1 text-[16px] font-mono text-gray-400">Answers</p>
        <p className="text-[16px] font-mono text-gray-900">
          {question?.answers.length ?? 0}
        </p>
      </div>
    </div>
  );
}