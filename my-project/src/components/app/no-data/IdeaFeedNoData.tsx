import { Plus, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const IdeaFeedNoData = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-10 px-4 border shadow-md rounded-xl bg-white dark:bg-black/30">
      <div className="bg-black/10 text-black p-3 rounded-full mb-4">
        <User className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-black dark:text-white">
        No Ideas Yet
      </h3>
      <p className="text-sm text-black/70 dark:text-white/70 mt-1 mb-4 max-w-xs">
        Share your creativity with the community — start by creating your first
        idea!
      </p>
      <Link href="/idea/create" className="mt-2">
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium bg-black hover:bg-black/80 text-white rounded-md transition-all duration-200">
          <Plus className="h-4 w-4 mr-2" />
          Create Idea
        </button>
      </Link>
    </div>
  );
};

export default IdeaFeedNoData;
