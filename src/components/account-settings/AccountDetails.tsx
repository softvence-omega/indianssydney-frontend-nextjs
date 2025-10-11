"use client";

import React, { useState, useRef, useEffect } from "react";
import PrimaryButton from "../reusable/PrimaryButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/store/features/profile/profile.api";
import { setUser, selectToken } from "@/store/features/auth/auth.slice";

const AccountDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = useSelector(selectToken);

  const {
    data: profile,
    isLoading: profileLoading,
    isError,
    refetch,
  } = useGetProfileQuery(undefined, { refetchOnMountOrArgChange: true });

  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  // Local state
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newAbout, setNewAbout] = useState("");

  // Populate fields from API
  useEffect(() => {
    if (profile?.data) {
      setPreviewImage(profile.data.profilePhoto || null);
      setNewName(profile.data.fullName || "");
      setNewAbout(profile.data.bio || "");
    }
  }, [profile]);

  // Open file picker
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle save
  const handleSave = async () => {
    if (!profile) {
      toast.error("Please log in to update your profile.");
      router.push("/sign-in");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", newName);
      formData.append("bio", newAbout);
      if (newProfileImage) {
        formData.append("file", newProfileImage);
      }

      const updatedData = await updateProfile(formData).unwrap();

      // ✅ Update Redux store
      if (updatedData?.data) {
        dispatch(
          setUser({
            user: updatedData.data,
            token, // use existing token from Redux
          })
        );
      }

      await refetch();
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile.");
      console.error("Update Error:", err);
    }
  };

  // Loading & error states
  if (profileLoading) {
    return <p className="text-center p-6">Loading profile...</p>;
  }

  if (isError || !profile) {
    return (
      <div className="text-center p-6">
        <p className="text-lg text-gray-700">
          Failed to load profile. Please log in.
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
          src={previewImage || "https://via.placeholder.com/150"}
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
            className="w-full p-2 mt-2 border border-gray-300"
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
            value={profile?.data?.email}
            className="w-full p-2 mt-2 border border-gray-300 disabled:text-gray-400"
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
            className="w-full p-2 mt-2 border border-gray-300"
          />
        </div>

        <PrimaryButton
          onClick={handleSave}
          disabled={updating}
          className="px-4 py-2 text-white w-full text-sm md:text-base"
          title={updating ? "Saving..." : "Save Changes"}
        />
      </div>
    </div>
  );
};

export default AccountDetails;
