import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHearders = req.headers.authorization;
    if (authHearders) {
      const token = authHearders!.split(" ")[1];
      const decode = Jwt.verify(
        token,
        ACCESS_TOKEN_SECRET as unknown as string
      );
      if (decode) {
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
