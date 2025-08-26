"use client"

import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";


type PrimaryHeadingProps = {
  title: string;
  icon?: boolean;
  className?: string;
  seeAllRoute?: string;
};

const PrimaryHeading: React.FC<PrimaryHeadingProps> = ({
  title,
  icon = true,
  className,
  seeAllRoute,
}) => {
  const router = useRouter();

  return (
    <div
      className={clsx(
        "font-playfair font-semibold text-xl md:text-2xl lg:text-[28px] flex justify-between items-center gap-2",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <img
            src="/headingIcon.svg"
            alt=""
            className="w-4 h-4 md:w-6 md:h-6"
          />
        )}
        <span className="text-nowrap">{title}</span>
      </div>

      {seeAllRoute && (
        <button
          onClick={() => router.push(seeAllRoute)}
          className="text-xs md:text-sm hover:text-brick-red hover:underline"
        >
          See All
        </button>
      )}
    </div>
  );
};

export default PrimaryHeading;
