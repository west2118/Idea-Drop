import { tips } from "@/constants/tips";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle } from "lucide-react"; // Importing an icon for better bullet points

import React from "react";

const TipsCard = () => {
  return (
    <Card className="mt-6 shadow-lg rounded-lg 2 bg-white">
      <CardHeader className="pb-4 border-b">
        <CardTitle className="text-xl font-semibold text-gray-800">
          Tips for a Great Idea Post
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-gray-600">{tip}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TipsCard;
