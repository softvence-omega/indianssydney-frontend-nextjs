import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";

const CommonHeader = ({
  title = "Page Title",
  description = "",
  showDescription = true,
  bgColor = "bg-[#EEF0EE]",
  textColor = "text-black",
  titleSize = "text-3xl md:text-4xl lg:text-[40px]",
  descriptionSize = "text-sm md:text-base",
  maxDescriptionWidth = "max-w-5xl",
  padding = "py-10",
  titleMargin = "mb-4 md:mb-6",
  className = "",
  centered = true,
}) => {
  return (
    <div
      className={`${bgColor} ${textColor} ${
        centered ? "text-center" : ""
      } ${padding} ${className}`}
    >
      <CommonWrapper>
        <CommonPadding>
          <h1 className={`font-bold ${titleSize} ${titleMargin}`}>{title}</h1>
          {showDescription && description && (
            <p
              className={` text-[#38414B] ${maxDescriptionWidth} ${
                centered ? "mx-auto" : ""
              } ${descriptionSize}`}
            >
              {description}
            </p>
          )}
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default CommonHeader;
