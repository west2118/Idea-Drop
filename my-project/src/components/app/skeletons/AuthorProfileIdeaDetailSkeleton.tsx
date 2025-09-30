import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AuthorProfileIdeaDetailSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        {/* Card Title Skeleton */}
        <Skeleton className="h-6 w-32 bg-gray-200" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Author Profile Section */}
        <div className="flex items-center space-x-3">
          {/* Avatar Skeleton */}
          <Skeleton className="h-14 w-14 rounded-full bg-gray-200" />
          <div className="space-y-2">
            {/* Author Name Skeleton */}
            <Skeleton className="h-5 w-28 bg-gray-200" />
            {/* Author Title Skeleton */}
            <Skeleton className="h-4 w-36 bg-gray-200" />
          </div>
        </div>

        {/* Bio Description Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-gray-200" />
          <Skeleton className="h-4 w-3/4 bg-gray-200" />
        </div>

        {/* Ideas Count Skeleton */}
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-1 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
        </div>

        {/* Follow Button Skeleton */}
        <Skeleton className="h-9 w-full rounded-md bg-gray-200 mt-4" />
      </CardContent>
    </Card>
  );
};

export default AuthorProfileIdeaDetailSkeleton;
