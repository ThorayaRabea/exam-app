import { StepContext } from "@/stores/steps-register-context";
import { useContext } from "react";
import RegisterForm from "../../components/register/register-form";
import { Stepper } from "../../components/register/step-progress";
import { REGISTER_STEPS } from "../../constants/form-constant";
import Heading from "../../shared/components/heading";

export default function RegisterPage() {
  const stepIndexes = {
    [REGISTER_STEPS.EMAIL]: 1,
    [REGISTER_STEPS.OTP_VERIFICATION]: 2,
    [REGISTER_STEPS.INFORMATION]: 3,
    [REGISTER_STEPS.PASSWORD]: 4,
  };

  const { step } = useContext(StepContext);
  const currentStep = stepIndexes[step];
  return (
    <>
      {currentStep !== 1 ? (
        <Stepper {...{ totalSteps: 4, currentStep: currentStep }} />
      ) : null}

      <Heading className=" font-bold text-3xl mb-4 mr-2.5 ">
        Create Account
      </Heading>

      <RegisterForm />
    </>
  );
}
