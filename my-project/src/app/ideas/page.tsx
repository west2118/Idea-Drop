"use client";

import DashboardIdeaCard from "@/components/app/dashboard/DashboardIdeaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IdeaType } from "@/lib/types";
import { fetchData } from "@/lib/utils";
import { useUserStore } from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  Clock,
  Grid,
  List,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/app/Pagination";
import { useDebounceInput } from "@/hooks/useDebounceInput";
import { listCategories } from "@/constants/categories";
import { listTags } from "@/constants/tags";
import { DashboardIdeaCardSkeleton } from "@/components/app/skeletons/dashboard/DashboardIdeaCardSkeleton";
import IdeaFeedNoData from "@/components/app/no-data/IdeaFeedNoData";

type Idea = {
  ideas: IdeaType[];
  total: number;
  page: number;
  totalPages: number;
};

const Ideas = () => {
  const token = useUserStore((state) => state.userToken);
  const [activeTab, setActiveTab] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");

  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [page, setPage] = useState(1);
  const limit = 1;

  const { data, error, isLoading } = useQuery<Idea>({
    queryKey: ["ideas", page, limit, debouncedSearch, category, tag],
    queryFn: fetchData(
      `/api/idea/getIdeas?page=${page}${
        category !== "All" ? `&category=${category}` : ""
      }${tag !== "All" ? `&tag=${tag}` : ""}&limit=${limit}${
        debouncedSearch ? `&search=${debouncedSearch}` : ""
      }`,
      token
    ),
    enabled: !!token,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">All Ideas</h2>
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

          <div className="flex justify-between items-center my-6">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search ideas"
                    className="pl-10 pr-4 py-2 w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              {/* Categories Select */}
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {listCategories?.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Tags Select */}
              <Select value={tag} onValueChange={(value) => setTag(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Tags</SelectItem>
                  {listTags?.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                {isLoading ? (
                  <DashboardIdeaCardSkeleton />
                ) : data && data?.ideas.length > 0 ? (
                  data?.ideas.map((idea: any) => (
                    <DashboardIdeaCard key={idea.title} idea={idea} />
                  ))
                ) : (
                  <IdeaFeedNoData />
                )}
              </div>
            </TabsContent>
          </Tabs>

          {data && data?.ideas.length >= limit && (
            <div className="flex justify-between items-center mt-8">
              <Pagination
                limit={limit}
                page={page}
                total={data?.total}
                totalPages={data?.totalPages}
                setPage={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ideas;
