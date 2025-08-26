import PrimaryButton from "@/components/reusable/PrimaryButton";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-screen font-playfair text-xl lg:text-3xl font-bold">
      <p className="text-3xl lg:text-5xl font-cursive ">
        The Australian Canvas
      </p>
      <p className="text-brick-red">Not Found</p>
      <Link href="/">
        <PrimaryButton title="Go Home" className="font-inter" />
      </Link>
    </div>
  );
};

export default NotFound;
