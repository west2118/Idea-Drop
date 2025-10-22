import dbConnect from "@/lib/db";
import { applyCategoryTagFilters, parseAndBuildQuery } from "@/lib/queryUtils";
import { verifyToken } from "@/middleware/verifyToken";
import Collaboration from "@/models/collaboration.model";
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

    const { page, limit, skip, search, status } = parseAndBuildQuery(req);

    const query: any = {
      owner: user._id,
    };
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }

    const collaborations = await Collaboration.find(query)
      .skip(skip)
      .limit(limit)
      .populate("idea_id", "title");
    if (!collaborations) {
      return NextResponse.json(
        { message: "Collaboration didn't exist" },
        { status: 400 }
      );
    }

    const filteredCollaborations = applyCategoryTagFilters(collaborations, {
      status,
    });

    return NextResponse.json(
      {
        items: filteredCollaborations,
        page,
        total: filteredCollaborations.length,
        totalPages: Math.ceil(filteredCollaborations.length / limit),
      },
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
