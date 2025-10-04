import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonLoader = () => {
  return (
    <div className="max-w-full mx-auto p-6 space-y-6">
      {/* Article Title */}
      <Skeleton className="h-10 w-3/4 bg-gray-200" />

      {/* Subtitle */}
      <Skeleton className="h-6 w-1/2 bg-gray-200" />

      {/* Main Image */}
      <Skeleton className="h-64 w-full bg-gray-200 rounded-lg" />

      {/* Metadata (e.g., category, tags) */}
      <div className="flex space-x-4">
        <Skeleton className="h-5 w-20 bg-gray-200" />
        <Skeleton className="h-5 w-24 bg-gray-200" />
      </div>

      {/* Paragraph Content */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-5/6 bg-gray-200" />
        <Skeleton className="h-4 w-4/5 bg-gray-200" />
        <Skeleton className="h-4 w-3/4 bg-gray-200" />
      </div>

      {/* Additional Content (e.g., quote or extra section) */}
      <Skeleton className="h-8 w-2/3 bg-gray-200" />
    </div>
  );
};

export default SkeletonLoader;