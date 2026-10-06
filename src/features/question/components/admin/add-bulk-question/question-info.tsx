import { FieldError } from "@/components/ui/field";
import { useExamOptions } from "@/features/question/apis/queries/use-exam-options";
import type { IAddBulkQuestionsFormValues } from "@/features/question/types/add-bulk-questions";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function QusetionInfo() {
  //States
  const [examInput, setExamInput] = useState("");
  //Form
  const {
    register,
    formState: { errors },
  } = useFormContext<IAddBulkQuestionsFormValues>();
  //Queries
  const { data: examsOptions } = useExamOptions();
  const exams = examsOptions?.payload?.data ?? [];
 
  return (
    <>
      <section className="mb-6 ">
        {/* Title */}
        <h2 className="w-full bg-blue-600 text-white text-sm py-1.5 px-2">
          Exam Info
        </h2>
        <div className="p-2">
          <h5>Exam</h5>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              {...register("examId")}
              value={examInput}
              onChange={(e) => setExamInput(e.target.value)}
              className="h-11.5 flex-1 rounded-md border border-gray-200 px-3 text-sm text-gray-700"
            >
              <option value="">select exam</option>
              {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title}
                </option>
              ))}
            </select>
            {/* Error */}
            {errors.examId && <FieldError>{errors.examId.message}</FieldError>}
          </div>
        </div>
      </section>
    </>
  );
}
