import dbConnect from "@/lib/db";
import { verifyToken } from "@/middleware/verifyToken";
import Collaboration from "@/models/collaboration.model";
import Idea from "@/models/idea.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { idea_id, lookingFor, notes } = await req.json();
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

    const idea = await Idea.findById(idea_id);
    if (!idea) {
      return NextResponse.json(
        { message: "Idea didn't exist" },
        { status: 400 }
      );
    }

    const newCollaboration = await Collaboration.create({
      idea_id,
      owner: user._id,
      lookingFor,
      notes,
    });

    return NextResponse.json(
      { message: "Collaboration created successfully!", newCollaboration },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
