"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Lightbulb,
  Users,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Sparkles,
  ThumbsUp,
  Heart,
  LogOut,
  Send,
  ClipboardList,
  MoreHorizontal,
} from "lucide-react";

export default function CollaborationPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Alex Johnson",
      text: "Hey team, I just updated the project requirements document. Please review when you have time.",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "Maria Chen",
      text: "I've started working on the UI components. Should have a draft by tomorrow.",
      time: "10:45 AM",
    },
    {
      id: 3,
      sender: "You",
      text: "Thanks Alex! I'll review them this afternoon. Maria, looking forward to seeing the designs!",
      time: "10:52 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Project Collaboration
            </h1>
            <p className="text-gray-600">
              Working together on "Smart Home Automation" project
            </p>
          </div>
          <div className="space-x-4 flex">
            <Button className="flex items-center gap-2" variant="outline">
              <Users className="h-4 w-4" />
              <span>Request</span>
              <span className="bg-gray-50 text-black rounded-full px-1.5 text-sm">
                0
              </span>
            </Button>
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              New Update
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Collaborators */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Collaborators
                </CardTitle>
                <CardDescription>
                  People working on this project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                  <Avatar>
                    <AvatarImage src="/avatars/alex.jpg" />
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      AJ
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      Project Lead
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="ml-auto bg-green-500 h-3 w-3 p-0 rounded-full"
                  />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg">
                  <Avatar>
                    <AvatarImage src="/avatars/maria.jpg" />
                    <AvatarFallback className="bg-green-100 text-green-800">
                      MC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Maria Chen</p>
                    <p className="text-sm text-muted-foreground">UI Designer</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="ml-auto bg-green-500 h-3 w-3 p-0 rounded-full"
                  />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg">
                  <Avatar>
                    <AvatarImage src="/avatars/david.jpg" />
                    <AvatarFallback className="bg-purple-100 text-purple-800">
                      DK
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">David Kim</p>
                    <p className="text-sm text-muted-foreground">
                      Backend Developer
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="ml-auto bg-gray-400 h-3 w-3 p-0 rounded-full"
                  />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50">
                  <Avatar>
                    <AvatarImage src="/avatars/you.jpg" />
                    <AvatarFallback className="bg-indigo-100 text-indigo-800">
                      Y
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">You</p>
                    <p className="text-sm text-muted-foreground">
                      Frontend Developer
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="ml-auto bg-green-500 h-3 w-3 p-0 rounded-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progress
                </CardTitle>
                <CardDescription>Project completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Research</span>
                      <span className="text-sm font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Design</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Development</span>
                      <span className="text-sm font-medium">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              className="w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              Leave Collaboration
            </Button>
          </div>

          {/* Middle Column - Chat */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Team Chat
                </CardTitle>
                <CardDescription>
                  Collaborate with your team members
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto space-y-4 max-h-96">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`/avatars/${message.sender
                          .split(" ")[0]
                          .toLowerCase()}.jpg`}
                      />
                      <AvatarFallback
                        className={
                          message.sender === "Alex Johnson"
                            ? "bg-blue-100 text-blue-800"
                            : message.sender === "Maria Chen"
                            ? "bg-green-100 text-green-800"
                            : "bg-indigo-100 text-indigo-800"
                        }>
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{message.sender}</div>
                      <div
                        className={`mt-1 p-3 rounded-lg border ${
                          message.sender === "You"
                            ? "bg-indigo-100 border-indigo-200"
                            : "bg-white"
                        }`}>
                        <p>{message.text}</p>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Task Board Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Task Board
              </CardTitle>
              <CardDescription>Manage your project tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-3">To Do</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Set up backend API</h4>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/avatars/david.jpg" />
                          <AvatarFallback className="bg-purple-100 text-purple-800 text-xs">
                            DK
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Create initial API structure
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Implement UI components</h4>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/avatars/you.jpg" />
                          <AvatarFallback className="bg-indigo-100 text-indigo-800 text-xs">
                            Y
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Build responsive components
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-blue-700 mb-3">
                    In Progress
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Create wireframes</h4>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/avatars/maria.jpg" />
                          <AvatarFallback className="bg-green-100 text-green-800 text-xs">
                            MC
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Design user flow mockups
                      </p>
                      <div className="mt-2">
                        <Progress value={75} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-green-700 mb-3">Completed</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border border-green-200">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Research competitors</h4>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/avatars/alex.jpg" />
                          <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">
                            AJ
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Analyze market solutions
                      </p>
                      <div className="flex items-center mt-2 text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
