"use client";

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
import { Progress } from "@/components/ui/progress";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Award,
  Trophy,
  Star,
  Zap,
  Lightbulb,
  Users,
  ChevronRight,
  Edit,
  Shield,
  Heart,
  Bookmark,
  LogOut,
} from "lucide-react";
import CollaborationProfileCard from "@/components/app/profile/CollaborationProfileCard";
import ProjectIdeasProfileCard from "@/components/app/profile/ProjectIdeasProfileCard";
import { useParams } from "next/navigation";
import { fetchData } from "@/lib/utils";
import { useUserStore } from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { CollaborationType, IdeaType } from "@/lib/types";

type IdeaResponse = {
  ideas: IdeaType[];
};

type CollaborationResponse = {
  collaborations: CollaborationType[];
};

export const userData = {
  name: "Alex Johnson",
  username: "@alexj",
  bio: "Frontend developer passionate about creating beautiful and accessible user interfaces. Currently specializing in React and Next.js.",
  email: "alex.johnson@example.com",
  location: "San Francisco, CA",
  joinDate: "Joined January 2023",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "UI/UX Design",
    "Figma",
    "Node.js",
  ],
  interests: [
    "Web Accessibility",
    "Design Systems",
    "Open Source",
    "Mountain Biking",
  ],
  points: 1240,
  level: 8,
  nextLevelPoints: 1600,
  badges: [
    {
      name: "Early Adopter",
      icon: Shield,
      color: "text-blue-600",
      earned: "Jan 2023",
    },
    {
      name: "Idea Generator",
      icon: Lightbulb,
      color: "text-yellow-600",
      earned: "Mar 2023",
    },
    {
      name: "Team Player",
      icon: Users,
      color: "text-green-600",
      earned: "Jun 2023",
    },
    {
      name: "Community Favorite",
      icon: Heart,
      color: "text-red-600",
      earned: "Aug 2023",
    },
  ],
  postedIdeas: [
    {
      id: 1,
      title: "AI-Powered Code Review Tool",
      collaborators: 4,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Sustainable E-commerce Platform",
      collaborators: 2,
      status: "Planning",
    },
    {
      id: 3,
      title: "AR Interior Design App",
      collaborators: 3,
      status: "Completed",
    },
  ],
  collaborations: [
    {
      id: 1,
      title: "Smart Home Automation",
      role: "Frontend Lead",
      status: "Active",
    },
    {
      id: 2,
      title: "Health & Fitness Tracker",
      role: "UI Designer",
      status: "Completed",
    },
    {
      id: 3,
      title: "Community Garden Platform",
      role: "Full-stack Developer",
      status: "Active",
    },
  ],
};

export default function ProfilePage() {
  const { id } = useParams();
  const token = useUserStore((state) => state.userToken);

  const {
    data: dataIdea,
    error: errorIdea,
    isLoading: loadingIdea,
  } = useQuery<IdeaResponse>({
    queryKey: ["user-ideas", id],
    queryFn: fetchData(`/api/idea/getUserIdeas/${id}`, token),
    enabled: !!token && !!id,
  });

  const {
    data: dataCollaboration,
    error: errorCollaboration,
    isLoading: loadingCollaboration,
  } = useQuery<CollaborationResponse>({
    queryKey: ["user-collaborations", id],
    queryFn: fetchData(`/api/collaboration/getUserCollaborations/${id}`, token),
    enabled: !!token && !!id,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/avatars/alex.jpg" />
                    <AvatarFallback className="text-2xl">AJ</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-gray-600">{userData.username}</p>
                  <p className="text-sm text-gray-500 mt-2">{userData.bio}</p>

                  <div className="flex flex-col items-start w-full space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{userData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{userData.joinDate}</span>
                    </div>
                  </div>

                  <div className="w-full flex-col space-y-2">
                    <Button className="w-full">
                      <Edit className="h-4 w-4" /> Edit Profile
                    </Button>
                    <Button className="w-full" variant="destructive">
                      <LogOut className="h-4 w-4" /> Log Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userData.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Stats and Achievements */}
          <div className="lg:col-span-2 space-y-6">
            <ProjectIdeasProfileCard ideas={dataIdea?.ideas ?? null} />

            <CollaborationProfileCard
              collaborations={dataCollaboration?.collaborations ?? null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
