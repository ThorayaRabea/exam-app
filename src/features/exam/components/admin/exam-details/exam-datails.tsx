import type { IExamItem } from "@/features/exam/types/exam";

interface ExamDetailsProps {
  exam: IExamItem|undefined;
}

export default function ExamDetailsPage({ exam }: ExamDetailsProps) {
  return (
    <div className="mx-6 mt-6 bg-white p-4">
      <p className="mb-1 text-[16px] font-mono text-gray-400">Image</p>
      <img
        src={exam?.image }
        alt={exam?.title}
        className="h-52 w-52 object-cover"
      />

      <div className="mt-3">
        <p className="mb-1 text-[16px] font-mono text-gray-400">Title</p>
        <h2 className="text-[16px] font-mono text-gray-900">{exam?.title}</h2>
      </div>

      <div className="mt-3">
        <p className="mb-1 text-[16px] font-mono text-gray-400">Description</p>
        <p className="max-w-172.5 text-[11px] leading-normal font-mono text-gray-700">
          {exam?.description}
        </p>
      </div>
      <div className="mt-3">
        <p className="mb-1 text-[16px] font-mono text-gray-400">Diploma</p>
        <p className="max-w-172.5 text-[11px] leading-normal font-mono text-gray-700">
          {exam?.diploma.title}
        </p>
      </div>
      <div className="mt-3">
        <p className="mb-1 text-[16px] font-mono text-gray-400">Duration</p>
        <p className="max-w-172.5 text-[11px] leading-normal font-mono text-gray-700">
          {exam?.duration}
        </p>
      </div>
      <div className="mt-3">
        <p className="mb-1 text-[16px] font-mono text-gray-400">
          No. of Questions
        </p>
        <p className="max-w-172.5 text-[11px] leading-normal font-mono text-gray-700">
          {exam?.questionsCount}
        </p>
      </div>
    </div>
  );
}
