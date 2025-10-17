import { Skeleton } from "@/components/ui/skeleton";
import CommonWrapper from "./CommonWrapper";

export default function HomePageLoader() {
    return (
        <CommonWrapper>
            <div className="flex justify-between items-center mt-8">
                <Skeleton className="h-8 w-[300px] bg-gray-300" />
                <Skeleton className="h-8 w-[100px] bg-gray-300" />
            </div>

            <div className="mt-4 flex justify-between items-center gap-10">
                <div className="w-full flex-1">
                    <Skeleton className="h-[400px] w-full bg-gray-300" />
                </div>
                <div className="w-full md:w-1/3 space-y-4">
                    <Skeleton className="h-[200px] bg-gray-300" />
                    <Skeleton className="h-[200px] bg-gray-300" />
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center gap-10">
                <div className="w-full flex-1">
                    <Skeleton className="h-[400px] w-full bg-gray-300" />
                </div>
                <div className="w-full md:w-1/3 space-y-4">
                    <Skeleton className="h-[200px] bg-gray-300" />
                    <Skeleton className="h-[200px] bg-gray-300" />
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center gap-10">
                <div className="w-full flex-1">
                    <Skeleton className="h-[400px] w-full bg-gray-300" />
                </div>
                <div className="w-full md:w-1/3 space-y-4">
                    <Skeleton className="h-[200px] bg-gray-300" />
                    <Skeleton className="h-[200px] bg-gray-300" />
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center gap-10">
                <div className="w-full flex-1">
                    <Skeleton className="h-[400px] w-full bg-gray-300" />
                </div>
                <div className="w-full md:w-1/3 space-y-4">
                    <Skeleton className="h-[200px] bg-gray-300" />
                    <Skeleton className="h-[200px] bg-gray-300" />
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center gap-10">
                <div className="w-full flex-1">
                    <Skeleton className="h-[400px] w-full bg-gray-300" />
                </div>
                <div className="w-full md:w-1/3 space-y-4">
                    <Skeleton className="h-[200px] bg-gray-300" />
                    <Skeleton className="h-[200px] bg-gray-300" />
                </div>
            </div>

        </CommonWrapper>
    )
}
