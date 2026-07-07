"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  X,
  Clock,
  Mail,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import { updateCollaborationRequest } from "@/lib/actions/collaboration.actions";
import { useState } from "react";
import { toast } from "react-toastify";
import { formatTimeAgo } from "@/lib/utils";

type RequestType = {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    bio?: string;
    position?: string;
    skills?: string[];
    createdAt?: string;
    email?: string;
  };
  status: "pending" | "accepted" | "declined";
  message: string;
  requestedAt: string;
};

type CollaborationRequestsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  requests: RequestType[] | undefined;
  collaborationId: string;
};

export default function CollaborationRequestsModal({ isOpen, onClose, requests, collaborationId }: CollaborationRequestsModalProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  if (!isOpen) return null;

  const pendingRequests = requests?.filter(r => r.status === "pending") || [];

  const handleAction = async (requestId: string, action: "accepted" | "declined") => {
    setIsLoading(requestId);
    try {
      await updateCollaborationRequest(collaborationId, requestId, action);
      toast.success(`Request ${action} successfully`);
      if (pendingRequests.length === 1) onClose(); // close if last one
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Collaboration Requests
            </h2>
            <p className="text-gray-600">
              Manage requests for this project
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {pendingRequests.length} Pending
            </Badge>
            <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {pendingRequests.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No pending requests at the moment.
            </div>
          )}
          {pendingRequests.map((request) => (
            <div key={request._id} className="border-b last:border-b-0">
              <div className="p-6">
                <div className="flex gap-4">
                  {/* User Info Sidebar */}
                  <div className="w-1/3 space-y-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-800">
                          {`${request.user?.firstName?.[0] || ""}${request.user?.lastName?.[0] || ""}`}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{`${request.user?.firstName || ""} ${request.user?.lastName || ""}`}</h3>
                        <p className="text-sm text-gray-600">
                          {request.user?.position || "Member"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{request.user?.email || "No email"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {request.user?.createdAt ? formatTimeAgo(request.user.createdAt) : "Recently"}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {request.user?.skills?.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {(request.user?.skills?.length || 0) > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{(request.user?.skills?.length || 0) - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                           <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Requested {formatTimeAgo(request.requestedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Pending
                      </Badge>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Message:</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                        {request.message}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button disabled={isLoading === request._id} onClick={() => handleAction(request._id, "accepted")} className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4" />
                        Accept Request
                      </Button>
                      <Button
                        disabled={isLoading === request._id}
                        onClick={() => handleAction(request._id, "declined")}
                        variant="outline"
                        className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <XCircle className="h-4 w-4" />
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing {pendingRequests.length} pending requests
          </div>
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline">Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
