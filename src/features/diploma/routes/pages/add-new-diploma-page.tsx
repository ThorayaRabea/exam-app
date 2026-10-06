import Navbar from "@/shared/components/navbar/navbar";
import AddNewDiplomaDitails from "../../components/admin-diploma/add-new-diploma/add-new-diploma-details";

export default function AddNewDiplomaPage() {
  return (
    <>
      <Navbar
        items={[
          { label: "Diplomas", to: "/admin/diploma" },
          { label: "Add New Diploma", to: undefined },
        ]}
      />

      <AddNewDiplomaDitails />
    </>
  );
}
