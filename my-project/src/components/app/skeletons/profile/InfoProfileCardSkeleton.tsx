import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const InfoProfileCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          <Skeleton className="h-24 w-24 rounded-full mb-4" />

          {/* Name */}
          <Skeleton className="h-6 w-40" />

          {/* Bio */}
          <Skeleton className="h-4 w-56" />

          {/* Info section */}
          <div className="flex flex-col items-start w-full space-y-3 mt-4">
            <div className="flex items-center gap-2 text-sm w-full">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-2 text-sm w-full">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col space-y-2 mt-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoProfileCardSkeleton;
