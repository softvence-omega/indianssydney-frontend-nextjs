"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PrimaryButton from "../reusable/PrimaryButton";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "@/store/features/profile/profile.api";

// ✅ Zod schema for validation
const passwordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Old Password must have at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "New Password must have at least 6 characters")
      .regex(
        /(?=.*[A-Za-z])(?=.*\d)/,
        "New Password must contain letters and numbers"
      ),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must have at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof passwordSchema>;

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ API mutation hook
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  // React Hook Form
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(passwordSchema),
  });

  // Toggle password visibility
  const togglePasswordVisibility = (field: string) => {
    if (field === "old") setShowOldPassword(!showOldPassword);
    if (field === "new") setShowNewPassword(!showNewPassword);
    if (field === "confirm") setShowConfirmPassword(!showConfirmPassword);
  };

  // ✅ Handle form submission with API
  const onSubmit = async (data: FormData) => {
    try {
      await updatePassword({
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      reset(); // clear form
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to change password.");
      console.error("Update Password Error:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-lg font-medium mb-4">Change Password</h2>
      <p className="text-sm text-gray-600 mb-6">
        Update your password to ensure the security of your account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Old Password Field */}
        <div className="mb-4">
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            1. Old Password
          </label>
          <div>
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <input
                    {...field}
                    type={showOldPassword ? "text" : "password"}
                    className="w-full p-2 border border-gray-300"
                    placeholder="Min. 6 characters"
                  />
                  <span
                    onClick={() => togglePasswordVisibility("old")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showOldPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
              )}
            />
            {errors.oldPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* New Password Field */}
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            2. New Password
          </label>
          <div>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <input
                    {...field}
                    type={showNewPassword ? "text" : "password"}
                    className="w-full p-2 border border-gray-300"
                    placeholder="Min. 6 characters"
                  />
                  <span
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
              )}
            />
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            3. Confirm Password
          </label>
          <div>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full p-2 border border-gray-300"
                    placeholder="Min. 6 characters"
                  />
                  <span
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
              )}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Save Button */}
        <PrimaryButton
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-white w-full text-sm md:text-base"
          title={isLoading ? "Saving..." : "Save Changes"}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
