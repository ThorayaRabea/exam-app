import useDeleteQuestion from "@/features/question/apis/mutations/use-delete-question";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ExamQuestionRowActionsProps {
  questionId: string;
  examId: string;
  examTitle: string;
}

export default function ExamQuestionRowActions({
  questionId,
  examId,
  examTitle,
}: ExamQuestionRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteQuestion } = useDeleteQuestion();

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleDelete = () => {
    deleteQuestion(questionId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["questions", "list", examId],
        });
        toast.success("Question has been deleted successfully");
      },
    });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded p-1 text-gray-400 hover:bg-gray-100"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full z-10 w-32 rounded-lg border border-gray-100 bg-white py-1.5 shadow-lg"
        >
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              navigate(
                `/admin/exam/exam-details/${examId}/questions/${questionId}`,
                {
                  state: { examTitle },
                },
              );
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-emerald-600 hover:bg-emerald-50"
          >
            <Eye size={14} />
            View
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              navigate(
                `/admin/exam/exam-details/${examId}/questions/${questionId}/edit`,
              );
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50"
          >
            <Pencil size={14} />
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
