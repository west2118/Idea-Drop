import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CollaborationType } from "@/lib/types";

const CollaborationIdeaDetailCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        {/* Card Title Skeleton */}
        <Skeleton className="h-6 w-28 bg-gray-200" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Status Row Skeleton */}
          <div className="flex justify-between gap-2">
            <Skeleton className="h-4 w-12 bg-gray-200" />
            <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
          </div>

          {/* Looking For Row Skeleton */}
          <div className="flex justify-between gap-2">
            <Skeleton className="h-4 w-20 bg-gray-200" />
            <div className="text-end space-y-1">
              <Skeleton className="h-4 w-32 bg-gray-200" />
              <Skeleton className="h-4 w-24 bg-gray-200 ml-auto" />
            </div>
          </div>

          {/* Team Members Row Skeleton */}
          <div className="flex justify-between gap-2">
            <Skeleton className="h-4 w-24 bg-gray-200" />
            <Skeleton className="h-4 w-12 bg-gray-200" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationIdeaDetailCardSkeleton;
