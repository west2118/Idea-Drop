/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import dbConnect from "@/lib/db";
import { getAuthUser } from "./auth.actions";
import Idea from "@/models/idea.model";
import Comment from "@/models/comment.model";
import Reaction from "@/models/reaction.model";
import Favorite from "@/models/favorite.model";
import Collaboration from "@/models/collaboration.model";
import { revalidatePath } from "next/cache";

export async function getIdeasFeed(tab: string | null = "Latest") {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  const ideas = await Idea.find({}).populate("user_id", "firstName lastName").lean();

  const ideasWithCount = await Promise.all(
    ideas.map(async (idea: any) => {
      const commentCount = await Comment.countDocuments({ ideaId: idea._id });
      const reactionCount = await Reaction.countDocuments({ ideaId: idea._id });
      return {
        ...idea,
        _id: idea._id.toString(),
        user_id: { ...idea.user_id, _id: idea.user_id._id.toString() },
        commentCount,
        reactionCount,
      };
    })
  );

  let items = ideasWithCount;
  if (tab === "Latest") {
    items = ideasWithCount.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (tab === "Trending") {
    items = ideasWithCount.sort((a, b) => b.reactionCount - a.reactionCount);
  }
  
  return JSON.parse(JSON.stringify({ items: items.slice(0, 8) }));
}

export async function getIdeas(searchStr?: string, filterTab?: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  
  const query: any = {};
  if (searchStr) {
    query.title = { $regex: searchStr, $options: "i" };
  }

  const ideas = await Idea.find(query).populate("user_id", "firstName lastName").lean();

  const ideasWithCount = await Promise.all(
    ideas.map(async (idea: any) => {
      const commentCount = await Comment.countDocuments({ ideaId: idea._id });
      const reactionCount = await Reaction.countDocuments({ ideaId: idea._id });
      return {
        ...idea,
        _id: idea._id.toString(),
        user_id: { ...idea.user_id, _id: idea.user_id._id.toString() },
        commentCount,
        reactionCount,
      };
    })
  );

  let items = ideasWithCount;
  if (filterTab === "Latest") {
    items = ideasWithCount.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (filterTab === "Trending") {
    items = ideasWithCount.sort((a, b) => b.reactionCount - a.reactionCount);
  }

  return JSON.parse(JSON.stringify({ items }));
}

export async function postIdea(data: { title: string, categories: string[], attachment?: string, visibility: string, tags: string[], content: string }) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  const newIdeaData: any = {
    user_id: user._id,
    ...data
  };

  const newIdea = await Idea.create(newIdeaData);
  revalidatePath("/dashboard");
  revalidatePath("/ideas");
  
  return { success: true, newIdea: JSON.parse(JSON.stringify(newIdea)) };
}

export async function getIdeaById(id: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  const idea = await Idea.findById(id).populate("user_id", "firstName lastName bio position").lean() as any;
  if (!idea) throw new Error("Idea not found");

  const [collaboration, ownerTotalIdeas, relatedIdeas, isFavorited, isReacted, reactions] = await Promise.all([
    Collaboration.findOne({ idea_id: id }).lean(),
    Idea.countDocuments({ user_id: idea.user_id._id }),
    Idea.find({ _id: { $ne: id }, tags: { $in: idea.tags }, categories: { $in: idea.categories } }).limit(3).lean(),
    Favorite.exists({ user_id: user._id, idea_id: id }),
    Reaction.exists({ user_id: user._id, ideaId: id }),
    Reaction.countDocuments({ ideaId: id })
  ]);
  
  const result = {
    idea: { ...idea, _id: idea._id.toString(), user_id: { ...idea.user_id, _id: idea.user_id._id.toString() } },
    isFavorited: !!isFavorited,
    isReacted: !!isReacted,
    reactions,
    ownerTotalIdeas,
    relatedIdeas: relatedIdeas.map((ri: any) => ({ ...ri, _id: ri._id.toString(), user_id: ri.user_id.toString() })),
    collaboration: collaboration ? { ...collaboration, _id: (collaboration as any)._id.toString() } : null
  };

  return JSON.parse(JSON.stringify(result));
}

export async function getIdeaFavoriteCount() {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  const ideas = await Idea.countDocuments({ user_id: user._id });
  const favorites = await Favorite.countDocuments({ user_id: user._id });

  return { ideas, favorites };
}

export async function getMyIdeas() {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  const ideas = await Idea.find({ user_id: user._id }).populate("user_id", "firstName lastName").lean();

  const items = await Promise.all(
    ideas.map(async (idea: any) => {
      const commentCount = await Comment.countDocuments({ ideaId: idea._id });
      const reactionCount = await Reaction.countDocuments({ ideaId: idea._id });
      return {
        ...idea,
        _id: idea._id.toString(),
        user_id: { ...idea.user_id, _id: idea.user_id._id.toString() },
        commentCount,
        reactionCount,
      };
    })
  );

  return JSON.parse(JSON.stringify({ items }));
}

export async function getMyFavorites() {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  const favorites = await Favorite.find({ user_id: user._id }).populate({
    path: "idea_id",
    populate: { path: "user_id", select: "firstName lastName" }
  }).lean();

  const items = await Promise.all(
    favorites.map(async (fav: any) => {
      const idea = fav.idea_id;
      if (!idea) return null;
      const commentCount = await Comment.countDocuments({ ideaId: idea._id });
      const reactionCount = await Reaction.countDocuments({ ideaId: idea._id });
      return {
        ...idea,
        _id: idea._id.toString(),
        user_id: { ...idea.user_id, _id: idea.user_id._id.toString() },
        commentCount,
        reactionCount,
      };
    })
  );

  return JSON.parse(JSON.stringify({ items: items.filter(Boolean) }));
}

export async function getUserIdeas(userId: string) {
  const currentUser = await getAuthUser();
  if (!currentUser) throw new Error("Unauthorized");

  await dbConnect();
  const ideas = await Idea.find({ user_id: userId }).populate("user_id", "firstName lastName").lean();

  const items = await Promise.all(
    ideas.map(async (idea: any) => {
      const commentCount = await Comment.countDocuments({ ideaId: idea._id });
      const reactionCount = await Reaction.countDocuments({ ideaId: idea._id });
      return {
        ...idea,
        _id: idea._id.toString(),
        user_id: { ...idea.user_id, _id: idea.user_id._id.toString() },
        commentCount,
        reactionCount,
      };
    })
  );

  return JSON.parse(JSON.stringify({ items }));
}

export async function deleteIdea(id: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  await Idea.findByIdAndDelete(id);
  await Comment.deleteMany({ ideaId: id });
  await Reaction.deleteMany({ ideaId: id });
  await Favorite.deleteMany({ ideaId: id });

  revalidatePath("/dashboard");
  revalidatePath("/ideas");
  revalidatePath("/idea/published");

  return { success: true };
}
