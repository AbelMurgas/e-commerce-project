import Product from "../models/product.js";
import { objectErrorToString } from "../utils/dataFit.js";

import validator from "express-validator";

const { validationResult } = validator;

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(201).json({ data: products });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const errorsObject = validationResult(req);
  try {
    if (!errorsObject.isEmpty()) {
      const error = new Error(objectErrorToString(errorsObject));
      error.statusCode = 422;
      throw error;
    }
    const product = await Product.findById(productId);
    res.status(201).json({ data: product });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
