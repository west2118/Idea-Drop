import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import Link from "next/link";
import { CollaborationType } from "@/lib/types";

type CollaborationsCardDashboardProps = {
  collaborations: CollaborationType[];
};

const CollaborationsCardDashboard = ({
  collaborations,
}: CollaborationsCardDashboardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2 text-purple-600" />
          My Collaborations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {collaborations?.length > 0 ? (
            collaborations.map((collaboration, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <Link
                    href={`/collaboration/${collaboration._id}`}
                    className="text-sm font-medium hover:text-gray-600">
                    {typeof collaboration?.idea_id !== "string" &&
                      collaboration?.idea_id?.title}
                  </Link>
                  <Badge variant="outline">
                    {collaboration?.collaborations?.length ?? 0} members
                  </Badge>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${66}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Progress</span>
                  <span>{66}%</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 text-center py-6">
              No collaborations yet.
            </p>
          )}
        </div>
      </CardContent>
      {collaborations.length >= 3 && (
        <CardFooter>
          <Link href="/collaborations">
            <Button variant="outline" size="sm" className="w-full">
              View All Projects
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default CollaborationsCardDashboard;
