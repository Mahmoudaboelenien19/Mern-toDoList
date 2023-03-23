import { auth } from "./../middleware/auth.js";
import { NextFunction, Request, Response, Router } from "express";
import todoModel from "../models/todos.js";
import { ObjectId } from "mongodb";
import { TodosInterface } from "../interfaces/todoInterface.js";

const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo: TodosInterface = {
      content: req.body.content,
      date: req.body.date,
      time: req.body.time,
      state: req.body.state,
      isCompleted: req.body.isCompleted,
      remind: "",
    };

    const result = await todoModel.create(
      todo,
      req.params.id as unknown as ObjectId
    );
    if (result !== "wrong id") {
      res.status(200).json({
        todo: { ...todo, _id: result.insertedId, userId: req.params.id },
        message: "todo added successfully",
      });
    } else {
      res.status(404).json({ message: result });
    }
  } catch (err) {
    next(err);
  }
};

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo: TodosInterface = {
      content: req.body.content,
      date: req.body.date,
      time: req.body.time,
      state: req.body.state,
      isCompleted: req.body.isCompleted,
      remind: req.body.remind,
    };
    const result = await todoModel.update(todo, req.params.todoid);
    if (result !== "wrong id") {
      res.status(200).json({
        result,
        message: "todo updated successfully",
      });
    } else {
      res.status(404).json({ message: result });
    }
  } catch (err) {
    next(err);
  }
};

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await todoModel.delete(req.params.todoid);
    if (result !== "wrong id") {
      res.status(200).json({
        id: req.params.todoid,
        message: "todo deleted successfully",
      });
    } else {
      res.status(404).json({ message: result });
    }
  } catch (err) {
    next(err);
  }
};

const getTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await todoModel.getOne(
      req.params.todoid as unknown as ObjectId
    );
    if (result !== "wrong id") {
      res.status(200).json({ result });
    } else {
      res.status(404).json({ message: result });
    }
  } catch (err) {
    next(err);
  }
};

const todoRoutes = Router();
todoRoutes.route("/user/:id/addtodo").post(addTodo);
todoRoutes
  .route("/todo/:todoid")
  .patch(updateTodo)
  .delete(auth, deleteTodo)
  .get(getTodo);
export default todoRoutes;
