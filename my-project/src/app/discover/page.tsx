import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Search,
  Flame,
  Clock,
  TrendingUp,
  Filter,
  ChevronDown,
  Heart,
  MessageSquare,
  Eye,
  Star,
  Lightbulb,
  Globe,
  Palette,
  Building2,
  HeartHandshake,
  Code2,
  BookOpen,
} from "lucide-react";

export default function DiscoverPage() {
  // Sample data - would typically come from props or API
  const trendingIdeas = [
    {
      id: 1,
      title: "AI-Powered Personal Tutor",
      description:
        "An adaptive learning platform that personalizes educational content based on student performance.",
      author: "Sarah Chen",
      votes: 342,
      comments: 87,
      views: 1200,
      tags: ["Education", "AI", "Tech"],
      category: "Tech",
      isNew: true,
      trendingScore: 95,
    },
    {
      id: 2,
      title: "Sustainable Packaging Marketplace",
      description:
        "A B2B platform connecting eco-friendly packaging suppliers with businesses looking to reduce their environmental impact.",
      author: "Michael Rodriguez",
      votes: 278,
      comments: 54,
      views: 980,
      tags: ["Sustainability", "Business", "Eco"],
      category: "Business",
      isNew: false,
      trendingScore: 88,
    },
    {
      id: 3,
      title: "Community Art Installation Project",
      description:
        "Interactive public art that changes based on community input and environmental factors.",
      author: "Jasmine Park",
      votes: 196,
      comments: 42,
      views: 750,
      tags: ["Art", "Community", "Interactive"],
      category: "Art",
      isNew: true,
      trendingScore: 82,
    },
    {
      id: 4,
      title: "Mental Health Support Platform",
      description:
        "A peer-to-peer support network that connects people with similar mental health experiences.",
      author: "David Kim",
      votes: 421,
      comments: 103,
      views: 1560,
      tags: ["Health", "Social Impact", "Wellness"],
      category: "Social Impact",
      isNew: false,
      trendingScore: 92,
    },
  ];

  const categories = [
    { name: "Tech", icon: Code2, count: 124 },
    { name: "Business", icon: Building2, count: 87 },
    { name: "Art", icon: Palette, count: 65 },
    { name: "Social Impact", icon: HeartHandshake, count: 92 },
    { name: "Education", icon: BookOpen, count: 78 },
    { name: "Environment", icon: Globe, count: 56 },
  ];

  const filters = {
    sortBy: ["Most Supported", "Newest", "Trending"],
    timeFrame: ["Last 24 hours", "Last 7 days", "Last 30 days"],
    tags: [
      "AI",
      "Sustainability",
      "Community",
      "Health",
      "Eco",
      "Interactive",
      "Web3",
      "Mobile",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Discover Ideas</h1>
          <p className="text-gray-600">
            Find innovative projects to support or collaborate on
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search ideas, tags, or categories..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <div className="flex flex-wrap gap-2">
                  {filters.sortBy.map((sort, index) => (
                    <Badge
                      key={index}
                      variant={index === 0 ? "default" : "outline"}
                      className="cursor-pointer">
                      {sort}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Timeframe:</span>
                <div className="flex flex-wrap gap-2">
                  {filters.timeFrame.map((time, index) => (
                    <Badge
                      key={index}
                      variant={index === 1 ? "default" : "outline"}
                      className="cursor-pointer">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {filters.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Categories
                </CardTitle>
                <CardDescription>Browse by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <category.icon className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Tags
                </CardTitle>
                <CardDescription>Popular topics this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {filters.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant={index < 3 ? "default" : "outline"}
                      className="cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Trending Ideas */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Flame className="h-6 w-6 text-orange-500" />
                Trending Ideas
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                Last 7 days
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trendingIdeas.map((idea) => (
                <Card
                  key={idea.id}
                  className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{idea.title}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {idea.description}
                        </CardDescription>
                      </div>
                      {idea.isNew && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={`/avatars/${idea.author
                            .split(" ")[0]
                            .toLowerCase()}.jpg`}
                        />
                        <AvatarFallback>{idea.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">
                        {idea.author}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1">
                        {idea.category}
                      </Badge>
                      {idea.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                      {idea.tags.length > 2 && (
                        <Badge variant="outline">+{idea.tags.length - 2}</Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {idea.votes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {idea.comments}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {idea.views}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-orange-500">
                        <Flame className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {idea.trendingScore}%
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        <Heart className="h-4 w-4 mr-1" />
                        Support
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button variant="outline" className="gap-2">
                Load More Ideas
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
