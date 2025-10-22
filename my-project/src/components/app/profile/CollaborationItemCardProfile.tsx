import { CollaborationType } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";

const CollaborationItemCardProfile = ({
  collaboration,
}: {
  collaboration: CollaborationType;
}) => {
  console.log("Collaboration Data: ", collaboration);

  return (
    <Link
      href={`/idea/details/${
        typeof collaboration?.idea_id !== "string" && collaboration?.idea_id._id
      }`}>
      <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
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

        <ChevronRight className="h-4 w-4" />
      </div>
    </Link>
  );
};

export default CollaborationItemCardProfile;
