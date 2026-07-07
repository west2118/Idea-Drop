"use server";

import dbConnect from "@/lib/db";
import { getAuthUser } from "./auth.actions";
import User from "@/models/user.model";

export async function getUser() {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  // getAuthUser already returns a lean object with stringified _id
  return user;
}

export async function getUserInfo(userId: string) {
  const currentUser = await getAuthUser();
  if (!currentUser) throw new Error("Unauthorized");

  await dbConnect();
  const user = await User.findById(userId).lean() as any;
  if (!user) throw new Error("User not found");

  return { ...user, _id: user._id.toString() };
}
