import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import elevateLogo from "@/assets/elevate-logo.svg";
import { cn } from "@/shared/lib/tailwind-merge";
import {
  Bolt,
  FolderCode,
  GraduationCap,
  LogOut,
  MoreVertical,
  UserRound,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import useToken from "@/features/auth/hooks/use-token";
import { ROLES } from "../../constants/role-constant";
import useUserProfile from "../../apis/queries/use-user-profile";

const navItems = [
  { icon: GraduationCap, label: "Diplomas", to: "/user/diploma" },
  { icon: UserRound, label: "Account Settings", to: "/user/account" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { removeToken } = useToken();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const {data}=useUserProfile()
  const userRole = data?.payload.user.role;
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleLogout = () => {
    removeToken();
    navigate("/auth/login");
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-blue-50 gap-2.5 p-4 sm:p-10 ",
        "fixed top-0 left-0 bottom-0 z-50 w-64 sm:w-90.5",
        "transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0",
      )}
    >
      {/*Close Button --Mobile only*/}
      <button
        type="button"
        onClick={onClose}
        className="self-end text-gray-500 md:hidden"
      >
        <X size={20} />
      </button>

      {/* Elevate */}
      <img src={elevateLogo} alt="Elevate" className="w-48" />
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <FolderCode className="text-blue-600" size={20} />
        <span className="font-geist-mono font-semibold text-xl text-blue-600">
          Exam App
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2.5 flex-1 mt-15">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2.5  p-4 text-gray-500",
                "hover:text-blue-500",
                isActive && "bg-blue-100 border border-blue-500 text-blue-600",
              )
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="relative flex items-center justify-between w-70.5 h-13.5">
        <div className="flex items-center gap-2.5">
          <img
            // src={avatarUrl}
            alt=""
            className="size-13.5 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">firstName</span>
            <span className="text-xs text-gray-500">email</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="text-gray-500"
        >
          <MoreVertical size={18} />
        </button>

        {/* Dropdown menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute bottom-full right-0 mb-2 w-40 rounded-lg border border-gray-100 bg-white py-1.5 shadow-lg"
          >
            <NavLink
              to="/user/account"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <UserRound size={16} />
              Account
            </NavLink>

            {(userRole===ROLES.ADMIN ||userRole=== ROLES.SUPER_ADMIN ) && (
              <NavLink
              to="/admin/diploma"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Bolt size={16} />
              Dashboard
            </NavLink>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}