import { Request, Response, NextFunction } from "express";
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

  // check for mongoose cast error
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource Not Found";
  }

  res.status(statusCode).json({
    message,
    stack: env.NODE_ENV === "production" ? "Pancakes" : err.stack,
  });
};

export { notFound, errorHandler };
