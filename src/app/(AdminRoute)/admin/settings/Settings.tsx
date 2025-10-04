"use client";

import AccountDetails from "@/components/account-settings/AccountDetails";
import { useState } from "react";
import PrivacySettings from "@/components/account-settings/PrivacySettings";
import NotificationSetting from "@/components/account-settings/NotificationSettings";
const tabs = [
  {
    key: "account",
    label: "Account Setting",
    component: <AccountDetails />,
  },
  {
    key: "privacy",
    label: "Privacy",
    component: <PrivacySettings />,
  },
  {
    key: "notification-settings",
    label: "Notification Settings",
    component: <NotificationSetting />,
  },
];
const Settings = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key); // Default to first tab

  return (
    <div>
      <div className="flex justify-center space-x-2 md:space-x-4 mb-6 border-b border-[#EDEFF0]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-2 md:px-4 font-medium text-sm border-b-2  ${
              activeTab === tab.key
                ? "text-accent-orange border-accent-orange"
                : "text-gray-500 hover:text-gray-700 border-transparent"
            } transition-colors duration-200 text-nowrap`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Tab Content */}
      <div className="space-y-4">
        {tabs.find((tab) => tab.key === activeTab)?.component}
      </div>
    </div>
  );
};

export default Settings;
