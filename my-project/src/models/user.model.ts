import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "User" },
    firstName: { type: String },
    lastName: { type: String },
    skills: { type: [String] },
    interests: { type: [String] },
    bio: { type: String },
    position: { type: String },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
