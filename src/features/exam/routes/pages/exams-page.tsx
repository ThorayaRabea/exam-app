// exams-page.tsx
import Navbar from "@/shared/components/navbar/navbar";
import { useLocation } from "react-router-dom";
import ExamList from "../../components/list/exam-list";

export default function ExamsPage() {
  const location = useLocation();
  const diplomaTitle =
    (location.state as { diplomaTitle?: string })?.diplomaTitle ?? "Diploma";

  return (
    <>
      <Navbar
        items={[
          { label: "Diplomas", to: "/user/diploma" },
          { label: diplomaTitle, to: undefined },
          { label: "Exams" },
        ]}
      />

      <ExamList />
    </>
  );
}
