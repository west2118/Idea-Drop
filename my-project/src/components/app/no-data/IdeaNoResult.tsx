import { Search, RefreshCw } from "lucide-react";
import React from "react";

const IdeaNoResult = ({ content = "Ideas" }: { content?: string }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-10 px-4 border shadow-md rounded-xl bg-white dark:bg-black/30">
      <div className="bg-black/10 text-black p-3 rounded-full mb-4">
        <Search className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-black dark:text-white">
        No {content} Found
      </h3>
      <p className="text-sm text-black/70 dark:text-white/70 mt-1 mb-4 max-w-xs">
        We couldn’t find any {content} matching your search or filters.
      </p>
    </div>
  );
};

export default IdeaNoResult;
