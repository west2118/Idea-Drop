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

const collaborations = [
  { name: "Urban Garden Project", members: 4, progress: 65 },
  { name: "Accessibility Tool Dev", members: 3, progress: 42 },
  { name: "Food Waste App", members: 5, progress: 78 },
];

const CollaborationsCardDashboard = () => {
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
          {collaborations.map((project, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <Link
                  href="/collaboration"
                  className="text-sm font-medium hover:text-gray-600">
                  {project.name}
                </Link>
                <Badge variant="outline">{project.members} members</Badge>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View All Projects
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CollaborationsCardDashboard;
