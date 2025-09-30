"use client";

import { useParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { CollaborationType, IdeaType } from "@/lib/types";
import { fetchData, formatTimeAgo } from "@/lib/utils";
import HeaderIdeaDetails from "@/components/app/idea-details/HeaderIdeaDetailsCard";
import HeaderIdeaDetailsSkeleton from "@/components/app/skeletons/HeaderIdeaDetailsSkeleton";
import { WithSkeleton } from "@/components/app/WithSkeleton";
import CommentIdeaDetailsCard from "@/components/app/idea-details/CommentIdeaDetailsCard";
import { useState } from "react";
import AuthorProfileIdeaDetailCard from "@/components/app/idea-details/AuthorProfileIdeaDetailCard";
import RelatedIdeaDetailCard from "@/components/app/idea-details/RelatedIdeaDetailCard";
import CollaborationIdeaDetailCard from "@/components/app/idea-details/CollaborationIdeaDetailCard";
import AuthorProfileIdeaDetailSkeleton from "@/components/app/skeletons/AuthorProfileIdeaDetailSkeleton";
import RelatedIdeaDetailCardSkeleton from "@/components/app/skeletons/RelatedIdeaDetailCardSkeleton";
import CollaborationIdeaDetailCardSkeleton from "@/components/app/skeletons/CollaborationIdeaDetailCardSkeleton";

type IdeaDetails = {
  idea: IdeaType;
  isFavorited: boolean;
  isReacted: boolean;
  reactions: number;
  ownerTotalIdeas: number;
  relatedIdeas: IdeaType[] | [];
  collaboration: CollaborationType;
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
              collaboration={data?.collaboration ?? null}
            />
          </WithSkeleton>

          {/* Comments Section */}
          {isShowComment && <CommentIdeaDetailsCard />}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Author Profile */}
          <WithSkeleton
            isLoading={isLoading}
            skeleton={<AuthorProfileIdeaDetailSkeleton />}>
            <AuthorProfileIdeaDetailCard
              ownerTotalIdeas={data?.ownerTotalIdeas ?? 0}
              ownerDetails={data?.idea.user_id}
            />
          </WithSkeleton>

          {/* Related Ideas */}
          <WithSkeleton
            isLoading={isLoading}
            skeleton={<RelatedIdeaDetailCardSkeleton />}>
            {data?.relatedIdeas && data?.relatedIdeas.length > 0 && (
              <RelatedIdeaDetailCard relatedIdeas={data?.relatedIdeas} />
            )}
          </WithSkeleton>

          {/* Collaboration Info */}
          <WithSkeleton
            isLoading={isLoading}
            skeleton={<CollaborationIdeaDetailCardSkeleton />}>
            {data?.collaboration && (
              <CollaborationIdeaDetailCard
                collaboration={data?.collaboration}
              />
            )}
          </WithSkeleton>
        </div>
      </div>
    </div>
  );
}
