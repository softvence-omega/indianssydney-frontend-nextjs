"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserCheck } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import profile from "@/assets/other/cap.svg";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import { Search } from "lucide-react";

const AdminNavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Admin Logged out successfully!");
    router.push("/");
  };

  return (
    <div className="w-full px-4 py-4 mx-auto h-full bg-white shadow pt-2">
      <div className="w-full mt-2 flex justify-between items-center">
        {/* Left side */}
        <div className=" text-2xl font-bold">Admin</div>

        {/* Right side: Search Bar, Profile and Notifications */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-72 md:w-96">
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-white border border-gray-300 text-sm"
              placeholder="Search"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
             <Search/>
            </span>
          </div>

          {/* Profile and Notifications */}
          <div className="relative ml-4">
            <div
              className="h-10 w-10 rounded-full overflow-hidden cursor-pointer"
              onClick={toggleDropdown}
            >
              <Image src={profile} alt="Profile" height={40} width={40} />
            </div>
            {isDropdownOpen && (
              <div className="absolute top-14 right-0 w-56 bg-white border border-gray-200 shadow-md rounded-md z-50 py-2 transition-all duration-200 ease-in-out">
                <Link
                  href="/admin/admin-profile"
                  className="flex items-center gap-3 px-5 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-150"
                >
                  <FaUserCheck className="text-gray-600 text-lg" />
                  <span>Profile</span>
                </Link>

                <div className="my-1 border-t border-gray-100"></div>

                <Link
                  onClick={() => {
                    handleLogout();
                  }}
                  href="/"
                  className="flex items-center gap-3 px-5 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-150"
                >
                  <TbLogout className="text-red-500 text-lg" />
                  <span>Log Out</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
