import React from "react";
import { cn } from "@/lib/utils"; // ShadCN utility to merge classNames
import { Button } from "@/components/ui/button";

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  className?: string;

};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      className={cn(
        "bg-brick-red hover:bg-[#7c2d22] text-white px-3 sm:px-4 md:px-6 py-2 rounded-none border text-sm border-[#62180F] cursor-pointer",
        className
      )}
    >
      {title}
    </Button>
  );
};

export default PrimaryButton;
