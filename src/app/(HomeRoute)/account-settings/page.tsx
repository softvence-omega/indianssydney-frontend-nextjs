"use client"

import { useState } from "react";
import CommonPadding from "@/common/CommonPadding";
import AccountDetails from "@/components/account-settings/AccountDetails";
import PrivacySettings from "@/components/account-settings/PrivacySettings";
import AIRecommendations from "@/components/account-settings/AIRecommendations";
import CommonWrapper from "@/common/CommonWrapper";

// Define tabs configuration
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
    key: "recommendations",
    label: "Recommendations",
    component: <AIRecommendations />,
  },
];

const AccountSetting = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key); // Default to first tab

  return (
    <div className="bg-white min-h-[70vh]">
      <CommonWrapper>
        <CommonPadding>
          {/* Tab Header */}
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center space-x-4 mb-6 border-b border-[#EDEFF0]">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-2 px-4 ${
                    activeTab === tab.key
                      ? "text-accent-orange font-semibold"
                      : "text-gray-500 hover:text-gray-700"
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
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default AccountSetting;
