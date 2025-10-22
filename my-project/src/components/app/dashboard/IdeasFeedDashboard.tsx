import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, Grid, List, User, Plus } from "lucide-react";
import DashboardIdeaCard from "@/components/app/dashboard/DashboardIdeaCard";
import { IdeaType } from "@/lib/types";
import { WithSkeleton } from "../WithSkeleton";
import { DashboardIdeaCardSkeleton } from "../skeletons/dashboard/DashboardIdeaCardSkeleton";
import Link from "next/link";
import IdeaFeedNoData from "../no-data/IdeaFeedNoData";

const IdeasFeedDashboard = ({
  ideas,
  isIdeasLoading,
  setActiveTab,
  activeTab,
}: {
  ideas: IdeaType[];
  isIdeasLoading: boolean;
  setActiveTab: (tab: string) => void;
  activeTab: string;
}) => {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Ideas Feed</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center">
            <TabsList className="grid grid-cols-2 w-full max-w-xs mb-2">
              <TabsTrigger value="Latest" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Latest
              </TabsTrigger>
              <TabsTrigger value="Trending" className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
            </TabsList>

            {ideas.length >= 8 && (
              <Link href="/ideas">
                <Button variant="outline">View All Ideas</Button>
              </Link>
            )}
          </div>

          <TabsContent value={activeTab} className="mt-2">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                  : "space-y-6"
              }>
              <WithSkeleton
                isLoading={isIdeasLoading}
                skeleton={<DashboardIdeaCardSkeleton />}>
                {ideas && ideas.length > 0 ? (
                  ideas?.map((idea: any) => (
                    <DashboardIdeaCard key={idea.title} idea={idea} />
                  ))
                ) : (
                  <IdeaFeedNoData />
                )}
              </WithSkeleton>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IdeasFeedDashboard;
