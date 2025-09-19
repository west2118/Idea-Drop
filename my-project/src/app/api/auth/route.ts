import dbConnect from "@/lib/db";
import { adminAuth } from "@/lib/firebaseAdmin";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, firstName, lastName } = await req.json();

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    await dbConnect();

    const user = await User.findOneAndUpdate(
      {
        uid: decoded.uid,
      },
      {
        uid: decoded.uid,
        email: decoded.email,
        firstName,
        lastName,
      },
      {
        upsert: true,
        new: true,
      }
    );

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
