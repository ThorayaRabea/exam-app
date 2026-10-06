import { REGISTER_STEPS } from "@/features/auth/constants/form-constant";
import type { IRegisterSteps } from "@/features/auth/types/register";
import { createContext, useState } from "react";

interface IEmailStep {
  step: IRegisterSteps;
  setStep: React.Dispatch<React.SetStateAction<IRegisterSteps>>;
}
export const StepContext = createContext<IEmailStep>({} as IEmailStep);

export default function StepContextProvider(props: any) {
  const [step, setStep] = useState<IRegisterSteps>(REGISTER_STEPS.EMAIL);

  return (
    <StepContext.Provider value={{ step, setStep }}>
      {props.children}
    </StepContext.Provider>
  );
}
