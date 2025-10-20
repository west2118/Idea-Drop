import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp } from "lucide-react";
import { CommentType } from "@/lib/types";
import CommentItemCard from "./CommentItemCard";

type CommentListProps = {
  comments: CommentType[] | undefined;
  onReply: (comment: string, parentId?: string | null) => void;
};

const CommentList = ({ comments, onReply }: CommentListProps) => {
  console.log("Comment Item: ", comments);

  return (
    <div className="space-y-6">
      {comments?.map((comment: CommentType) => (
        <CommentItemCard
          key={comment._id}
          comment={comment}
          onReply={onReply}
        />
      ))}
    </div>
  );
};

export default CommentList;
