import ExamQuestionsTable from "@/features/question/components/admin/questions-table/exam-questions-table";
import Navbar from "@/shared/components/navbar/navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UseExamDetails from "../../apis/queries/use-exam-details";
import ExamForm from "../../components/admin/exam-details/edit-exam-form";

export default function EditExamPage() {
  const location = useLocation();

  const examTitle =
    (location.state as { examTitle?: string })?.examTitle ?? "Exam";

  const { examId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = UseExamDetails(examId);
  const exam = data?.payload?.exam;

  const goBackToView = () => navigate(`/admin/exam`);

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

      <ExamForm exam={exam} onDone={goBackToView} />
      <ExamQuestionsTable examId={examId!} examTitle={examTitle} />
    </>
  );
}
