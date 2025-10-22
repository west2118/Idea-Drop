"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CollaborationType } from "@/lib/types";

const CollaborationItemCardCollaborations = ({
  collaboration,
}: {
  collaboration: CollaborationType;
}) => {
  const collaboratorsCount = collaboration.collaborations?.length || 0;

  return (
    <Link href={`/collaboration/${collaboration._id}`}>
      <Card className="w-full border rounded-xl hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-semibold">
            {typeof collaboration?.idea_id !== "string" &&
              collaboration?.idea_id?.title}
          </CardTitle>
          <Badge variant={collaboration.status ? "default" : "secondary"}>
            {collaboration.status ? "Active" : "Closed"}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            <strong>Looking for:</strong>{" "}
            {collaboration.lookingFor && collaboration.lookingFor.join(", ")}
          </p>

          <p className="text-sm text-muted-foreground line-clamp-2">
            <strong>Notes:</strong>{" "}
            {collaboration.notes || "No additional notes."}
          </p>

          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-muted-foreground flex items-center justify-center">
              <Users className="h-4 w-4 text-muted-foreground mr-1" />{" "}
              {collaboratorsCount} Collaborator
              {collaboratorsCount !== 1 && "s"}
            </p>

            <ChevronRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CollaborationItemCardCollaborations;
