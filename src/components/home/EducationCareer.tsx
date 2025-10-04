import CommonPadding from "@/common/CommonPadding";
import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import NewsCard3 from "@/components/reusable/NewsCard3";

const EducationCareer = ({ data }: { data: any }) => {
  console.log("Businesess Innovation", data);
  return (
    <div>
      <CommonPadding>
        <div className="border-b border-slight-border">
          <PrimaryHeading
            title={data?.category?.name}
            seeAllRoute={`/${data?.category?.slug}`}
          />
          <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 ">
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:border-b border-slight-border lg:pb-4">
                {data?.contents?.slice(0, 4).map((item: any) => (
                  <NewsCard3
                    key={item.id}
                    id={item.id}
                    image={item.image || "/placeholder.png"}
                    tag={item.category?.name}
                    title={item.title}
                    description={item.paragraph}
                    author={item.user?.fullName || "Unknown"}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:mt-6">
                {data?.contents?.slice(0, 4).map((item: any) => (
                  <NewsCard3
                    key={item.id}
                    id={item.id}
                    image={item.image || "/placeholder.png"}
                    tag={item.category?.name}
                    title={item.title}
                    description={item.paragraph}
                    author={item.user?.fullName || "Unknown"}
                    imgHeight=" h-[120px] md:h-[140px]"
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 lg:grid-cols-1 gap-4">
              {newsItems.slice(0, 4).map((item) => (
                <NewsCardSecondary
                  key={item.id}
                  {...item}
                  imageHeight="lg:h-[140px]"
                />
              ))}
            </div>
          </div>
        </div>
      </CommonPadding>
    </div>
  );
};

export default EducationCareer;
