import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  X,
  User,
  Clock,
  Mail,
  MapPin,
  Briefcase,
  Award,
  Star,
  CheckCircle,
  XCircle,
  Calendar,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

export default function CollaborationRequestsModal() {
  // Sample requests data
  const collaborationRequests = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        role: "UI/UX Designer",
        avatar: "/avatars/sarah.jpg",
        location: "San Francisco, CA",
        joinDate: "Joined Feb 2023",
        rating: 4.9,
        completedProjects: 8,
        skills: ["Figma", "Prototyping", "User Research", "Design Systems"],
      },
      request: {
        role: "UI/UX Designer",
        message:
          "Hi! I'm really impressed with your Smart Home Automation project. I have extensive experience in creating intuitive user interfaces for IoT applications and would love to contribute to the design system. I've worked on similar projects and can help create a seamless user experience.",
        hoursPerWeek: "15-20 hours",
        startDate: "Immediately",
        submitted: "2 hours ago",
      },
      status: "pending",
    },
    {
      id: 2,
      user: {
        name: "Mike Rodriguez",
        role: "Full-stack Developer",
        avatar: "/avatars/mike.jpg",
        location: "New York, NY",
        joinDate: "Joined Jan 2023",
        rating: 4.7,
        completedProjects: 12,
        skills: ["React", "Node.js", "Python", "AWS", "MongoDB"],
      },
      request: {
        role: "Frontend Developer",
        message:
          "Hello! Your project aligns perfectly with my skills in React and real-time applications. I've built several dashboard interfaces for smart home systems and can help implement the frontend architecture. I'm particularly interested in the challenge of creating responsive components.",
        hoursPerWeek: "10-15 hours",
        startDate: "Next week",
        submitted: "1 day ago",
      },
      status: "pending",
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        role: "Product Manager",
        avatar: "/avatars/emma.jpg",
        location: "Austin, TX",
        joinDate: "Joined Mar 2023",
        rating: 4.8,
        completedProjects: 6,
        skills: ["Agile", "User Stories", "Roadmapping", "Analytics"],
      },
      request: {
        role: "Product Manager",
        message:
          "I believe my product management experience would be valuable for shaping the product roadmap and feature prioritization. I've successfully launched 3 IoT products and understand the unique challenges in this space.",
        hoursPerWeek: "8-12 hours",
        startDate: "Flexible",
        submitted: "3 days ago",
      },
      status: "pending",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Collaboration Requests
            </h2>
            <p className="text-gray-600">
              Manage requests for your "Smart Home Automation" project
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {collaborationRequests.length} Pending
            </Badge>
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {collaborationRequests.map((request) => (
            <div key={request.id} className="border-b last:border-b-0">
              <div className="p-6">
                <div className="flex gap-4">
                  {/* User Info Sidebar */}
                  <div className="w-1/3 space-y-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.user.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-800">
                          {request.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{request.user.name}</h3>
                        <p className="text-sm text-gray-600">
                          {request.user.role}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">
                            {request.user.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{request.user.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award className="h-4 w-4" />
                        <span>{request.user.completedProjects} projects</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{request.user.joinDate}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {request.user.skills.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {request.user.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{request.user.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Full Profile
                    </Button>
                  </div>

                  {/* Request Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {request.request.role}
                        </Badge>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{request.request.hoursPerWeek}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Start {request.request.startDate}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        {request.request.submitted}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Message:</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                        {request.request.message}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4" />
                        Accept Request
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <XCircle className="h-4 w-4" />
                        Decline
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing {collaborationRequests.length} pending requests
          </div>
          <div className="flex gap-3">
            <Button variant="outline">View All Requests</Button>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
