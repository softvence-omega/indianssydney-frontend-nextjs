import CommonPadding from "@/common/CommonPadding";
import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import NewsCard3 from "@/components/reusable/NewsCard3";
import NewsCard4 from "../reusable/NewsCard4";

const CultureIdentity = () => {
  return (
    <div>
      <CommonPadding>
        <div className="border-b border-slight-border">
          <PrimaryHeading
            title="Culture & Identity"
            seeAllRoute="/culture-identity"
          />
          <div className="py-3 border-t border-slight-border mt-5 grid gap-4 ">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:border-b border-slight-border lg:pb-4">
              <div className="col-span-2">
                {newsItems.slice(3, 4).map((item) => (
                  <NewsCard4 key={item.id} {...item} type="gradient" />
                ))}
              </div>
              {newsItems.slice(0, 2).map((item) => (
                <NewsCard3
                  key={item.id}
                  {...item}
                  imgHeight="h-[200px] md:h-[340px]"
                />
              ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3">
              {newsItems.slice(2, 5).map((item) => (
                <NewsCardSecondary key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </CommonPadding>
    </div>
  );
};

export default CultureIdentity;
