import { NextFunction } from "express";
import { closeMongoConnection, connectToMongo } from "./../database.js";
import bcrypt from "bcrypt";
import { BCRYPT_PASS, SALT } from "../config.js";
import { ObjectId } from "mongodb";
import { Error } from "../interfaces/errorInterface.js";

export interface UserInterface {
  username: string;
  password: string;
  country: string;
  email: string;
}

export interface UserData {
  email: string;
  password: string;
}

class User {
  static async hashPass(pass: string) {
    return await bcrypt.hash(pass + BCRYPT_PASS, Number(SALT));
  }

  static async checkEmail(email: string) {
    const db = await connectToMongo();

    return await db.collection("users").findOne({ email });
  }

  async createUser(userData: UserInterface) {
    if (!(await User.checkEmail(userData.email))) {
      const db = await connectToMongo();

      const collection = db.collection("users");
      const password = await User.hashPass(userData.password);

      const res = await collection.insertOne({
        ...userData,
        password,
      });
      console.log({ res });
      closeMongoConnection();
      return res;
    } else {
      throw new Error("user is already exist");
    }
  }

  async authenticate(user: UserData, next: NextFunction) {
    const db = await connectToMongo();
    const result = await db.collection("users").findOne({ email: user.email });
    console.log({ result });
    if (result) {
      const check = await bcrypt.compare(
        user.password + BCRYPT_PASS,
        result.password
      );
      closeMongoConnection();
      if (check) {
        return { ...user, id: result._id };
      } else {
        const err: Error = new Error("Wrong password");
        err.status = 401;
        next(err);
      }
    } else {
      const err: Error = new Error("this user isn't regesitered ..!");
      err.status = 404;
      next(err);
      closeMongoConnection();
    }
  }

  async getAllToDos(userId: ObjectId) {
    const db = await connectToMongo();
    const collection = db.collection("todos");
    const res = collection.find({ userId: new ObjectId(userId) }).toArray();
    return res;
  }

  async clear(userId: ObjectId) {
    const db = await connectToMongo();
    const collection = db.collection("todos");
    const res = collection.deleteMany({ userId: new ObjectId(userId) });
    return res;
  }
}

const userModel = new User();

export default userModel;
