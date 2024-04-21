import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";

// Protect Routes
export const protect: RequestHandler = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
};

// Admin Routes
export const adminOnly: RequestHandler = asyncHandler(
  async (req, res, next) => {
    if (req.session.userId) {
      const checkUser = await User.findById(req.session.userId);
      if (checkUser?.isAdmin) {
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
);
