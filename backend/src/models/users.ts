import { Error } from "./../interfaces/errorInterface";
import { NextFunction } from "express";
import { closeMongoConnection, connectToMongo } from "./../database.js";
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
}
export interface UserInterface {
  username?: string;
  password?: string;
  country?: string;
  email?: string;
  phone?: string;
  gender?: string;
  image?: any;
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
    const db = await connectToMongo();

    return await db.collection("users").findOne({ email });
  }

  async createUser(userData: UserInterface) {
    if (!(await User.checkEmail(userData.email as string))) {
      const db = await connectToMongo();

      const collection = db.collection("users");
      const password = await User.hashPass(userData.password as string);

      const res = await collection.insertOne({
        ...userData,
        password,
      });
      // closeMongoConnection();
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
        // closeMongoConnection();
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
    // closeMongoConnection();
    return res;
  }

  async clear(userId: ObjectId) {
    const db = await connectToMongo();
    const collection = db.collection("todos");
    const res = await collection.deleteMany({ userId: new ObjectId(userId) });
    // closeMongoConnection();
    return res;
  }

  async getUser(userId: ObjectId, next: NextFunction) {
    try {
      const db = await connectToMongo();
      const collection = db.collection("users");
      console.log({ userId });
      const res = await collection.findOne({ _id: new ObjectId(userId) });
      console.log("get 1");
      // closeMongoConnection();
      return res;
    } catch (err) {
      console.log("get 2");

      // closeMongoConnection();
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
        const db = await connectToMongo();
        const collection = db.collection("users");
        if (obj.image && obj.image.fileId) {
          const filesCollection = db.collection("fs.files");
          const file = await filesCollection.findOne({
            _id: new ObjectId(obj.image.fileId),
          });

          console.log({ file });
          // Add the file data to the user update
          // obj.image.data = file;
        }

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
    { state, time, content }: { state: string; time: string; content: string }
  ) {
    if (ObjectId.isValid(userId)) {
      console.log("id valid");

      try {
        const notificationObj: notificationInterface = {
          state,
          time,
          content,
          _id: new ObjectId(),
          isRead: false,
        };
        const db = await connectToMongo();
        const collection = db.collection("users");
        const result = await collection.findOneAndUpdate(
          { _id: new ObjectId(userId) },
          {
            $push: {
              notification: notificationObj,
            } as any,
          },
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

  //look at projection in this fn then delete this fn
  async getNotification(userId: string) {
    if (ObjectId.isValid(userId)) {
      try {
        const db = await connectToMongo();
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

  async deleteNotification(userId: string, notificationId: string) {
    if (ObjectId.isValid(userId)) {
      try {
        const notificationObj = {
          _id: new ObjectId(notificationId),
        };
        const db = await connectToMongo();
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

        // closeMongoConnection();
        return result;
      } catch (err) {
        throw new Error("can't update this user");
      }
    } else {
      return "wrong id";
    }
  }

  async markasReadNotification(userId: string, notificationId: string) {
    console.log({ userId, notificationId });
    if (ObjectId.isValid(userId)) {
      try {
        const db = await connectToMongo();
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
}

const userModel = new User();

export default userModel;
