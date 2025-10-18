import { Switch } from "@headlessui/react";
import { useState } from "react";
import PrimaryButton from "../reusable/PrimaryButton";
import { toast } from "sonner";
import { useChangeReviewToggleMutation } from "@/store/features/user/user.api";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({ reviewAlerts: false });
  const [changeReviewToggle, { isLoading }] = useChangeReviewToggleMutation();

  const handleToggle = async (key: keyof typeof settings) => {
    const newValue = !settings[key as keyof typeof settings];
    setSettings((prev) => ({ ...prev, [key]: newValue }));

    try {
      await changeReviewToggle(newValue).unwrap();
      toast.success(`Review alerts turned ${newValue ? "on" : "off"}`);
    } catch (error) {
      toast.error("Failed to update notification setting.");
      setSettings((prev) => ({ ...prev, [key]: !newValue })); // revert
    }
  };

  const handleSave = () => {
    toast.success("Changes saved!");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
      <p className="text-sm text-gray-600 mb-6">
        You can manage your notification preferences here.
      </p>

      <div className="flex items-center justify-between pb-4">
        <span className="text-gray-700">Review Alerts</span>
        <Switch
          checked={settings.reviewAlerts}
          onChange={() => handleToggle("reviewAlerts")}
          disabled={isLoading}
          className={`${
            settings.reviewAlerts ? "bg-accent-orange" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        >
          <span
            className={`${
              settings.reviewAlerts ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>

      <PrimaryButton
        onClick={handleSave}
        className="px-4 py-2 text-white text-sm md:text-base mt-4"
        title="Save Changes"
      />
    </div>
  );
};

export default NotificationSettings;
