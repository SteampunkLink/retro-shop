import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import env from "../utils/validateEnv";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  res.status(statusCode).json({
    message,
    stack: env.NODE_ENV === "production" ? "Pancakes" : err.stack,
  });
};

const checkObjectId = (req: Request, res: Response, next: NextFunction) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("Resource not found. - Invalid objectId.");
  }
  next();
};

export { notFound, errorHandler, checkObjectId };
