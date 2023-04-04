import Product from "../models/product.js";
import { objectErrorToString } from "../utils/dataFit.js";

import validator from "express-validator";

const { validationResult } = validator;

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(201).json({ data: products });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const errorsObject = validationResult(req);
  try {
    if (!errorsObject.isEmpty()) {
      return res.status(400).json({ errors: errorsObject.array() });
    }
    const product = await Product.findById(productId);
    res.status(201).json({ data: product });
  } catch (err) {
    next(err);
  }
};
