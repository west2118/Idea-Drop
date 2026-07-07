"use client";

import { IdeaType, CollaborationType, CommentType } from "@/lib/types";
import HeaderIdeaDetails from "@/components/app/idea-details/HeaderIdeaDetailsCard";
import CommentIdeaDetailsCard from "@/components/app/idea-details/CommentIdeaDetailsCard";
import { useState } from "react";
import AuthorProfileIdeaDetailCard from "@/components/app/idea-details/AuthorProfileIdeaDetailCard";
import RelatedIdeaDetailCard from "@/components/app/idea-details/RelatedIdeaDetailCard";
import CollaborationIdeaDetailCard from "@/components/app/idea-details/CollaborationIdeaDetailCard";
import CreateCollaborationModal from "@/components/app/modals/CreateCollaborationModal";
import RequestCollaborationModal from "@/components/app/modals/RequestCollaborationModal";
import { countCommentsAndReplies } from "@/lib/constants";

type IdeaDetails = {
  idea: IdeaType;
  isFavorited: boolean;
  isReacted: boolean;
  reactions: number;
  ownerTotalIdeas: number;
  relatedIdeas: IdeaType[] | [];
  collaboration: CollaborationType;
};

export default function IdeaDetailClient({ 
  initialData, 
  initialComments 
}: { 
  initialData: IdeaDetails; 
  initialComments: CommentType[] 
}) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);

  const handleToggleShowComment = () => {
    setIsShowComment((prev) => !prev);
  };

  const handleOpenModalCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenModalRequest = () => {
    setIsRequestModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <HeaderIdeaDetails
            idea={initialData?.idea ?? null}
            isFavorited={initialData?.isFavorited ?? null}
            isReacted={initialData?.isReacted ?? null}
            reactions={initialData?.reactions ?? 0}
            toggleComment={handleToggleShowComment}
            collaboration={initialData?.collaboration ?? null}
            handleOpenModalCreate={handleOpenModalCreate}
            handleOpenModalRequest={handleOpenModalRequest}
            commentsCount={countCommentsAndReplies(initialComments) ?? 0}
          />

          {isShowComment && (
            <CommentIdeaDetailsCard
              ideaId={initialData?.idea._id ?? null}
              commentsList={initialComments ?? null}
              commentsCount={countCommentsAndReplies(initialComments) ?? 0}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <AuthorProfileIdeaDetailCard
            ownerTotalIdeas={initialData?.ownerTotalIdeas ?? 0}
            ownerDetails={initialData?.idea.user_id}
          />

          {initialData?.relatedIdeas && initialData?.relatedIdeas.length > 0 && (
            <RelatedIdeaDetailCard relatedIdeas={initialData?.relatedIdeas} />
          )}

          {initialData?.collaboration && (
            <CollaborationIdeaDetailCard
              collaboration={initialData?.collaboration}
            />
          )}
        </div>
      </div>

      <CreateCollaborationModal
        isModalOpen={isCreateModalOpen}
        isCloseModal={() => setIsCreateModalOpen(false)}
        idea_id={initialData?.idea._id}
        projectName={initialData?.idea.title}
      />

      <RequestCollaborationModal
        isModalOpen={isRequestModalOpen}
        isCloseModal={() => setIsRequestModalOpen(false)}
        idea={initialData?.idea ?? null}
        collaboration={initialData?.collaboration ?? null}
      />
    </div>
  );
}
