"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Users, Code2, Cpu, Smartphone, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { CollaborationType, IdeaType } from "@/lib/types";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

type RequestCollaborationModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  idea: IdeaType | null;
  collaboration: CollaborationType | null;
};

export default function RequestCollaborationModal({
  isModalOpen,
  isCloseModal,
  idea,
  collaboration,
}: RequestCollaborationModalProps) {
  const token = useUserStore((state) => state.userToken);
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && idea) {
      setMessage(
        `Hi, I'm ${user?.firstName}! I'm really excited about your ${idea?.title} project...`
      );
    }
  }, [user, idea]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.put(
        "/api/collaboration/putRequestCollaboration",
        { idea_id: idea?._id, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      isCloseModal();
      toast.success(response?.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isModalOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return (
    <div
      onClick={isCloseModal}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Request to Collaborate
            </h2>
            <p className="text-gray-600">Send a request to join this project</p>
          </div>

          <Button
            onClick={isCloseModal}
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
            <div className="space-y-6">
              {/* Project Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">
                        Smart Home Automation Platform
                      </h3>

                      <Badge variant="outline" className="text-xs">
                        {collaboration?.status ? "Open" : "Closed"}
                      </Badge>
                    </div>

                    <p className="text-gray-600 text-sm mt-1">
                      An AI-powered home automation system that learns user
                      preferences
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {idea?.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm text-gray-500 mt-3 flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      {collaboration?.collaborations?.length ?? 0} team members
                      joined
                    </p>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium block">
                    Message to Project Owner
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Introduce yourself and explain why you'd be a good fit for this project..."
                    className="min-h-[120px] resize-none"
                  />
                  <p className="text-xs text-gray-500">
                    This message will be sent to the project owner along with
                    your request.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
            <Button disabled={isLoading} type="button" variant="outline">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="h-4 w-4" />
              Send Collaboration Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
