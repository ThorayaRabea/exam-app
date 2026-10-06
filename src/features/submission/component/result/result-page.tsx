import { CircleQuestionMark, FolderOpen, RotateCcw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button/button";
import { cn } from "@/shared/lib/tailwind-merge";
import { useSubmissionDetails } from "../../api/queries/use-submission-details";
import SubNavbar from "@/shared/components/sub-navbar/sub-navbar";

export default function ResultPage() {
  const navigate = useNavigate();

  const { submissionId, diplomaId, examId } = useParams();

  const { data, isLoading, isError } = useSubmissionDetails(submissionId);

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-gray-500">Loading result...</p>
      </div>
    );
  }

  if (isError || !data?.payload) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-red-500">Failed to load submission result.</p>
      </div>
    );
  }

  const { submission, analytics } = data.payload;

  const totalQuestions = submission.totalQuestions;
  const correctAnswers = submission.correctAnswers;
  const wrongAnswers = submission.wrongAnswers;

  /*
   * Calculate the percentage for the donut chart
   */
  const correctPercentage =
    totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  const circumference = 2 * Math.PI * 18;

  const correctDashOffset = circumference * (1 - correctPercentage / 100);

  /*
   * Restart the exam
   */
  const handleRestart = () => {
    if (!diplomaId || !examId) return;

    navigate(`/user/diploma/exam/${diplomaId}/${examId}/questions`, {
      state: {
        duration: submission.exam?.duration ?? 20,
        examName: submission.examTitle ?? submission.exam?.title ?? "Exam",
      },
    });
  };

  /*
   * Go back to exams
   */
  const handleExplore = () => {
    if (!diplomaId) return;

    navigate(`/user/diploma/exam/${diplomaId}`);
  };

  return (
    <div className="mt-6 px-6">
         {/* Sub-Navbar */}
      <SubNavbar icon={CircleQuestionMark} title={`${submission.examTitle }`} showBack />
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="font-geist-mono text-sm text-gray-700">
            {submission.examTitle ??  "Exam"}
          </h1>

          <span className="text-sm text-gray-500">
            Questions{" "}
            <span className="font-semibold text-blue-600">
              {totalQuestions}
            </span>{" "}
            of {totalQuestions}
          </span>
        </div>

        <div className="h-3 w-full overflow-hidden bg-blue-100">
          <div
            className="h-full bg-blue-600"
            style={{
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* Results */}
      <h2 className="mb-4 text-xl font-bold text-blue-600">Results:</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[200px_1fr]">
        {/* Score Card */}
        <div className="border border-blue-200 bg-blue-50 p-6">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              {/* Donut Chart */}
              <div className="relative h-44 w-44">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 40 40">
                  {/* Incorrect - background */}
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="7"
                  />

                  {/* Correct */}
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="7"
                    strokeDasharray={`${correctPercentage} 100`}
                    pathLength="100"
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="mt-8 flex flex-col gap-3">
                {/* Correct */}
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-emerald-500" />

                  <span className="font-geist-mono text-sm">
                    Correct: {correctAnswers}
                  </span>
                </div>

                {/* Incorrect */}
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-red-500" />

                  <span className="font-geist-mono text-sm">
                    Incorrect: {wrongAnswers}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="max-h-125 overflow-y-auto border border-dashed border-blue-200 p-3">
          <div className="flex flex-col gap-5">
            {analytics.map((item, index) => {
              const selectedAnswer = item.selectedAnswer;
              const correctAnswer = item.correctAnswer;

              return (
                <div key={item.questionId}>
                  {/* Question */}
                  <h3 className="mb-3 font-geist-mono text-base font-bold text-blue-600">
                    {item.questionText}
                  </h3>

                  {/* Selected answer */}
                  {selectedAnswer ? (
                    <div
                      className={cn(
                        "mb-2 flex items-center gap-2 p-3 text-sm",
                        item.isCorrect ? "bg-emerald-50" : "bg-red-50",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-3 w-3 shrink-0 rounded-full border",
                          item.isCorrect
                            ? "border-emerald-500"
                            : "border-red-500",
                        )}
                      />

                      <span className="text-gray-700">
                        {selectedAnswer.text}
                      </span>
                    </div>
                  ) : (
                    <div className="mb-2 flex items-center gap-2 bg-red-50 p-3 text-sm">
                      <span className="flex h-3 w-3 shrink-0 rounded-full border border-red-500" />

                      <span className="text-gray-500">No answer selected</span>
                    </div>
                  )}

                  {/* Correct answer */}
                  <div className="flex items-center gap-2 bg-emerald-50 p-3 text-sm">
                    <span className="flex h-3 w-3 shrink-0 rounded-full border border-emerald-500" />

                    <span className="text-gray-700">{correctAnswer.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        <Button
          type="button"
          variant="secondary"
          className="cursor-pointer"
          onClick={handleRestart}
        >
          <RotateCcw size={16} />
          Restart
        </Button>

        <Button
          type="button"
          className="cursor-pointer"
          onClick={handleExplore}
        >
          <FolderOpen size={16} />
          Explore
        </Button>
      </div>
    </div>
  );
}
