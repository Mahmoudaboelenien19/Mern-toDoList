import userModel, { UserInterface } from "./../models/users.js";
import { NextFunction, Request, Response, Router } from "express";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser: UserInterface = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
      todos: [],
    };
    const result = await userModel.createUser(newUser);
    res.status(200).json({ result, message: "user created successfully" });
  } catch (err) {
    next(err);
  }
};

const userRoutes = Router();
userRoutes.route("/user").post(createUser);

export default userRoutes;
