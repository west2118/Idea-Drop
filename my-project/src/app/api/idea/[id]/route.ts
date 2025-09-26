import dbConnect from "@/lib/db";
import { verifyToken } from "@/middleware/verifyToken";
import Idea from "@/models/idea.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const result = await verifyToken(req);

  if (!result.success) return result.response;

  const { decoded } = result;

  console.log("ID: ", params.id);

  try {
    await dbConnect();

    const user = await User.findOne({ uid: decoded.uid });
    if (!user) {
      return NextResponse.json(
        { message: "User didn't exist" },
        { status: 400 }
      );
    }

    const idea = await Idea.findById(params.id).populate(
      "user_id",
      "firstName lastName"
    );
    if (!idea) {
      return NextResponse.json({ message: "Idea not found" }, { status: 404 });
    }

    console.log("IDEA BACKEND: ", idea);

    return NextResponse.json({ idea }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
