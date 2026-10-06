import { Button } from "@/components/ui/button/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { REGISTER_STEPS } from "@/features/auth/constants/form-constant";
import { registerSchema } from "@/features/auth/schemas/rigester.schema";
import type { IRegisterData } from "@/features/auth/types/register";
import SubHeading from "@/shared/components/sub-heading";
import { StepContext } from "@/stores/steps-register-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useContext } from "react";
import {
  Controller,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import z from "zod";

const InformationSchema = registerSchema.pick({
  firstName: true,
  lastName: true,
  username: true,
  phone: true,
});
type IInformationFormValues = z.infer<typeof InformationSchema>;

export default function IformationStep() {
  // Hooks
  const { setStep } = useContext(StepContext);
  const { getValues, setValue } = useFormContext<IRegisterData>();

  //Form
  const { formState, handleSubmit, control, register } =
    useForm<IInformationFormValues>({
      defaultValues: {
        firstName: "",
        lastName: "",
        username: "",
        phone: "",
      },
      resolver: zodResolver(InformationSchema),
    });

  //OnSubmit Function
  const onSubmit: SubmitHandler<IInformationFormValues> = (values) => {
    setValue("firstName", values.firstName);
    setValue("lastName", values.lastName);
    setValue("username", values.username);
    setValue("phone", values.phone);
    setStep(REGISTER_STEPS.PASSWORD);
  };

  return (
    <>
      {/* SubHeading */}
      <SubHeading>Tell us more about you</SubHeading>

      {/* Form */}
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        {/* First and Last name Fields */}
        <FieldGroup className="grid grid-cols-2 gap-2">
          <Field>
            <FieldLabel htmlFor="input-field-firstName " className="size-4 ">
              First name<span className="text-red-500   ">*</span>
            </FieldLabel>
            <Input
              id="input-field-firstName"
              type="text"
              {...register("firstName")}
            />
            {/*First Name Error */}
            <FieldError>{formState.errors.firstName?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="input-field-lastName" className="size-4 ">
              Last name<span className="text-red-500   ">*</span>
            </FieldLabel>
            <Input
              id="input-field-lastName"
              type="text"
              {...register("lastName")}
            />
            {/*Last Name Error */}
            <FieldError>{formState.errors.lastName?.message}</FieldError>
          </Field>
        </FieldGroup>
        {/* User Name Field */}
        <Field className="mt-4">
          <FieldLabel htmlFor="input-field-username " className="size-4 ">
            Username<span className="text-red-500   ">*</span>
          </FieldLabel>
          <Input
            id="input-field-username"
            type="text"
            {...register("username")}
          />
          {/*Username Error */}
          <FieldError>{formState.errors.username?.message}</FieldError>
        </Field>
        {/*Phone Field */}
        <Field className="mt-4">
          <FieldLabel htmlFor="input-field-phone " className="size-4 ">
            Phone
          </FieldLabel>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                {...field}
                defaultCountry="EG"
                placeholder="1012345678"
              />
            )}
          />

          {/*Phone Error */}
          <FieldError>{formState.errors.phone?.message}</FieldError>
        </Field>

        {/* Button */}
        <Button
          className="mt-4 w-full"
          type="submit"
          variant={"outline"}
          disabled={formState.isSubmitted && !formState.isValid}
        >
          {" "}
          Next <ChevronRight />
        </Button>
      </form>
    </>
  );
}
