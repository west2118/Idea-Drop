import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RelatedIdeaDetailCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Related Ideas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Smart Composting System</h4>
          <p className="text-sm text-slate-600 line-clamp-2">
            IoT-enabled compost bins that monitor temperature, moisture, and
            composition.
          </p>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>45 votes</span>
            <span>8 comments</span>
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t">
          <h4 className="font-medium">Ocean Plastic Collection Drone</h4>
          <p className="text-sm text-slate-600 line-clamp-2">
            Autonomous drones that identify and collect plastic waste from ocean
            surfaces.
          </p>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>87 votes</span>
            <span>14 comments</span>
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t">
          <h4 className="font-medium">Textile Recycling Innovation</h4>
          <p className="text-sm text-slate-600 line-clamp-2">
            New process for breaking down blended fabrics into reusable fibers.
          </p>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>32 votes</span>
            <span>6 comments</span>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4">
          View More Related Ideas
        </Button>
      </CardContent>
    </Card>
  );
};

export default RelatedIdeaDetailCard;
