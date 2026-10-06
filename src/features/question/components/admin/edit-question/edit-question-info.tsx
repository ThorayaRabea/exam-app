import { Input } from "@/components/ui/input";
import type { IExamItem } from "@/features/exam/types/exam";
import type { IQuestion } from "@/features/question/types/questions";

interface EditQuestionInfoProps {
  question: IQuestion;
  examData: IExamItem;
}

export default function EditQuestionInfo({
  question,
  examData,
}: EditQuestionInfoProps) {
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
            <Input value={examData?.title} disabled />
          </div>
        </div>
        <div className="p-2">
          <h5>Question Headline</h5>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input value={question?.text} disabled />
          </div>
        </div>
      </section>
    </>
  );
}
