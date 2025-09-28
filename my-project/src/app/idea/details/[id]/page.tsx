"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, ThumbsUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { IdeaType } from "@/lib/types";
import { fetchData, formatTimeAgo } from "@/lib/utils";
import HeaderIdeaDetails from "@/components/app/idea-details/HeaderIdeaDetailsCard";
import HeaderIdeaDetailsSkeleton from "@/components/app/skeletons/HeaderIdeaDetailsSkeleton";
import { WithSkeleton } from "@/components/app/WithSkeleton";
import CommentIdeaDetailsCard from "@/components/app/idea-details/CommentIdeaDetailsCard";
import { useState } from "react";
import AuthorProfileIdeaDetailCard from "@/components/app/idea-details/AuthorProfileIdeaDetailCard";
import RelatedIdeaDetailCard from "@/components/app/idea-details/RelatedIdeaDetailCard";
import CollaborationIdeaDetailCard from "@/components/app/idea-details/CollaborationIdeaDetailCard";

type IdeaDetails = {
  idea: IdeaType;
  isFavorited: boolean;
  isReacted: boolean;
  reactions: number;
};

export default function IdeaDetailPage() {
  const { id } = useParams();
  const token = useUserStore((state) => state.userToken);
  const [isShowComment, setIsShowComment] = useState<boolean>(false);

  const { data, error, isLoading } = useQuery<IdeaDetails>({
    queryKey: ["idea-details", id],
    queryFn: fetchData(`/api/idea/${id}`, token),
    enabled: !!token && !!id,
  });

  const handleToggleShowComment = () => {
    setIsShowComment((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Idea Header */}
          <WithSkeleton
            isLoading={isLoading}
            skeleton={<HeaderIdeaDetailsSkeleton />}>
            <HeaderIdeaDetails
              idea={data?.idea ?? null}
              isFavorited={data?.isFavorited ?? null}
              isReacted={data?.isReacted ?? null}
              reactions={data?.reactions ?? 0}
              toggleComment={handleToggleShowComment}
            />
          </WithSkeleton>

          {/* Comments Section */}
          {isShowComment && <CommentIdeaDetailsCard />}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Author Profile */}
          <AuthorProfileIdeaDetailCard />

          {/* Related Ideas */}
          <RelatedIdeaDetailCard />

          {/* Collaboration Info */}
          <CollaborationIdeaDetailCard />
        </div>
      </div>
    </div>
  );
}
