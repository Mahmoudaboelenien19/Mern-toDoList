import { Error } from "./../interfaces/errorInterface";
import { NextFunction } from "express";
import { db } from "./../database.js";
import bcrypt from "bcrypt";
import { BCRYPT_PASS, REFRESH_TOKEN_SECRET, SALT } from "../config.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

interface notificationInterface {
  _id?: ObjectId;
  state: string;
  time: string;
  isRead: boolean;
  content: string;
  count: number;
}

export interface imgInterface {
  imageName: string;
  imagePath: string;
}
export interface UserInterface {
  username?: string;
  password?: string;
  country?: string;
  email?: string;
  phone?: string;
  gender?: string;
  image?: imgInterface;
  notification?: notificationInterface[];
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
    // const db = await connectToMongo();

    return await db.collection("users").findOne({ email });
  }

  async createUser(userData: UserInterface) {
    if (!(await User.checkEmail(userData.email as string))) {
      const collection = db.collection("users");
      const password = await User.hashPass(userData.password as string);

      const res = await collection.insertOne({
        ...userData,
        password,
      });
      return res;
    } else {
      throw new Error("user is already exist");
    }
  }

  async authenticate(user: UserData, next: NextFunction) {
    const result = await db.collection("users").findOne({ email: user.email });
    console.log({ result });
    if (result) {
      const check = await bcrypt.compare(
        user.password + BCRYPT_PASS,
        result.password
      );
      if (check) {
        return { ...user, id: result._id };
      } else {
        const err: Error = new Error("Wrong password");
        err.status = 401;
        throw err;
      }
    } else {
      const err: Error = new Error("this user isn't regesitered ..!");
      err.status = 404;
      throw err;
    }
  }

  async getAllToDos(userId: ObjectId) {
    const collection = db.collection("todos");
    const res = await collection
      .find({ userId: new ObjectId(userId) })
      .toArray();
    return res;
  }

  async clear(userId: ObjectId) {
    const collection = db.collection("todos");
    const res = await collection.deleteMany({ userId: new ObjectId(userId) });
    return res;
  }

  async getUser(userId: ObjectId, next: NextFunction) {
    try {
      const collection = db.collection("users");
      console.log({ userId });
      const res = await collection.findOne({ _id: new ObjectId(userId) });
      console.log("get 1");
      return res;
    } catch (err) {
      console.log("get 2");
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

  async update(obj: UserInterface, userId: string) {
    if (ObjectId.isValid(userId)) {
      try {
        // const db = await connectToMongo();
        const collection = db.collection("users");

        const result = await collection.findOneAndUpdate(
          { _id: new ObjectId(userId) },
          { $set: obj },
          { returnDocument: "after" }
        );

        // closeMongoConnection();
        return result;
      } catch (err) {
        throw new Error("can't update this user");
      }
    } else {
      return "wrong id";
    }
  }

  async addNotification(
    userId: string,
    {
      state,
      time,
      content,
      count,
    }: { count: number; state: string; time: string; content: string }
  ) {
    if (ObjectId.isValid(userId)) {
      try {
        const notificationObj: notificationInterface = {
          state,
          time,
          content,
          _id: new ObjectId(),
          isRead: false,
          count: count || 0,
        };
        const collection = db.collection("users");
        const result = await collection.findOneAndUpdate(
          { _id: new ObjectId(userId) },
          {
            $push: {
              notification: notificationObj,
            } as any,
            $inc: { count: +1 },
          },
          { returnDocument: "after" }
        );

        return result;
      } catch (err) {
        throw new Error("can't update this user");
      }
    } else {
      return "wrong id";
    }
  }

  //look at projection in this fn then delete this fn
  async getNotification(userId: string) {
    if (ObjectId.isValid(userId)) {
      try {
        // const db = await connectToMongo();
        const collection = db.collection("users");
        const result = await collection
          .find(
            { _id: new ObjectId(userId) },
            { projection: { notification: 1 } }
          )
          .toArray();

        // closeMongoConnection();
        return result;
      } catch (err) {
        throw new Error("can't update this user");
      }
    } else {
      return "wrong id";
    }
  }

  async resetNotification(userId: string) {
    if (ObjectId.isValid(userId)) {
      try {
        const collection = db.collection("users");
        const result = await collection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { count: 0 } }
        );

        return result;
      } catch (err) {
        throw new Error("can't update this user");
      }
    } else {
      return "wrong id";
    }
  }

  async deleteNotification(userId: string, notificationId: string) {
    if (ObjectId.isValid(userId)) {
      try {
        const notificationObj = {
          _id: new ObjectId(notificationId),
        };
        // const db = await connectToMongo();
        const collection = db.collection("users");
        const result = await collection.findOneAndUpdate(
          { _id: new ObjectId(userId) },
          {
            $pull: {
              notification: notificationObj,
            } as any,
          },
          { returnDocument: "after" }
        );

        return result;
      } catch (err) {
        throw new Error("can't update this user");
      }
    } else {
      return "wrong id";
    }
  }

  async markALlNotificationsAsRead(userId: string) {
    if (ObjectId.isValid(userId)) {
      try {
        const collection = db.collection("users");
        const result = await collection.findOneAndUpdate(
          { _id: new ObjectId(userId) },
          {
            $set: {
              "notification.$[].isRead": true,
            } as any,
          }
        );

        return result;
      } catch (err) {
        throw new Error("can't update this user");
      }
    } else {
      return "wrong id";
    }
  }

  async markasReadNotification(userId: string, notificationId: string) {
    if (ObjectId.isValid(userId)) {
      try {
        const collection = db.collection("users");
        const result = await collection.findOneAndUpdate(
          {
            _id: new ObjectId(userId),
            "notification._id": new ObjectId(notificationId),
          },
          {
            $set: {
              "notification.$.isRead": true,
            },
          } as any,

          { returnDocument: "after" }
        );

        // closeMongoConnection();
        return result;
      } catch (err) {
        throw new Error("can't update this user");
      }
    } else {
      return "wrong id";
    }
  }

  async updatImage(userId: string, imgObj: imgInterface) {
    try {
      const result = await db
        .collection("users")
        .updateOne({ _id: new ObjectId(userId) }, { $set: { image: imgObj } });
      return result;
    } catch (err) {
      throw new Error("can't update this user");
    }
  }
}

const userModel = new User();

export default userModel;
