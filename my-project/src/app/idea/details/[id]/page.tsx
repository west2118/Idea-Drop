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
import CreateCollaborationModal from "@/components/app/modals/CreateCollaborationModal";
import RequestCollaborationModal from "@/components/app/modals/RequestCollaborationModal";

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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);

  const { data, error, isLoading } = useQuery<IdeaDetails>({
    queryKey: ["idea-details", id],
    queryFn: fetchData(`/api/idea/${id}`, token),
    enabled: !!token && !!id,
  });

  const handleToggleShowComment = () => {
    setIsShowComment((prev) => !prev);
  };

  const handleOpenModalCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenModalRequest = () => {
    setIsRequestModalOpen(true);
  };

  console.log("Collaboration Details: ", data?.collaboration);

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
              handleOpenModalCreate={handleOpenModalCreate}
              handleOpenModalRequest={handleOpenModalRequest}
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

      <CreateCollaborationModal
        isModalOpen={isCreateModalOpen}
        isCloseModal={() => setIsCreateModalOpen(false)}
        idea_id={data?.idea._id}
        projectName={data?.idea.title}
      />

      <RequestCollaborationModal
        isModalOpen={isRequestModalOpen}
        isCloseModal={() => setIsRequestModalOpen(false)}
        idea={data?.idea ?? null}
        collaboration={data?.collaboration ?? null}
      />
    </div>
  );
}
