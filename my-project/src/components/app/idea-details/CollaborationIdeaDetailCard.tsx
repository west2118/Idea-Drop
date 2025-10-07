import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollaborationType } from "@/lib/types";

const CollaborationIdeaDetailCard = ({
  collaboration,
}: {
  collaboration: CollaborationType;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Collaboration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between gap-2">
            <span className="text-sm text-slate-600">Status</span>
            <Badge
              variant="outline"
              className={`${
                collaboration.status ? "text-green-700" : "text-red-700"
              }`}>
              {collaboration?.status ? "Open" : "Closed"}
            </Badge>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-sm text-slate-600">Looking For</span>
            <span className="text-sm text-end">
              {collaboration.lookingFor?.join(", ")}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-sm text-slate-600">Team Members</span>
            <span className="text-sm">
              {collaboration?.collaborations?.length ?? 0} joined
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationIdeaDetailCard;
