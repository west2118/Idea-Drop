"use client";

import { useState, useEffect, useRef } from "react";
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
  Users,
  TrendingUp,
  MessageSquare,
  LogOut,
  Send,
  ClipboardList,
  Plus,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { updateCollaborationStatus } from "@/lib/actions/collaboration.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CollaborationType } from "@/lib/types";
import CollaborationHeader from "@/components/app/collaboration/CollaborationHeader";
import CollaborationRequestsModal from "@/components/app/modals/CollaborationRequestsModal";
import TaskBoard from "@/components/app/collaboration/TaskBoard";
import AddTaskModal from "@/components/app/modals/AddTaskModal";
import { useUserStore } from "@/stores/useUserStore";
import { createChat } from "@/lib/actions/chat.actions";
import io from "socket.io-client";

let socket: any;

export default function CollaborationClient({
  initialCollaboration,
  initialTasks,
  initialChats,
}: {
  initialCollaboration: CollaborationType;
  initialTasks: any[];
  initialChats: any[];
}) {
  const currentUser = useUserStore((state) => state.user);

  const [messages, setMessages] = useState(initialChats || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [tasks, setTasks] = useState(initialTasks || []);
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Initialize socket connection
    const initSocket = async () => {
      // Connect to the same origin
      socket = io();

      socket.on("connect", () => {
        if (currentUser && initialCollaboration?._id) {
          socket.emit("join-room", initialCollaboration._id, currentUser);
        }
      });

      socket.on("active-users", (users: any[]) => {
        setActiveUsers(users);
      });

      socket.on("receive-message", (messageData: any) => {
        setMessages((prev: any) => {
          if (prev.some((m: any) => m._id === messageData._id)) return prev;
          return [...prev, messageData];
        });
      });

      socket.on("receive-task-added", (taskData: any) => {
        setTasks((prev: any) => {
          if (prev.some((t: any) => t._id === taskData._id)) return prev;
          return [...prev, taskData];
        });
      });

      socket.on("receive-task-updated", (taskData: any) => {
        setTasks((prev: any) => prev.map((t: any) => t._id === taskData._id ? taskData : t));
      });
    };

    if (currentUser) {
      initSocket();
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, [currentUser, initialCollaboration?._id]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" && initialCollaboration?._id && currentUser) {
      const textToSend = newMessage;
      setNewMessage(""); // Optimistically clear input
      try {
        const newChat = await createChat({ collaboration_id: initialCollaboration._id, text: textToSend });
        socket.emit("send-message", initialCollaboration._id, newChat);
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  const handleTaskAdded = (newTask: any) => {
    const fullyPopulatedTask = { ...newTask, createdBy: currentUser };
    setTasks((prev: any) => [...prev, fullyPopulatedTask]);
    socket.emit("task-added", initialCollaboration._id, fullyPopulatedTask);
  };

  const handleTaskUpdated = (updatedTask: any) => {
    setTasks((prev: any) => prev.map((t: any) => t._id === updatedTask._id ? updatedTask : t));
    socket.emit("task-updated", initialCollaboration._id, updatedTask);
  };

  // Combine owner and collaborators for the list, deduplicating by _id
  const allMembers = [
    { ...initialCollaboration?.owner, role: "owner" },
    ...(initialCollaboration?.collaborations || []).map((c: any) => ({
      ...c.user,
      role: c.role,
    }))
  ];

  const teamMembers = Array.from(new Map(allMembers.filter(m => m._id).map(m => [m._id, m])).values());

  // Progress calculation
  const validTasks = tasks.filter((t: any) => t.status !== "Cancelled");
  const completedTasks = validTasks.filter((t: any) => t.status === "Completed").length;
  const progressPercent = validTasks.length > 0 ? Math.round((completedTasks / validTasks.length) * 100) : 0;
  const isAllTasksCompleted = validTasks.length > 0 && completedTasks === validTasks.length;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <CollaborationHeader
          title={
            (typeof initialCollaboration?.idea_id !== "string" &&
              initialCollaboration?.idea_id?.title) ??
            ""
          }
          requests={initialCollaboration?.requests}
          setIsModalOpen={setIsModalOpen}
          status={initialCollaboration.status as string}
          isOwner={currentUser?._id === initialCollaboration.owner?._id}
          collaborationId={initialCollaboration._id as string}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Collaborators
                </CardTitle>
                <CardDescription>People working on this project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member: any) => {
                  const isActive = activeUsers.some((u: any) => u._id === member._id);
                  const isYou = member._id === currentUser?._id;

                  return (
                    <div key={member._id} className={`flex items-center gap-3 p-3 rounded-lg ${isYou ? "bg-indigo-50" : ""}`}>
                      <Avatar>
                        <AvatarFallback className={isYou ? "bg-indigo-100 text-indigo-800" : "bg-blue-100 text-blue-800"}>
                          {`${member?.firstName?.[0] || ""}${member?.lastName?.[0] || ""}`}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{isYou ? "You" : `${member?.firstName} ${member?.lastName}`}</p>
                        <p className="text-sm text-muted-foreground capitalize">{member.role || "Member"}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`ml-auto h-3 w-3 p-0 rounded-full ${isActive ? "bg-green-500" : "bg-gray-300"}`}
                      />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progress
                </CardTitle>
                <CardDescription>Overall task completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Tasks</span>
                      <span className="text-sm font-medium">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                    <p className="text-xs text-gray-500 mt-2">{completedTasks} of {validTasks.length} active tasks completed</p>
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

          {/* Chat */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Team Chat
                </CardTitle>
                <CardDescription>Collaborate with your team members</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto space-y-4 max-h-96">
                {messages.map((message: any) => {
                  const isYou = message.sender._id === currentUser?._id;
                  const senderName = `${message.sender.firstName} ${message.sender.lastName}`;
                  const shortName = `${message.sender.firstName?.[0] || ""}${message.sender.lastName?.[0] || ""}`;

                  return (
                    <div key={message._id} className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className={isYou ? "bg-indigo-100 text-indigo-800" : "bg-blue-100 text-blue-800"}>
                          {shortName}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{isYou ? "You" : senderName}</div>
                        <div className={`mt-1 p-3 rounded-lg border ${isYou ? "bg-indigo-100 border-indigo-200" : "bg-white"}`}>
                          <p>{message.text}</p>
                        </div>
                        <div suppressHydrationWarning className="text-xs text-muted-foreground mt-1">
                          {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Task Board
                </CardTitle>
                <CardDescription>Manage your project tasks</CardDescription>
              </div>
              <div className="flex gap-2">
                {(initialCollaboration.status === "active" || initialCollaboration.status === true as any) && (
                  <Button onClick={() => setIsTaskModalOpen(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Task
                  </Button>
                )}
                {currentUser?._id === initialCollaboration.owner?._id && (initialCollaboration.status === "active" || initialCollaboration.status === true as any) && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        disabled={!isAllTasksCompleted} 
                        variant="default" 
                        className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Done Collaboration
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will mark the collaboration as completed. No more tasks can be added or updated, but you can still chat. This action cannot be easily undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={async () => {
                            try {
                              await updateCollaborationStatus(initialCollaboration._id as string, "completed");
                              toast.success("Collaboration completed!");
                              window.location.reload();
                            } catch (e: any) {
                              toast.error(e.message);
                            }
                          }}
                        >
                          Complete Collaboration
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <TaskBoard
                tasks={tasks}
                currentUser={currentUser}
                collaborationOwnerId={initialCollaboration?.owner?._id}
                onTaskUpdated={handleTaskUpdated}
                disabled={initialCollaboration.status !== "active" && initialCollaboration.status !== true as any}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <CollaborationRequestsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        requests={initialCollaboration?.requests}
        collaborationId={initialCollaboration?._id}
      />

      <AddTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        collaborationId={initialCollaboration?._id}
        onTaskAdded={handleTaskAdded}
      />
    </div>
  );
}
