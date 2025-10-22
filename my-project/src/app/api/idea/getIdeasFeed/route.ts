import dbConnect from "@/lib/db";
import { applyCategoryTagFilters, parseAndBuildQuery } from "@/lib/queryUtils";
import { verifyToken } from "@/middleware/verifyToken";
import Comment from "@/models/comment.model";
import Idea from "@/models/idea.model";
import Reaction from "@/models/reaction.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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

    const tab = searchParams.get("tab");

    const ideas = await Idea.find({}).populate("user_id", "firstName lastName");

    const ideasWithCount = await Promise.all(
      ideas.map(async (idea) => {
        const commentCount = await Comment.countDocuments({ ideaId: idea._id });
        const reactionCount = await Reaction.countDocuments({
          ideaId: idea._id,
        });

        return {
          ...idea.toObject(),
          commentCount,
          reactionCount,
        };
      })
    );

    let items;

    if (tab === "Latest") {
      items = ideasWithCount.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (tab === "Trending") {
      items = ideasWithCount.sort((a, b) => b.reactionCount - a.reactionCount);
    } else {
      items = ideasWithCount;
    }

    items = items.slice(0, 8);

    return NextResponse.json(
      {
        items,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
