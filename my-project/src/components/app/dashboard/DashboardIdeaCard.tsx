"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, MessageSquare, ThumbsUp } from "lucide-react";
import { formatDistance } from "date-fns";
import { useRouter } from "next/navigation";
import { formatTimeAgo } from "@/lib/utils";

const DashboardIdeaCard = ({ idea }: { idea: any }) => {
  const router = useRouter();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{idea?.title}</CardTitle>
            <CardDescription className="mt-2 flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback>{`${idea?.user_id.firstName
                    .charAt(0)
                    .toUpperCase()}${idea?.user_id.lastName
                    .charAt(0)
                    .toUpperCase()}`}</AvatarFallback>
                </Avatar>
                {`${idea?.user_id.firstName} ${
                  idea?.user_id.lastName
                } • ${formatTimeAgo(idea?.createdAt)}`}
              </div>
              <div>
                <Badge variant="default" className="text-xs">
                  {idea?.categories[0]}
                </Badge>
              </div>
            </CardDescription>
          </div>
          {idea?.trending && (
            <Badge
              variant="outline"
              className="bg-orange-50 text-orange-700 border-orange-200 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-slate-600 text-sm mb-3">
          {idea?.content.description.split(".")[0]}
        </p>
        <div className="flex flex-wrap gap-2">
          {idea?.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-slate-50 py-3">
        <div className="flex items-center text-slate-500">
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span className="text-sm">{idea?.upvotes ?? 0}</span>
        </div>
        <div className="flex items-center text-slate-500">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span className="text-sm">{idea?.comments ?? 0} comments</span>
        </div>
        <Button
          onClick={() => router.push(`/idea/details/${idea?._id}`)}
          variant="ghost"
          size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardIdeaCard;
