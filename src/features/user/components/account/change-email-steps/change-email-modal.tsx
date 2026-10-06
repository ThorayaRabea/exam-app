import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";


import ChangeEmailStep from "./change-email-step";
import OtpVerificationStep from "./otp-verification-step";

interface ChangeEmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentEmail: string;
}

type Step = "email" | "otp";

export default function ChangeEmailModal({
  open,
  onOpenChange,
}: ChangeEmailModalProps) {
  const [step, setStep] = useState<Step>("email");
  const [newEmail, setNewEmail] = useState("");

 
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setStep("email");
      setNewEmail("");
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        {step === "email" ? (
          <ChangeEmailStep
            onNext={(email) => {
              setNewEmail(email);
              setStep("otp");
            }}
          />
        ) : (
          <OtpVerificationStep
            newEmail={newEmail}
            onEdit={() => setStep("email")}
            onVerified={() => handleOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}