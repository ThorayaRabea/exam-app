import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/features/auth/hooks/use-register";
import { registerSchema } from "@/features/auth/schemas/rigester.schema";
import type { IRegisterData } from "@/features/auth/types/register";
import FormFeedback from "@/shared/components/form-feedback";
import SubHeading from "@/shared/components/sub-heading";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext, type SubmitHandler } from "react-hook-form";
import z from "zod";

const PasswordSchema = registerSchema
  .pick({
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type IPasswordFormValues = z.infer<typeof PasswordSchema>;

export default function IformationStep() {
  // Hooks

  const { getValues, setValue } = useFormContext<IRegisterData>();
  const { isPending, error, mutate: registerApi } = useRegister();

  //Form
  const { formState, handleSubmit, register } = useForm<IPasswordFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(PasswordSchema),
  });

  //OnSubmit Function
  const onSubmit: SubmitHandler<IPasswordFormValues> = (values) => {
    setValue("password", values.password);
    setValue("confirmPassword", values.confirmPassword);
    const allFormValues = { ...getValues(), ...values };
    registerApi(allFormValues);
  };

  return (
    <>
      {/* SubHeading */}
      <SubHeading>Create a strong password</SubHeading>

      {/* Form */}
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Password Field */}
        <Field className="mt-4">
          <FieldLabel htmlFor="input-field-password " className="size-4 ">
            Password<span className="text-red-500   ">*</span>
          </FieldLabel>
          <Input
            id="input-field-password"
            type="password"
            {...register("password")}
          />
          {/*Password Error */}
          <FieldError>{formState.errors.password?.message}</FieldError>
        </Field>

        {/*Confirm Password Field */}
        <Field className="mt-4">
          <FieldLabel htmlFor="input-field-confirmPassword" className="size-4 ">
            Confirm Password<span className="text-red-500   ">*</span>
          </FieldLabel>
          <Input
            id="input-field-confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {/*confirm Error */}
          <FieldError>{formState.errors.confirmPassword?.message}</FieldError>
        </Field>

        {/* feedback Error */}
        {error ? <FormFeedback>{error.message}</FormFeedback> : null}
        {/* Button */}
        <Button
          className="mt-4 w-full"
          type="submit"
          variant={"default"}
          disabled={(formState.isSubmitted && !formState.isValid) || isPending}
          isLoading={isPending}
        >
          Create Account
        </Button>
      </form>
    </>
  );
}
