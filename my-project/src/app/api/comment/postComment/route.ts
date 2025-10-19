import dbConnect from "@/lib/db";
import { verifyToken } from "@/middleware/verifyToken";
import Collaboration from "@/models/collaboration.model";
import Comment from "@/models/comment.model";
import Idea from "@/models/idea.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { ideaId, text, parentId } = await req.json();
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

    const comment = await Comment.create({
      ideaId,
      user: user._id,
      text,
      userName: `${user.firstName} ${user.lastName}`,
      parentId: parentId || null,
    });

    return NextResponse.json(
      { message: "Comment Posted Successfully!", comment },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
