import { TableCell, TableRow } from "@/components/ui/table";
import type { IDiplomaItem } from "@/features/diploma/types/diploma";
import DiplomaRowActions from "./diploma-row-actions";

interface DiplomaTableRowProps {
  diploma: IDiplomaItem;
}

export default function DiplomaTableRow({ diploma }: DiplomaTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <img
          src={diploma.image ?? ""}
          alt={diploma.title}
          className="h-12 w-12 rounded-md object-cover"
        />
      </TableCell>
      <TableCell
        className="max-w-48 font-medium text-gray-800"
        title={diploma.title}
      >
        {diploma.title}
      </TableCell>
      <TableCell className="hidden max-w-md lg:table-cell">
        <p className="line-clamp-5 text-gray-500">{diploma.description}</p>
      </TableCell>
      <TableCell className="text-right">
        <DiplomaRowActions diplomaId={diploma.id} diplomaTitle={diploma.title} immutable={diploma.immutable} />
      </TableCell>
    </TableRow>
  );
}
