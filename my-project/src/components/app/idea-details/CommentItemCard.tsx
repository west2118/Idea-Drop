import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp } from "lucide-react";
import { CommentType } from "@/lib/types";
import { useState } from "react";
import CommentList from "./CommentList";
import { Textarea } from "@/components/ui/textarea";
import { formattedDate } from "@/lib/constants";

type CommentItemCardProps = {
  comment: CommentType;
  onReply: (comment: string, parentId?: string | null) => void;
};

const CommentItemCard = ({ comment, onReply }: CommentItemCardProps) => {
  const [showReply, setShowReply] = useState(false);
  const [showAllReply, setShowAllReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    onReply(replyText, comment._id);
    setShowReply(false);
    setReplyText("");
  };

  return (
    <div className="flex space-x-4">
      <Avatar>
        <AvatarFallback>{`${comment.user.firstName.charAt(
          0
        )}${comment.user.lastName.charAt(0)}`}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-slate-100 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold">{`${comment.user.firstName} ${comment.user.lastName}`}</h4>
            <span className="text-sm text-slate-500">
              {formattedDate(comment?.createdAt)}
            </span>
          </div>
          <p className="text-slate-700">{comment.text}</p>
        </div>
        <div className="flex items-center space-x-4 mt-2 ml-4">
          <Button
            onClick={() => {
              setShowReply(!showReply);
              setReplyText(
                `${comment.user.firstName} ${comment.user.lastName}`
              );
            }}
            variant="ghost"
            size="sm">
            Reply
          </Button>
          <Button variant="ghost" size="sm">
            <ThumbsUp className="h-4 w-4 mr-1" />5
          </Button>
        </div>

        {comment.replies &&
          comment.replies?.length > 0 &&
          showAllReply === false && (
            <div className="pl-5 border-l mt-2 space-y-2">
              <button onClick={() => setShowAllReply(true)}>
                <p>
                  {comment?.replies.length > 1
                    ? `View all ${comment.replies.length} Replies`
                    : `View ${comment.replies.length} reply`}
                </p>
              </button>
            </div>
          )}

        {showAllReply && (
          <div className="pl-5 border-l mt-2 space-y-2">
            <CommentList comments={comment?.replies} onReply={onReply} />
          </div>
        )}

        {showReply && (
          <div className="mt-2 space-y-4">
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={handleReply}>Post Comment</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItemCard;
