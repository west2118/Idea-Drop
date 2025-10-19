import dbConnect from "@/lib/db";
import { CommentType } from "@/lib/types";
import { verifyToken } from "@/middleware/verifyToken";
import Comment from "@/models/comment.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const result = await verifyToken(req);

  if (!result.success) return result.response;

  const { decoded } = result;

  try {
    await dbConnect();

    const user = await User.findOne({ uid: decoded.uid });
    if (!user) {
      return NextResponse.json(
        { message: "User didn't exist" },
        { status: 400 }
      );
    }

    const comments = (await Comment.find({
      ideaId: id,
    }).lean()) as unknown as CommentType[];

    const commentMap: Record<string, CommentType> = {};
    comments.forEach(
      (c) => (commentMap[c._id.toString()] = { ...c, replies: [] })
    );
    const rootComments: CommentType[] = [];

    comments.forEach((c) => {
      if (c.parentId) {
        const parentId = c.parentId.toString();
        commentMap[parentId]?.replies?.push(commentMap[c._id.toString()]);
      } else {
        rootComments.push(commentMap[c._id.toString()]);
      }
    });

    return NextResponse.json({ rootComments }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
