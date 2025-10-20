import { formatDistanceToNow } from "date-fns";
import { CommentType } from "./types";

export const categoryLimit = 2;

export const tagLimit = 5;

export const lookingForLimit = 3;

export const formattedDate = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true });

export const countCommentsAndReplies = (comments: CommentType[]): number => {
  if (!Array.isArray(comments)) return 0;

  let count = 0;

  for (const comment of comments) {
    count++; // count this comment
    if (comment.replies && comment.replies.length > 0) {
      count += countCommentsAndReplies(comment.replies); // recursive call
    }
  }

  return count;
};
