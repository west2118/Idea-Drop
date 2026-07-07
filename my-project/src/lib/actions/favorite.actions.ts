"use server";

import dbConnect from "@/lib/db";
import { getAuthUser } from "./auth.actions";
import Favorite from "@/models/favorite.model";
import { revalidatePath } from "next/cache";

export async function addFavorite(ideaId: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  const existingFavorite = await Favorite.findOne({ user_id: user._id, idea_id: ideaId });
  if (!existingFavorite) {
    await Favorite.create({ user_id: user._id, idea_id: ideaId });
  }

  revalidatePath(`/idea/details/${ideaId}`);
  revalidatePath("/dashboard");
  revalidatePath("/idea/favorites");
  
  return { success: true };
}

export async function removeFavorite(ideaId: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  await Favorite.findOneAndDelete({ user_id: user._id, idea_id: ideaId });

  revalidatePath(`/idea/details/${ideaId}`);
  revalidatePath("/dashboard");
  revalidatePath("/idea/favorites");
  
  return { success: true };
}

export async function getFavoriteStatus(ideaId: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  const favorite = await Favorite.findOne({ user_id: user._id, idea_id: ideaId });
  
  return { isFavorite: !!favorite };
}
