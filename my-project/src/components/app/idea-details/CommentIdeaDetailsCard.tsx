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
import { toast } from "react-toastify";
import { postComment } from "@/lib/actions/comment.actions";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import { CommentType } from "@/lib/types";
import { useUserStore } from "@/stores/useUserStore";

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
    if (!ideaId) return;
    setIsLoading(true);

    try {
      await postComment({ ideaId, content: comment, parentId });
      toast.success("Comment posted successfully");
      setText("");
    } catch (error: any) {
      toast.error(error.message);
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
