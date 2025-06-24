import User from "../model/User";
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../middleware/responseHandler";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return successResponse(res, users);
  } catch (error) {
    return errorResponse(res, error, "Failed to fetch users");
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, dob, email, phone } = req.body;
  try {
    const newUser = await User.create({ name, dob, email, phone });
    return successResponse(res, newUser, "User created", 201);
  } catch (error) {
    return errorResponse(res, error, "Error creating user", 400);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return errorResponse(res, {}, "User not found", 404);
    }
    return successResponse(res, {}, "User deleted");
  } catch (error) {
    return errorResponse(res, error, "Error deleting user");
  }
};
