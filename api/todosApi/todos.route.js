import express from "express";
import TodosCtrl from "./todos.controller.js";

const router = express.Router();

router.route("/").get(TodosCtrl.apiGetTodos);
router.route("/new").post(TodosCtrl.apiAddTodo);
router
  .route("/:id")
  .get(TodosCtrl.apiGetTodoById)
  .patch(TodosCtrl.apiEditTodo)
  .delete(TodosCtrl.apiDeleteTodo);

export default router;
