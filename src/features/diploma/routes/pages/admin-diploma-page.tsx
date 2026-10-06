import Navbar from "@/shared/components/navbar/navbar";
import DiplomaAdminTable from "../../components/admin-diploma/diplomas-and-filter/diploma-admin-table";

export default function AdminDiplomaPage() {
  return (
    <>
      <Navbar items={[{ label: "Diplomas" }]} />

      <DiplomaAdminTable />
    </>
  );
}
