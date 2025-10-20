"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useContentStatusChangeMutation } from "@/store/features/videoPodcast/video.api";

export type Video = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  date: string;
  status: "recent" | "pending" | "approved" | "declined";
  negativity: {
    score: number;
    positives: string[];
    negatives: string[];
  };
};

const VideoCard: React.FC<{
  video: Video;
  onStatusChange: (id: string, status: "approved" | "declined") => void;
}> = ({ video, onStatusChange }) => {
  const [contentStatusChange, { isLoading }] = useContentStatusChangeMutation();

  const handleStatusChange = async (
    id: string,
    newStatus: "approved" | "declined"
  ) => {
    try {
      const res = await contentStatusChange({
        id,
        status: newStatus === "approved" ? "APPROVE" : "DECLINE", // ✅ consistent case
      }).unwrap();

      if (res?.success) {
        toast.success(
          `Video has been ${
            newStatus === "approved" ? "approved" : "declined"
          } successfully`
        );
        onStatusChange(id, newStatus);
      } else {
        toast.error(res?.message || "Failed to update video status");
      }
    } catch {
      toast.error("Something went wrong while updating status");
    }
  };

  return (
    <Card className="mb-4 shadow-none">
      <CardContent>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <div className="flex gap-4">
            <img
              src={video.coverImage}
              className="h-28 w-32 object-cover rounded-lg"
              alt={video.title}
            />
            <div>
              <h2 className="font-semibold text-lg line-clamp-2">
                {video.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {video.description}
              </p>
              <p className="text-xs mt-2 text-gray-500">
                Author - {video.author} | {video.date}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {video.status === "approved" ? (
              <Badge className="bg-green-500 text-white">Approved</Badge>
            ) : video.status === "declined" ? (
              <Badge className="bg-red-500 text-white">Declined</Badge>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isLoading}
                  className="border-green-500 text-green-600"
                  onClick={() => handleStatusChange(video.id, "approved")}
                >
                  {isLoading ? "..." : "Accept"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isLoading}
                  className="border-red-500 text-red-600"
                  onClick={() => handleStatusChange(video.id, "declined")}
                >
                  {isLoading ? "..." : "Decline"}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* AI Negativity Analysis */}
        <Accordion
          type="single"
          collapsible
          className="mt-4 bg-gray-100 px-4 rounded-2xl"
        >
          <AccordionItem value="ai-analysis">
            <AccordionTrigger>
              Negativity Estimate by AI ({video.negativity.score}%)
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-300">
                <Badge
                  className={`text-white ${
                    video.negativity.score > 50 ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {video.negativity.score}%
                </Badge>
                <span className="text-sm">Negativity Estimate by AI</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {video.negativity.positives.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-green-600 text-sm"
                  >
                    <CheckCircle size={16} /> {p}
                  </div>
                ))}
                {video.negativity.negatives.map((n, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-red-600 text-sm"
                  >
                    <XCircle size={16} /> {n}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
