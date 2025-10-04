// components/Admin/shared/AdminNavBar.tsx
"use client";

import profile from "@/assets/other/cap.svg";
import { logout } from "@/store/features/auth/auth.slice";
import { AppDispatch } from "@/store/store";
import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserCheck } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type NavBarProps = {
  role: "admin" | "editor";
  onToggleSidebar?: () => void; // ✅ Add trigger for sidebar
};

const AdminNavBar: React.FC<NavBarProps> = ({ role, onToggleSidebar }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout())
    toast.success(`Logged out successfully!`);
    router.push("/");
  };

  return (
    <div className="w-full px-4 py-3 bg-white shadow flex justify-between items-center">
      {/* Left: Sidebar Trigger + Role */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle only below lg */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
        <div className="text-xl font-semibold capitalize">{role} Dashboard</div>
      </div>

      {/* Right: Search, Notification, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden sm:block w-40 md:w-52 lg:w-80">
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 rounded-lg bg-white border border-gray-300 text-sm"
            placeholder="Search"
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Search />
          </span>
        </div>

        {/* Notification */}
        <Link href={`/${role}/notifications`} className="relative">
          <div className="p-2 bg-gray-200 rounded-full">
            <Bell className="h-5 w-5" />
          </div>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            5
          </span>
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            className="h-10 w-10 rounded-full overflow-hidden cursor-pointer"
            onClick={toggleDropdown}
          >
            <Image src={profile} alt="Profile" height={40} width={40} />
          </div>
          {isDropdownOpen && (
            <div className="absolute top-10 right-0 w-40 bg-white border border-gray-200 shadow-md rounded-md z-50 py-2">
              <Link
                href={`/${role}/settings`}
                className="flex items-center gap-3 px-5 py-2 text-sm text-gray-800 hover:bg-gray-100"
              >
                <FaUserCheck className="text-gray-600 text-lg" />
                <span>Profile</span>
              </Link>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-5 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
              >
                <TbLogout className="text-red-500 text-lg" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
