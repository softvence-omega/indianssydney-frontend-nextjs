"use client";
import { useGetAllAdQuery } from "@/store/features/ad-management/ad-management.api";

const Ad = () => {
  const { data } = useGetAllAdQuery({});
  const adds = data?.data || [];
  const randomAd = adds[Math.floor(Math.random() * adds.length)];
  console.log(randomAd)

  return (
    <div>
      <a href={randomAd?.link} target="_blank">
        <img src={randomAd?.adsimage} className="w-full"  alt="" />
      </a>
    </div>
  );
};

export default Ad;
