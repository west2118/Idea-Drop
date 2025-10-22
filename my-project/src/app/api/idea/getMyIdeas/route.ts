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

  try {
    await dbConnect();

    const user = await User.findOne({ uid: decoded.uid });
    if (!user) {
      return NextResponse.json(
        { message: "User didn't exist" },
        { status: 400 }
      );
    }

    const { page, limit, skip, search, category, tag } =
      parseAndBuildQuery(req);

    const query: any = { user_id: user._id };
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }

    const ideas = await Idea.find(query)
      .skip(skip)
      .limit(limit)
      .populate("user_id", "firstName lastName");

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

    const filteredIdeas = applyCategoryTagFilters(ideasWithCount, {
      category,
      tag,
    });

    return NextResponse.json(
      {
        items: filteredIdeas,
        page,
        total: filteredIdeas.length,
        totalPages: Math.ceil(filteredIdeas.length / limit),
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
