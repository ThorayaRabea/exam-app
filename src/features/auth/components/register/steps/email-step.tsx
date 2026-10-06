import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { REGISTER_STEPS } from "@/features/auth/constants/form-constant";
import { useSendOTP } from "@/features/auth/hooks/use-send-otp";
import { registerSchema } from "@/features/auth/schemas/rigester.schema";

import Footer from "@/features/auth/shared/components/footer";
import type { IRegisterData } from "@/features/auth/types/register";

import { cn } from "@/shared//lib/tailwind-merge";
import FormFeedback from "@/shared/components/form-feedback";
import { StepContext } from "@/stores/steps-register-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useContext, useEffect } from "react";
import { useForm, useFormContext, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import type z from "zod";

// Email Schema
const emailStepSchema = registerSchema.pick({ email: true });
export type IEmailStepValue = z.infer<typeof emailStepSchema>;

export default function EamilStep() {
  // Hooks
  const { setStep } = useContext(StepContext);
  const { setValue } = useFormContext<IRegisterData>();
  const { mutate, isPending, error } = useSendOTP();

  //useForm
  const form = useForm<IEmailStepValue>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailStepSchema),
  });

  ////  submit function/////
  const onSubmit: SubmitHandler<IEmailStepValue> = (values) => {
    mutate(
      { email: values.email },
      {
        onSuccess: () => {
          setStep(REGISTER_STEPS.OTP_VERIFICATION);
          setValue("email", values.email);
        },
      },
    );
  };

  // Effects
  useEffect(() => {
    form.setFocus("email");
  }, [form.setFocus]);

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
            isLoading={isPending}
          >
            Next <ChevronRight />
          </Button>

          {/* Footer */}
          <Footer className="mt-4 flex items-center justify-end  ">
            Already have an account?
            <Button
              nativeButton={false}
              variant="link"
              render={
                <Link to="/auth/login" className=" hover:text-blue-700 ">
                  Login
                </Link>
              }
            />
          </Footer>
        </div>
      </form>
    </>
  );
}
