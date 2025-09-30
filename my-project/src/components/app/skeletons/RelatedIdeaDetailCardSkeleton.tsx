import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RelatedIdeaDetailCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        {/* Card Title Skeleton */}
        <Skeleton className="h-6 w-32 bg-gray-200" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* First Related Idea Skeleton */}
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="space-y-2">
            {/* Idea Title Skeleton */}
            <Skeleton className="h-5 w-4/5 bg-gray-200" />
            {/* Idea Description Skeleton */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-2/3 bg-gray-200" />
            </div>
            {/* Stats Skeleton */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-12 bg-gray-200" />
              <Skeleton className="h-4 w-16 bg-gray-200" />
            </div>
          </div>
        ))}

        {/* View More Button Skeleton */}
        <Skeleton className="h-9 w-full mt-6 rounded-md bg-gray-200" />
      </CardContent>
    </Card>
  );
};

export default RelatedIdeaDetailCardSkeleton;
