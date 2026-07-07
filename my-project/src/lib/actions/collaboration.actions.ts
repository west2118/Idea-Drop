/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import dbConnect from "@/lib/db";
import { getAuthUser } from "./auth.actions";
import Collaboration from "@/models/collaboration.model";
import Idea from "@/models/idea.model";
import User from "@/models/user.model";
import Task from "@/models/task.model";
import { revalidatePath } from "next/cache";

export async function getMyCollaborations() {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  const collaborations = await Collaboration.find({
    $or: [{ owner: user._id }, { "collaborations.user": user._id }],
  })
    .populate({
      path: "idea_id",
      populate: { path: "user_id", select: "firstName lastName" }
    })
    .populate("owner", "firstName lastName")
    .populate("collaborations.user", "firstName lastName")
    .lean();

  for (const collab of collaborations) {
    const tasks = await Task.find({ collaboration_id: collab._id }).lean();
    const validTasks = tasks.filter((t: any) => t.status !== "Cancelled");
    const completedTasks = validTasks.filter((t: any) => t.status === "Completed").length;
    (collab as any).progressPercent = validTasks.length > 0 ? Math.round((completedTasks / validTasks.length) * 100) : 0;
  }

  return JSON.parse(JSON.stringify({ items: collaborations }));
}

export async function getUserCollaborations(userId: string) {
  const currentUser = await getAuthUser();
  if (!currentUser) throw new Error("Unauthorized");

  await dbConnect();

  const collaborations = await Collaboration.find({
    $or: [{ owner: userId }, { "collaborations.user": userId }],
  })
    .populate({
      path: "idea_id",
      populate: { path: "user_id", select: "firstName lastName" }
    })
    .populate("owner", "firstName lastName")
    .populate("collaborations.user", "firstName lastName")
    .lean();

  for (const collab of collaborations) {
    const tasks = await Task.find({ collaboration_id: collab._id }).lean();
    const validTasks = tasks.filter((t: any) => t.status !== "Cancelled");
    const completedTasks = validTasks.filter((t: any) => t.status === "Completed").length;
    (collab as any).progressPercent = validTasks.length > 0 ? Math.round((completedTasks / validTasks.length) * 100) : 0;
  }

  return JSON.parse(JSON.stringify({ items: collaborations }));
}

export async function getCollaborationById(id: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  const collaboration = await Collaboration.findById(id)
    .populate({
      path: "idea_id",
      populate: { path: "user_id", select: "firstName lastName" }
    })
    .populate("owner", "firstName lastName")
    .populate("collaborations.user", "firstName lastName")
    .populate("requests.user", "firstName lastName position skills bio createdAt email")
    .lean() as any;

  if (!collaboration) throw new Error("Collaboration not found");

  return JSON.parse(JSON.stringify(collaboration));
}

export async function postCollaboration(data: { idea_id: string, lookingFor: string[], notes: string }) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  const existingCollaboration = await Collaboration.findOne({
    idea_id: data.idea_id,
    owner: user._id,
  });
  if (existingCollaboration) {
    throw new Error("Collaboration already exist for this idea");
  }

  const collaboration = await Collaboration.create({
    idea_id: data.idea_id,
    owner: user._id,
    lookingFor: data.lookingFor,
    notes: data.notes,
  });

  const newCollab = await Collaboration.findByIdAndUpdate(
    collaboration._id,
    { $push: { collaborations: { user: user._id, role: "owner" } } },
    { new: true }
  );

  revalidatePath("/collaborations");
  revalidatePath(`/idea/details/${data.idea_id}`);
  return { success: true, newCollaboration: JSON.parse(JSON.stringify(newCollab)) };
}

export async function updateCollaborationRequest(collabId: string, requestId: string, action: "accepted" | "declined") {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  
  const collab = await Collaboration.findById(collabId);
  if (!collab) throw new Error("Collaboration not found");

  const request = collab.requests.id(requestId);
  if (!request) throw new Error("Request not found");

  request.status = action;

  if (action === "accepted") {
    const isAlreadyMember = collab.collaborations.some((c: any) => c.user.toString() === request.user.toString());
    if (!isAlreadyMember) {
      collab.collaborations.push({ user: request.user, role: "collaborator" });
    }
  }

  await collab.save();

  revalidatePath("/collaborations");
  revalidatePath(`/collaboration/${collabId}`);
  
  return { success: true };
}

export async function requestCollaboration(data: { idea_id: string, message: string }) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  const newRequest = await Collaboration.findOneAndUpdate(
    { idea_id: data.idea_id },
    {
      $push: {
        requests: {
          user: user._id,
          message: data.message,
        },
      },
    },
    { new: true, upsert: true }
  );

  revalidatePath(`/idea/details/${data.idea_id}`);
  return { success: true, message: "Collaboration requested successfully!" };
}

export async function cancelCollaborationRequest(idea_id: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  await Collaboration.findOneAndUpdate(
    { idea_id },
    {
      $pull: {
        requests: { user: user._id },
      },
    }
  );

  revalidatePath(`/idea/details/${idea_id}`);
  return { success: true, message: "Collaboration request cancelled!" };
}

export async function updateCollaborationStatus(collabId: string, newStatus: "active" | "completed" | "cancelled") {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  const collab = await Collaboration.findById(collabId);
  if (!collab) throw new Error("Collaboration not found");

  if (collab.owner.toString() !== user._id) {
    throw new Error("Only the owner can update the status");
  }

  collab.status = newStatus;
  await collab.save();

  revalidatePath("/collaborations");
  revalidatePath(`/collaboration/${collabId}`);
  
  return { success: true, message: "Collaboration status updated" };
}
