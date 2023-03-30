import validator from "express-validator";
const { body, param } = validator;

export const productInputValidator = [
  param("productId")
    .custom((value, { req }) => {
      if (!ObjectId.isValid(value)) {
        throw new Error("Invalid product ID");
      }
      return true;
    })
    .withMessage("Incorrect id product"),
];
