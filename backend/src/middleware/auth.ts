import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHearders = req.headers.authorization;
    console.log("entered ");

    if (authHearders) {
      console.log("entered 1");
      const token = authHearders!.split(" ")[1];
      console.log(13);
      console.log({ token });
      const decode = Jwt.verify(
        token,
        ACCESS_TOKEN_SECRET as unknown as string
      );
      if (decode) {
        console.log("entered 2");

        next();
      } else {
        res.status(401).send("Invalid token");
      }
    } else {
      res.status(401).json("expired token");
    }
  } catch (err) {
    res.status(401).json("autherization failed");
  }
};
