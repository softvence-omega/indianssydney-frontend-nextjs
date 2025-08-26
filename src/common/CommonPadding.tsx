import React, { ReactNode } from "react";

// Define the props interface
interface CommonPaddingProps {
  children: ReactNode; // Type for children (can be any valid React node)
  className?: string; // Optional className prop
}

// Define the component
const CommonPadding: React.FC<CommonPaddingProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`py-8 md:py-10 lg:py-14 ${className}`}>{children}</div>
  );
};

export default CommonPadding;
