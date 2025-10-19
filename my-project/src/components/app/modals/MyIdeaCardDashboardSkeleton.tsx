import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";

const MyIdeaCardDashboardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <User className="h-5 w-5 mr-2 text-blue-600" />
          My Ideas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between rounded-md px-0 py-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-8 rounded-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyIdeaCardDashboardSkeleton;
