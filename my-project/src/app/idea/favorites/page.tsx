"use client";

import { IdeaType } from "@/lib/types";
import { useUserStore } from "@/stores/useUserStore";
import { DataListPage } from "@/components/app/DataListPage";
import DashboardIdeaCard from "@/components/app/dashboard/DashboardIdeaCard";
import { DashboardIdeaCardSkeleton } from "@/components/app/skeletons/dashboard/DashboardIdeaCardSkeleton";
import IdeaNoResult from "@/components/app/no-data/IdeaNoResult";

const MyIdeaFavoritePage = () => {
  const token = useUserStore((state) => state.userToken);

  return (
    <DataListPage<IdeaType>
      title="My Favorites Ideas"
      queryKey={["my-favorites"]}
      apiUrl="/api/idea/getMyFavorites"
      token={token!}
      renderItem={(idea) => <DashboardIdeaCard key={idea._id} idea={idea} />}
      skeleton={<DashboardIdeaCardSkeleton />}
      emptyState={<IdeaNoResult />}
    />
  );
};

export default MyIdeaFavoritePage;
