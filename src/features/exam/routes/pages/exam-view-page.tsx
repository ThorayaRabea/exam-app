import ExamQuestionsTable from "@/features/question/components/admin/questions-table/exam-questions-table";
import EditDeleteImmutabilityButtons from "@/shared/components/edit-delete-immutability";
import Navbar from "@/shared/components/navbar/navbar";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { EXAM_KEY } from "../../apis/exam.keys";
import UseDeleteExam from "../../apis/mutations/use-delete-exam";
import UseExamDetails from "../../apis/queries/use-exam-details";
import ExamForm from "../../components/admin/exam-details/edit-exam-form";
import ExamDetailsPage from "../../components/admin/exam-details/exam-datails";

export default function ExamViewPage() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const examTitle =
    (location.state as { examTitle?: string })?.examTitle ?? "Exam";

  const { examId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading } = UseExamDetails(examId);
  const exam = data?.payload?.exam;

  const { mutate: deleteExamApI } = UseDeleteExam();

  function handleDeleteExam() {
    deleteExamApI(examId!, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: EXAM_KEY.all });
        navigate("/admin/exam");
        toast.success("exam has been deleted successfully", {
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
          { label: "exams", to: "/admin/exam" },
          { label: examTitle, to: undefined },
        ]}
      />

      {isEditing ? (
        <>
          <ExamForm exam={exam} onDone={() => setIsEditing(false)} />
          <ExamQuestionsTable examId={examId!} examTitle={examTitle} />
        </>
      ) : (
        <>
          <EditDeleteImmutabilityButtons
            title={examTitle}
            immutable={exam?.immutable ?? false}
            onEdit={() => setIsEditing(true)}
            onDelete={handleDeleteExam}
          />
          <ExamDetailsPage exam={exam} />
          <ExamQuestionsTable examId={examId!} examTitle={examTitle} />
        </>
      )}

    
    </>
  );
}
