import { Error } from "./../interfaces/errorInterface";
import { NextFunction } from "express";
import { closeMongoConnection, connectToMongo } from "./../database.js";
import bcrypt from "bcrypt";
import { BCRYPT_PASS, REFRESH_TOKEN_SECRET, SALT } from "../config.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export interface UserInterface {
  username: string;
  password: string;
  country: string;
  email: string;
  phone: string;
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
      if (check) {
        closeMongoConnection();
        return { ...user, id: result._id };
      } else {
        closeMongoConnection();

        const err: Error = new Error("Wrong password");
        err.status = 401;
        throw err;
      }
    } else {
      closeMongoConnection();

      const err: Error = new Error("this user isn't regesitered ..!");
      err.status = 404;
      throw err;
    }
  }

  async getAllToDos(userId: ObjectId) {
    const db = await connectToMongo();
    const collection = db.collection("todos");
    const res = await collection
      .find({ userId: new ObjectId(userId) })
      .toArray();
    closeMongoConnection();
    return res;
  }

  async clear(userId: ObjectId) {
    const db = await connectToMongo();
    const collection = db.collection("todos");
    const res = await collection.deleteMany({ userId: new ObjectId(userId) });
    closeMongoConnection();
    return res;
  }

  async getUser(userId: ObjectId, next: NextFunction) {
    try {
      const db = await connectToMongo();
      const collection = db.collection("users");
      console.log({ userId });
      const res = await collection.findOne({ _id: new ObjectId(userId) });
      console.log("get 1");
      closeMongoConnection();
      return res;
    } catch (err) {
      console.log("get 2");

      closeMongoConnection();
      const error: Error = new Error("this is wring id");
      error.status = 404;
      throw error;
    }
  }

  async verfiyRefToken(refToken: string, next: NextFunction) {
    try {
      const decode = jwt.verify(
        refToken,
        REFRESH_TOKEN_SECRET as unknown as string
      );
      return decode;
    } catch (err) {
      const error: Error = new Error("wrong ref token");
      error.status = 404;
      throw error;
    }
  }
}

const userModel = new User();

export default userModel;
