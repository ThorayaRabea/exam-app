import { Button } from "@/components/ui/button/button";
import type { IAddBulkQuestionsFormValues } from "@/features/question/types/add-bulk-questions";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import QuestionAnswersPanel from "./question-answers-panel";
interface AddQuestionsFormProps {
  isBulkMode: boolean;
}
export default function AddQuestionsForm({ isBulkMode }: AddQuestionsFormProps) {
  //Stetes
  const [CurrentQuestion, setCurrentQuestion] = useState(0);

  //Form
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext<IAddBulkQuestionsFormValues>();
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "questions",
  });

  const handleRemoveQuestion = (index: number) => {
    remove(index);
    setCurrentQuestion((prev) => {
      if (index < prev) return prev - 1;
      if (index === prev) return Math.max(0, prev - 1);
      return prev;
    });
  };

  return (
    <>
      <section>
        {/* Title */}
        <h2 className="w-full bg-blue-600 text-white text-sm py-1.5">
          Qusetions
        </h2>

        {/* Add Question Icon */}
       {isBulkMode&&<div className="flex w-full bg-white">
          {fields.map((field, index) => (
            <div key={field.id} className="relative flex-1 group max-w-fit ">
              <Button
                type="button"
                variant={index === CurrentQuestion ? "outline" : "ghost"}
                onClick={() => setCurrentQuestion(index)}
                className="h-full  rounded-none "
              >
                Q{index + 1}
              </Button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveQuestion(index);
                }}
                className="absolute right-1 top-1 text-gray-400 "
              >
                <XIcon
                  size={14}
                  className="text-red-600 hidden group-hover:block"
                />
              </button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => {
              append({ text: "", answers: [] });
              setCurrentQuestion(fields.length);
            }}
            className="ms-1 rounded-none bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            <PlusIcon />
          </Button>
        </div>} 
        {/* Questions */}

        {fields.length > 0 && (
          <QuestionAnswersPanel
            key={CurrentQuestion}
            currentQuestion={CurrentQuestion}
            errors={errors}
            trigger={trigger}
          />
        )}
      </section>
    </>
  );
}
