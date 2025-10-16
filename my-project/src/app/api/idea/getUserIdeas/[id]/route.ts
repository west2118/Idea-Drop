import dbConnect from "@/lib/db";
import { verifyToken } from "@/middleware/verifyToken";
import Idea from "@/models/idea.model";
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

  const { searchParams } = new URL(req.url);

  try {
    await dbConnect();

    const user = await User.findOne({ uid: decoded.uid });
    if (!user) {
      return NextResponse.json(
        { message: "User didn't exist" },
        { status: 400 }
      );
    }

    const ideas = await Idea.find({ user_id: id });

    return NextResponse.json(
      {
        ideas,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
