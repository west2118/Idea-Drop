import { getCollaborationById } from "@/lib/actions/collaboration.actions";
import { getTasksByCollaborationId } from "@/lib/actions/task.actions";
import { getChatsByCollaborationId } from "@/lib/actions/chat.actions";
import CollaborationClient from "./CollaborationClient";

export default async function CollaborationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const collaboration = await getCollaborationById(id);
    const tasks = await getTasksByCollaborationId(id);
    const chats = await getChatsByCollaborationId(id);

    return (
      <CollaborationClient initialCollaboration={collaboration as any} initialTasks={tasks} initialChats={chats} />
    );
  } catch (error) {
    console.error(error);
    return <div className="p-8 text-center text-red-500">Failed to load collaboration. It might have been deleted or you don't have access.</div>;
  }
}
