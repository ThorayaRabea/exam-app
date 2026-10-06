import AccountSidebar from "@/features/user/components/account/account-sidebar";
import ChangePassword from "@/features/user/components/account/change-password/change-password";
import ProfileForm from "@/features/user/components/account/profile-form";
import Navbar from "@/shared/components/navbar/navbar";
import SubNavbar from "@/shared/components/sub-navbar/sub-navbar";

import { UserRound } from "lucide-react";
import { useState } from "react";

const TABS = {
  PROFILE: "profile",
  CHANGE_PASSWORD: "change_password",
} as const;

export default function AdminAccountPage() {
  const [activeTab, setActiveTab] = useState<string>(TABS.PROFILE);
  return (
    <>
      <Navbar items={[{ label: "Account" }]} />
      <SubNavbar icon={UserRound} title="Account" showBack />
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-4">
      <div className="md:col-span-1">
        <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className="md:col-span-3">
        {activeTab === TABS.PROFILE && <ProfileForm />}
        {activeTab === TABS.CHANGE_PASSWORD && <ChangePassword/>}
      </div>
    </div>
    </>
  );
}
