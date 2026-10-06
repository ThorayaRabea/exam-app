import { useQuestionDetails } from "@/features/question/apis/queries/use-question-details";
import Navbar from "@/shared/components/navbar/navbar";
import { useNavigate, useParams } from "react-router-dom";
import EditQuestionForm from "./edit-question-form";


export default function QuestionEditPage() {
  const { examId, questionId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuestionDetails(questionId);
  const question = data?.payload?.question;

  const goBackToView = () =>
    navigate(`/admin/exam/exam-details/${examId}/questions/${questionId}`);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!question) return <div className="p-6">Question not found.</div>;

  return (
    <>
      <Navbar
        items={[
          { label: "Exams", to: "/admin/exam" },
          {
            label: question.exam?.title ?? "Exam",
            to: `/admin/exam/exam-details/${examId}`,
          },
          {
            label: question.text,
            to: `/admin/exam/exam-details/${examId}/questions/${questionId}`,
          },
          { label: "Edit", to: undefined },
        ]}
      />
      <EditQuestionForm
        question={question}
        examId={examId!}
        onDone={goBackToView}
      />
    </>
  );
}
