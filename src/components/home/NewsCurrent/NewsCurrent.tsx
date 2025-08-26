import CommonPadding from "@/common/CommonPadding";
import PrimaryHeading from "../../reusable/PrimaryHeading";
import NewsSlider from "./NewsSlider";
import NewsCardSecondary from "../../reusable/NewsCardSecondary";
import { newsItems } from "@/utils/demoData";


const NewsCurrent = () => {
  return (
    <div>
      <CommonPadding>
        <div className="border-b border-slight-border">
          <PrimaryHeading
            title="News & Current Affairs"
            seeAllRoute="/current-affairs"
          />
          <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4 xl:divide-x xl:divide-slight-border">
            {/* Main slider section */}
            <div className="xl:col-span-2 xl:pr-4">
              <NewsSlider items={newsItems.slice(0, 4)} />
            </div>

            {/* Secondary cards */}
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-4">
              {newsItems.slice(0, 2).map((item) => (
                <NewsCardSecondary key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </CommonPadding>
    </div>
  );
};

export default NewsCurrent;
