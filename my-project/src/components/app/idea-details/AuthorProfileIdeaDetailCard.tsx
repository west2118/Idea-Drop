import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lightbulb } from "lucide-react";

const AuthorProfileIdeaDetailCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">About the Author</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="text-lg">AJ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Alex Johnson</h3>
            <p className="text-sm text-slate-600">Environmental Engineer</p>
          </div>
        </div>
        <p className="text-sm text-slate-600">
          Passionate about using technology to solve environmental challenges.
          Previously worked on water purification systems.
        </p>
        <div className="flex items-center text-sm text-slate-500">
          <Lightbulb className="h-4 w-4 mr-1" />
          <span>12 ideas shared</span>
        </div>
        <Button variant="outline" className="w-full">
          Follow Author
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthorProfileIdeaDetailCard;
