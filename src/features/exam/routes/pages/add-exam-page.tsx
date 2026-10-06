import { useNavigate } from "react-router-dom";
import Navbar from "@/shared/components/navbar/navbar";
import ExamForm from "../../components/admin/exam-details/edit-exam-form";

export default function AddExamPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        items={[
          { label: "Exams", to: "/admin/exam" },
          { label: "Create New Exam", to: undefined },
        ]}
      />
      <ExamForm onDone={() => navigate("/admin/exam")} />
    </>
  );
}