import mongoose, { model, models, Schema } from "mongoose";

const ReactionSchema = new Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    idea_id: { type: mongoose.Types.ObjectId, ref: "Idea", required: true },
  },
  { timestamps: true }
);

const Reaction = models.Reaction || model("Reaction", ReactionSchema);

export default Reaction;
