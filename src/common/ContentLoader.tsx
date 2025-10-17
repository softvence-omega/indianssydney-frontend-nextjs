import { Skeleton } from '@/components/ui/skeleton'
import CommonWrapper from './CommonWrapper'

export default function ContentLoader() {
    return (
        <CommonWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="col-span-2 space-y-6">
                    <Skeleton className="h-64 bg-gray-300 rounded-lg" />
                    <Skeleton className="h-64 bg-gray-300 rounded-lg" />
                    <Skeleton className="h-64 bg-gray-300 rounded-lg" />
                    <Skeleton className="h-64 bg-gray-300 rounded-lg" />
                </div>

                {/* Right Column (Recommended Articles) */}
                <div className="space-y-6">
                    <Skeleton className="h-56 bg-gray-300 rounded-lg w-full" />
                    <Skeleton className="h-56 bg-gray-300 rounded-lg w-full" />
                    <Skeleton className="h-56 bg-gray-300 rounded-lg w-full" />
                    <Skeleton className="h-56 bg-gray-300 rounded-lg w-full" />

                </div>
            </div>
        </CommonWrapper>
    )
}
