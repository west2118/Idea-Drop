import dbConnect from "@/lib/db";
import { verifyToken } from "@/middleware/verifyToken";
import Idea from "@/models/idea.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, categories, attachment, visibility, tags, content } =
    await req.json();
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

    const newIdea = await Idea.create({
      user_id: user._id,
      title,
      categories,
      attachment,
      visibility,
      tags,
      content,
    });

    return NextResponse.json(
      { message: "Idea posted successfully!", newIdea },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
