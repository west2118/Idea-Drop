"use client";

import { CollaborationType, IdeaType } from "@/lib/types";

import { DataListPage } from "@/components/app/DataListPage";
import IdeaNoResult from "@/components/app/no-data/IdeaNoResult";
import CollaborationItemCardCollaborations from "@/components/app/collaborations/CollaborationItemCardCollaborations";
import { CollaborationItemCardSkeleton } from "@/components/app/skeletons/collaborations/CollaborationItemCardSkeleton";

import { getMyCollaborations } from "@/lib/actions/collaboration.actions";

const CollaborationsPage = () => {
  return (
    <DataListPage<CollaborationType>
      title="My Collaborations"
      fetchAction={getMyCollaborations}
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
