"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CollaborationType } from "@/lib/types";
import { Lightbulb } from "lucide-react";
import CollaborationItemCardProfile from "./CollaborationItemCardProfile";

const CollaborationProfileCard = ({
  collaborations,
  isOwner,
}: {
  collaborations: CollaborationType[] | null;
  isOwner: boolean;
}) => {


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Collaborations
        </CardTitle>
        <CardDescription>
          Projects {isOwner ? "you've" : "of user"} currently contributing to
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {collaborations?.map((collaboration) => (
            <CollaborationItemCardProfile
              key={collaboration._id}
              collaboration={collaboration}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationProfileCard;
