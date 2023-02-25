import { NextFunction } from "express";
import { ObjectId } from "mongodb";
import { connectToMongo, closeMongoConnection } from "./../database";
import { TodosInterface } from "./users";

class Todos {
  async create(todo: TodosInterface, id: string, next: NextFunction) {
    if (ObjectId.isValid(id)) {
      try {
        const db = await connectToMongo();
        const collection = db.collection("users");
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $push: { todos: todo } }
        );

        closeMongoConnection();
        return result;
      } catch (err) {
        throw new Error("can't create this todo");
      }
    } else {
      return "wrong id";
    }
  }

  async update(
    todo: TodosInterface,
    userId: string,
    todoId: string,
    next: NextFunction
  ) {
    if (ObjectId.isValid(userId) && ObjectId.isValid(todoId)) {
      try {
        const db = await connectToMongo();
        const collection = db.collection("users");
        const result = await collection.updateOne(
          { _id: new ObjectId(userId), "todos._id": new ObjectId(todoId) },
          { $set: { "todos.$": { ...todo, _id: new ObjectId(todoId) } } }
        );

        closeMongoConnection();
        return result;
      } catch (err) {
        throw new Error("can't update this todo");
      }
    } else {
      return "wrong id";
    }
  }
}

const todoModel = new Todos();
export default todoModel;
