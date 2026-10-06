import Navbar from "@/shared/components/navbar/navbar";
import DiplomaList from "../../components/user-diploma/diploma-list";

export default function DiplomaPage() {
  return (
    <>
      <Navbar items={[{ label: "Diplomas" }]} />

      <DiplomaList />
    </>
  );
}
