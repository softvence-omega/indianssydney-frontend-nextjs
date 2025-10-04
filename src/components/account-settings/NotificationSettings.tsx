import { Switch } from "@headlessui/react";
import { useState } from "react";
import PrimaryButton from "../reusable/PrimaryButton";
import { toast } from "sonner";

const NotificationSettings = () => {
  // Define notification options
  const notificationOptions = [
    { key: "reviewAlerts", label: "Review Alerts" },
    { key: "deadlinesAlerts", label: "Deadline Alerts" },
  ];

  // Store states dynamically in an object
  const [settings, setSettings] = useState<Record<string, boolean>>({
    reviewAlerts: false,
    deadlinesAlerts: false,
  });

  // Handle toggle
  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Save handler
  const handleSave = () => {
    toast.success("Changes saved!");
    console.log("Saved settings:", settings);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
      <p className="text-sm text-gray-600 mb-6">
        You can manage your notification preferences here.
      </p>

      {notificationOptions.map((option) => (
        <div
          key={option.key}
          className="flex items-center justify-between pb-4"
        >
          <span className="text-gray-700">{option.label}</span>
          <Switch
            checked={settings[option.key]}
            onChange={() => handleToggle(option.key)}
            className={`${
              settings[option.key] ? "bg-accent-orange" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                settings[option.key] ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      ))}

      <PrimaryButton
        onClick={handleSave}
        className="px-4 py-2 text-white text-sm md:text-base mt-4"
        title="Save Changes"
      />
    </div>
  );
};

export default NotificationSettings;
