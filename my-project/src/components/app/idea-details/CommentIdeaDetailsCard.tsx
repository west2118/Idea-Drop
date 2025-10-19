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
};

const CommentIdeaDetailsCard = ({
  ideaId,
  commentsList,
}: CommentIdeaDetailsCard) => {
  const token = useUserStore((state) => state.userToken);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (commentsList) {
      setComments(commentsList);
    }
  }, [commentsList]);

  const handleSubmit = async (parentId = null) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/api/comment/postComment",
        {
          ideaId,
          text,
          parentId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newComment = response?.data?.rootComments;
      setComments((prev) => [...prev, newComment]);
      setText("");

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
        <CardTitle>Discussion (18)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* New Comment Form */}
        <div className="flex space-x-4">
          <Avatar>
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add your comment or feedback..."
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={() => handleSubmit()}>Post Comment</Button>
            </div>
          </div>
        </div>

        {/* Comment Thread */}
        <CommentList />
      </CardContent>
    </Card>
  );
};

export default CommentIdeaDetailsCard;
