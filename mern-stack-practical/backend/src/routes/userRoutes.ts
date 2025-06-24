import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
} from "../controllers/userController";
import { validate } from "../middleware/validate";
import {
  createUserValidation,
  deleteUserValidation,
} from "../validations/userValidation";

const router = express.Router();

router.get("/", getUsers);

router.post("/", createUserValidation, validate, createUser);

router.delete("/:id", deleteUserValidation, validate, deleteUser);

export default router;
