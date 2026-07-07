import { getIdeaById } from "@/lib/actions/idea.actions";
import { getComments } from "@/lib/actions/comment.actions";
import IdeaDetailClient from "./IdeaDetailClient";

export default async function IdeaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const [ideaDetails, commentsResponse] = await Promise.all([
      getIdeaById(id),
      getComments(id)
    ]);

    return (
      <IdeaDetailClient 
        initialData={ideaDetails as any} 
        initialComments={commentsResponse.rootComments as any} 
      />
    );
  } catch (error) {
    console.error(error);
    return <div className="p-8 text-center text-red-500">Failed to load idea details. It might have been deleted or you don't have access.</div>;
  }
}
