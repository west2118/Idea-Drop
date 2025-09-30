import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import Link from "next/link";

const MyIdeaCardDashboard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <User className="h-5 w-5 mr-2 text-blue-600" />
          My Ideas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Link
            href="/idea/published"
            className="group flex w-full items-center justify-between rounded-md px-0 py-2 text-sm hover:text-gray-500">
            <span>Published</span>
            <Badge
              variant="secondary"
              className="group-hover:text-gray-500 group-hover:bg-gray-100">
              7
            </Badge>
          </Link>

          <Link
            href="/idea/favorites"
            className="group flex w-full items-center justify-between rounded-md px-0 py-2 text-sm hover:text-gray-500">
            <span>Favorites</span>
            <Badge
              variant="secondary"
              className="group-hover:text-gray-500 group-hover:bg-gray-100">
              2
            </Badge>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyIdeaCardDashboard;
