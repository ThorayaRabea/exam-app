// src/features/question/components/exam-questions.tsx
import { Button } from "@/components/ui/button/button";
import { useSubmitExam } from "@/features/submission/api/mutation/use-submit-exam";
import SubNavbar from "@/shared/components/sub-navbar/sub-navbar";
import { cn } from "@/shared/lib/tailwind-merge";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleQuestionMark,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { questionsQueryOptions } from "../apis/questions.options";

export default function ExamQuestions() {
  ////Hooks
const navigate=useNavigate()
  const [startedAt] = useState(() => new Date().toISOString()); //to store the start time
  const { examId,diplomaId } = useParams();
  const location = useLocation();
  const durationMinutes =
    (location.state as { duration?: number })?.duration ?? 20; //total time of the exam

  const examTitle = location.state?.examName;

  const { data, isLoading, isError } = useQuery( //get questions
    questionsQueryOptions(examId ?? ""),
  );
  const { mutate: submitExam, } = useSubmitExam();//submit answers of questions
  const [currentIndex, setCurrentIndex] = useState(0); //to track the current question
  const [answers, setAnswers] = useState<Record<string, string>>({}); //to store the answers
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60); //total time in minutes

   const questions = data?.payload?.questions ?? []; //to get the questions
  const totalQuestions = questions.length; //to get the total number of questions
  const currentQuestion = questions[currentIndex];

  const progressPercent = useMemo( 
    () => (totalQuestions ? ((currentIndex + 1) / totalQuestions) * 100 : 0),
    [currentIndex, totalQuestions],
  );

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = Math.max(secondsLeft, 0) % 60;

  const totalSeconds = durationMinutes * 60;
  const timeFraction = totalSeconds
    ? Math.max(secondsLeft, 0) / totalSeconds
    : 0;
  const circumference = 2 * Math.PI * 18;
  const dashOffset = circumference * (1 - timeFraction);

  const handleSelect = (answerId: string) => {
    if (!currentQuestion) return; 
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerId }));//to store the previous answer with current answer
  };

  const handleFinish = () => {
   if(!examId) return
    const answersArray = Object.entries(answers).map(
      ([questionId, answerId]) => ({
        questionId,
        answerId,
      }),
    );
    submitExam(
      { examId, answers: answersArray, startedAt },
      {
        onSuccess: (data) => {
           navigate(`/user/diploma/exam/${diplomaId}/${examId}/submission/${data.payload.submission.id}`);
          console.log(data.payload.submission);
        },
      },
    );
  };

    useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  useEffect(() => {
  if (secondsLeft <= 0) {
    handleFinish();
  }
}, [secondsLeft]);


 
  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading questions...</div>;
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2 p-6 text-red-600">
        <CircleAlert size={20} />
        <span>Failed to load questions. Please try again.</span>
      </div>
    );
  }

  if (totalQuestions === 0) {
    return (
      <div className="p-6 text-gray-500">
        No questions available for this exam yet.
      </div>
    );
  }



  
  return (
    <div className=" px-6 mt-6">
      {/* Sub-Navbar */}
      <SubNavbar icon={CircleQuestionMark} title={`${examTitle}`} showBack />

      <div className="mt-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <h1 className="font-geist-mono text-sm text-gray-700">
                {examTitle ?? "Exam"}
              </h1>
              <span className="text-sm text-gray-500">
                Question{" "}
                <span className="font-semibold text-blue-600">
                  {currentIndex + 1}
                </span>{" "}
                of {totalQuestions}
              </span>
            </div>
            <div className="h-4 w-full overflow-hidden  bg-blue-100">
              <div
                className="h-full  bg-blue-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Timer */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center ml-12">
            <svg className="h-14 w-14 -rotate-90" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="#dbeafe"
                strokeWidth="3"
              />
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute font-geist-mono text-xs font-semibold text-blue-600">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Question */}
        <h2 className="mb-4 text-xl font-bold text-blue-600">
          {currentQuestion?.text}
        </h2>

        {/* Answers */}
        <div className="mb-6 flex flex-col gap-2">
          {currentQuestion?.answers.map((answer) => { //To display the answers from which the user should select one
            const isSelected = answers[currentQuestion.id] === answer.id;
            return (
              <label
                key={answer.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm transition",
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-transparent bg-gray-50 hover:bg-gray-100",
                )}
              >
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                    isSelected ? "border-blue-600" : "border-gray-300",
                  )}
                >
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </span>
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  checked={isSelected}
                  onChange={() => handleSelect(answer.id)}
                  className="sr-only"
                />
                <span className="text-gray-700">{answer.text}</span>
              </label>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            className="flex-1 cursor-pointer"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          >
            <ChevronLeft size={18} />
            Previous
          </Button>
          <Button
            type="button"
            className="flex-1 cursor-pointer"
            onClick={
              currentIndex === totalQuestions - 1
                ? handleFinish
                : () =>
                    setCurrentIndex((i) => i + 1)
            }
          >
            {currentIndex === totalQuestions - 1 ? "Finish" : "Next"}
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
