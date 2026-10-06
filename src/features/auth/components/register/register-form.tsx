import { StepContext } from "@/stores/steps-register-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { REGISTER_STEPS } from "../../constants/form-constant";
import { registerSchema } from "../../schemas/rigester.schema";
import type { IRegisterData } from "../../types/register";
import EamilStep from "./steps/email-step";
import InformationStep from "./steps/information-step";
import OtpVerificationStep from "./steps/otp-verification-step";
import PasswordStep from "./steps/password-step";

export default function RegisterForm() {
  const { step } = useContext(StepContext);
  const form = useForm<IRegisterData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",

      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onsubmit: SubmitHandler<IRegisterData> = (values) => {
    console.log(values);
  };
  const render = () => {
    switch (step) {
      case REGISTER_STEPS.EMAIL:
        return <EamilStep />;
      case REGISTER_STEPS.INFORMATION:
        return <InformationStep />;
      case REGISTER_STEPS.PASSWORD:
        return <PasswordStep />;
      case REGISTER_STEPS.OTP_VERIFICATION:
        return <OtpVerificationStep />;
    }
  };

  return (
    <>
      <FormProvider {...form}>{render()}</FormProvider>
    </>
  );
}
