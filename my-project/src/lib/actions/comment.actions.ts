/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import dbConnect from "@/lib/db";
import { getAuthUser } from "./auth.actions";
import Comment from "@/models/comment.model";
import { revalidatePath } from "next/cache";

export async function getComments(ideaId: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  const comments = await Comment.find({ ideaId }).populate("user", "firstName lastName").lean() as any[];

  const commentMap: Record<string, any> = {};
  comments.forEach(
    (c) => (commentMap[c._id.toString()] = { 
      ...c, 
      _id: c._id.toString(), 
      user: c.user ? { ...c.user, _id: c.user._id.toString() } : null,
      replies: [] 
    })
  );

  const rootComments: any[] = [];
  comments.forEach((c) => {
    if (c.parentId) {
      const parentId = c.parentId.toString();
      commentMap[parentId]?.replies?.push(commentMap[c._id.toString()]);
    } else {
      rootComments.push(commentMap[c._id.toString()]);
    }
  });

  return JSON.parse(JSON.stringify({ rootComments }));
}

export async function postComment(data: { ideaId: string, content: string, parentId?: string | null }) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  const newComment = await Comment.create({
    user: user._id,
    userName: `${(user as any).firstName || ""} ${(user as any).lastName || ""}`.trim() || "Anonymous",
    ideaId: data.ideaId,
    text: data.content,
    parentId: data.parentId || null,
  });

  revalidatePath(`/idea/details/${data.ideaId}`);
  
  return { success: true, newComment: JSON.parse(JSON.stringify(newComment)) };
}
