"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Share2, Eye, Calendar, User } from "lucide-react";
import { UploadFormData, AdditionalField } from "./types";

interface ArticlePreviewProps {
  formData: UploadFormData;
  onBack: () => void;
  onPublish: () => void;
}

const ArticlePreview = ({ formData, onBack, onPublish }: ArticlePreviewProps) => {
  const currentDate = new Date().toLocaleDateString();

  // Helper to resolve File | string | null -> string (for src attributes)
  const resolveSrc = (value: File | string | null): string => {
    if (!value) return "";
    return typeof value === "string" ? value : URL.createObjectURL(value);
  };

  // Debugging: Log formData.tags to check its value
  console.log("formData.tags in ArticlePreview:", formData.tags);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Edit
          </Button>
          <Button
            onClick={onPublish}
            className="bg-brick-red hover:bg-red-800 text-white px-8 rounded-none shadow-none"
          >
            Publish
          </Button>
        </div>

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
                      {formData.publishedAt || currentDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="w-4 h-4 mr-1" />
                    {formData.contentviews || 1234} views
                  </div>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {Array.isArray(formData.tags) && formData.tags.length > 0 ? (
                  formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-orange-100 text-orange-800"
                    >
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No tags added.</p>
                )}
              </div>
            </div>

            {/* Hero Image */}
            {formData.image && (
              <div className="mb-6 h-48 md:h-64 lg:h-80">
                <img
                  src={resolveSrc(formData.image)}
                  alt="Article hero image"
                  className="w-full h-64 md:h-80 lg:h-full object-cover"
                />
                {formData.imageCaption && (
                  <p className="text-sm text-gray-600 my-2 italic">
                    {formData.imageCaption}
                  </p>
                )}
              </div>
            )}

            {/* Audio */}
            {formData.audio && (
              <div className="mb-6">
                <audio
                  controls
                  className="w-full"
                  src={resolveSrc(formData.audio)}
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

            {/* YouTube Video */}
            {formData.youtubeVideoUrl && (
              <div className="mb-6">
                <iframe
                  className="w-full h-64 md:h-80 lg:h-96 rounded-lg"
                  src={formData.youtubeVideoUrl}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
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
                  formData.paragraph
                    .split("\n")
                    .map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {/* Additional Fields */}
              {formData.additionalContents.length > 0 && (
                <div className="space-y-6">
                  {formData.additionalContents.map((field: AdditionalField, index: number) => (
                    <div key={index} className="my-6">
                      {field.type === "shortQuote" && field.value && (
                        <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
                          {field.value as string}
                        </blockquote>
                      )}
                      {field.type === "paragraph" && field.value && (
                        <p className="text-gray-700 leading-relaxed">
                          {field.value as string}
                        </p>
                      )}
                      {field.type === "image" && field.value && (
                        <img
                          src={resolveSrc(field.value as File | string)}
                          alt="Additional content"
                          className="w-full h-48 md:h-64 lg:h-80 object-cover"
                        />
                      )}
                      {field.type === "video" && field.value && (
                        <video
                          controls
                          className="w-full rounded-lg"
                          src={resolveSrc(field.value as File | string)}
                        />
                      )}
                      {field.type === "audio" && field.value && (
                        <audio
                          controls
                          className="w-full"
                          src={resolveSrc(field.value as File | string)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticlePreview;