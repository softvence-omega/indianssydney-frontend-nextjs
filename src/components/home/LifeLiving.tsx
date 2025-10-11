import NewsCard3 from "@/components/reusable/NewsCard3";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import NewsCard4 from "../reusable/NewsCard4";
import NewsCardSecondary from "../reusable/NewsCardSecondary";

const LifeLiving = ({ data }: { data: any }) => {
  return (
    <div>
      <div className="border-b border-slight-border">
        <PrimaryHeading title={data?.category?.name} seeAllRoute={data?.category?.slug} />
        <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:border-b border-slight-border lg:pb-4">
            <div className="col-span-2">
              {data?.content?.slice(0, 1)?.map((item: any) => (
                <NewsCard4 key={item.id} {...item} />
              ))}
            </div>

            <div className="grid col-span-2 lg:col-span-1 grid-cols-2 lg:grid-cols-1 gap-4">
              {data?.content?.slice(1, 3)?.map((item: any) => (
                <NewsCardSecondary
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  subTitle={item.subTitle}
                  paragraph={item.paragraph}
                  image={item.image || "/placeholder.png"} // fallback if no image
                  category={item.category?.name}
                  author={item.user?.fullName}
                  publishedAt={new Date(item.createdAt).toLocaleDateString()}
                  imageHeight="lg:h-[242px]"
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="col-span-2">
              {data?.content?.slice(3, 4)?.map((item: any) => (
                <NewsCard4 key={item.id} {...item} type="gradient" />
              ))}
            </div>
            {data?.content?.slice(0, 2)?.map((item: any) => (
              <NewsCard3
                key={item.id}
                {...item}
                imgHeight="h-[200px] md:h-[340px]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeLiving;
