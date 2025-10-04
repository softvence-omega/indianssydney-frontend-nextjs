import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import NewsCardSecondary from "../reusable/NewsCardSecondary";
import NewsCard3 from "@/components/reusable/NewsCard3";

const BusinessInnovation = () => {
  return (
    <div>
      <div className="border-b border-slight-border">
        <PrimaryHeading
          title="Business & Innovation"
          seeAllRoute="/business-innovation"
        />

        {/* Responsive Grid Layout */}
        <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4">
          {/* 1 */}
          <div>
            <NewsCardSecondary {...newsItems[0]} layout="right" />
          </div>

          {/* 2 (bottom left) */}
          <div className=" lg:col-start-1 lg:row-start-2">
            <NewsCardSecondary {...newsItems[1]} layout="right" />
          </div>

          {/* 3 (tall center) */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-2 lg:row-start-1">
            <NewsCard3 {...newsItems[2]} />
          </div>

          {/* 4 (top right) */}
          <div className="lg:col-start-3 lg:row-start-1">
            <NewsCardSecondary {...newsItems[3]} layout="left" />
          </div>

          {/* 5 (bottom right) */}
          <div className="lg:col-start-3 lg:row-start-2">
            <NewsCardSecondary {...newsItems[4]} layout="left" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInnovation;
