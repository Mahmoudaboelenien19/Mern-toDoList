import { closeMongoConnection, connectToMongo } from "./../database.js";
import bcrypt from "bcrypt";
import { BCRYPT_PASS, SALT } from "../config.js";
import { ObjectId } from "mongodb";

export interface TodosInterface {
  _id?: ObjectId;
  content: string;
  date: string;
  time: string;
  state: string;
  iscompleted: boolean;
}

export interface UserInterface {
  username: string;
  password: string;
  country: string;
  email: string;
  todos: [] | TodosInterface[];
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

      return res.insertedId;
    } else {
      throw new Error("user is already exist");
    }
  }
}

const userModel = new User();

export default userModel;
