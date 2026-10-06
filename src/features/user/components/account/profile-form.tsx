import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { PhoneInput } from "@/components/ui/phone-input";
import ChangeEmailModal from "./change-email-steps/change-email-modal";
import DeleteAccountModal from "./delete-account-modal";
import useUserProfile from "../../apis/queries/use-user-profile";

interface IProfileFormValues {
  firstName: string;
  lastName: string;
  profilePhoto?:string;
  phone: string;
}

export default function ProfileForm() {

 const { data: userProfile } = useUserProfile();
 const userInfo = userProfile?.payload?.user;

 console.log(userInfo?.firstName);
 

  const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);


  const { register, control, handleSubmit, formState: { errors },reset } =
    useForm<IProfileFormValues>({
      defaultValues: {
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        phone:userInfo?.phone,
        
      },
    });

  const onSubmit = (values: IProfileFormValues) => {
    console.log(values);
    // TODO: useMutation بتاعة PATCH /api/users/profile
  };


  useEffect(() => {
  if (userInfo) {
    reset({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      phone: userInfo.phone ?? "",
    });
  }
}, [userInfo, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border border-gray-200 p-6">
        <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="firstName">First name</FieldLabel>
            <Input id="firstName" {...register("firstName", { required: "First name is required" })} />
            <FieldError>{errors.firstName?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="lastName">Last name</FieldLabel>
            <Input id="lastName" {...register("lastName", { required: "Last name is required" })} />
            <FieldError>{errors.lastName?.message}</FieldError>
          </Field>
        </FieldGroup>

        <Field className="mt-4">
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" placeholder={userInfo?.username} disabled />
        </Field>

        <Field className="mt-4">
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <button
              type="button"
              onClick={() => setIsChangeEmailOpen(true)}
              className="flex items-center  gap-1 text-sm text-blue-600 hover:underline"
            >
              <Pencil size={14}  className="cursor-pointer"/>
              Change
            </button>
          </div>
          <Input id="email" value={userInfo?.email??''} readOnly />
        </Field>

        <Field className="mt-4">
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput {...field} defaultCountry="EG" placeholder={userInfo?.phone} />
            )}
          />
          <FieldError>{errors.phone?.message}</FieldError>
        </Field>

        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="destructive"
            className="flex-1 bg-red-50 text-red-600 hover:bg-red-100"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete My Account
          </Button>
          <Button type="submit" className="flex-1">
            Save Changes
          </Button>
        </div>
      </form>

      <ChangeEmailModal
        open={isChangeEmailOpen}
        onOpenChange={setIsChangeEmailOpen}
        currentEmail={userInfo?.email??''}
      />
      <DeleteAccountModal open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
    </>
  );
}