import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  X,
  Users,
  Plus,
  Search,
  Calendar,
  MapPin,
  Globe,
  Lock,
  Tag,
  Clock,
  Target,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import { positions } from "@/constants/positions";
import { handleAdd, handleSelected } from "@/lib/utils";
import { lookingForLimit } from "@/lib/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";

type CreateCollaborationModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  idea_id: string | undefined;
  projectName: string | undefined;
};

export default function CreateCollaborationModal({
  isModalOpen,
  isCloseModal,
  idea_id,
  projectName,
}: CreateCollaborationModalProps) {
  const router = useRouter();
  const token = useUserStore((state) => state.userToken);
  const [notes, setNotes] = useState("");
  const [specificLookingFor, setSpecificLookingFor] = useState("");
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleLookingFor = (position: string) => {
    handleSelected(position, setLookingFor, lookingForLimit);
  };

  const handleLookingForAdd = () => {
    if (lookingFor.includes(specificLookingFor)) return;

    handleAdd(
      specificLookingFor,
      setSpecificLookingFor,
      setLookingFor,
      lookingForLimit
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const newData = {
      idea_id,
      lookingFor,
      notes,
    };

    try {
      const response = await axios.post(
        "/api/collaboration/postCollaboration",
        { ...newData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.data;

      toast.success(data.message);
      router.push(`/collaboration/${data.newCollaboration._id}`);
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create Collaboration
            </h2>
            <p className="text-gray-600">
              Start a new project and find collaborators
            </p>
          </div>
          <Button
            onClick={isCloseModal}
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
              {/* Project Name */}
              <div className="space-y-3">
                <label className="text-sm font-medium block">
                  Project Name
                </label>
                <p className="border rounded-md px-3 py-2 text-sm font-semibold text-gray-700">
                  {projectName}
                </p>
              </div>

              {/* Looking For */}
              <div className="space-y-3">
                <label className="text-sm font-medium block">Looking For</label>

                <div className="space-x-1">
                  <div className="flex flex-wrap gap-2">
                    {lookingFor.map((position) => (
                      <Badge
                        key={position}
                        variant="secondary"
                        className="gap-1 cursor-pointer">
                        {position}
                        <button
                          onClick={() =>
                            setLookingFor((prev) =>
                              prev.filter((item) => item !== position)
                            )
                          }
                          type="button"
                          className="flex items-center justify-center w-5 h-5">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
                      <Input
                        placeholder="Add role..."
                        value={specificLookingFor}
                        onChange={(e) => setSpecificLookingFor(e.target.value)}
                        className="border-0 p-0 h-6 focus-visible:ring-0 w-32"
                      />
                      <button
                        onClick={handleLookingForAdd}
                        className="p-1 rounded-md hover:bg-gray-50">
                        <Plus className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* ✅ Choices Buttons Section */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {positions.map((position) => (
                      <Button
                        type="button"
                        key={position}
                        onClick={() => handleLookingFor(position)}
                        variant={
                          lookingFor.includes(position) ? "default" : "outline"
                        }
                        size="sm">
                        {position}
                      </Button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  Add the roles you're looking for collaborators
                </p>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <label className="text-sm font-medium block">
                  Notes about the project
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your project, goals, requirements, or any important details..."
                  className="min-h-[120px]"
                />
                <p className="text-xs text-gray-500">
                  This helps potential collaborators understand your project
                  better
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 p-6 border-t bg-gray-50">
            <Button disabled={isLoading} type="button" variant="outline">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700">
              <Users className="h-4 w-4 mr-2" />
              Create Collaboration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
