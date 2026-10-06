import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FileImage, UploadCloud, X, Save } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button/button";
import { useDiplomaOptions } from "@/features/diploma/apis/queries/use-diploma-options";
import { useUploadImage } from "@/features/upload/apis/queries/use-upload-image";
import { EXAM_KEY } from "@/features/exam/apis/exam.keys";
import useAddExam from "@/features/exam/apis/mutations/use-add-exam";
import {
  editExamSchema,

} from "@/features/exam/schemas/edit-exam.schema";
import type { IEditExamFormValues } from "../../types/exam";

interface AddExamFormProps {
  onDone: () => void;
}

export default function AddExamForm({ onDone }: AddExamFormProps) {
  const queryClient = useQueryClient();
  const { mutate: addExam, isPending } = useAddExam();
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
  const { data: diplomaOptions } = useDiplomaOptions();
  const diplomas = diplomaOptions?.payload?.data ?? [];

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditExamFormValues>({
    resolver: zodResolver(editExamSchema),
    defaultValues: { title: "", description: "", duration: 0, diplomaId: "" },
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
      onSuccess: (data) => setImageUrl(data.payload.url),
      onError: () => {
        toast.error("Failed to upload image. Please try again.");
        setPreviewUrl(null);
      },
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const onSubmit = (values: IEditExamFormValues) => {
    addExam(
      { ...values, image: imageUrl ?? undefined },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: EXAM_KEY.all });
          toast.success("Exam created successfully");
          onDone();
        },
        onError: () => toast.error("Failed to create exam. Please try again."),
      },
    );
  };

  return (
    <div className="mx-6 mt-6">
      <div className="mb-4 flex items-center justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onDone} className="gap-1.5">
          <X size={16} />
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          isLoading={isPending}
          className="gap-1.5 bg-emerald-500 hover:bg-emerald-600"
        >
          <Save size={16} />
          Save
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="overflow-hidden rounded-lg border border-gray-100">
        <div className="bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
          Exam Information
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          <Field aria-invalid={!!errors.title}>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" {...register("title")} />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Field aria-invalid={!!errors.diplomaId}>
            <FieldLabel htmlFor="diplomaId">Diploma</FieldLabel>
            <Controller
              control={control}
              name="diplomaId"
              render={({ field }) => (
                <select
                  {...field}
                  id="diplomaId"
                  className="h-11.5 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700"
                >
                  <option value="">Select a diploma</option>
                  {diplomas.map((diploma) => (
                    <option key={diploma.id} value={diploma.id}>
                      {diploma.title}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.diplomaId && <FieldError>{errors.diplomaId.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel>Image</FieldLabel>
            {previewUrl ? (
              <img src={previewUrl} alt="" className="h-20 w-full rounded-md object-cover" />
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex h-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border text-sm text-gray-500 transition ${
                  isDragging ? "border-blue-400 bg-blue-50" : "border-gray-200"
                }`}
              >
                <FileImage size={18} className="text-gray-300" />
                <span className="flex items-center gap-1 text-xs">
                  <UploadCloud size={12} />
                  Drop an image or <span className="text-blue-600 underline">select</span>
                </span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="hidden"
            />
            {isUploading && <p className="text-xs text-gray-400">Uploading...</p>}
          </Field>

          <Field aria-invalid={!!errors.description}>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea id="description" rows={4} {...register("description")} />
            {errors.description && <FieldError>{errors.description.message}</FieldError>}
          </Field>

          <Field aria-invalid={!!errors.duration}>
            <FieldLabel htmlFor="duration">Duration (min)</FieldLabel>
            <Input id="duration" type="number" min={1} {...register("duration", { valueAsNumber: true })} />
            {errors.duration && <FieldError>{errors.duration.message}</FieldError>}
          </Field>
        </div>
      </form>
    </div>
  );
}