"use client"
import { selectUser } from "@/store/features/auth/auth.slice";
import { useCreateApplicationForContributorMutation } from "@/store/features/user/user.api";
import { useAppSelector } from "@/store/hook";
import { X } from "lucide-react";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import PrimaryButton from "../reusable/PrimaryButton";

type ContributorModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ContributorApplicationModal: React.FC<ContributorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const user = useAppSelector(selectUser)
  const [applyOnServer] = useCreateApplicationForContributorMutation()

  // setup hook-form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.fullName,
      email: user?.email,
      about: "Looking something else ..."
    }
  })


  const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    const id = toast.loading("Please wait...")
    try {
      const payload = {
        about: data.about,
      }
      const result = await applyOnServer(payload).unwrap()
      if (result) {
        toast.success("Applied Successfully", { id })
        onClose()
      }
    } catch (error) {
      toast.error((error as any)?.data?.message || "Something went wrong", { id })
    }

  }


  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-full max-w-xl shadow-lg p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center max-w-xs mx-auto mb-2">
          Application for Contributor
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* User Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              1. User Name
            </label>
            <input
              type="text"
              {...register("name")}
              disabled
              className="w-full border border-gray-300  p-2 focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              2. Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              disabled
              className="w-full border border-gray-300  p-2 focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Why contribute */}
          <div>
            <label className="block text-sm font-medium mb-1">
              3. Why you want to be a contributor?
            </label>
            <textarea
              rows={4}
              {...register("about")}
              className="w-full border border-gray-300  p-2 focus:ring-1 focus:ring-gray-400"
            ></textarea>
          </div>

          {/* Submit */}
          <PrimaryButton title="Submit" className="w-full" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ContributorApplicationModal;
