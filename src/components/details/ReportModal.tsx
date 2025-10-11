"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import { toast } from "sonner";
import { useCreateReportMutation } from "@/store/features/admin/report.api";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
}

const ReportModal = ({ isOpen, onClose, contentId }: ReportModalProps) => {
  const [createReport, { isLoading }] = useCreateReportMutation();
  const [reason, setReason] = useState("");
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // ✅ Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setScreenshots(filesArray);
      setPreviewUrls(filesArray.map((file) => URL.createObjectURL(file)));
    }
  };

  // ✅ Remove selected image
  const removeImage = (index: number) => {
    const newScreenshots = screenshots.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setScreenshots(newScreenshots);
    setPreviewUrls(newPreviewUrls);
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("contentId", contentId);
      formData.append("reason", reason);

      // 👇 Must match backend: `files[]`
      screenshots.forEach((file) => formData.append("files", file));

      const res = await createReport(formData).unwrap();

      toast.success("Report submitted successfully!");
      onClose();

      // Reset fields
      setReason("");
      setScreenshots([]);
      setPreviewUrls([]);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit report");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Submit Report
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Please provide details about the issue you found in this article.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reason Field */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Reason <span className="text-gray-500">(Why are you reporting?)</span> *
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for reporting"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Provide screenshots{" "}
              <span className="text-gray-500">(Optional)</span>
            </label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />

            {/* Image Previews */}
            {previewUrls.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`screenshot-${index}`}
                      className="w-full h-32 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-red-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
