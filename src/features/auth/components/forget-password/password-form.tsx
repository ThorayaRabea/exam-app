import { StepPasswordContext } from "@/stores/steps-password-context";
import { useContext } from "react";
import { PASSWORD_STEPS } from "../../constants/form-constant";

import { FormProvider, useForm } from "react-hook-form";
import type { IEmailStepValue } from "../register/steps/email-step";
import ForgetPassword from "./steps/forget-password";
import PasswordResetSend from "./steps/password-reset-send";

export default function PasswordForm() {
  const { step } = useContext(StepPasswordContext);
  const form = useForm<IEmailStepValue>({
    defaultValues: { email: "" },
  });

  const render = () => {
    switch (step) {
      case PASSWORD_STEPS.FORGET_PASSWORD:
        return <ForgetPassword />;
      case PASSWORD_STEPS.PASSWORD_RESET_SEND:
        return <PasswordResetSend />;
    }
  };

  return <FormProvider {...form}>{render()}</FormProvider>;
}
