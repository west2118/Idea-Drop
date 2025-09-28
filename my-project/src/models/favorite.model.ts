import mongoose, { model, models, Schema } from "mongoose";

const FavoriteSchema = new Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    idea_id: { type: mongoose.Types.ObjectId, ref: "Idea", required: true },
  },
  { timestamps: true }
);

const Favorite = models.Favorite || model("Favorite", FavoriteSchema);

export default Favorite;
