import { Menu } from "lucide-react";
import { useState } from "react";

import { Outlet } from "react-router-dom";

import AdminSidebar from "../sidebar/admin-sidebar";


export default function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="h-screen overflow-y-auto md:pl-90.5 bg-gray-100">
        <div className="flex items-center gap-3 border-b border-gray-100 p-4 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600"
          >
            <Menu size={22} />
          </button>
          <span className="font-geist-mono font-semibold text-blue-600">
            Exam App
          </span>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
