import Navbar from "@/shared/components/navbar/navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDiplomaDetails } from "../../apis/queries/use-diploma-details";
import EditDiplomaForm from "../../components/admin-diploma/diploma-details/edit-diploma-form";

export default function EditDiplomaPage() {
  const location = useLocation();

  const diplomaTitle =
    (location.state as { diplomaTitle?: string })?.diplomaTitle ?? "Diploma";

  const { diplomaId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useDiplomaDetails(diplomaId);
  const diploma = data?.payload?.diploma;

  const goBackToView = () =>
    navigate(`/admin/diploma/diploma-details/${diplomaId}`);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      <Navbar
        items={[
          { label: "Diplomas", to: "/admin/diploma" },
          { label: diplomaTitle, to: undefined },
        ]}
      />

      <EditDiplomaForm
        diploma={diploma}
        onCancel={goBackToView}
        onSaved={goBackToView}
      />
    </>
  );
}
