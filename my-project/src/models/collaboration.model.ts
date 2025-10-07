import mongoose, { model, models, Schema } from "mongoose";

const CollaborationSchema = new Schema({
  idea_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Idea",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  collaborations: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: {
        type: String,
        enum: ["owner", "collaborator"],
        default: "collaborator",
      },
      joinedAt: { type: Date, default: Date.now },
    },
  ],
  requests: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "declined"],
        default: "pending",
      },
      message: { type: String },
      requestedAt: { type: Date, default: Date.now },
    },
  ],
  lookingFor: { type: [String], required: true },
  notes: { type: String, required: true },
  status: { type: Boolean, default: true },
});

const Collaboration =
  models.Collaboration || model("Collaboration", CollaborationSchema);

export default Collaboration;
