import dbConnect from "@/lib/db";
import { verifyToken } from "@/middleware/verifyToken";
import Favorite from "@/models/favorite.model";
import Idea from "@/models/idea.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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

    const ideas = await Idea.countDocuments({ user_id: user._id });

    const favorites = await Favorite.countDocuments({ user_id: user._id });

    return NextResponse.json({ ideas, favorites }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
