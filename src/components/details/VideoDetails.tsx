"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Share2, Eye, Calendar, User } from "lucide-react";

import RecommendedArticles from "./RecommendedArticles";
import Newsletter from "./Newsletter";
import ReportModal from "./ReportModal";
import { useState } from "react";
import PrimaryButton from "../reusable/PrimaryButton";
import { DetailsData } from "@/app/(HomeRoute)/publish-content/types";

interface VideoDetailsProps {
  formData: DetailsData;
  onBack: () => void;
}


const VideoDetails = ({ formData, onBack }: VideoDetailsProps) => {
  const currentDate = new Date(formData.createdAt).toLocaleDateString();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Sort additional fields by order if it's an array

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Content */}
          <div className="lg:col-span-2">
            <Card className="bg-transparent shadow-none rounded-none border-none">
              <CardContent>
                {/* Header */}
                <div className="mb-6">
                  <h1 className="text-3xl font-semibold mb-4 leading-tight font-playfair">
                    {formData?.title}
                  </h1>

                  {formData?.subTitle && (
                    <p className="text-lg text-gray-600 mb-4">
                      {formData?.subTitle}
                    </p>
                  )}

                  {/* Author + Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={
                            formData.user?.profilePhoto ||
                            "/default-profile.png"
                          }
                        />
                        <AvatarFallback>
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {formData.user?.fullName || "Author"}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {currentDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {formData.views || 0} views
                      </div>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {formData?.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-orange-100 text-orange-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Video Section */}
                <div className="mb-6">
                  {formData.video ? (
                    <video
                      controls
                      className="w-full h-64 md:h-96 object-cover"
                      src={formData.video}
                    />
                  ) : formData.youtubeVideoUrl ? (
                    <iframe
                      className="w-full h-64 md:h-96"
                      src={`https://www.youtube.com/embed/${
                        formData.youtubeVideoUrl.split("v=")[1]
                      }`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <p className="text-gray-500">No video available</p>
                  )}
                </div>

                {/* Short Quote */}
                {formData.shortQuote && (
                  <blockquote className="border-l-4 border-orange-500 pl-4 my-6 italic text-black bg-off-white py-4">
                    {formData.shortQuote}
                  </blockquote>
                )}

                {/* Main Paragraph */}
                {formData.paragraph && (
                  <p className="text-gray-700 leading-relaxed text-justify my-5">
                    {formData.paragraph}
                  </p>
                )}

        

                {/* Report Button */}
                <div className="my-4">
                  <PrimaryButton
                    title="Report"
                    onClick={() => {
                      setIsReportModalOpen(true);
                    }}
                  />
                </div>

                {/* Related Topics */}
                <div>
                  <h2 className="mb-4 text-xl font-semibold">Related Topics</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {formData?.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-orange-100 text-orange-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Profile Details */}
                <div className="bg-bg-cream p-4 flex gap-4 items-center">
                  <div>
                    <img
                      src={
                        formData.user?.profilePhoto || "/default-profile.png"
                      }
                      className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover object-center"
                      alt={formData.user?.fullName || "Author"}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold">
                      {formData.user?.fullName || "Author"}
                    </h2>
                    <h2 className="text-sm md:text-base">
                      {formData.user?.email || "E-mail"}
                    </h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <RecommendedArticles />
            <Newsletter />
          </div>
        </div>
      </div>
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        contentId={formData.id}
      />
    </div>
  );
};

export default VideoDetails;
