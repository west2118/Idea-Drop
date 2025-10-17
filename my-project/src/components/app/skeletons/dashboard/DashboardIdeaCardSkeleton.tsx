"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardIdeaCardSkeleton = () => {
  return (
    <>
      {[...Array(2)].map((_, i) => (
        <Card key={i} className="flex flex-col h-full overflow-hidden">
          <CardHeader>
            <div className="flex flex-col space-y-3">
              <CardTitle>
                <Skeleton className="h-5 w-3/4" />
              </CardTitle>
              <CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="pb-3 flex-grow space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 flex-wrap mt-2">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-10 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between bg-slate-50 py-3 mt-auto">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
