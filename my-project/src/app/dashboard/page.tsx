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

export default function Dashboard() {
  const token = useUserStore((state) => state.userToken);
  const [activeTab, setActiveTab] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");

  const { data, error, isLoading } = useQuery({
    queryKey: ["ideas"],
    queryFn: fetchData("/api/idea/getIdeas", token),
    enabled: !!token,
  });

  // Mock data for ideas
  const ideas = [
    {
      id: 1,
      title: "AI-Powered Recycling System",
      description:
        "Smart bins that automatically sort recyclables using computer vision and machine learning to improve recycling efficiency.",
      author: "Alex Johnson",
      authorInitials: "AJ",
      tags: ["AI", "Sustainability", "Tech"],
      upvotes: 245,
      comments: 32,
      time: "2 hours ago",
      trending: true,
    },
    {
      id: 2,
      title: "Community Skill Exchange Platform",
      description:
        "A local platform for trading skills and knowledge without monetary exchange to build stronger communities.",
      author: "Samantha Lee",
      authorInitials: "SL",
      tags: ["Community", "Education", "Social"],
      upvotes: 189,
      comments: 41,
      time: "5 hours ago",
      trending: true,
    },
    {
      id: 3,
      title: "Modular Urban Gardening System",
      description:
        "Space-efficient gardening solutions for apartment dwellers to grow their own food in small spaces.",
      author: "Michael Chen",
      authorInitials: "MC",
      tags: ["Sustainability", "Design", "Food"],
      upvotes: 176,
      comments: 28,
      time: "1 day ago",
      trending: false,
    },
    {
      id: 4,
      title: "Accessibility-First Web Design Tool",
      description:
        "Design tool that prioritizes and tests for accessibility from the start of the design process.",
      author: "Rachel Kim",
      authorInitials: "RK",
      tags: ["Design", "Tech", "Accessibility"],
      upvotes: 152,
      comments: 19,
      time: "1 day ago",
      trending: true,
    },
    {
      id: 5,
      title: "Virtual Reality History Education",
      description:
        "Immersive VR experiences that allow students to explore historical events and places firsthand.",
      author: "David Wilson",
      authorInitials: "DW",
      tags: ["Education", "VR", "Tech"],
      upvotes: 132,
      comments: 24,
      time: "2 days ago",
      trending: false,
    },
    {
      id: 6,
      title: "Food Waste Reduction App",
      description:
        "App that connects restaurants with surplus food to local shelters and food banks in real-time.",
      author: "Maria Garcia",
      authorInitials: "MG",
      tags: ["Sustainability", "Food", "Social"],
      upvotes: 121,
      comments: 17,
      time: "3 days ago",
      trending: false,
    },
  ];

  // Filter ideas based on active tab
  const filteredIdeas =
    activeTab === "trending" ? ideas.filter((idea) => idea.trending) : ideas;

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

  console.log("IDEAS: ", data?.ideas);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6 mt-18">
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
                  {filteredIdeas.map((idea) => (
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

          {/* Categories */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Folder className="h-5 w-5 mr-2 text-green-600" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 rounded-md hover:bg-slate-100 cursor-pointer">
                    <div className="flex items-center">
                      <span className="mr-2">{category.icon}</span>
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <Badge variant="outline">{category.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Explore Categories
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

          {/* Trending Tags */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                Trending Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">AI</Badge>
                <Badge variant="secondary">Sustainability</Badge>
                <Badge variant="secondary">Web3</Badge>
                <Badge variant="secondary">VR</Badge>
                <Badge variant="secondary">Education</Badge>
                <Badge variant="secondary">HealthTech</Badge>
                <Badge variant="secondary">FinTech</Badge>
                <Badge variant="secondary">IoT</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
