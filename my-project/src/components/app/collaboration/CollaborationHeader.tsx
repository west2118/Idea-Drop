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
  setIsModalOpen: (val: boolean) => void;
  status: string;
  isOwner: boolean;
  collaborationId: string;
};

const CollaborationHeader = ({ title, requests, setIsModalOpen, status, isOwner, collaborationId }: CollaborationHeaderProps) => {
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
      <div className="space-x-4 flex items-center">
        {isOwner && (
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2" variant="outline">
            <Users className="h-4 w-4" />
            <span>Request</span>
            <span className="bg-gray-50 text-black rounded-full px-1.5 text-sm">
              {requests?.filter(r => r.status === 'pending').length || 0}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CollaborationHeader;
