import { Button } from '@/components/ui/button/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useChangePassword } from '@/features/user/apis/mutation/use-change-password';
import { ChangePasswordSchema } from '@/features/user/schemas/change-password-schema';
import type { IChangePasswordValues } from '@/features/user/types/password';
import FormFeedback from '@/shared/components/form-feedback';
import { cn } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import  { useState } from 'react'
import {  useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ChangePassword() {
    //State
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    //Mutation
     const { isPending, error, mutate:changePasswordApi } = useChangePassword();
      //UseForm
      const form = useForm<IChangePasswordValues>({
        defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
        resolver: zodResolver(ChangePasswordSchema),
      });
    //OnSubmit
    const onSubmit = (values: IChangePasswordValues) => {
      changePasswordApi(values,{ onSuccess: () => {
        toast.success("your password has been updated");
      
      },})
    };
  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
          
          {/* current Password Input field     */}
        <Field aria-invalid={!!form.formState.errors.currentPassword}>
          <FieldLabel htmlFor="input-field-current-password " className="mt-4 ">
            Current Password
          </FieldLabel>
          <div className="relative">
            {/* inputPassword */}
            <Input
              id="input-field-current-password"
              type={showCurrentPassword ? "text" : "password"}
              {...form.register("currentPassword")}
            />
            {/* Toggle Password */}
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showCurrentPassword ? (
                <Eye size={18} cursor={"pointer"} />
              ) : (
                <EyeOff size={18} cursor={"pointer"} />
              )}
            </button>
          </div>
          {/*Password Error */}
          <FieldError>{form.formState.errors.currentPassword?.message}</FieldError>
        </Field>
        
        {/* Password Input field     */}
        <Field aria-invalid={!!form.formState.errors.newPassword}>
          <FieldLabel htmlFor="input-field-new-password " className="mt-4 ">
            New Password
          </FieldLabel>
          <div className="relative">
            {/* inputPassword */}
            <Input
              id="input-field-new-password"
              type={showPassword ? "text" : "password"}
              {...form.register("newPassword")}
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
          <FieldError>{form.formState.errors.newPassword?.message}</FieldError>
        </Field>

        {/*confirm Password Input field     */}
        <Field aria-invalid={!!form.formState.errors.confirmPassword}>
          <FieldLabel htmlFor="input-field-confirm-password " className="mt-4 ">
            Confirm New Password
          </FieldLabel>
          <div className="relative">
            {/* inputPassword */}
            <Input
              id="input-field-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              {...form.register("confirmPassword")}
            />
            {/* Toggle Password */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? (
                <Eye size={18} cursor={"pointer"} />
              ) : (
                <EyeOff size={18} cursor={"pointer"} />
              )}
            </button>
          </div>
          {/*Password Error */}
          <FieldError>
            {form.formState.errors.confirmPassword?.message}
          </FieldError>
        </Field>

        {/* feedback Error */}
        {error ? (
          <FormFeedback>{error.message}</FormFeedback>
        ) : null}

        {/*Reset Password button  */}
        <div className={cn("mt-4 ")}>
          <Button
            type="submit"
            className="w-full mt-4 "
            disabled={form.formState.isSubmitted && !form.formState.isValid}
            isLoading={isPending}
          >
            Update Password
          </Button>
         
        </div>
      </form>
    </>
  );
}
