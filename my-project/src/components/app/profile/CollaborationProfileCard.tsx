import { Badge } from "@/components/ui/badge";
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

const CollaborationProfileCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Collaborations
        </CardTitle>
        <CardDescription>
          Projects you're currently contributing to
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userData.postedIdeas.map((idea) => (
            <div
              key={idea.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium">{idea.title}</p>
                <p className="text-sm text-gray-500">
                  {idea.collaborators} collaborators • {idea.status}
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationProfileCard;
