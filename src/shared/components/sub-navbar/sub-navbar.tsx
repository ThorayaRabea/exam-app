import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface SubNavbarProps {
  icon: LucideIcon;
  title: string;
  showBack?: boolean;
}

export default function SubNavbar({ icon: Icon, title, showBack = false }: SubNavbarProps) {
  const navigate = useNavigate();

  return <> 
  <div className="flex gap-3 ml-3">{showBack && (
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="border border-blue-600  flex items-center justify-center cursor-pointer  py-4 sm:py-5 mb-3.5  hover:bg-white/10"
        >
          <ChevronLeft size={24} className="text-blue-600"/>
        </button>
      )}
  <div className="flex items-center gap-3 bg-blue-600 text-white px-4 sm:px-6 py-4 sm:py-5 mb-3.5 w-full">
      
      <Icon size={40} className="shrink-0" />
      <h1 className="text-3xl sm:text-xl font-semibold truncate">{title}</h1>
    </div>
    </div>
  </>
    
 
}