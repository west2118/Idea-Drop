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

const DashboardIdeaCard = ({ idea }: { idea: any }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{idea.title}</CardTitle>
            <CardDescription className="mt-2 flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarFallback>{idea.authorInitials}</AvatarFallback>
              </Avatar>
              {idea.author} • {idea.time}
            </CardDescription>
          </div>
          {idea.trending && (
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
        <p className="text-slate-600 text-sm mb-3">{idea.description}</p>
        <div className="flex flex-wrap gap-2">
          {idea.tags.map((tag: any, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-slate-50 py-3">
        <div className="flex items-center text-slate-500">
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span className="text-sm">{idea.upvotes}</span>
        </div>
        <div className="flex items-center text-slate-500">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span className="text-sm">{idea.comments} comments</span>
        </div>
        <Button variant="ghost" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardIdeaCard;
