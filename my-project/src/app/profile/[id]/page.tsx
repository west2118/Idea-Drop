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
import CollaborationProfileCard, {
  userData,
} from "@/components/app/profile/CollaborationProfileCard";
import ProjectIdeasProfileCard from "@/components/app/profile/ProjectIdeasProfileCard";
import { useParams } from "next/navigation";
import { fetchData } from "@/lib/utils";
import { useUserStore } from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { IdeaType } from "@/lib/types";

type DataProps = {
  ideas: IdeaType[];
};

export default function ProfilePage() {
  const { id } = useParams();
  const token = useUserStore((state) => state.userToken);

  const { data, error, isLoading } = useQuery<DataProps>({
    queryKey: ["user-ideas", id],
    queryFn: fetchData(`/api/idea/${id}?type=ideas-user`, token),
    enabled: !!token && !!id,
  });

  console.log(data);

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
                  <Zap className="h-5 w-5" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
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
            <ProjectIdeasProfileCard />

            <CollaborationProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
}
