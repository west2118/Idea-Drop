"use server";

import dbConnect from "@/lib/db";
import { getAuthUser } from "./auth.actions";
import Task from "@/models/task.model";
import Collaboration from "@/models/collaboration.model";
import Idea from "@/models/idea.model";
import User from "@/models/user.model";
import { revalidatePath } from "next/cache";

export async function getTasksByCollaborationId(collaboration_id: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();
  const tasks = await Task.find({ collaboration_id }).populate("createdBy", "firstName lastName").lean();
  return JSON.parse(JSON.stringify(tasks));
}

export async function createTask(data: { collaboration_id: string, title: string, description?: string }) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  // Ensure user is part of the collaboration
  const collab = await Collaboration.findById(data.collaboration_id);
  if (!collab) throw new Error("Collaboration not found");
  
  const isMember = collab.owner.toString() === user._id || collab.collaborations.some((c: any) => c.user.toString() === user._id);
  if (!isMember) throw new Error("You are not a member of this collaboration");

  if (collab.status !== "active" && collab.status !== true as any) {
    throw new Error(`Cannot add tasks because this collaboration is ${collab.status}`);
  }

  const newTask = await Task.create({
    ...data,
    createdBy: user._id,
  });

  revalidatePath(`/collaboration/${data.collaboration_id}`);
  return JSON.parse(JSON.stringify(newTask));
}

export async function updateTaskStatus(taskId: string, newStatus: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  await dbConnect();

  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");

  const collab = await Collaboration.findById(task.collaboration_id);
  if (!collab) throw new Error("Collaboration not found");

  const isOwner = collab.owner.toString() === user._id;
  const isTaskCreator = task.createdBy.toString() === user._id;

  if (!isOwner && !isTaskCreator) {
    throw new Error("Only the task creator or the collaboration owner can change the status");
  }

  if (collab.status !== "active" && collab.status !== true as any) {
    throw new Error(`Cannot update tasks because this collaboration is ${collab.status}`);
  }

  task.status = newStatus;
  await task.save();

  revalidatePath(`/collaboration/${task.collaboration_id}`);
  return JSON.parse(JSON.stringify(task));
}
