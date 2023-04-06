import validator from "express-validator";
const { body, param } = validator;
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

export const getProductValidator = [
  param("productId").custom((value, { req }) => {
    if (!ObjectId.isValid(value)) {
      throw new Error("Invalid product ID");
    }
    return true;
  }),
];

export const postProductValidator = [
  body("title")
    .exists().withMessage("Title is required")
    .isLength({ min: 5, max: 50 })
    .withMessage("Title must have a length between 5 and 50 characters"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .isLength({ min: 5, max: 255 })
    .withMessage("Description must have a length between 5 and 255 characters"),
  body("category").exists().withMessage("Category is required"),
  body("price")
    .exists()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be numeric")
    .isFloat({ min: 0, max: 10000 })
    .withMessage("Price must be between 0 and 10000"),
  body("discount")
    .optional()
    .isFloat({ min: 0, max: 1 })
    .withMessage("Price must be between 0 and 1"),
  body("amountInStock").exists().withMessage("Amount In Stock is required"),
  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Image not receive");
    }
    return true;
  }),
];
