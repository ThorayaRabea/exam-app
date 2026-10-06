import EditDeleteImmutabilityButtons from "@/shared/components/edit-delete-immutability";
import Navbar from "@/shared/components/navbar/navbar";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import useDeleteQuestion from "../../../apis/mutations/use-delete-question";
import { useQuestionDetails } from "../../../apis/queries/use-question-details";
import QuestionDetails from "./question-details";

export default function QuestionViewPage() {
  const { examId, questionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const examTitle =
    (location.state as { examTitle?: string })?.examTitle ?? "Exam";

  const { data, isLoading } = useQuestionDetails(questionId);
  const question = data?.payload?.question;

  const { mutate: deleteQuestion } = useDeleteQuestion();

  function handleDeleteQuestion() {
    deleteQuestion(questionId!, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["questions", "list", examId],
        });
        navigate(`/admin/exam/exam-details/${examId}`);
        toast.success("Question has been deleted successfully", {
          duration: 4000,
        });
      },
    });
  }

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      <Navbar
        items={[
          { label: "Exams", to: "/admin/exam" },
          {
            label: examTitle,
            to: `/admin/exam/exam-details/${examId}`,
          },
          { label: "Questions", to: `/admin/exam/exam-details/${examId}` },
          { label: question?.text ?? "Question", to: undefined },
        ]}
      />
      <EditDeleteImmutabilityButtons
        title={question?.text ?? ""}
        immutable={question?.immutable ?? false}
        onEdit={() =>
          navigate(
            `/admin/exam/exam-details/${examId}/questions/${questionId}/edit`,
          )
        }
        onDelete={handleDeleteQuestion}
      />
      <QuestionDetails question={question} examId={examId!} />
    </>
  );
}
