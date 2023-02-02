import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      maxlength: 10,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

export default User;
