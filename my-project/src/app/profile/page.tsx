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
} from "lucide-react";

export default function ProfilePage() {
  // Sample data - would typically come from props or API
  const userData = {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600">
              Manage your profile and view your contributions
            </p>
          </div>
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/avatars/alex.jpg" />
                    <AvatarFallback className="text-2xl">AJ</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-gray-600">{userData.username}</p>
                  <p className="text-sm text-gray-500 mt-2">{userData.bio}</p>

                  <div className="flex flex-col items-start w-full mt-4 space-y-2">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Stats & Progress
                </CardTitle>
                <CardDescription>
                  Your contribution metrics and level progression
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                    <Trophy className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-2xl font-bold">
                      {userData.points}
                    </span>
                    <span className="text-sm text-gray-600">Points</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                    <Star className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="text-2xl font-bold">
                      Level {userData.level}
                    </span>
                    <span className="text-sm text-gray-600">Current Level</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Level {userData.level + 1}</span>
                    <span>
                      {userData.points}/{userData.nextLevelPoints}
                    </span>
                  </div>
                  <Progress
                    value={(userData.points / userData.nextLevelPoints) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Badges
                </CardTitle>
                <CardDescription>
                  Achievements earned through contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {userData.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 border rounded-lg">
                      <div
                        className={`p-2 rounded-full ${badge.color} bg-opacity-20`}>
                        <badge.icon className={`h-5 w-5 ${badge.color}`} />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{badge.name}</p>
                        <p className="text-xs text-gray-500">
                          Earned {badge.earned}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Posted Ideas
                </CardTitle>
                <CardDescription>
                  Ideas you've shared with the community
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
          </div>
        </div>

        {/* Collaborations Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Collaborations
              </CardTitle>
              <CardDescription>
                Projects you're currently contributing to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
      </div>
    </div>
  );
}
