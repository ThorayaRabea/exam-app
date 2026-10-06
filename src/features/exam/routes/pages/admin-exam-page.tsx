import Navbar from "@/shared/components/navbar/navbar";
import ExamAdminTable from "../../components/admin/exams-and-filters/exam-admin-table";

export default function AdminExamPage() {
  return (
    <>
    <Navbar
            items={[
              { label: "exams", to:undefined },
          
            ]}
          />
      <ExamAdminTable />
    </>
  );
}
