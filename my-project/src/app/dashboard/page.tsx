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

  // My active collaborations
  const collaborations = [
    { name: "Urban Garden Project", members: 4, progress: 65 },
    { name: "Accessibility Tool Dev", members: 3, progress: 42 },
    { name: "Food Waste App", members: 5, progress: 78 },
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
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                My Ideas
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-md hover:bg-slate-100 cursor-pointer">
                  <span className="text-sm">Draft Ideas</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md hover:bg-slate-100 cursor-pointer">
                  <span className="text-sm">Published</span>
                  <Badge variant="secondary">7</Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md hover:bg-slate-100 cursor-pointer">
                  <span className="text-sm">Collaborating</span>
                  <Badge variant="secondary">2</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Ideas
              </Button>
            </CardFooter>
          </Card>

          {/* Collaborations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                My Collaborations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {collaborations.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {project.name}
                      </span>
                      <Badge variant="outline">{project.members} members</Badge>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Projects
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
