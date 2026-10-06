import useToken from "@/features/auth/hooks/use-token";
import { cn } from "@/shared/lib/tailwind-merge";
import { Lock, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AccountSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { key: "profile", label: "Profile", icon: UserRound },
  { key: "change_password", label: "Change Password", icon: Lock },
];

export default function AccountSidebar({
  activeTab,
  onTabChange,
}: AccountSidebarProps) {
  const navigate = useNavigate();
  const { removeToken } = useToken();

  const handleLogout = () => {
    removeToken();
    navigate("/auth/login");
  };

  return (
    <div className="flex min-h-full flex-col justify-between rounded-lg border border-gray-200 p-3">
      <nav className="flex flex-col gap-1">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onTabChange(key)}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm transition",
              activeTab === key
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50",
            )}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center cursor-pointer gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
