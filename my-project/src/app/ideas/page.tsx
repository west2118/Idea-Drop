"use client";

import { IdeaType } from "@/lib/types";

import { DataListPage } from "@/components/app/DataListPage";
import DashboardIdeaCard from "@/components/app/dashboard/DashboardIdeaCard";
import { DashboardIdeaCardSkeleton } from "@/components/app/skeletons/dashboard/DashboardIdeaCardSkeleton";
import IdeaNoResult from "@/components/app/no-data/IdeaNoResult";

import { getIdeas } from "@/lib/actions/idea.actions";

const Ideas = () => {
  return (
    <DataListPage<IdeaType>
      title="All Ideas"
      fetchAction={async ({ search, category }) => getIdeas(search, category)}
      renderItem={(idea) => <DashboardIdeaCard key={idea._id} idea={idea} />}
      skeleton={<DashboardIdeaCardSkeleton />}
      emptyState={<IdeaNoResult />}
    />
  );
};

export default Ideas;
