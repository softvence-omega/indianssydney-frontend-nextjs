"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, Play, Mic, Radio } from "lucide-react";
import type { ContentType } from "@/app/(HomeRoute)/publish-content/page";
import CommonPadding from "@/common/CommonPadding";
import PrimaryButton from "../reusable/PrimaryButton";

interface CategorySelectionProps {
  onSelect: (contentType: ContentType) => void;
}

const CategorySelection = ({ onSelect }: CategorySelectionProps) => {
  const categories = [
    {
      type: "article" as ContentType,
      title: "Article",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: FileText,
    },
    {
      type: "video" as ContentType,
      title: "Video",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: Play,
    },
    {
      type: "podcast" as ContentType,
      title: "Podcast",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: Mic,
    },
    {
      type: "live-event" as ContentType,
      title: "Live Event",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: Radio,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <CommonPadding>
        <div className="max-w-4xl mx-auto">
          <Card className="border border-dashed border-[#EDEFF0] bg-pure-white rounded-none">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-2">Choose Category:</h2>
              <p className="text-gray-600 mb-8">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card
                      key={category.type}
                      className="border border-gray-200 hover:shadow-lg transition-shadow rounded-none"
                    >
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-bg-cream rounded-md flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="text-accent-orange" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {category.description}
                        </p>
                        <PrimaryButton
                          onClick={() => onSelect(category.type)}
                          title="Upload"
                          className=" text-white "
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </CommonPadding>
    </div>
  );
};

export default CategorySelection;
