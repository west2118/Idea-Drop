"use client";

import { CollaborationType, IdeaType } from "@/lib/types";
import { useUserStore } from "@/stores/useUserStore";
import { DataListPage } from "@/components/app/DataListPage";
import IdeaNoResult from "@/components/app/no-data/IdeaNoResult";
import CollaborationItemCardCollaborations from "@/components/app/collaborations/CollaborationItemCardCollaborations";
import { CollaborationItemCardSkeleton } from "@/components/app/skeletons/collaborations/CollaborationItemCardSkeleton";

const CollaborationsPage = () => {
  const token = useUserStore((state) => state.userToken);

  return (
    <DataListPage<CollaborationType>
      title="My Collaborations"
      queryKey={["my-collaborations"]}
      apiUrl="/api/collaboration/getMyCollaborations"
      token={token!}
      renderItem={(collaboration) => (
        <CollaborationItemCardCollaborations
          key={collaboration._id}
          collaboration={collaboration}
        />
      )}
      skeleton={<CollaborationItemCardSkeleton />}
      emptyState={<IdeaNoResult content="Collaboration" />}
      isCollabPage={true}
    />
  );
};

export default CollaborationsPage;
