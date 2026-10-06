import useAddQuestions from "@/features/question/apis/mutations/use-add-questions";
import { addBulkQuestionsSchema } from "@/features/question/schemas/add-bulk-questions-schema";
import type { IAddBulkQuestionsFormValues } from "@/features/question/types/add-bulk-questions";
import Navbar from "@/shared/components/navbar/navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AddQuestionsForm from "./add-questions-form";
import AddQuestionsHeader from "./add-questions-header";
import ExamInfo from "./question-info";
import { toast } from "sonner";
import useAddQuestion from "@/features/question/apis/mutations/use-add-question";

export default function AddBulkQuestionsPage() {
  //Navigation
  const navigate = useNavigate();
  //States
  const [isBulkMode, setIsBulkMode] = useState(false);
  //Mutation
const { mutate: addQuestion, isPending: isAddingOne } = useAddQuestion();
const { mutate: addQuestions, isPending: isAddingBulk } = useAddQuestions();

  //Form
  const form = useForm<IAddBulkQuestionsFormValues>({
    resolver: zodResolver(addBulkQuestionsSchema),
    defaultValues: {
      questions: [
        {
          text: "",
          answers: [],
        },
      ],
    },
  });

  

  //Funcyion

  const onSubmit = (values: IAddBulkQuestionsFormValues) => {
    if (isBulkMode) {
    addQuestions(
      { examId: values.examId, payload: { questions: values.questions } },
      {
        onSuccess: () => navigate(`/admin/exam/exam-details/${values.examId}`),
        onError: () => toast.error("Failed to create questions. Please try again."),
      },
    );
  } else {
    const singleQuestion = values.questions[0];
    addQuestion(
      { examId: values.examId, payload: singleQuestion },
      {
        onSuccess: () => navigate(`/admin/exam/exam-details/${values.examId}`),
        onError: () => toast.error("Failed to create question. Please try again."),
      },
    );
  }
  };


  // Handle bulk mode
const handleToggleBulkMode = () => {
  setIsBulkMode((prev) => {
    const next = !prev;
    if (!next) {
    
      const currentQuestions = form.getValues("questions");
      if (currentQuestions.length > 1) {
        form.setValue("questions", [currentQuestions[0]]);
      }
    }
    return next;
  });
};
  function handleCancelButton() {
    navigate("/admin/exam");
  }
  return (
    <>
      <Navbar
        items={[
          { label: "Exams", to: "/admin/exam" },
          {
            label: "Create New Question",
            to: undefined,
          },
        ]}
      />

      <div className="px-6">
        <FormProvider {...form}>
          <AddQuestionsHeader
            onCancel={handleCancelButton}
            onSave={form.handleSubmit(onSubmit)}
              isSaving={isAddingOne || isAddingBulk}
            isBulkMode={isBulkMode}
            onToggleBulkMode={handleToggleBulkMode}
          />
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ExamInfo />
            {/* Questions Form */}
            <AddQuestionsForm isBulkMode={isBulkMode} />
          </form>
        </FormProvider>
      </div>
    </>
  );
}
