"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Share2,
  Eye,
  Calendar,
  User,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { FormData } from "@/app/(HomeRoute)/publish-content/page";
import RecommendedArticles from "./RecommendedArticles";
import Newsletter from "./Newsletter";

interface ArticlePreviewProps {
  formData: FormData;
  onBack: () => void;
  onPublish: () => void;
}

const ArticleDetails = ({
  formData,
  onBack,
  onPublish,
}: ArticlePreviewProps) => {
  // Use current date and time (03:18 PM +06, August 27, 2025)
  const currentDate = new Date(
    "2025-08-27T15:18:00+06:00"
  ).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Form
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Article Content */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-sm">
              <CardContent className="">
                {/* Article Header */}
                <div className="mb-6">
                  <h1 className="text-3xl font-semibold  mb-4 leading-tight font-playfair">
                    {formData.title ||
                      "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry"}
                  </h1>

                  {formData.subTitle && (
                    <p className="text-lg text-gray-600 mb-4">
                      {formData.subTitle}
                    </p>
                  )}

                  {/* Author and Meta Info */}
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
                          {currentDate}
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
                <div className="mb-6">
                  <img
                    src="/red-volkswagen-car-modern-design.png"
                    alt="Article hero image"
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                  {formData.imageCaption && (
                    <p className="text-sm text-gray-600 mt-2 italic">
                      {formData.imageCaption}
                    </p>
                  )}
                </div>

                {/* Article Content */}
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    German automaker faced mounting pressure from trade disputes
                    and shifting market dynamics as quarterly earnings drop 23%.
                  </p>

                  {formData.shortQuote && (
                    <blockquote className="border-l-4 border-orange-500 pl-4 my-6 italic text-gray-700">
                      {formData.shortQuote}
                    </blockquote>
                  )}

                  <div className="text-gray-700 leading-relaxed space-y-4">
                    {formData.paragraph ? (
                      formData.paragraph
                        .split("\n")
                        .map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))
                    ) : (
                      <p>
                        Volkswagen reported a sharp decline in third-quarter
                        profits, with earnings falling 23% compared to the same
                        period last year. The German automaker cited ongoing
                        trade tensions and increased tariffs as primary factors
                        affecting its global operations and profitability.
                      </p>
                    )}
                  </div>

                  {/* Additional Fields */}
                  {Object.entries(formData.additionalFields).map(
                    ([key, field]) => (
                      <div key={key} className="my-6">
                        {field.type === "quote" && (
                          <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700">
                            {field.value}
                          </blockquote>
                        )}
                        {field.type === "paragraph" && (
                          <p className="text-gray-700 leading-relaxed">
                            {field.value}
                          </p>
                        )}
                        {field.type === "image/video" && field.value && (
                          <img
                            src="/additional-content-image.png"
                            alt="Additional content"
                            className="w-full h-48 object-cover rounded-lg"
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
            {/* Recommended Articles */}
            <RecommendedArticles />
            {/* Newsletter Signup */}
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
