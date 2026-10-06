import Navbar from "@/shared/components/navbar/navbar";
import { useLocation } from "react-router-dom";
import ResultPage from "../../component/result/result-page";

export default function SubmissionPage() {
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
      <ResultPage />
    </>
  );
}
