import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface NavbarProps {
  items: BreadcrumbItem[];
}

export default function Navbar({ items }: NavbarProps) {
  return (
    <div className="flex items-center gap-1 px-4 py-3 sm:px-6 text-xs sm:text-sm text-gray-400">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1">
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-blue-600">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-blue-600" : ""}>{item.label}</span>
            )}
            {!isLast && <span>/</span>}
          </span>
        );
      })}
    </div>
  );
}