// UploadCard.tsx
import React from "react";
import PrimaryButton from "../reusable/PrimaryButton";
import { FilePlus2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface UploadCardProps {
  viewMode: "grid" | "list";
}

const UploadCard: React.FC<UploadCardProps> = ({ viewMode }) => {
  const isGridView = viewMode === "grid";
  const router=useRouter();

  return (
    <div
      className={`border border-gray-200 p-6 flex gap-4 ${
        isGridView
          ? " flex-col items-center justify-center text-center"
          : "flex-col items-center justify-center text-center md:flex-row md:justify-between md:text-left "
      } h-full`}
    >
      {/* Icon */}
      <div
        className="p-4"
      >
        <FilePlus2 className="text-accent-orange w-16 h-16 " />
      </div>

      {/* Text Content */}
      <div
        className={`${
          isGridView ? "flex flex-col items-center" : "flex-1"
        } text-center md:text-left`}
      >
        <h3 className={`font-semibold ${isGridView ? "" : "text-xl"}`}>
          Upload your best story
        </h3>
        <p
          className={`text-sm text-gray-500 mt-1 ${
            isGridView ? "text-center" : "text-center md:text-left"
          }`}
        >
          Publish your best work. Get feedback, likes, and be a part of our
          growing community.
        </p>
      </div>

      {/* Button */}
      <PrimaryButton
        title="Upload"
        className="bg-black border-black hover:bg-black/80"
        onClick={()=>router.push("/publish-content")}
      />
    </div>
  );
};

export default UploadCard;
