import EditDeleteImmutabilityButtons from "@/shared/components/edit-delete-immutability";
import Navbar from "@/shared/components/navbar/navbar";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { DIPLOMA_KEY } from "../../apis/diploma.key";
import UseDeleteDiploma from "../../apis/mutations/use-delete-diploma";
import UseImmutableDiploma from "../../apis/mutations/use-immutable-diploma";
import { useDiplomaDetails } from "../../apis/queries/use-diploma-details";
import DiplomaDetails from "../../components/admin-diploma/diploma-details/diploma-details";
import EditDiplomaForm from "../../components/admin-diploma/diploma-details/edit-diploma-form";

export default function DiplomaViewPage() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const diplomaTitle =
    (location.state as { diplomaTitle?: string })?.diplomaTitle ?? "Diploma";

  const { diplomaId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading } = useDiplomaDetails(diplomaId);
  const diploma = data?.payload?.diploma;

  const { mutate: deleteDiplomaApI } = UseDeleteDiploma();
  const { mutate: immutableDiploma } = UseImmutableDiploma();

  function handleDeleteDiploma() {
    deleteDiplomaApI(diplomaId!, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: DIPLOMA_KEY.all });
        navigate("/admin/diploma");
        toast.success("diploma has been deleted successfully", {
          duration: 4000,
        });
      },
    });
  }

  function handelImmutableDiploma() {
    immutableDiploma(diplomaId!, {
      onSuccess: () => {
        setIsEditing(true);
        queryClient.invalidateQueries({ queryKey: DIPLOMA_KEY.all });
        toast.success("diploma has been made immutable successfully", {
          duration: 4000,
        });
      },
    });
  }

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

      {isEditing ? (
        <EditDiplomaForm
          diploma={diploma}
          onCancel={() => setIsEditing(false)}
          onSaved={() => setIsEditing(false)}
        />
      ) : (
        <>
          <EditDeleteImmutabilityButtons
            title={diplomaTitle}
            immutable={diploma?.immutable ?? false}
            onEdit={() => setIsEditing(true)}
            onDelete={handleDeleteDiploma}
            onImmutable={handelImmutableDiploma}
          />
          <DiplomaDetails diploma={diploma} />
        </>
      )}
    </>
  );
}
