import { userData } from "@/app/profile/[id]/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserType } from "@/lib/types";
import { format } from "date-fns";
import { Calendar, Edit, Heart, LogOut, Mail, MapPin } from "lucide-react";

const InfoProfileCard = ({ user }: { user: UserType | null }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/avatars/alex.jpg" />
            <AvatarFallback className="text-2xl">{`${user?.firstName.charAt(
              0
            )}${user?.lastName.charAt(0)}`}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h2>
          <p className="text-sm text-gray-500 mt-2">{user?.bio}</p>

          <div className="flex flex-col items-start w-full space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>
                {user?.createdAt &&
                  format(new Date(user?.createdAt), "MMMM yyyy")}
              </span>
            </div>
          </div>

          <div className="w-full flex-col space-y-2">
            <Button className="w-full">
              <Edit className="h-4 w-4" /> Edit Profile
            </Button>
            <Button className="w-full" variant="destructive">
              <LogOut className="h-4 w-4" /> Log Out
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoProfileCard;
