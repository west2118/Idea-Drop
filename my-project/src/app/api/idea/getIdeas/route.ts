import dbConnect from "@/lib/db";
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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const skip = (page - 1) * limit;
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { tags: { $regex: tag, $options: "i" } },
        { categories: { $regex: category, $options: "i" } },
      ];
    }

    const total = await Idea.countDocuments(query);

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

    return NextResponse.json(
      {
        ideas: ideasWithCount,
        page,
        total,
        totalPages: Math.ceil(total / limit),
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
