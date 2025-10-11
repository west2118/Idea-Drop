"use client";

import DashboardIdeaCard from "@/components/app/dashboard/DashboardIdeaCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IdeaType } from "@/lib/types";
import { fetchData } from "@/lib/utils";
import { useUserStore } from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { Clock, Grid, List, TrendingUp } from "lucide-react";
import { useState } from "react";

type Idea = {
  favoriteIdeas: IdeaType[];
};

const MyIdeaFavoritesPage = () => {
  const token = useUserStore((state) => state.userToken);
  const [activeTab, setActiveTab] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");

  const { data, error, isLoading } = useQuery<Idea>({
    queryKey: ["my-idea-favorites"],
    queryFn: fetchData("/api/idea/getMyFavorites", token),
    enabled: !!token,
  });

  console.log(data?.favoriteIdeas);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Favorites Ideas</h2>
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

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full">
            <TabsContent value={activeTab} className="mt-0">
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-3 gap-6"
                    : "space-y-6"
                }>
                {data?.favoriteIdeas.map((idea: any) => (
                  <DashboardIdeaCard key={idea.title} idea={idea} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyIdeaFavoritesPage;
