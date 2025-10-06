"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, Play, Mic, Radio } from "lucide-react";

import CommonPadding from "@/common/CommonPadding";
import PrimaryButton from "../reusable/PrimaryButton";
import { ContentTypeNew } from "@/utils/myContentData";

interface CategorySelectionProps {
  onSelect: (contentType: ContentTypeNew) => void;
}

const CategorySelection = () => {
  const categories = [
    {
      type: "ARTICLE",
      title: "Article",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: FileText,
      href: "/publish-content/article",
    },
    {
      type: "VIDEO",
      title: "Video",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: Play,
      href: "/publish-content/video",
    },
    {
      type: "PODCAST",
      title: "Podcast",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: Mic,
      href: "/publish-content/podcast",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <CommonPadding>
        <div className="max-w-5xl mx-auto">
          <Card className="border border-dashed border-[#EDEFF0] bg-pure-white rounded-none">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-2 text-center">
                Choose Category
              </h2>
              <p className="text-gray-600 mb-8 text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                          onClick={() => {
                            window.location.href = category.href;
                          }}
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
