import { NextFunction, Request, Response } from "express";
import { Error } from "../interfaces/errorInterface";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err?.status || 500;

  const message = err?.message || "error";
  console.log({ message, err });
  res.status(status).json({ message, status });
};
