import { Button } from "@/components/ui/button";
import { Sparkles, Users } from "lucide-react";
import React from "react";

type CollaborationHeaderProps = {
  title: string | false | undefined;
  requests:
    | {
        user: string;
        status: "pending" | "accepted" | "declined";
        requestedAt: string;
      }[]
    | undefined;
};

const CollaborationHeader = ({ title, requests }: CollaborationHeaderProps) => {
  console.log(requests);

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Project Collaboration
        </h1>
        <p className="text-gray-600">
          {`Working together on ${title} project`}
        </p>
      </div>
      <div className="space-x-4 flex">
        <Button className="flex items-center gap-2" variant="outline">
          <Users className="h-4 w-4" />
          <span>Request</span>
          <span className="bg-gray-50 text-black rounded-full px-1.5 text-sm">
            {requests?.length}
          </span>
        </Button>
        <Button className="gap-2">
          <Sparkles className="h-4 w-4" />
          New Update
        </Button>
      </div>
    </div>
  );
};

export default CollaborationHeader;
