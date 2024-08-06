import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      unique: true,
      required: [true, "clerk user id is required"],
    },
    emailAddress: {
      type: String,
      required: [true, "email address is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
