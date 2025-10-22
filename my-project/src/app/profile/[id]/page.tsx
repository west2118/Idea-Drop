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
import { CollaborationType, IdeaType, UserType } from "@/lib/types";
import SkillsProfileCard from "@/components/app/profile/SkillsProfileCard";
import InterestsProfileCard from "@/components/app/profile/InterestsProfileCard";
import InfoProfileCard from "@/components/app/profile/InfoProfileCard";
import { WithSkeleton } from "@/components/app/WithSkeleton";
import ProfileInfoSkeletonLoading from "@/components/app/skeletons/profile/IdeasCardSkeleton";
import IdeasCardSkeleton from "@/components/app/skeletons/profile/IdeasCardSkeleton";
import CollaborationCardSkeleton from "@/components/app/skeletons/profile/CollaborationCardSkeleton";
import InterestsProfileCardSkeleton from "@/components/app/skeletons/profile/InterestsProfileCardSkeleton";
import InfoProfileCardSkeleton from "@/components/app/skeletons/profile/InfoProfileCardSkeleton";
import SkillsProfileCardSkeleton from "@/components/app/skeletons/profile/SkillsProfileCardSkeleton";

type IdeaResponse = {
  ideas: IdeaType[];
};

type CollaborationResponse = {
  collaborations: CollaborationType[];
};

type UserResponse = {
  user: UserType;
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
  const user = useUserStore((state) => state.user);

  const {
    data: dataUser,
    error: errorUser,
    isLoading: loadingUser,
  } = useQuery<UserResponse>({
    queryKey: ["user-details", id],
    queryFn: fetchData(`/api/user/getUserInfo/${id}`, token),
    enabled: !!token && !!id,
  });

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

  const isOwner = id === user?._id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1 space-y-6">
            <WithSkeleton
              isLoading={loadingUser}
              skeleton={<InfoProfileCardSkeleton />}>
              <InfoProfileCard
                user={dataUser?.user ?? null}
                isOwner={isOwner}
              />
            </WithSkeleton>

            <WithSkeleton
              isLoading={loadingUser}
              skeleton={<SkillsProfileCardSkeleton />}>
              <SkillsProfileCard skills={dataUser?.user.skills ?? null} />
            </WithSkeleton>

            <WithSkeleton
              isLoading={loadingUser}
              skeleton={<InterestsProfileCardSkeleton />}>
              <InterestsProfileCard
                interests={dataUser?.user.interests ?? null}
              />
            </WithSkeleton>
          </div>

          {/* Middle Column - Stats and Achievements */}
          <div className="lg:col-span-2 space-y-6">
            <WithSkeleton
              isLoading={loadingIdea}
              skeleton={<IdeasCardSkeleton />}>
              <ProjectIdeasProfileCard
                ideas={dataIdea?.ideas ?? null}
                isOwner={isOwner}
              />
            </WithSkeleton>

            <WithSkeleton
              isLoading={loadingCollaboration}
              skeleton={<CollaborationCardSkeleton />}>
              <CollaborationProfileCard
                collaborations={dataCollaboration?.collaborations ?? null}
                isOwner={isOwner}
              />
            </WithSkeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
