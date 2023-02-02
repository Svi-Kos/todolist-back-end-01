import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import todos from "./api/todosApi/todos.route.js";
import users from "./api/usersApi/users.route.js";

dotenv.config();
const { PORT = 4000, DB_HOST } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/todos", todos);
app.use("/api/v1/users", users);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
app.use((err, _, res, __) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ error: message });
});

await mongoose
  .set("strictQuery", false)
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
