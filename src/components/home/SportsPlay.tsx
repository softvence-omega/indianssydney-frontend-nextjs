import CommonPadding from "@/common/CommonPadding";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import NewsCard4 from "../reusable/NewsCard4";

const SportsPlay = ({ data }: { data: any }) => {
  return (
    <div>
      <CommonPadding>
        <div className="border-b border-slight-border">
          <PrimaryHeading title={data?.category?.name} seeAllRoute={data?.category?.slug} />
          <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.contents?.slice(1, 4).map((item: any) => (
              <NewsCard4 key={item.id} {...item} />
            ))}
          </div>
        </div>
      </CommonPadding>
    </div>
  );
};

export default SportsPlay;
