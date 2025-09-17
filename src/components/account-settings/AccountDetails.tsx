import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import PrimaryButton from "../reusable/PrimaryButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hook";

const AccountDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state?.auth?.user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize state with user data or fallback values
  const [newProfileImage, setNewProfileImage] = useState<string | null>(
    user?.fullName || null
  );
  const [newName, setNewName] = useState(user?.fullName || "");
  const [newAbout, setNewAbout] = useState(user?.fullName || "");

  // Trigger file input click when image is clicked
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Handle profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle save action
  const handleSave = () => {
    if (!user) {
      toast.error("Please log in to update your profile.");
      router.push("/sign-in");
      return;
    }

    const updatedData = {
      name: newName,
      profileImage: newProfileImage || user.profilePhoto,
      about: newAbout,
      recommendations: user.profilePhoto, // Preserve existing recommendations
    };

    console.log("Updated User Data:", updatedData);
    // dispatch(updateUser(updatedData));
    toast.success("Changes saved!");
  };

  // If user is not logged in, show a message or redirect
  if (!user) {
    return (
      <div className="text-center p-6">
        <p className="text-lg text-gray-700">
          Please log in to view your account details.
        </p>
        <PrimaryButton
          onClick={() => router.push("/sign-in")}
          className="mt-4 bg-blue-600 text-white px-4 py-2"
          title="Sign In"
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            newProfileImage ||
            user?.profilePhoto ||
            "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleImageClick}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleProfileImageChange}
          className="hidden"
        />
        <PrimaryButton
          className="bg-black hover:bg-gray-700 text-white px-4 py-2 border-black"
          title="Update Profile Image"
          onClick={handleImageClick}
        />
      </div>

      {/* User Info */}
      <div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            1. User Name
          </label>
          <input
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 "
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            2. Email Address
          </label>
          <input
            id="email"
            disabled
            value={user.email}
            className="w-full p-2 mt-2 border border-gray-300  disabled:text-gray-400"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700"
          >
            3. About
          </label>
          <textarea
            id="about"
            value={newAbout}
            onChange={(e) => setNewAbout(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 "
          />
        </div>

        <PrimaryButton
          onClick={handleSave}
          className="px-4 py-2 text-white w-full text-sm md:text-base"
          title="Save Changes"
        />

        <div className="">
          <h2>Notifications</h2>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
