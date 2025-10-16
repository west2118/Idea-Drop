import { userData } from "@/app/profile/[id]/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart } from "lucide-react";

const InterestsProfileCard = ({
  interests,
}: {
  interests: string[] | null;
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Interests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {interests?.map((interest) => (
            <Badge key={interest} variant="outline" className="text-sm">
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestsProfileCard;
