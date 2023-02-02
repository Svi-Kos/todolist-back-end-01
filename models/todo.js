import { Schema, Types, model, version } from "mongoose";

const todoSchema = Schema(
  {
    text: {
      type: String,
      required: [true, "Set text for todo"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    important: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Todo = model("todo", todoSchema);

export default Todo;
