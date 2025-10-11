import React from "react";
import { userData } from "./CollaborationProfileCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";

const ProjectIdeasProfileCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Posted Ideas
        </CardTitle>
        <CardDescription>
          Ideas you've shared with the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userData.collaborations.map((project) => (
            <Card
              key={project.id}
              className={`overflow-hidden ${
                project.status === "Active"
                  ? "border-blue-200"
                  : "border-green-200"
              }`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription>{project.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Badge
                    variant={
                      project.status === "Active" ? "default" : "outline"
                    }>
                    {project.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectIdeasProfileCard;
