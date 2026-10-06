import { PASSWORD_STEPS } from "@/features/auth/constants/form-constant";
import type { IFrogetPasswordSteps } from "@/features/auth/types/forget-password";
import { createContext, useState } from "react";

interface IPasswordStep {
  step: IFrogetPasswordSteps;
  setStep: React.Dispatch<React.SetStateAction<IFrogetPasswordSteps>>;
}

export const StepPasswordContext = createContext<IPasswordStep>(
  {} as IPasswordStep,
);

export default function StepPasswordContextProvider(props: any) {
  const [step, setStep] = useState<IFrogetPasswordSteps>(
    PASSWORD_STEPS.FORGET_PASSWORD,
  );

  return (
    <StepPasswordContext.Provider value={{ step, setStep }}>
      {props.children}
    </StepPasswordContext.Provider>
  );
}
