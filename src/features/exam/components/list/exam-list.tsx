import { BookOpenCheck, CircleHelp, Clock3 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { cn } from "@/shared/utils";
import { useExamInfiniteList } from "../../apis/queries/use-exam-infinite-list";
import SubNavbar from "@/shared/components/sub-navbar/sub-navbar";

export default function ExamsListPage() {
  const { diplomaId } = useParams();
  const navigate = useNavigate();
    const location = useLocation();
  const diplomaTitle = (location.state as { diplomaTitle?: string })?.diplomaTitle ?? "Diploma";

  const { data, fetchNextPage, hasNextPage, isLoading } = useExamInfiniteList(
    diplomaId!,
  );

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  const exams = data?.pages.flatMap((page) => page.payload.data) ?? [];

  return (
    <div className=" overflow-y-auto p-6 bg-gray-50">
      <SubNavbar icon={BookOpenCheck} title={`${diplomaTitle} Exams`} showBack />
      <InfiniteScroll
        dataLength={exams.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<p className="py-6 text-center text-gray-500">Loading...</p>}
        endMessage={
          <p className="py-6 text-center text-gray-500">End of list</p>
        }
      >
        <div className="flex flex-col gap-3">
          {exams.map((exam) => (
            <article
              key={exam.id}
              onClick={() =>
                navigate(
                  `/user/diploma/exam/${diplomaId}/${exam.id}/questions`,
                  {
                    state: { duration: exam.duration,examName:exam?.title },
                  },
                )
              }
              className="group  flex cursor-pointer items-center gap-3 bg-[#eff6ff] p-2 transition hover:bg-blue-50"
            >
              {/* Image */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-blue-200 bg-blue-100">
                <img
                  src={exam.image ?? ""}
                  alt={exam.title}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                  <h2
                    className={cn(
                      "truncate text-sm font-semibold text-blue-600",
                      "group-hover:text-blue-700",
                    )}
                  >
                    {exam.title}
                  </h2>

                  {/* Exam info */}
                  <div className="flex shrink-0 items-center gap-3 text-[10px] text-gray-700">
                    <span className="flex items-center gap-1">
                      <CircleHelp className="h-3 w-3" />
                      {exam.questionsCount} Questions
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock3 className="h-3 w-3" />
                      {exam.duration} minutes
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-1 line-clamp-3 text-[10px] leading-4 text-gray-500">
                  {exam.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
