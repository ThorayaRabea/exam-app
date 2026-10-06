import type { IDiplomaItem } from "@/features/diploma/types/diploma";

interface DiplomaDetailsProps {
  diploma?: IDiplomaItem;
}

export default function DiplomaDetails({ diploma }: DiplomaDetailsProps) {
  return (
    <div className="mx-6 mt-6 bg-white p-4">
      <p className="mb-1 text-[16px] font-mono text-gray-400">Image</p>
      <img
        src={diploma?.image ?? ""}
        alt={diploma?.title}
        className="h-52 w-52 object-cover"
      />

      <div className="mt-3">
        <p className="mb-1 text-[16px] font-mono text-gray-400">Title</p>
        <h2 className="text-[16px] font-mono text-gray-900">{diploma?.title}</h2>
      </div>

      <div className="mt-3">
        <p className="mb-1 text-[16px] font-mono text-gray-400">Description</p>
        <p className="max-w-172.5 text-[11px] leading-normal font-mono text-gray-700">
          {diploma?.description}
        </p>
      </div>
    </div>
  );
}