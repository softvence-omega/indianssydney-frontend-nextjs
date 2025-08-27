import adImg from "@/assets/other/ad.png";
import Image from "next/image";

const Ad = () => {
  return (
    <div>
      <Image src={adImg} className="w-full" alt="" />
    </div>
  );
};

export default Ad;
