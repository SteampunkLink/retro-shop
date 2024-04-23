import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";

interface ILoginBody {
  email: string;
  password: string;
}

// @desc - authenticate user (Public)
// @path - POST /api/users/login
export const userLogin: RequestHandler<unknown, unknown, ILoginBody, unknown> =
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      req.session.userId = user._id;
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Invalid credentials.");
    }
  });

interface IUserCreateUpdate {
  name?: string;
  email?: string;
  password?: string;
}

// @desc - register user (Public)
// @path - POST /api/users
export const userRegister: RequestHandler<
  unknown,
  unknown,
  IUserCreateUpdate,
  unknown
> = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    req.session.userId = user._id;
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(500);
    throw new Error("Error creating new user.");
  }
});

// @desc - log out user and clear session (Private)
// @path - POST /api/users/logout
export const userLogout: RequestHandler = asyncHandler(
  async (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500);
        throw new Error("Something went wrong.");
      } else {
        res.status(200).json({ message: "You have logged out." });
      }
    });
  }
);

// @desc - get logged-in user's profile (Private)
// @path - GET /api/users/profile
export const userProfile: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const user = await User.findById(req.session.userId);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found.");
    }
  }
);

// @desc - update logged-in user's profile (Private)
// @path - PATCH /api/users/profile
export const userProfileUpdate: RequestHandler<
  unknown,
  unknown,
  IUserCreateUpdate,
  unknown
> = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.session.userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// @desc - get all users (Private - Admin Only)
// @path - GET /api/users/
export const adminGetAllProfiles: RequestHandler = asyncHandler(
  async (req, res, next) => {
    res.send("Get All Profiles");
  }
);

// @desc - get one user by id (Private - Admin Only)
// @path - GET /api/users/:id
export const adminGetOneProfile: RequestHandler = asyncHandler(
  async (req, res, next) => {
    res.send("Get One Profile");
  }
);

// @desc - update one user by id (Private - Admin Only)
// @path - PATCH /api/users/:id
export const adminUpdateOneProfile: RequestHandler = asyncHandler(
  async (req, res, next) => {
    res.send("Update One Profile");
  }
);

// @desc - delete a user (Private - Admin Only)
// @path - DELETE /api/users/:id
export const adminDeleteOneProfile: RequestHandler = asyncHandler(
  async (req, res, next) => {
    res.send("Delete One Profile");
  }
);

// TODO: Route to let user delete their own account
