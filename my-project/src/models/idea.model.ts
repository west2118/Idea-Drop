import mongoose, { model, models, Schema } from "mongoose";

const IdeaSchema = new Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    categories: { type: [String], required: true },
    attachment: { type: String },
    visibility: {
      type: String,
      enum: ["public", "private", "only me"],
      required: true,
    },
    tags: { type: [String], required: true },
    content: {
      description: { type: String, required: true },
      works: { type: String, required: true },
      benefits: { type: String, required: true },
      conclusion: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Idea = models.Idea || model("Idea", IdeaSchema);

export default Idea;
