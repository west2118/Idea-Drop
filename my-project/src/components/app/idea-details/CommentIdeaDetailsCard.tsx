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
import { Lightbulb, ThumbsUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import { CommentType } from "@/lib/types";

type CommentIdeaDetailsCard = {
  ideaId: string | null;
  commentsList: CommentType[] | null;
  commentsCount: number;
};

const CommentIdeaDetailsCard = ({
  ideaId,
  commentsList,
  commentsCount,
}: CommentIdeaDetailsCard) => {
  const token = useUserStore((state) => state.userToken);
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (commentsList) {
      setComments(commentsList);
    }
  }, [commentsList]);

  const handleSubmit = async (
    comment: string,
    parentId: string | null = null
  ) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/api/comment/postComment",
        {
          ideaId,
          text: comment,
          parentId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newComment = response?.data?.rootComments;

      toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {commentsCount > 1 ? "Comments" : "Comment"} ({commentsCount})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 -mt-2">
        {/* Comment Thread */}
        {comments.length > 0 && (
          <CommentList comments={comments} onReply={handleSubmit} />
        )}

        <div className="flex space-x-4">
          <Avatar>
            <AvatarFallback>{`${user?.firstName.charAt(
              0
            )}${user?.lastName.charAt(0)}`}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add your comment or feedback..."
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={() => handleSubmit(text)}>Post Comment</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentIdeaDetailsCard;
