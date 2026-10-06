import CreateNewPasswordForm from "../../components/create-new-password/create-new-password-form";
import Heading from "../../shared/components/heading";

export default function CreateNewPasswordPage() {
  return (
    <>
      <Heading className=" font-bold text-3xl mb-10 ">
        Create New Password
      </Heading>
      <h3 className="text-gray-500 text-[16px]">Create a new strong password for your account.</h3>
      <CreateNewPasswordForm />
    </>
  );
}
