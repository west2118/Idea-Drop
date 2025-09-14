import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ThumbsUp,
  MessageSquare,
  Users,
  Mail,
  ChevronDown,
  Bell,
} from "lucide-react";

export default function NotificationsPage() {
  // This would typically come from props or state management
  const notifications = [
    {
      id: 1,
      type: "upvote",
      title: "Someone upvoted your idea",
      description:
        "John Doe liked your concept for a sustainable packaging solution",
      time: "2 hours ago",
      read: false,
      icon: ThumbsUp,
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      type: "comment",
      title: "New comment on your idea",
      description: "Sarah Johnson left a comment on your AI assistant project",
      time: "5 hours ago",
      read: false,
      icon: MessageSquare,
      iconColor: "text-green-500",
    },
    {
      id: 3,
      type: "collaboration",
      title: "Collaboration request received",
      description:
        "Tech Startup Inc. wants to collaborate on your mobile app concept",
      time: "1 day ago",
      read: true,
      icon: Users,
      iconColor: "text-purple-500",
    },
    {
      id: 4,
      type: "collaboration",
      title: "Collaboration request accepted",
      description: "You're now collaborating with Design Studio XYZ",
      time: "2 days ago",
      read: true,
      icon: Users,
      iconColor: "text-purple-500",
    },
    {
      id: 5,
      type: "message",
      title: "Message from collaborator",
      description: "Alex Chen sent you a message about the project timeline",
      time: "3 days ago",
      read: true,
      icon: Mail,
      iconColor: "text-amber-500",
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        <Button variant="outline" className="flex items-center gap-1">
          Filter <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your notifications</CardTitle>
              <CardDescription>
                You have {notifications.filter((n) => !n.read).length} unread
                notifications
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="divide-y">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 flex gap-4 ${
                      notification.read ? "bg-muted/30" : "bg-background"
                    }`}>
                    <div
                      className={`p-2 rounded-full ${notification.iconColor} bg-muted`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    {!notification.read && (
                      <Badge className="ml-2 h-2 w-2 p-0" variant="default" />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
