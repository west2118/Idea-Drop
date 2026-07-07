"use server";

import dbConnect from "@/lib/db";
import { getAuthUser } from "./auth.actions";
import Reaction from "@/models/reaction.model";
import { revalidatePath } from "next/cache";

export async function addReaction(ideaId: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  const existingReaction = await Reaction.findOne({ user_id: user._id, ideaId });
  if (!existingReaction) {
    await Reaction.create({ user_id: user._id, ideaId });
  }

  revalidatePath(`/idea/details/${ideaId}`);
  revalidatePath("/dashboard");
  revalidatePath("/ideas");
  
  return { success: true };
}

export async function removeReaction(ideaId: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  await Reaction.findOneAndDelete({ user_id: user._id, ideaId });

  revalidatePath(`/idea/details/${ideaId}`);
  revalidatePath("/dashboard");
  revalidatePath("/ideas");
  
  return { success: true };
}

export async function getReactionStatus(ideaId: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  const reaction = await Reaction.findOne({ user_id: user._id, ideaId });
  
  return { isReacted: !!reaction };
}
