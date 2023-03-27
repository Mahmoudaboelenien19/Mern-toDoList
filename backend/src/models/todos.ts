import { NextFunction } from "express";
import { ObjectId } from "mongodb";
import { TodosInterface } from "../interfaces/todoInterface";
import { db } from "./../database.js";

class Todos {
  async create(todo: TodosInterface, userId: ObjectId) {
    if (ObjectId.isValid(userId)) {
      try {
        const collection = db.collection("todos");
        const result = await collection.insertOne({
          ...todo,
          userId: new ObjectId(userId),
        });

        return result;
      } catch (err) {
        throw new Error("can't create this todo");
      }
    } else {
      return "wrong id";
    }
  }

  async delete(todoId: string) {
    if (ObjectId.isValid(todoId)) {
      try {
        const collection = db.collection("todos");
        const result = await collection.findOneAndDelete({
          _id: new ObjectId(todoId),
        });
        setTimeout(() => {}, 1000);
        return result;
      } catch (err) {
        throw new Error("can't create this todo");
      }
    } else {
      return "wrong id";
    }
  }

  async update(todo: TodosInterface, todoId: string) {
    if (ObjectId.isValid(todoId)) {
      try {
        const collection = db.collection("todos");
        const result = await collection.findOneAndUpdate(
          { _id: new ObjectId(todoId) },
          { $set: todo },
          { returnDocument: "after" }
        );

        return result;
      } catch (err) {
        throw new Error("can't update this todo");
      }
    } else {
      return "wrong id";
    }
  }

  async getOne(todoId: ObjectId) {
    if (ObjectId.isValid(todoId)) {
      try {
        const collection = db.collection("todos");
        const result = await collection.findOne({
          _id: new ObjectId(todoId),
        });

        return result;
      } catch (err) {
        throw new Error("can't get this todo");
      }
    } else {
      return "wrong id";
    }
  }
}

const todoModel = new Todos();
export default todoModel;
