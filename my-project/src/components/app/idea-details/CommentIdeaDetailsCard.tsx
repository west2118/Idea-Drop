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

const CommentIdeaDetailsCard = () => {
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
            <Textarea placeholder="Add your comment or feedback..." rows={3} />
            <div className="flex justify-end">
              <Button>Post Comment</Button>
            </div>
          </div>
        </div>

        {/* Comment Thread */}
        <div className="space-y-6 pt-6">
          {/* Comment 1 */}
          <div className="flex space-x-4">
            <Avatar>
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-slate-100 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">Michael Johnson</h4>
                  <span className="text-sm text-slate-500">1 day ago</span>
                </div>
                <p className="text-slate-700">
                  This is a fantastic idea! I work in waste management and can
                  confirm that contamination is a huge issue. Have you
                  considered how to handle different types of plastics that look
                  similar?
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-2 ml-4">
                <Button variant="ghost" size="sm">
                  Reply
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-1" />5
                </Button>
              </div>

              {/* Reply */}
              <div className="flex space-x-4 mt-4 ml-6">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Alex Johnson (Author)</h4>
                      <span className="text-sm text-slate-500">
                        20 hours ago
                      </span>
                    </div>
                    <p className="text-slate-700">
                      Great question! We're experimenting with spectroscopy to
                      distinguish between similar-looking plastics based on
                      their chemical signatures.
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
            </div>
          </div>

          {/* Comment 2 */}
          <div className="flex space-x-4">
            <Avatar>
              <AvatarFallback>SL</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-slate-100 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">Sarah Lee</h4>
                  <span className="text-sm text-slate-500">15 hours ago</span>
                </div>
                <p className="text-slate-700">
                  I'm a hardware engineer with experience in IoT devices. Would
                  love to collaborate on the sensor and mechanical sorting
                  mechanism design!
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-2 ml-4">
                <Button variant="ghost" size="sm">
                  Reply
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-1" />7
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentIdeaDetailsCard;
