import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import React from "react";

const CommentReplyCard = () => {
  return (
    <div className="flex space-x-4 mt-4 ml-6">
      <Avatar className="h-8 w-8">
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold">Alex Johnson (Author)</h4>
            <span className="text-sm text-slate-500">20 hours ago</span>
          </div>
          <p className="text-slate-700">
            Great question! We're experimenting with spectroscopy to distinguish
            between similar-looking plastics based on their chemical signatures.
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-2 ml-4">
          <Button variant="ghost" size="sm">
            Reply
          </Button>
          <Button variant="ghost" size="sm">
            <ThumbsUp className="h-4 w-4 mr-1" />3
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentReplyCard;
