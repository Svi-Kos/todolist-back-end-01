import Todo from "../models/todo.js";

export default class TodosCtrl {
  static async apiGetTodos(_, res, next) {
    try {
      const result = await Todo.find({});
      res.json({
        status: "success",
        code: 200,
        result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async apiGetTodoById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Todo.findById(id);

      if (!result) {
        res.status(404).json({ error: "not found" });
        return;
      }

      res.json({
        status: "success",
        code: 200,
        result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async apiAddTodo(req, res, next) {
    try {
      const result = await Todo.create(req.body);

      res.status(201).json({
        status: "success",
        code: 201,
        result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async apiEditTodo(req, res, next) {
    try {
      const { id } = req.params;

      const result = await Todo.findByIdAndUpdate(id, req.body, { new: true });

      res.status(201).json({
        status: "success",
        code: 200,
        result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async apiDeleteTodo(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Todo.findByIdAndRemove(id);
      if (!result) {
        res.status(404).json({ error: "not found" });
        return;
      }

      res.status(204).json({ status: "deleted success" });
    } catch (e) {
      next(e);
    }
  }
}
