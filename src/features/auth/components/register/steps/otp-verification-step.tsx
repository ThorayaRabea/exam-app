import { Button } from "@/components/ui/button/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { REGISTER_STEPS } from "@/features/auth/constants/form-constant";
import { useSendOTP } from "@/features/auth/hooks/use-send-otp";
import useVerifyEmail from "@/features/auth/hooks/use-verify-email";
import type { IRegisterData } from "@/features/auth/types/register";
import FormFeedback from "@/shared/components/form-feedback";
import SubHeading from "@/shared/components/sub-heading";
import { StepContext } from "@/stores/steps-register-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import {
  Controller,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import z from "zod";

const otpCodeSchema = z.object({
  code: z.string("Otp code is required").length(6, "Otp code must be 6 digits"),
});

type IOtpCodeFormValues = z.infer<typeof otpCodeSchema>;

export default function OtpVerificationStep() {
  //States
  const [secondsLeft, setSecondsLeft] = useState(60);
  //Mutation
  const { error, isPending, mutate: verifyEmailApi } = useVerifyEmail();
  const { mutate: sendOtpApi } = useSendOTP();

  // Hooks
  const { setStep } = useContext(StepContext);
  const { getValues } = useFormContext<IRegisterData>();

  //Form
  const { formState, control, handleSubmit } = useForm<IOtpCodeFormValues>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(otpCodeSchema),
  });

  //OnSubmit Function
  const onSubmit: SubmitHandler<IOtpCodeFormValues> = (values) => {
    verifyEmailApi(
      { email: getValues("email"), code: values.code },
      {
        onSuccess: () => {
          setStep(REGISTER_STEPS.INFORMATION);
        },
      },
    );
  };

  //Effects

  useEffect(() => {
    if (secondsLeft === 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    sendOtpApi(
      { email: getValues("email") },
      { onSuccess: () => setSecondsLeft(60) },
    );
  };
  return (
    <>
      {/* SubHeading */}
      <SubHeading>Verify OTP</SubHeading>

      {/* Description */}
      <p className="text-sm text-gray-500">
        Please enter the 6-digits code we have sent to:
        <br />
        <span className="text-gray-800">{getValues("email")}.</span>
        <Button
          variant="link"
          className="h-fit"
          onClick={() => setStep(REGISTER_STEPS.EMAIL)}
        >
          Edit
        </Button>
      </p>

      {/* Form */}
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label className="sr-only" id="otp-code">
            OTP Code
          </Label>
          {/* Field */}
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />

                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          {/* Error */}
          {formState.errors.code && (
            <FieldError>{formState.errors.code.message}</FieldError>
          )}
        </Field>
        {/* 60 seconds before sending another request */}
        {secondsLeft > 0 ? (
          <p className="text-sm text-gray-500 flex justify-center">
            you can request another code in: <span>{secondsLeft}s</span>
          </p>
        ) : (
          <Button
            variant="link"
            className="h-fit w-full "
            onClick={handleResend}
          >
            Resend code
          </Button>
        )}
        {/* feedback Error */}
        {error ? <FormFeedback>{error.message}</FormFeedback> : null}
        {/* Button */}
        <Button
          className="mt-4 w-full"
          type="submit"
          variant={"outline"}
          disabled={formState.isSubmitted && !formState.isValid}
          isLoading={isPending}
        >
          Verify OTP
        </Button>
      </form>
    </>
  );
}
