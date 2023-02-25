import { TodosInterface } from "./../models/users.js";
import { NextFunction, Request, Response, Router } from "express";
import todoModel from "../models/todos.js";
import { ObjectId } from "mongodb";

const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("addtodo");
    const todo: TodosInterface = {
      _id: new ObjectId(),
      content: req.body.content,
      date: req.body.date,
      time: req.body.time,
      state: req.body.state,
      iscompleted: req.body.iscompleted,
    };
    const result = await todoModel.create(todo, req.params.id, next);
    if (result !== "wrong id") {
      res.status(200).json({ result, message: "todo added successfully" });
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
      iscompleted: req.body.iscompleted,
    };
    const result = await todoModel.update(
      todo,
      req.params.userid,
      req.params.todoid,
      next
    );
    if (result !== "wrong id") {
      res.status(200).json({ result, message: "todo updated successfully" });
    } else {
      res.status(404).json({ message: result });
    }
  } catch (err) {
    next(err);
  }
};

const todoRoutes = Router();
todoRoutes.route("/user/:id/addtodo").patch(addTodo);
todoRoutes.route("/user/:userid/updatetodo/:todoid").patch(updateTodo);
export default todoRoutes;
