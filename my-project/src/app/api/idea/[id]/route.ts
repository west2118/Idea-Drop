import dbConnect from "@/lib/db";
import { verifyToken } from "@/middleware/verifyToken";
import Collaboration from "@/models/collaboration.model";
import Favorite from "@/models/favorite.model";
import Idea from "@/models/idea.model";
import Reaction from "@/models/reaction.model";
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

    const idea = await Idea.findById(id).populate(
      "user_id",
      "firstName lastName bio position"
    );
    if (!idea) {
      return NextResponse.json({ message: "Idea not found" }, { status: 404 });
    }

    const collaboration = await Collaboration.findOne({
      idea_id: id,
    });

    const ownerTotalIdeas = await Idea.countDocuments({
      user_id: idea?.user_id._id,
    });

    const relatedIdeas = await Idea.find({
      _id: { $ne: id },
      tags: { $in: idea?.tags },
      categories: { $in: idea?.categories },
    }).limit(3);

    const isFavorited = await Favorite.exists({
      user_id: user._id,
      idea_id: id,
    });

    const isReacted = await Reaction.exists({
      user_id: user._id,
      idea_id: id,
    });

    const reactions = await Reaction.countDocuments({
      idea_id: id,
    });

    return NextResponse.json(
      {
        idea,
        isFavorited: !!isFavorited,
        isReacted: !!isReacted,
        reactions,
        ownerTotalIdeas,
        relatedIdeas,
        collaboration,
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
