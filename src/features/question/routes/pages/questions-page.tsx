import Navbar from "@/shared/components/navbar/navbar";

import { useLocation } from "react-router-dom";

import ExamQuestions from "../../components/exam-questions";

export default function QuestionsPage() {
  const location = useLocation();
  const diplomaTitle =
    (location.state as { diplomaTitle?: string })?.diplomaTitle ?? "Diploma";

  const examName =
    (location.state as { examName?: string })?.examName ?? "Exam";
  return (
    <>
      <Navbar
        items={[
          { label: "Diplomas", to: "/user/diploma" },
          { label: diplomaTitle, to: undefined },
          { label: examName },
        ]}
      />
      <ExamQuestions />
    </>
  );
}
