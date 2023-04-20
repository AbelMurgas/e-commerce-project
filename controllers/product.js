import Product from "../models/product.js";
import file from "../utils/file.js";

import validator from "express-validator";

const { validationResult } = validator;

const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;

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
      return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ errors: errorsObject.array() });
    }
    const product = await Product.findById(productId);
    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const postProduct = async (req, res, next) => {
  const { title, description, category, price, discount, amountInStock } = req.body;
  const errorsObject = validationResult(req);
  const imageUrl = req.file?.path?.replace(/\\/g, "/");
  try {
    if (!errorsObject.isEmpty()) {
      return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ errors: errorsObject.array() });
    }
    const product = new Product({
      title,
      description,
      imageUrl,
      category,
      price,
      discount,
      amountInStock,
    });
    const productCreated = await product.save();
    return res.status(201).json({ product: productCreated });
  } catch (err) {
    next(err);
  } finally {
    if (res.statusCode !== 201) {
      file.clearImage(imageUrl)
    }
  }
};

export const updateProduct = async (req, res, next) => {
  const { title, description, category, price, discount, amountInStock } = req.body;
  const errorsObject = validationResult(req);
  const imageUrl = req.file?.path?.replace(/\\/g, "/");
  const productId = req.params.productId;
  let productBeforeUpdated = null
  try {
    if (!errorsObject.isEmpty()) {
      return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ errors: errorsObject.array() });
    }
    const updateFields = {
      title,
      description,
      imageUrl,
      category,
      price,
      discount,
      amountInStock,
    };
    productBeforeUpdated = await Product.findById(productId).select("imageUrl")
    const productUpdated = await Product.findByIdAndUpdate(
      { _id: productId },
      { $set: updateFields },
      { upsert: false, new: true }
    );
    res.status(HTTP_STATUS_CREATED).json({ productUpdated: productUpdated });
  } catch (err) {
    next(err);
  } finally {
    console.log(res.statusCode, imageUrl)
    if (res.statusCode === HTTP_STATUS_CREATED && imageUrl) {
      file.clearImage(productBeforeUpdated.imageUrl)
    } else {
      file.clearImage(imageUrl)
    }
  }
};
