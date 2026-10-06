import InfiniteScroll from "react-infinite-scroll-component";

import SubNavbar from "@/shared/components/sub-navbar/sub-navbar";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDiplomaInfiniteList } from "../../apis/queries/use-diploma-infinite-list";


export default function DiplomaList() {
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useDiplomaInfiniteList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const diplomas = data?.pages.flatMap((page) => page.payload.data) ?? [];

  return (
    <div className="bg-gray-50  p-6 ">
      <SubNavbar icon={GraduationCap} title="Diplomas" />
      <InfiniteScroll
        dataLength={diplomas.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<p className="py-6 text-center text-gray-500">Loading...</p>}
        endMessage={
          <p className="py-6 text-center text-gray-500">No more diplomas</p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {diplomas.map((diploma) => (
            <article
              key={diploma.id}
              onClick={() =>
                navigate(`/user/diploma/exam/${diploma.id}`, {
                  state: { diplomaTitle: diploma.title },
                })
              }
              className="group relative h-96 overflow-hidden rounded-xl shadow-md"
            >
              {/* Image */}
              <img
                src={diploma.image ?? ""}
                alt={diploma.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent " />

              {/* Content */}
              <div className="absolute bottom-3 left-3 right-3  bg-blue-600/90 p-3 text-white ">
                <h2 className="text-xl font-bold">{diploma.title}</h2>

                {/* Hover */}
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-1000 group-hover:mt-3 group-hover:max-h-fit group-hover:opacity-100">
                  <p className="text-sm ">{diploma.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
