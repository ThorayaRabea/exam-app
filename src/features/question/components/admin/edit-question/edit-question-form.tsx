import { Button } from "@/components/ui/button/button";
import UseExamDetails from "@/features/exam/apis/queries/use-exam-details";
import useUpdateQuestion from "@/features/question/apis/mutations/use-update-question";
import { UpdateQuestionSchema } from "@/features/question/schemas/update-question-schema";
import type { IQuestion } from "@/features/question/types/questions";
import type { IUpdateQuestionFormValues } from "@/features/question/types/update-question";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Save, X } from "lucide-react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import EditQuestionInfo from "./edit-question-info";
import UpdateQuestionAnswersPanel from "./update-question-answers-panel";

interface EditQuestionFormProps {
  question: IQuestion;
  examId: string;
  onDone: () => void;
}

export default function EditQuestionForm({
  question,
  examId,
  onDone,
}: EditQuestionFormProps) {
  //Queries
  const queryClient = useQueryClient();
  const { data: examDetails } = UseExamDetails(examId);
  const examData = examDetails?.payload?.exam;
  //Mutations
  const { mutate: updateQuestion, isPending } = useUpdateQuestion();

  //Form
  const form = useForm<IUpdateQuestionFormValues>({
    resolver: zodResolver(UpdateQuestionSchema),
    defaultValues: {
      text: question.text,
      answers: question.answers.map((answer) => ({
      text: answer.text,
      isCorrect: answer.isCorrect,
    })),
    },
  });

  //Function
  const onSubmit: SubmitHandler<IUpdateQuestionFormValues> = (values) => {
    console.log(values);
    updateQuestion(
      {
        id: question.id,
        payload: { text: values.text, answers: values.answers },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["questions", "list", examId],
          });
          queryClient.invalidateQueries({
            queryKey: ["questions", "detail", question.id],
          });
          toast.success("Question updated successfully");
          onDone();
        },
        onError: () =>
          toast.error("Failed to update question. Please try again."),
      },
    );
  };

  return (
    <div className="mx-6 mt-6">
      <FormProvider {...form}>
        <div className="flex items-center justify-end">
          <div className="mb-4 flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onDone}
              className="gap-1.5"
            >
              <X size={16} />
              Cancel
            </Button>
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              isLoading={isPending}
              className="gap-1.5 bg-emerald-500 hover:bg-emerald-600"
            >
              <Save size={16} />
              Save
            </Button>
          </div>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {examData && (
            <EditQuestionInfo examData={examData} question={question} />
          )}

          <UpdateQuestionAnswersPanel  />
        </form>
      </FormProvider>
    </div>
  );
}
