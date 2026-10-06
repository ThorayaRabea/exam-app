import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PASSWORD_STEPS } from "@/features/auth/constants/form-constant";
import { useForgetPassword } from "@/features/auth/hooks/use-forget-password";
import { forgetPasswordSchema } from "@/features/auth/schemas/forgetPassword.schema";
import Footer from "@/features/auth/shared/components/footer";
import Heading from "@/features/auth/shared/components/heading";
import FormFeedback from "@/shared/components/form-feedback";
import { cn } from "@/shared/utils";
import { StepPasswordContext } from "@/stores/steps-password-context";
import { ChevronRight } from "lucide-react";
import { useContext, useEffect } from "react";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import type z from "zod";

const emailStepSchema = forgetPasswordSchema.pick({ email: true });
export type IEmailStepValue = z.infer<typeof emailStepSchema>;
export default function ForgetPassword() {
  // Hooks
  const { setStep } = useContext(StepPasswordContext);
  //Mutation
  const { mutate: forgetPasswordApi, error, isPending } = useForgetPassword();

  //useForm
  const form = useFormContext<IEmailStepValue>();

  ////  submit function/////
  const onSubmit: SubmitHandler<IEmailStepValue> = (values) => {
    forgetPasswordApi(
      {
        email: values.email,
        redirectUrl: `${window.location.origin}/auth/reset-password`,
      },
      {
        onSuccess: () => setStep(PASSWORD_STEPS.PASSWORD_RESET_SEND),
      },
    );
  };

  // Effects
  useEffect(() => {
    form.setFocus("email");
  }, [form.setFocus]);

  return (
    <>
      <Heading className=" font-bold text-3xl mb-2.5">Forget Password</Heading>
      <h3 className="text-gray-500 text-[16px]">
        Don’t worry, we will help you recover your account.
      </h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
        {/* Input Email Field */}
        <Field aria-invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="input-field-username">Email</FieldLabel>
          <Input
            id="input-field-username"
            type="email"
            {...form.register("email")}
          />
          {/* Email Error */}
          {form.formState.errors.email && (
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          )}
        </Field>

        {/* Feedback Error */}
        {error ? <FormFeedback>{error?.message}</FormFeedback> : null}

        {/*Next Button */}
        <div className={cn("mt-4 ")}>
          <Button
            type="submit"
            className="w-full mt-4 "
            variant="outline"
            disabled={
              (form.formState.isSubmitted && !form.formState.isValid) ||
              isPending
            }
            isLoading={isPending}
          >
            Next <ChevronRight />
          </Button>

          {/* Footer */}
          <Footer className="mt-4 flex items-center justify-end  ">
            Don't have an account?
            <Button
              nativeButton={false}
              variant="link"
              render={
                <Link to="/auth/register" className=" hover:text-blue-700 ">
                  Create yours
                </Link>
              }
            />
          </Footer>
        </div>
      </form>
    </>
  );
}
