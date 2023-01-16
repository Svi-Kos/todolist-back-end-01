import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import todos from "./api/todos.route.js";

dotenv.config();
const { PORT = 3000, DB_HOST } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/todos", todos);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
app.use((err, _, res, __) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ error: message });
});

// app.listen(4000);

await mongoose
  .set("strictQuery", false)
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
