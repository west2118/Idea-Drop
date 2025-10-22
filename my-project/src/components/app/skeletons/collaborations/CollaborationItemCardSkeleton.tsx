import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CollaborationItemCardSkeleton() {
  return (
    <Card className="w-full border rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <Skeleton className="h-5 w-40" /> {/* title */}
        <Skeleton className="h-5 w-16 rounded-full" /> {/* badge */}
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <Skeleton className="h-4 w-56 mb-1" />
          <Skeleton className="h-4 w-40" />
        </div>

        <div>
          <Skeleton className="h-4 w-64 mb-1" />
          <Skeleton className="h-4 w-52" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-36" /> {/* collaborator count */}
          <Skeleton className="h-4 w-4 rounded-full" /> {/* chevron */}
        </div>
      </CardContent>
    </Card>
  );
}
