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
      phone: req.body.phone,
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
    const result = await userModel.authenticate(user, next);
    console.log({ result });
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

      res.cookie("access-token", accessToken);
      res.cookie("refresh-token", refToken);
      res.cookie("user-id", result.id.toString());
      res.status(200).json({
        message: "you logged in sucessfully",
        ...result,
        refToken,
        accessToken,
        status: 200,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userid as unknown as ObjectId;
    const user = await userModel.getUser(userId, next);
    res.status(200).json({ user, status: 200 });
  } catch (err) {
    // next(err);
    console.log(err);
  }
};

const getNewRefToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refToken } = req.body;
  if (!refToken) {
    return res.status(401).json({ message: "unautherized" });
  } else {
    let user = await userModel.verfiyRefToken(refToken, next);
    if (user) {
      const accessTokenExpiration = { expiresIn: "15s" };

      const accessToken = jwt.sign(
        { user },
        ACCESS_TOKEN_SECRET as unknown as string,
        accessTokenExpiration
      );
      const refreshToken = jwt.sign(
        { user },
        REFRESH_TOKEN_SECRET as unknown as string
      );
      res.cookie("access-token", accessToken);
      res.cookie("refresh-token", refToken);
      res.status(200).json({ refreshToken, accessToken });
    }
  }
};

const logOut = (req: Request, res: Response) => {
  const { refToken } = req.body;
  if (refToken) {
    res.clearCookie("access-token");
    res.clearCookie("user-id");
    res.clearCookie("refresh-token");
    res
      .status(200)
      .json({ status: 200, message: "you logged out successfully" });
  } else {
    res.status(404).json({ status: 404, message: "wrong refresh-token token" });
  }
};

const userRoutes = Router();
userRoutes.route("/user").post(createUser);
userRoutes.route("/user/authenticate").post(authenticate);
userRoutes.route("/user/:userid/todos").get(getTodos);
userRoutes.route("/user/:userid").get(getUser);
userRoutes.route("/user/logout").post(logOut);
userRoutes.route("/user/auth/refresh").post(getNewRefToken);
userRoutes.route("/user/:userid/cleartodos").delete(clear);
export default userRoutes;
