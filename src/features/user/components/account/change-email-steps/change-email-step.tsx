import { Button } from "@/components/ui/button/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSendNewOTP } from "@/features/user/apis/mutation/use-send-new-otp";
import { newEmailSchema } from "@/features/user/schemas/email-schema";
import FormFeedback from "@/shared/components/form-feedback";
import SubHeading from "@/shared/components/sub-heading";
import { cn } from "@/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { Stepper } from "./step-progress";

export type IEmailStepValue = z.infer<typeof newEmailSchema>;

interface ChangeEmailStepProps {
  onNext: (email: string) => void;
}

export default function ChangeEmailStep({ onNext }: ChangeEmailStepProps) {
  const { mutate, isPending, error } = useSendNewOTP();

  const form = useForm<IEmailStepValue>({
    defaultValues: { newEmail: "" },
    resolver: zodResolver(newEmailSchema),
  });

  const onSubmit: SubmitHandler<IEmailStepValue> = (values) => {
    mutate(
      { newEmail: values.newEmail },
      {
        onSuccess: () => {
          onNext(values.newEmail);
        },
      },
    );
  };

  return (
    <>
      <Stepper currentStep={1} />
      <DialogHeader>
        <DialogTitle>Change Email</DialogTitle>
      </DialogHeader>
      <SubHeading>Enter your new email</SubHeading>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Field aria-invalid={!!form.formState.errors.newEmail}>
          <FieldLabel htmlFor="input-field-username">Email</FieldLabel>
          <Input
            id="input-field-username"
            type="email"
            {...form.register("newEmail")}
          />
          {form.formState.errors.newEmail && (
            <FieldError>{form.formState.errors.newEmail?.message}</FieldError>
          )}
        </Field>

        {error ? <FormFeedback>{error?.message}</FormFeedback> : null}

        <div className={cn("mt-4")}>
          <Button
            type="submit"
            className="w-full mt-4"
            variant="default"
            isLoading={isPending}
          >
            Next <ChevronRight />
          </Button>
        </div>
      </form>
    </>
  );
}