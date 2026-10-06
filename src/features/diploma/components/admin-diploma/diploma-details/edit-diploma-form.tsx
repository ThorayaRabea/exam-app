import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DIPLOMA_KEY } from "@/features/diploma/apis/diploma.key";
import useUpdateDiploma from "@/features/diploma/apis/mutations/use-update-diploma";
import type { IDiplomaItem } from "@/features/diploma/types/diploma";
import { useUploadImage } from "@/features/upload/apis/queries/use-upload-image";
import SaveAndCancelButtons from "@/shared/components/save-cancel-buttons";
import { useQueryClient } from "@tanstack/react-query";
import { FileImage, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditDiplomaFormValues {
  title: string;
  description: string;
}

interface EditDiplomaFormProps {
  diploma?: IDiplomaItem;
  onCancel: () => void;
  onSaved: () => void;
}

export default function EditDiplomaForm({
  diploma,
  onCancel,
  onSaved,
}: EditDiplomaFormProps) {
  const queryClient = useQueryClient();
  const { mutate: updateDiploma, isPending } = useUpdateDiploma();
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  const [imageUrl, setImageUrl] = useState<string | null>(
    diploma?.image ?? null,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    diploma?.image ?? null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDiplomaFormValues>({
    defaultValues: {
      title: diploma?.title ?? "",
      description: diploma?.description ?? "",
    },
  });

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a JPEG, PNG, GIF, or WEBP image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));

    uploadImage(file, {
      onSuccess: (data) => {
        setImageUrl(data.payload.url);
      },
      onError: () => {
        toast.error("Failed to upload image. Please try again.");
        setPreviewUrl(diploma?.image ?? null);
      },
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const onSubmit = (values: EditDiplomaFormValues) => {
    if (!diploma) return;

    updateDiploma(
      { id: diploma.id, payload: { ...values, image: imageUrl ?? undefined } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: DIPLOMA_KEY.all });
          toast.success("Diploma updated successfully");
          onSaved();
        },
        onError: () => {
          toast.error("Failed to update diploma. Please try again.");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-6 mt-6 overflow-hidden rounded-lg border border-gray-100"
    >
      <SaveAndCancelButtons
        onCancel={onCancel}
        onSave={handleSubmit(onSubmit)}
        isSaving={isPending}
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Image */}
        <Field>
          <FieldLabel>Image</FieldLabel>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border text-sm text-gray-500 transition ${
              isDragging ? "border-blue-400 bg-blue-50" : "border-gray-200"
            }`}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt=""
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <>
                <FileImage size={20} className="text-gray-300" />
                <span className="flex items-center gap-1">
                  <UploadCloud size={14} />
                  Drop an image here or{" "}
                  <span className="text-blue-600 underline">
                    select from your computer
                  </span>
                </span>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
          />
          {isUploading && <p className="text-xs text-gray-400">Uploading...</p>}
        </Field>

        {/* Title */}
        <Field aria-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <FieldError>{errors.title.message}</FieldError>}
        </Field>

        {/* Description */}
        <Field aria-invalid={!!errors.description}>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <FieldError>{errors.description.message}</FieldError>
          )}
        </Field>
      </div>
    </form>
  );
}
