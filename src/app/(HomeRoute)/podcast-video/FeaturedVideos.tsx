"use client";

import FeatureVideoCard from "@/components/live-podcast/FeatureVideoCard";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";

const sampleCards = [
  {
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=300&fit=crop",
    category: "Food Stories",
    categoryColor: "bg-orange-500",
    timeAgo: "4 days ago",
    title: "Melbourne Innovation District Tour",
    description: "Best moments from Australia's largest tech gathering",
    readTime: "18 min read",
    views: "8,547 views",
  },
  {
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=300&fit=crop",
    category: "Technology",
    categoryColor: "bg-blue-500",
    timeAgo: "2 days ago",
    title: "Future of Web Development",
    description:
      "Exploring the latest trends in modern web technologies and frameworks",
    readTime: "12 min read",
    views: "5,230 views",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop",
    category: "Travel",
    categoryColor: "bg-green-500",
    timeAgo: "1 week ago",
    title: "Hidden Gems of Southeast Asia",
    description:
      "Discover breathtaking locations off the beaten path in this comprehensive guide",
    readTime: "8 min read",
    views: "12,891 views",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop",
    category: "Business",
    categoryColor: "bg-purple-500",
    timeAgo: "3 days ago",
    title: "Startup Culture Revolution",
    description:
      "How modern startups are reshaping workplace dynamics and employee experience",
    readTime: "15 min read",
    views: "7,654 views",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
    category: "Finance",
    categoryColor: "bg-indigo-500",
    timeAgo: "5 days ago",
    title: "Digital Currency Trends",
    description:
      "Understanding the latest developments in cryptocurrency and digital payment systems",
    readTime: "10 min read",
    views: "9,876 views",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=300&fit=crop",
    category: "Design",
    categoryColor: "bg-pink-500",
    timeAgo: "1 day ago",
    title: "Minimalist Design Principles",
    description:
      "Creating beautiful user experiences through simplicity and purposeful design choices",
    readTime: "7 min read",
    views: "4,321 views",
  },
];

const FeaturedVideos = () => {
  return (
    <div>
      <PrimaryHeading title="Upcoming Podcast" className="mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleCards.slice(0, 4).map((card, index) => (
          <FeatureVideoCard
            key={index}
            image={card.image}
            category={card.category}
            timeAgo={card.timeAgo}
            title={card.title}
            description={card.description}
            readTime={card.readTime}
            views={card.views}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedVideos;
