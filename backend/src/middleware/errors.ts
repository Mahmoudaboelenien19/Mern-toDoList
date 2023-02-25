import { NextFunction, Request, Response } from "express";
import { Error } from "../interfaces/errorInterface";

export const errorMiddleware = (err: Error, req: Request, res: Response) => {
  const status = err?.status || 404;

  const message = err?.message || "error";

  res.status(status).json({ message });
};
