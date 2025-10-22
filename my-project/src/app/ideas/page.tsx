"use client";

import { IdeaType } from "@/lib/types";
import { useUserStore } from "@/stores/useUserStore";
import { DataListPage } from "@/components/app/DataListPage";
import DashboardIdeaCard from "@/components/app/dashboard/DashboardIdeaCard";
import { DashboardIdeaCardSkeleton } from "@/components/app/skeletons/dashboard/DashboardIdeaCardSkeleton";
import IdeaNoResult from "@/components/app/no-data/IdeaNoResult";

const Ideas = () => {
  const token = useUserStore((state) => state.userToken);

  return (
    <DataListPage<IdeaType>
      title="All Ideas"
      queryKey={["ideas"]}
      apiUrl="/api/idea/getIdeas"
      token={token!}
      renderItem={(idea) => <DashboardIdeaCard key={idea._id} idea={idea} />}
      skeleton={<DashboardIdeaCardSkeleton />}
      emptyState={<IdeaNoResult />}
    />
  );
};

export default Ideas;
