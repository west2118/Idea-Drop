"use client";

import { IdeaType } from "@/lib/types";

import { DataListPage } from "@/components/app/DataListPage";
import DashboardIdeaCard from "@/components/app/dashboard/DashboardIdeaCard";
import { DashboardIdeaCardSkeleton } from "@/components/app/skeletons/dashboard/DashboardIdeaCardSkeleton";
import IdeaNoResult from "@/components/app/no-data/IdeaNoResult";

type Idea = {
  ideas: IdeaType[];
};

import { getMyIdeas } from "@/lib/actions/idea.actions";

const MyIdeaPublishedPage = () => {
  return (
    <DataListPage<IdeaType>
      title="My Published Ideas"
      fetchAction={getMyIdeas}
      renderItem={(idea) => <DashboardIdeaCard key={idea._id} idea={idea} />}
      skeleton={<DashboardIdeaCardSkeleton />}
      emptyState={<IdeaNoResult />}
    />
  );
};

export default MyIdeaPublishedPage;
