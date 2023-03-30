import { MongoClient, Db } from "mongodb";
import { MongoDB_URL } from "./config.js";
const client = new MongoClient(MongoDB_URL!);

export let db: Db;

export const connectToMongo = async () => {
  try {
    await client.connect();
    console.log("connected to mongodb");
    db = client.db("todo");
    return db;
  } catch (err) {
    throw new Error("failed to connect to db ");
  }
};

export const closeMongoConnection = async () => {
  await client.close();
  console.log("MongoDB connection closed");
};
