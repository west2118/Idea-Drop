"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Lightbulb,
  TrendingUp,
  Clock,
  MessageSquare,
  ThumbsUp,
  User,
  Folder,
  Users,
  ChevronDown,
  Plus,
  Grid,
  List,
} from "lucide-react";
import DashboardIdeaCard from "@/components/app/dashboard/DashboardIdeaCard";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/useUserStore";
import { fetchData } from "@/lib/utils";
import { IdeaType } from "@/lib/types";
import MyIdeaCardDashboard from "@/components/app/dashboard/MyIdeaCardDashboard";
import CollaborationsCardDashboard from "@/components/app/dashboard/CollaborationsCardDashboard";

type Idea = {
  ideas: IdeaType[];
};

export default function Dashboard() {
  const token = useUserStore((state) => state.userToken);
  const [activeTab, setActiveTab] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");

  const { data, error, isLoading } = useQuery<Idea>({
    queryKey: ["ideas"],
    queryFn: fetchData("/api/idea/getIdeas", token),
    enabled: !!token,
  });

  // Categories for sidebar
  const categories = [
    { name: "Technology", count: 42, icon: "💻" },
    { name: "Sustainability", count: 38, icon: "🌱" },
    { name: "Education", count: 31, icon: "🎓" },
    { name: "Design", count: 28, icon: "🎨" },
    { name: "Social Impact", count: 25, icon: "🤝" },
    { name: "Health", count: 19, icon: "❤️" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
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

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full">
              <TabsList className="grid grid-cols-2 w-full max-w-xs mb-6">
                <TabsTrigger value="latest" className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Latest
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "space-y-6"
                  }>
                  {data?.ideas.map((idea: any) => (
                    <DashboardIdeaCard key={idea.title} idea={idea} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* My Ideas */}
          <MyIdeaCardDashboard />

          {/* Collaborations */}
          <CollaborationsCardDashboard />
        </div>
      </div>
    </div>
  );
}
