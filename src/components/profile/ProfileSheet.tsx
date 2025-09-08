import React, { useState, useRef, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ContributorApplicationModal from "./ContributorApplicationModal";

interface ProfileSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSheet: React.FC<ProfileSheetProps> = ({ isOpen, onClose }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [aiRecommendations, setAiRecommendations] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sheetRef.current &&
        !sheetRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    onClose();
  };

  // Check if the user role is Contributor
  const isContributor = user?.role === "contributor";
  const isUser = user?.role === "user";

  return (
    <>
      {/* Overlay/Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sheetRef}
        className={`fixed top-0 right-0 w-[300px] md:w-[400px] lg:w-[500px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header with Profile + Close */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col mt-2 mb-6">
              <img
                src={user?.profileImage || "https://via.placeholder.com/100"}
                alt="User Avatar"
                className="w-24 h-24 rounded-full border-2 border-gray-200 mb-3 object-cover"
              />
              <p className="text-lg font-semibold">
                {user?.name || "Guest User"}
              </p>
              <p className="text-sm text-gray-500">
                {user?.email || "No email"}
              </p>
              <div className="flex">
                {isContributor && (
                  <p className="text-sm text-white mt-2 px-2 py-1 rounded-full bg-black w-auto">
                    Contributor
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close profile sheet"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Options */}
          <nav className="flex flex-col space-y-4 flex-1">
            <Link
              href="/account-settings"
              className="pb-2 border-b border-gray-200 text-gray-700 hover:text-accent-orange transition"
              onClick={onClose}
            >
              Account Settings
            </Link>

            <Link
              href="/bookmarked-articles"
              className="pb-2 border-b border-gray-200 text-gray-700 hover:text-accent-orange transition"
              onClick={onClose}
            >
              Bookmarked Articles
            </Link>

            {/* AI Recommendations Toggle */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-700">AI Recommendations</span>
              <Switch
                checked={aiRecommendations}
                onChange={setAiRecommendations}
                className={`${
                  aiRecommendations ? "bg-blue-primary" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    aiRecommendations ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>

            {isUser && (
              <div
                className="pb-2 border-b border-gray-200 text-gray-700 hover:text-accent-orange transition"
                 onClick={() => setOpen(true)}
              >
                Application for Contributor
              </div>
            )}

            {/* Notifications and Role-Specific Sections */}
            {isContributor && (
              <>
                <Link
                  href="/notifications"
                  className="flex items-center justify-between pb-2 border-b border-gray-200"
                >
                  <span className="text-gray-700 hover:text-accent-orange">
                    Notifications
                  </span>
                  <p className="text-xs  w-6 h-6 rounded-full bg-[#FFE2E2] flex items-center justify-center text-brick-red">
                    10
                  </p>
                </Link>

                <div className="pb-4 border-b border-gray-200">
                  <p className="font-semibold text-gray-700">Contents</p>
                  <div className="flex flex-col ml-3 mt-3 space-y-2">
                    <Link
                      href="/my-contents"
                      className="text-sm text-gray-500 hover:text-accent-orange"
                      onClick={onClose}
                    >
                      My Contents
                    </Link>
                    <Link
                      href="/publish-content"
                      className="text-sm text-gray-500 hover:text-accent-orange"
                      onClick={onClose}
                    >
                      Publish Content
                    </Link>
                  </div>
                </div>
              </>
            )}

            {/* Help & Support */}
            <div>
              <p className="font-semibold text-gray-700">Help & Support</p>
              <div className="flex flex-col ml-3 mt-3 space-y-2">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-500 hover:text-accent-orange"
                  onClick={onClose}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/faq"
                  className="text-sm text-gray-500 hover:text-accent-orange"
                  onClick={onClose}
                >
                  FAQ
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-gray-500 hover:text-accent-orange"
                  onClick={onClose}
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </nav>

          {/* Logout Button */}
          <PrimaryButton
            title="Logout"
            onClick={handleLogout}
            className="bg-brick-red hover:bg-red-700 text-white py-2 px-4 w-full"
          />
        </div>
      </aside>
       <ContributorApplicationModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ProfileSheet;
