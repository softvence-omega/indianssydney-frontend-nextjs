"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Share2, Eye, Calendar, User } from "lucide-react";
import { DetailsData } from "@/app/(HomeRoute)/publish-content/page";
import RecommendedArticles from "./RecommendedArticles";
import Newsletter from "./Newsletter";

interface PodcastPreviewProps {
  formData: DetailsData;
  onBack: () => void;
}

const PodcastDetails = ({ formData, onBack }: PodcastPreviewProps) => {
  const currentDate = new Date().toLocaleDateString();

  // helper to resolve File | string -> string (for src attributes)
  const resolveSrc = (value: File | string | null): string => {
    if (!value) return "";
    return typeof value === "string" ? value : URL.createObjectURL(value);
  };

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
                    {formData.title}
                  </h1>

                  {formData.subTitle && (
                    <p className="text-lg text-gray-600 mb-4">
                      {formData.subTitle}
                    </p>
                  )}

                  {/* Author + Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/professional-author.png" />
                        <AvatarFallback>
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          Dr. Priya Sharma
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formData.dateTimeSlot || currentDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        1,234 views
                      </div>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Tags */}
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

                {/* Hero Image */}
                {formData.image && (
                  <div className="mb-6">
                    <img
                      src={resolveSrc(formData.image)}
                      alt="Article hero image"
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                    />
                    {formData.imageCaption && (
                      <p className="text-sm text-gray-600 mt-2 italic">
                        {formData.imageCaption}
                      </p>
                    )}
                  </div>
                )}

                {/* Audio */}
                {formData.audioFile && (
                  <div className="mb-6">
                    <audio
                      controls
                      className="w-full"
                      src={resolveSrc(formData.audioFile)}
                    />
                  </div>
                )}

                {/* Video */}
                {formData.video && (
                  <div className="mb-6">
                    <video
                      controls
                      className="w-full rounded-lg"
                      src={resolveSrc(formData.video)}
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="prose max-w-none">
                  {formData.shortQuote && (
                    <blockquote className="border-l-4 border-orange-500 pl-4 my-6 italic text-gray-700">
                      {formData.shortQuote}
                    </blockquote>
                  )}

                  <div className="text-gray-700 leading-relaxed space-y-4">
                    {formData.paragraph &&
                      formData.paragraph.split("\n").map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                  </div>

                  {/* Additional Fields */}
                  {Object.entries(formData.additionalFields).map(
                    ([key, field]) => (
                      <div key={key} className="my-6">
                        {field.type === "quote" && (
                          <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700">
                            {field.value as string}
                          </blockquote>
                        )}
                        {field.type === "paragraph" && (
                          <p className="text-gray-700 leading-relaxed">
                            {field.value as string}
                          </p>
                        )}
                        {field.type === "image" && field.value && (
                          <img
                            src={resolveSrc(field.value as File | string)}
                            alt="Additional content"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        )}
                        {field.type === "video" && field.value && (
                          <video
                            controls
                            className="w-full rounded-lg"
                            src={resolveSrc(field.value as File | string)}
                          />
                        )}
                      </div>
                    )
                  )}
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
    </div>
  );
};

export default PodcastDetails;
