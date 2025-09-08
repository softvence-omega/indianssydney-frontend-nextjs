import React from "react";
import { X } from "lucide-react";
import PrimaryButton from "../reusable/PrimaryButton";

type ContributorModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ContributorApplicationModal: React.FC<ContributorModalProps> = ({
  isOpen,
  onClose,
}) => {
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
        <form className="space-y-6">
          {/* User Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              1. User Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              defaultValue="Esther Howard"
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
              placeholder="example@email.com"
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
              defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
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
