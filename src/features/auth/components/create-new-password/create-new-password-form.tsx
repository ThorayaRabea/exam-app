import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FormFeedback from "@/shared/components/form-feedback";
import type { IErrorResponse } from "@/shared/types/api";
import { cn } from "@/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import type z from "zod";
import { useCreateNewPassword } from "../../hooks/use-create-new-password";
import { resetPasswordSchema } from "../../schemas/forgetPassword.schema";
import Footer from "../../shared/components/footer";

const createNewPasswordSchema = resetPasswordSchema.pick({
  newPassword: true,
  confirmPassword: true,
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type ICreateNewPasswordValues = z.infer<typeof createNewPasswordSchema>;

export default function CreateNewPasswordForm() {
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  //Mutation
  const {
    error,
    mutate: createNewPasswordApi,
    isPending,
  } = useCreateNewPassword();

  //Axios Error
  const apiError = error as AxiosError<IErrorResponse>;

  //UseForm
  const form = useForm<ICreateNewPasswordValues>({
    defaultValues: { newPassword: "", confirmPassword: "" },
    resolver: zodResolver(createNewPasswordSchema),
  });


  if (!token) {
    return (
      <FormFeedback>
        This reset link is invalid or has expired. Please request a new one.
      </FormFeedback>
    );
  }

  //Submit
  const onSubmit: SubmitHandler<ICreateNewPasswordValues> = (values) => {
    createNewPasswordApi({
      token:token,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    });
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Password Input field     */}
        <Field aria-invalid={!!form.formState.errors.newPassword}>
          <FieldLabel htmlFor="input-field-new-password " className="mt-4 ">
            New Password
          </FieldLabel>
          <div className="relative">
            {/* inputPassword */}
            <Input
              id="input-field-new-password"
              type={showPassword ? "text" : "password"}
              {...form.register("newPassword")}
            />
            {/* Toggle Password */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <Eye size={18} cursor={"pointer"} />
              ) : (
                <EyeOff size={18} cursor={"pointer"} />
              )}
            </button>
          </div>
          {/*Password Error */}
          <FieldError>{form.formState.errors.newPassword?.message}</FieldError>
        </Field>

        {/*confirm Password Input field     */}
        <Field aria-invalid={!!form.formState.errors.confirmPassword}>
          <FieldLabel htmlFor="input-field-confirm-password " className="mt-4 ">
            Confirm New Password
          </FieldLabel>
          <div className="relative">
            {/* inputPassword */}
            <Input
              id="input-field-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              {...form.register("confirmPassword")}
            />
            {/* Toggle Password */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? (
                <Eye size={18} cursor={"pointer"} />
              ) : (
                <EyeOff size={18} cursor={"pointer"} />
              )}
            </button>
          </div>
          {/*Password Error */}
          <FieldError>
            {form.formState.errors.confirmPassword?.message}
          </FieldError>
        </Field>

        {/* feedback Error */}
        {error ? (
          <FormFeedback>{apiError.response?.data.message}</FormFeedback>
        ) : null}

        {/*Reset Password button  */}
        <div className={cn("mt-4 ")}>
          <Button
            type="submit"
            className="w-full mt-4 "
            disabled={form.formState.isSubmitted && !form.formState.isValid}
            isLoading={isPending}
          >
            Reset Password
          </Button>
          {/* Footer */}
          <Footer className="mt-4 flex items-center justify-end  ">
            Don't have an account?
            <Button
              nativeButton={false}
              variant="link"
              render={
                <Link to="/auth/register" className=" hover:text-blue-700 ">
                  create yours
                </Link>
              }
            />
          </Footer>
        </div>
      </form>
    </>
  );
}
