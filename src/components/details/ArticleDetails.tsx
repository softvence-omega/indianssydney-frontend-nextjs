"use client";

import { DetailsData } from "@/app/(HomeRoute)/publish-content/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Eye,
  Share2,
  User
} from "lucide-react";
import { useState } from "react";
import PrimaryButton from "../reusable/PrimaryButton";
import Newsletter from "./Newsletter";
import RecommendedArticles from "./RecommendedArticles";
import ReportModal from "./ReportModal";

interface ArticlePreviewProps {
  formData: DetailsData;
  onBack: () => void;
}

const ArticleDetails = ({ formData, onBack }: ArticlePreviewProps) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const currentDate = new Date().toLocaleDateString();

  // Sort additional fields by order
  const sortedAdditionalFields = [...formData.additionalContents].sort(
    (a, b) => a.order - b.order
  );
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Article Content */}
          <div className="lg:col-span-2">
            <Card className="bg-transparent shadow-none rounded-none border-none">
              <CardContent>
                {/* Article Header */}
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
                          {new Date(formData.createdAt).toLocaleDateString() ||
                            currentDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {formData.contentviews ?? 0} views
                      </div>
                      <Button
                        variant="outline"
                        size="sm"

                      >
                        <Bookmark className="w-4 h-4 mr-1" />
                        Bookmark
                      </Button>

                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Tags */}
                  {formData.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {formData.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-orange-100 text-orange-800"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hero Image */}
                {formData?.image && (
                  <div className="mb-6">
                    <img
                      src={formData?.image}
                      alt={formData?.title}
                      className="w-full h-64 md:h-80 lg:h-full object-cover"
                    />
                    {formData.imageCaption && (
                      <p className="text-sm text-gray-600 mt-2 italic">
                        {formData.imageCaption}
                      </p>
                    )}
                  </div>
                )}

                {/* Audio */}
                {formData?.audio && (
                  <div className="mb-6">
                    <div className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-3 flex items-center gap-3">
                      <audio
                        controls
                        className="w-full focus:outline-none"
                        src={formData.audio}
                      />
                    </div>
                  </div>
                )}

                {/* Paragraph */}
                {formData?.paragraph && (
                  <div className="leading-relaxed text-justify my-4">
                    {formData.paragraph}
                  </div>
                )}

                {/* Video */}
                {formData?.video && (
                  <div className="my-3">
                    <video
                      controls
                      className="w-full h-64 md:h-80 object-cover"
                      src={formData.video}
                    />
                  </div>
                )}

                {/* YouTube Embed */}
                {formData?.youtubeVideoUrl && (
                  <div className="my-6">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={formData.youtubeVideoUrl}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-64 md:h-96"
                      />
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="prose max-w-none">
                  {formData.shortQuote && (
                    <blockquote className="border-l-4 border-orange-500 pl-4 my-6 italic text-black bg-off-white py-4">
                      {formData.shortQuote}
                    </blockquote>
                  )}

                  {/* Render Additional Fields Dynamically */}
                  {sortedAdditionalFields.map(({ type, value, id }) => {
                    switch (type) {
                      case "shortQuote":
                        return (
                          <blockquote
                            key={id}
                            className="border-l-4 border-orange-500 pl-4 my-6 italic text-black bg-off-white py-4"
                          >
                            {value as string}
                          </blockquote>
                        );
                      case "paragraph":
                        return (
                          <p
                            key={id}
                            className="text-gray-700 leading-relaxed text-justify my-3 md:my-5"
                          >
                            {value as string}
                          </p>
                        );
                      case "image":
                        return (
                          <img
                            key={id}
                            src={value as string}
                            alt="Additional content"
                            className="w-full h-64 md:h-80 object-cover my-3 md:my-5"
                          />
                        );
                      case "video":
                        return (
                          <video
                            key={id}
                            controls
                            className="w-full h-64 md:h-80 object-cover my-3 md:my-5"
                            src={value as string}
                          />
                        );
                      case "audio":
                        return (
                          <audio
                            key={id}
                            controls
                            className="w-full my-3 md:my-5"
                            src={value as string}
                          />
                        );
                      default:
                        return null;
                    }
                  })}
                </div>

                {/* Report Button */}
                <div className="my-4">
                  <PrimaryButton
                    title="Report"
                    onClick={() => setIsReportModalOpen(true)}
                  />
                </div>

                {/* Related Topics */}
                {formData.tags?.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-xl font-semibold">
                      Related Topics
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {formData.tags.map((tag) => (
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
                )}

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
            <RecommendedArticles id={formData.id} />
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

export default ArticleDetails;
