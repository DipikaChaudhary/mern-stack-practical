import { body, param } from "express-validator";

export const createUserValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("dob").isDate().withMessage("DOB must be a valid date"),
  body("email").isEmail().withMessage("Invalid email"),
  body("phone").isMobilePhone("any").withMessage("Invalid phone number"),
];

export const deleteUserValidation = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];
