import { ObjectId } from "mongodb";

export interface TodosInterface {
  _id?: ObjectId;
  content: string;
  date: string;
  time: string;
  state: string;
  isCompleted: boolean;
  userId?: ObjectId;
}
