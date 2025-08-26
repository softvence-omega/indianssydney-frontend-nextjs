"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import NewsCard from "./NewsCard";

// Swiper styles (must be imported for proper UI)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type NewsItem = {
  id: string;   // ✅ match your data
  image: string;
  tag?: string;
  title: string;
  description: string;
  author: string;
  readTime: string;
};

type NewsSliderProps = {
  items: NewsItem[];
};



const NewsSlider: React.FC<NewsSliderProps> = ({ items }) => {
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
          <button className="custom-prev flex items-center justify-center rounded-full text-slight-border cursor-pointer">
            <CircleArrowLeft className="w-6 h-6" />
          </button>
          <button className="custom-next flex items-center justify-center rounded-full text-slight-border cursor-pointer">
            <CircleArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSlider;
