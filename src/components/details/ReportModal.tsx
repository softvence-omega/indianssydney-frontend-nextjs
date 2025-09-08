"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
}

const ReportModal = ({ isOpen, onClose, contentId }: ReportModalProps) => {
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setScreenshots(filesArray);
      setPreviewUrls(filesArray.map((file) => URL.createObjectURL(file)));
    }
  };

  const removeImage = (index: number) => {
    const newScreenshots = screenshots.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setScreenshots(newScreenshots);
    setPreviewUrls(newPreviewUrls);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reportData = {
      contentId,
      title,
      reason,
      screenshots,
    };

    console.log("Report Submitted:", reportData);

    // Reset form after submission
    setTitle("");
    setReason("");
    setScreenshots([]);
    setPreviewUrls([]);
    onClose();
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
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              1. Title <span className="text-gray-500">(Mention the article title)</span> *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title"
              required
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium mb-1">
              2. Reason <span className="text-gray-500">(Why are you reporting?)</span> *
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for reporting"
              required
            />
          </div>

          {/* Screenshots */}
          <div>
            <label className="block text-sm font-medium mb-1">
              3. Provide screenshots{" "}
              <span className="text-gray-500">(Upload your screenshots)</span> *
            </label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              required
            />

            {/* Preview */}
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

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" className="bg-red-600 text-white">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
