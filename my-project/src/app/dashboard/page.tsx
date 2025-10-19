"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/useUserStore";
import { fetchData } from "@/lib/utils";
import { CollaborationType, IdeaType } from "@/lib/types";
import MyIdeaCardDashboard from "@/components/app/dashboard/MyIdeaCardDashboard";
import CollaborationsCardDashboard from "@/components/app/dashboard/CollaborationsCardDashboard";
import { WithSkeleton } from "@/components/app/WithSkeleton";
import MyIdeaCardDashboardSkeleton from "@/components/app/modals/MyIdeaCardDashboardSkeleton";
import IdeasFeedDashboard from "@/components/app/dashboard/IdeasFeedDashboard";
import { CollaborationsCardDashboardSkeleton } from "@/components/app/skeletons/CollaborationsCardDashboardSkeleton.";

type Idea = {
  ideas: IdeaType[];
};

type Collaboration = {
  collaborations: CollaborationType[];
};

type CountResponse = {
  ideas: number;
  favorites: number;
};

export default function Dashboard() {
  const token = useUserStore((state) => state.userToken);

  const {
    data: idea,
    error: ideasError,
    isLoading: isIdeasLoading,
  } = useQuery<Idea>({
    queryKey: ["ideas-feed"],
    queryFn: fetchData("/api/idea/getIdeas", token),
    enabled: !!token,
  });

  const {
    data: collaboration,
    error: collabError,
    isLoading: isCollabLoading,
  } = useQuery<Collaboration>({
    queryKey: ["my-collaborations"],
    queryFn: fetchData("/api/collaboration/getMyCollaborations", token),
    enabled: !!token,
  });

  const {
    data: count,
    error: countError,
    isLoading: isCountLoading,
  } = useQuery<CountResponse>({
    queryKey: ["my-idea-favorite-count"],
    queryFn: fetchData("/api/idea/getIdeaFavoriteCount", token),
    enabled: !!token,
  });

  console.log(collaboration?.collaborations);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <IdeasFeedDashboard
          ideas={idea?.ideas ?? []}
          isIdeasLoading={isIdeasLoading}
        />

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* My Ideas */}
          <WithSkeleton
            isLoading={isCountLoading}
            skeleton={<MyIdeaCardDashboardSkeleton />}>
            {count && (
              <MyIdeaCardDashboard
                ideaCount={count?.ideas ?? 0}
                favoriteCount={count?.favorites ?? 0}
              />
            )}
          </WithSkeleton>

          {/* Collaborations */}
          <WithSkeleton
            isLoading={isCollabLoading}
            skeleton={<CollaborationsCardDashboardSkeleton />}>
            {collaboration?.collaborations && (
              <CollaborationsCardDashboard
                collaborations={collaboration?.collaborations ?? []}
              />
            )}
          </WithSkeleton>
        </div>
      </div>
    </div>
  );
}
