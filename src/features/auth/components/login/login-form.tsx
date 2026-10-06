import { Button } from "@/components/ui/button/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { logInSchema } from "@/features/auth/schemas/login.shcema";
import Footer from "@/features/auth/shared/components/footer";
import type { ILoginFormValues } from "@/features/auth/types/login";
import FormFeedback from "@/shared/components/form-feedback";
import { cn } from "@/shared/lib/tailwind-merge";

import { StepContext } from "@/stores/steps-register-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/use-login";

export default function LogInForm() {
  // States
  const [showPassword, setShowPassword] = useState(false);
  const { setStep } = useContext(StepContext);
  setStep("email");
  //Mutation
  const { isPending, error, mutate: loginApi } = useLogin();

  //UseForm
  const form = useForm<ILoginFormValues>({
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(logInSchema),
  });

  //Submit
  const onSubmit: SubmitHandler<ILoginFormValues> = (values) => {
    loginApi(values);
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* UserName Input Field*/}
        <Field aria-invalid={!!form.formState.errors.username}>
          <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
          <Input
            id="input-field-username"
            type="text"
            {...form.register("username")}
          />
          {/*UserName Error */}
          <FieldError>{form.formState.errors.username?.message}</FieldError>
        </Field>

        {/* Password Input field     */}
        <Field aria-invalid={!!form.formState.errors.password}>
          <FieldLabel htmlFor="input-field-password " className="mt-4 ">
            Password
          </FieldLabel>
          <div className="relative">
            {/* inputPassword */}
            <Input
              id="input-field-password"
              type={showPassword ? "text" : "password"}
              {...form.register("password")}
            />
            {/* Toggle Password */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <Eye size={18} cursor={"pointer"} />
              ) : (
                <EyeOff size={18} cursor={"pointer"} />
              )}
            </button>
          </div>
          {/*Password Error */}
          <FieldError>{form.formState.errors.password?.message}</FieldError>
        </Field>

        {/* Forget Password Link */}

        <FieldDescription className="flex justify-end">
          <Button
            nativeButton={false}
            variant="link"
            render={
              <Link
                to="/auth/forgot-password"
                className=" hover:text-blue-700 hover:underline! "
              >
                forgot your password?
              </Link>
            }
            className=" mt-2"
          />
        </FieldDescription>
        {/* feedback Error */}
        {error ? <FormFeedback>{error.message}</FormFeedback> : null}

        {/*LogIn button  */}
        <div className={cn("mt-4 ")}>
          <Button
            type="submit"
            className="w-full mt-4 "
            disabled={form.formState.isSubmitted && !form.formState.isValid}
            isLoading={isPending}
          >
            log in
          </Button>
          {/* Footer */}
          <Footer className="mt-4 flex items-center justify-end  ">
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
        </div>
      </form>
    </>
  );
}
