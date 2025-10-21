"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Lightbulb,
  ThumbsUp,
  MessageSquare,
  Users,
  Share,
  Bookmark,
  MoreHorizontal,
  Clock,
  Eye,
  BookmarkCheck,
} from "lucide-react";
import { CollaborationType, IdeaType } from "@/lib/types";
import { formatTimeAgo } from "@/lib/utils";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

type HeaderIdeaDetailsProps = {
  idea: IdeaType | null;
  isFavorited: boolean | null;
  isReacted: boolean | null;
  reactions: number;
  toggleComment: () => void;
  collaboration: CollaborationType | null;
  handleOpenModalCreate: () => void;
  handleOpenModalRequest: () => void;
  commentsCount: number;
};

const HeaderIdeaDetails = ({
  idea,
  isFavorited,
  isReacted,
  reactions,
  toggleComment,
  collaboration,
  handleOpenModalCreate,
  handleOpenModalRequest,
  commentsCount,
}: HeaderIdeaDetailsProps) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.userToken);
  const [isFavorite, setIsFavorite] = useState(isFavorited);
  const [isReact, setIsReact] = useState(isReacted);
  const [currentReactionCount, setCurrentReactionCount] = useState(reactions);

  const handleToggleFavorite = async () => {
    if (!idea?._id || !token) return;

    try {
      if (isFavorite) {
        const response = await axios.delete(`/api/favorite/${idea?._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFavorite(false);

        toast.success(response?.data?.message);
      } else {
        const response = await axios.post(
          `/api/favorite/${idea?._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsFavorite(true);

        toast.success(response?.data?.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleToggleReaction = async () => {
    if (!idea?._id || !token) return;

    try {
      if (isReact) {
        await axios.delete(`/api/reaction/${idea?._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsReact(false);
        setCurrentReactionCount((prev) => Math.max(prev - 1, 0));
      } else {
        await axios.post(
          `/api/reaction/${idea?._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIsReact(true);
        setCurrentReactionCount((prev) => prev + 1);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200">
            {idea?.categories[0]}
          </Badge>
          <div className="flex space-x-2">
            <Button onClick={handleToggleFavorite} variant="ghost" size="sm">
              {isFavorite ? (
                <BookmarkCheck className="h-5 w-5 text-blue-500" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-3xl">{idea?.title}</CardTitle>
        <CardDescription className="flex items-center space-x-4 mt-2">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarFallback>{`${idea?.user_id.firstName.charAt(
                0
              )}${idea?.user_id.lastName.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <span>{`${idea?.user_id.firstName} ${idea?.user_id.lastName}`}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{idea?.createdAt && formatTimeAgo(idea?.createdAt)}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Idea Description */}
        <div className="prose max-w-none">
          <p className="text-lg">{idea?.content.description}</p>

          <h3 className="text-2xl font-semibold mt-6 mb-3">How It Works</h3>
          <p className="text-lg">{idea?.content.works}</p>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Benefits</h3>
          <ul className="list-disc pl-5">
            {idea?.content.benefits.split(",").map((benefit, index) => (
              <li key={index} className="text-lg">
                {benefit}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Next Steps</h3>
          <p className="text-lg">{idea?.content.conclusion}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4">
          {idea?.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                onClick={handleToggleReaction}
                className={`flex items-center ${
                  isReact
                    ? "bg-blue-600 text-white hover:bg-blue-700" // ✅ filled blue when reacted
                    : "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100" // ✅ outline when not reacted
                }`}>
                <ThumbsUp
                  className={`h-4 w-4 mr-1 ${
                    isReact ? "text-white" : "text-gray-500"
                  }`}
                />
                <span>{currentReactionCount}</span>
              </Button>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                onClick={toggleComment}
                variant="outline"
                size="sm"
                className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{commentsCount}</span>
              </Button>
            </div>
          </div>

          {idea?.user_id._id === user?._id ? (
            // 👤 Owner
            collaboration ? (
              <Button
                onClick={() => router.push(`/collaboration/${idea?._id}`)}
                className="bg-green-600 hover:bg-green-700">
                <Users className="h-4 w-4" />
                View Collaboration
              </Button>
            ) : (
              <Button
                onClick={handleOpenModalCreate}
                className="bg-blue-600 hover:bg-blue-700">
                <Users className="h-4 w-4" />
                Create Collaboration
              </Button>
            )
          ) : collaboration ? (
            <Button
              onClick={handleOpenModalRequest}
              className="hover:bg-blue-700 bg-blue-600">
              <Users className="h-4 w-4" />
              Request Collaboration
            </Button>
          ) : (
            ""
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeaderIdeaDetails;
