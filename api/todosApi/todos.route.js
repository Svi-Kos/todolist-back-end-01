import express from "express";
import TodosCtrl from "./todos.controller.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();

router.route("/").get(authenticate, TodosCtrl.apiGetTodos);
router.route("/new").post(authenticate, TodosCtrl.apiAddTodo);
router
  .route("/:id")
  .get(TodosCtrl.apiGetTodoById)
  .patch(authenticate, TodosCtrl.apiEditTodo)
  .delete(authenticate, TodosCtrl.apiDeleteTodo);

export default router;
