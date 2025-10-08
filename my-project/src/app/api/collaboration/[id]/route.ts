import dbConnect from "@/lib/db";
import { verifyToken } from "@/middleware/verifyToken";
import Collaboration from "@/models/collaboration.model";
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

    const collaboration = await Collaboration.findById(id).populate(
      "idea_id",
      "title"
    );
    if (!collaboration) {
      return NextResponse.json(
        { message: "Collaboration didn't exist" },
        { status: 400 }
      );
    }

    return NextResponse.json({ collaboration }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
