import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getDiplomaListAPI } from "@/features/diploma/apis/diploma.api";
import UseAddNewDiploma from "@/features/diploma/apis/mutations/use-add-new-diploma";
import { addDiplomaSchema } from "@/features/diploma/schemas/add-diploma.schema";
import type { IAddDiplomaValues } from "@/features/diploma/types/diploma";
import { useUploadImage } from "@/features/upload/apis/queries/use-upload-image";
import FormFeedback from "@/shared/components/form-feedback";
import SaveAndCancelButtons from "@/shared/components/save-cancel-buttons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ChangeEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddNewDiplomaDitails() {
  //States
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  //Hooks
  const navigate = useNavigate();
  //Mutation
  const { mutate: uploadImageAPI } = useUploadImage();
  const { mutate: addNewDiplomaAPI, isPending, error } = UseAddNewDiploma();
  //Use Form
  const { register, handleSubmit, setValue, formState } =
    useForm<IAddDiplomaValues>({
      defaultValues: {
        title: "",
        description: "",
        image: "",
      },
      resolver: zodResolver(addDiplomaSchema),
    });

  // Handle File Upload & Preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      uploadImageAPI(file, {
        onSuccess: (data) => {
          setValue("image", data.payload.url, { shouldValidate: true });
        },
      });
    }
  };

  //OnSubmit Function
  const onSubmit: SubmitHandler<IAddDiplomaValues> = (values) => {
    console.log(values);
    addNewDiplomaAPI(values, {
      onSuccess: () => {
        getDiplomaListAPI();
        navigate("/admin/diploma");
        toast.success("The diploma has been successfully added.", {
          duration: 4000,
        });
      },
    });
  };
  return (
    <>
      <SaveAndCancelButtons
        onCancel={() => navigate("/admin/diploma")}
        onSave={handleSubmit(onSubmit)}
        isSaving={isPending}
      />
      <div className="mx-2 border border-gray-200 bg-white shadow-sm">
        {/* Header Bar */}
        <div className="bg-blue-600 px-4 py-3 font-semibold text-white">
          Diploma Information
        </div>

        {/* Form */}
        <form className="my-4 px-2" onSubmit={handleSubmit(onSubmit)}>
          {/* Image Field */}
          <Field>
            <FieldLabel htmlFor="input-field-image">Image</FieldLabel>

            <div className="relative border border-dashed border-gray-300 p-8 text-center rounded-md hover:bg-gray-50 transition cursor-pointer">
              <Input
                id="input-field-image"
                type="file"
                accept="image/*"
                {...register("image")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />

              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-28 mx-auto object-contain"
                />
              ) : (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span>Drop an image here or</span>
                  <span className="text-blue-600 font-medium">
                    select from your computer
                  </span>
                </div>
              )}
            </div>

            <Input type="hidden" {...register("image")} />
            <FieldError>{formState.errors.image?.message}</FieldError>
          </Field>
          {/* Title Field */}
          <Field className="mt-4">
            <FieldLabel htmlFor="input-field-title" className="size-4 ">
              Title
            </FieldLabel>
            <Input id="input-field-title" type="text" {...register("title")} />
            {/*Title Error */}
            <FieldError>{formState.errors.title?.message}</FieldError>
          </Field>

          {/* Description Field */}
          <Field className="mt-4">
            <FieldLabel htmlFor="input-field-description">
              Description
            </FieldLabel>
            <Textarea
              id="input-field-description"
              rows={4}
              {...register("description")}
            />
            <FieldError>{formState.errors.description?.message}</FieldError>
          </Field>

          {/* feedback Error */}
          {error ? <FormFeedback>{error.message}</FormFeedback> : null}
        </form>
      </div>
    </>
  );
}
