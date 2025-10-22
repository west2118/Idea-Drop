import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IdeaType } from "@/lib/types";
import { useRouter } from "next/navigation";

const ProjectIdeasProfileCard = ({
  ideas,
  isOwner,
}: {
  ideas: IdeaType[] | null;
  isOwner: boolean;
}) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Posted Ideas
        </CardTitle>
        <CardDescription>
          Ideas {isOwner ? "you've" : "of user"} shared with the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ideas?.map((idea) => (
            <Card
              key={idea._id}
              className="overflow-hidden flex flex-col justify-between">
              <CardHeader className="pb-2 flex-grow">
                <div className="min-h-[80px] flex flex-col justify-start">
                  <CardTitle className="text-lg mb-1">{idea.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {idea.content?.description?.split(".")[0]}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between items-center">
                  <Badge>{idea.categories?.[0]}</Badge>
                  <Button
                    onClick={() => router.push(`/idea/details/${idea._id}`)}
                    variant="ghost"
                    size="sm"
                    className="gap-1">
                    View <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectIdeasProfileCard;
