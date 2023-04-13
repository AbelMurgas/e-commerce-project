import Product from "../models/product.js";
import file from "../utils/file.js";

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

export const postProduct = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const discount = req.body.discount;
  const amountInStock = req.body.amountInStock;
  const errorsObject = validationResult(req);
  try {
    if (!errorsObject.isEmpty()) {
      file.clearImage(req.file.path);
      return res.status(400).json({ errors: errorsObject.array() });
    }
    const normalizedPath = req.file.path.replace(/\\/g, "/");
    const product = new Product({
      title: title,
      description: description,
      imageUrl: normalizedPath,
      category: category,
      price: price,
      discount: discount,
      amountInStock: amountInStock,
    });
    const productCreated = await product.save();
    return res.status(201).json({ product: productCreated });
  } catch (err) {
    file.clearImage(req.file.path);
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const discount = req.body.discount;
  const amountInStock = req.body.amountInStock;
  const wasFilePassed = req.file ? true : false;
  const normalizedPath = (wasFilePassed) ? req.file.path.replace(/\\/g, "/") : undefined;
  const errorsObject = validationResult(req);
  try {
    if (!errorsObject.isEmpty()) {
      if (normalizedPath){
        file.clearImage(normalizedPath)
      };
      return res.status(400).json({ errors: errorsObject.array() });
    }
    const updateFields = {
      title: title,
      description: description,
      imageUrl: normalizedPath,
      category: category,
      price: price,
      discount: discount,
      amountInStock: amountInStock,
    };
    const productImagePath = await Product.findById(productId).select("imageUrl").imageUrl
    console.log(normalizedPath)
    const productUpdated = await Product.findByIdAndUpdate(
      { _id: productId },
      { $set: updateFields },
      { upsert: false, new: true }
    );
    if (normalizedPath){
      file.clearImage(productImagePath)
    };
    res.status(201).json({ productUpdated: productUpdated });
  } catch (err) {
    if (normalizedPath){
      file.clearImage(normalizedPath)
    }
    next(err);
  }
};
