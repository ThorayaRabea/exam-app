import { Button } from "@/components/ui/button/button";
import { PASSWORD_STEPS } from "@/features/auth/constants/form-constant";
import Footer from "@/features/auth/shared/components/footer";
import Heading from "@/features/auth/shared/components/heading";
import { StepPasswordContext } from "@/stores/steps-password-context";
import { MoveLeft } from "lucide-react";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import type { IEmailStepValue } from "../../register/steps/email-step";

export default function PasswordResetSend() {
  const { setStep } = useContext(StepPasswordContext);
  const { getValues } = useFormContext<IEmailStepValue>();

  function getInboxUrl(email: string) {
    const domain = email.split("@")[1]?.toLowerCase();

    if (domain?.includes("gmail"))
      return "https://mail.google.com/mail/u/0/#inbox";
    if (domain?.includes("outlook") || domain?.includes("hotmail"))
      return "https://outlook.live.com/mail/0/inbox";
    if (domain?.includes("yahoo")) return "https://mail.yahoo.com";

    return `mailto:${email}`;
  }
  return (
    <>
      <div>
        <MoveLeft
          className="cursor-pointer mb-10"
          onClick={() => setStep(PASSWORD_STEPS.FORGET_PASSWORD)}
        ></MoveLeft>
      </div>
      <Heading className="font-bold text-3xl  ">Password Reset Sent</Heading>
      {/* Description */}
      <h3 className="text-sm text-gray-800 mt-4 font-geist-mono">
        We have sent a password reset link to:
        <br />
        <Button
          variant="link"
          className="h-fit"
          render={
            <a
              href={getInboxUrl(getValues("email"))}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getValues("email")}
            </a>
          }
        />
      </h3>

      <h3 className=" mt-5 font-geist-mono">
        Please check your inbox and follow the instructions to reset your
        password.
      </h3>
      <h4 className="text-sm text-gray-500 mt-5 font-geist-mono">
        If you don’t see the email within a few minutes, check your spam or junk
        folder.
      </h4>
      {/* Footer */}
      <Footer className="mt-10 flex items-center  ">
        Don't have an account?
        <Button
          nativeButton={false}
          variant="link"
          render={
            <Link to="/auth/register" className=" hover:text-blue-700 ">
              create yours
            </Link>
          }
        />
      </Footer>
    </>
  );
}
