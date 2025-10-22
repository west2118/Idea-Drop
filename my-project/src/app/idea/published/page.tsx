"use client";

import { IdeaType } from "@/lib/types";
import { useUserStore } from "@/stores/useUserStore";
import { DataListPage } from "@/components/app/DataListPage";
import DashboardIdeaCard from "@/components/app/dashboard/DashboardIdeaCard";
import { DashboardIdeaCardSkeleton } from "@/components/app/skeletons/dashboard/DashboardIdeaCardSkeleton";
import IdeaNoResult from "@/components/app/no-data/IdeaNoResult";

type Idea = {
  ideas: IdeaType[];
};

const MyIdeaPublishedPage = () => {
  const token = useUserStore((state) => state.userToken);

  return (
    <DataListPage<IdeaType>
      title="My Published Ideas"
      queryKey={["my-ideas"]}
      apiUrl="/api/idea/getMyIdeas"
      token={token!}
      renderItem={(idea) => <DashboardIdeaCard key={idea._id} idea={idea} />}
      skeleton={<DashboardIdeaCardSkeleton />}
      emptyState={<IdeaNoResult />}
    />
  );
};

export default MyIdeaPublishedPage;
