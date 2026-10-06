import { Button } from "@/components/ui/button/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useSendNewOTP } from "@/features/user/apis/mutation/use-send-new-otp";
import { useVerfiyNewOTP } from "@/features/user/apis/mutation/use-verify-new-otp";
import SubHeading from "@/shared/components/sub-heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { Stepper } from "./step-progress";
import FormFeedback from "@/shared/components/form-feedback";
import { toast } from "sonner";

interface OtpVerificationStepProps {
  newEmail: string;
  onEdit: () => void;
  onVerified: () => void;
}

const otpCodeSchema = z.object({
  code: z.string("Otp code is required").length(6, "Otp code must be 6 digits"),
});

type IOtpCodeFormValues = z.infer<typeof otpCodeSchema>;

export default function OtpVerificationStep({
  newEmail,
  onEdit,
  onVerified,
}: OtpVerificationStepProps) {
  const [secondsLeft, setSecondsLeft] = useState(60);

  const { error, isPending, mutate: verifyNewEmailApi } = useVerfiyNewOTP();
  const { mutate: sendNewOtpApi } = useSendNewOTP();

  const { formState, control, handleSubmit } = useForm<IOtpCodeFormValues>({
    defaultValues: { code: "" },
    resolver: zodResolver(otpCodeSchema),
  });

const onSubmit: SubmitHandler<IOtpCodeFormValues> = (values) => {
  verifyNewEmailApi(
    { code: values.code },
    {
      onSuccess: () => {
        toast.success("Email changed successfully");
        onVerified();
      },
    },
  );
};

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    sendNewOtpApi(
      { newEmail },
      { onSuccess: () => setSecondsLeft(60) },
    );
  };

  return (
    <>
      <Stepper currentStep={2} />
      <DialogHeader>
        <DialogTitle>Change Email</DialogTitle>
      </DialogHeader>
      <SubHeading>Verify OTP</SubHeading>

      <p className="text-sm text-gray-500">
        Please enter the 6-digits code we have sent to:
        <br />
        <span className="text-gray-800">{newEmail}.</span>
        <Button variant="link" className="h-fit" onClick={onEdit}>
          Edit
        </Button>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Field>
          <Label className="sr-only" id="otp-code">OTP Code</Label>
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
          {formState.errors.code && (
            <FieldError>{formState.errors.code.message}</FieldError>
          )}
        </Field>

        {secondsLeft > 0 ? (
          <p className="text-sm text-gray-500 flex justify-center">
            you can request another code in: <span>{secondsLeft}s</span>
          </p>
        ) : (
          <Button variant="link" className="h-fit w-full" onClick={handleResend}>
            Resend code
          </Button>
        )}

        {error ? <FormFeedback>{error.message}</FormFeedback> : null}

        <Button
          className="mt-4 w-full"
          type="submit"
          variant="outline"
          disabled={formState.isSubmitted && !formState.isValid}
          isLoading={isPending}
        >
          Verify OTP
        </Button>
      </form>
    </>
  );
}