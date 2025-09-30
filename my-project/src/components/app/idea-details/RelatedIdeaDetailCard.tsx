import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IdeaType } from "@/lib/types";

const RelatedIdeaDetailCard = ({
  relatedIdeas,
}: {
  relatedIdeas: IdeaType[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Related Ideas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {relatedIdeas.map((idea) => (
          <div key={idea.title} className="space-y-2">
            <h4 className="font-medium">{idea?.title}</h4>
            <p className="text-sm text-slate-600 line-clamp-2">
              {idea?.content?.description}
            </p>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>45 votes</span>
              <span>8 comments</span>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full mt-4">
          View More Related Ideas
        </Button>
      </CardContent>
    </Card>
  );
};

export default RelatedIdeaDetailCard;
