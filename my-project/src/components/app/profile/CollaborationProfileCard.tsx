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
import { Lightbulb, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const CollaborationProfileCard = ({
  collaborations,
}: {
  collaborations: CollaborationType[] | null;
}) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Collaborations
        </CardTitle>
        <CardDescription>
          Projects you're currently contributing to
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {collaborations?.map((collaboration) => (
            <div
              key={collaboration._id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium">
                  {typeof collaboration?.idea_id !== "string" &&
                    collaboration?.idea_id?.title}
                </p>
                <p className="text-sm text-gray-500">
                  {`${
                    collaboration?.collaborations &&
                    collaboration?.collaborations?.length - 1
                  } Collaborators`}
                </p>
              </div>
              <Button
                onClick={() =>
                  router.push(
                    `/idea/details/${
                      typeof collaboration?.idea_id !== "string" &&
                      collaboration.idea_id._id
                    }`
                  )
                }
                variant="ghost"
                size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationProfileCard;
