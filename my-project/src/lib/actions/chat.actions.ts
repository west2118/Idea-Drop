"use server";

import dbConnect from "@/lib/db";
import { getAuthUser } from "./auth.actions";
import Chat from "@/models/chat.model";
import Collaboration from "@/models/collaboration.model";
import Idea from "@/models/idea.model";
import User from "@/models/user.model";
import { revalidatePath } from "next/cache";

export async function getChatsByCollaborationId(collaboration_id: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  // Fetch chats ordered by creation time ascending
  const chats = await Chat.find({ collaboration_id }).populate("sender", "firstName lastName").sort({ createdAt: 1 }).lean();
  return JSON.parse(JSON.stringify(chats));
}

export async function createChat(data: { collaboration_id: string, text: string }) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  const newChat = await Chat.create({
    collaboration_id: data.collaboration_id,
    sender: user._id,
    text: data.text,
  });

  // Populate sender info to return back so the UI can display it
  await newChat.populate("sender", "firstName lastName");

  revalidatePath(`/collaboration/${data.collaboration_id}`);
  return JSON.parse(JSON.stringify(newChat));
}
