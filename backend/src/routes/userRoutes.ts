import userModel, { UserData, UserInterface } from "./../models/users.js";
import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config.js";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser: UserInterface = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
    };
    const result = await userModel.createUser(newUser);
    res
      .status(200)
      .json({ status: 200, result, message: "user created successfully" });
  } catch (err) {
    next(err);
  }
};

const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userModel.getAllToDos(
      req.params.userid as unknown as ObjectId
    );
    res.status(200).json({ message: "get data sucessfull", result });
  } catch (err) {
    next(err);
  }
};

const clear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userModel.clear(
      req.params.userid as unknown as ObjectId
    );
    res.status(200).json({ message: "data cleared sucessfully", result });
  } catch (err) {
    next(err);
  }
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserData = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await userModel.authenticate(user);
    if (result) {
      const expiration = { expiresIn: "15s" };
      const accessToken = jwt.sign(
        { user },
        ACCESS_TOKEN_SECRET as unknown as string,
        expiration
      );
      const refToken = jwt.sign(
        { user },
        REFRESH_TOKEN_SECRET as unknown as string
      );
      res.status(200).json({
        message: "you logged in sucessfully",
        ...result,
        refToken,
        accessToken,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const userRoutes = Router();
userRoutes.route("/user").post(createUser);
userRoutes.route("/user/authenticate").post(authenticate);
userRoutes.route("/user/:userid/todos").get(getTodos).delete(clear);

export default userRoutes;
