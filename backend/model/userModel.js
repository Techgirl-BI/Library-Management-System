import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,  
      min: 6,
      max: 12,
      required: [true, "please provide the username"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "please provide the email"],
    },
    role: {
      type: String,
      enum: ["regular", "admin"],
      default: "regular",
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema)
export default User