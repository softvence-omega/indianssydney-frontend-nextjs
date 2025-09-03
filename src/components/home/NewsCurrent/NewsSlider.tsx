"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import NewsCard from "./NewsCard";

// Swiper styles (must be imported for proper UI)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";

// Import Swiper's types for proper typing
import { Swiper as SwiperType } from "swiper";

// Define NewsItem type
type NewsItem = {
  id: string; // ✅ match your data
  image: string;
  tag?: string;
  title: string;
  description: string;
  author: string;
  readTime: string;
};

// Define the Props for the NewsSlider component
type NewsSliderProps = {
  items: NewsItem[];
};

const NewsSlider: React.FC<NewsSliderProps> = ({ items }) => {
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  // Correct type for swiper parameter
  const handleSlideChange = (swiper: SwiperType) => {
    setIsFirstSlide(swiper.isBeginning); // Check if it's the first slide
    setIsLastSlide(swiper.isEnd); // Check if it's the last slide
  };

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          renderBullet: (className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        autoplay={{ delay: 5000 }}
        spaceBetween={30}
        slidesPerView={1}
        onSlideChange={handleSlideChange} // Add slide change event
        className="w-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <NewsCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation + Pagination */}
      <div className="absolute bottom-4 right-4 flex gap-8 items-center z-10">
        <div className="custom-pagination flex gap-2 z-10"></div>

        <div className="flex gap-3">
          <button
            className={`custom-prev flex items-center justify-center rounded-full cursor-pointer ${
              isFirstSlide ? "text-gray-200" : "text-ink-black/60"
            }`}
          >
            <CircleArrowLeft className="w-6 h-6" />
          </button>
          <button
            className={`custom-next flex items-center justify-center rounded-full cursor-pointer ${
              isLastSlide ? "text-gray-200" : "text-ink-black/60"
            }`}
          >
            <CircleArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSlider;
