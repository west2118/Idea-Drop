import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const HeaderIdeaDetailsSkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          {/* Category Badge Skeleton */}
          <Skeleton className="h-6 w-24 bg-gray-200" />

          {/* Action Buttons Skeleton */}
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 rounded-md bg-gray-200" />
            <Skeleton className="h-8 w-8 rounded-md bg-gray-200" />
            <Skeleton className="h-8 w-8 rounded-md bg-gray-200" />
          </div>
        </div>

        {/* Title Skeleton */}
        <Skeleton className="h-8 w-3/4 mb-4 bg-gray-200" />

        {/* Metadata Skeleton */}
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center">
            <Skeleton className="h-6 w-6 rounded-full mr-2 bg-gray-200" />
            <Skeleton className="h-4 w-20 bg-gray-200" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1 bg-gray-200" />
            <Skeleton className="h-4 w-16 bg-gray-200" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1 bg-gray-200" />
            <Skeleton className="h-4 w-12 bg-gray-200" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Idea Description Sections */}
        <div className="space-y-6">
          {/* Description Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-full bg-gray-200" />
            <Skeleton className="h-5 w-full bg-gray-200" />
            <Skeleton className="h-5 w-2/3 bg-gray-200" />
          </div>

          {/* How It Works Section */}
          <div className="space-y-3">
            <Skeleton className="h-7 w-32 bg-gray-200" />
            <Skeleton className="h-5 w-full bg-gray-200" />
            <Skeleton className="h-5 w-full bg-gray-200" />
            <Skeleton className="h-5 w-3/4 bg-gray-200" />
          </div>

          {/* Benefits Section */}
          <div className="space-y-3">
            <Skeleton className="h-7 w-24 bg-gray-200" />
            <div className="space-y-2 pl-5">
              <Skeleton className="h-5 w-full bg-gray-200" />
              <Skeleton className="h-5 w-full bg-gray-200" />
              <Skeleton className="h-5 w-2/3 bg-gray-200" />
            </div>
          </div>

          {/* Next Steps Section */}
          <div className="space-y-3">
            <Skeleton className="h-7 w-28 bg-gray-200" />
            <Skeleton className="h-5 w-full bg-gray-200" />
            <Skeleton className="h-5 w-full bg-gray-200" />
            <Skeleton className="h-5 w-1/2 bg-gray-200" />
          </div>
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 pt-4">
          <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
          <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
          <Skeleton className="h-6 w-14 rounded-full bg-gray-200" />
          <Skeleton className="h-6 w-18 rounded-full bg-gray-200" />
        </div>

        {/* Stats and Actions Skeleton */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex space-x-4">
            {/* Like Button Skeleton */}
            <Skeleton className="h-9 w-16 rounded-md bg-gray-200" />
            {/* Comment Button Skeleton */}
            <Skeleton className="h-9 w-16 rounded-md bg-gray-200" />
          </div>

          {/* Join Button Skeleton */}
          <Skeleton className="h-10 w-32 rounded-md bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
};

export default HeaderIdeaDetailsSkeleton;
