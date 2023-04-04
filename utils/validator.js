import validator from "express-validator";
const { body, param } = validator;
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

export const productInputValidator = [
  param("productId")
    .custom((value, { req }) => {
      if (!ObjectId.isValid(value)) {
        throw new Error("Invalid product ID");
      }
      return true;
    })
];
