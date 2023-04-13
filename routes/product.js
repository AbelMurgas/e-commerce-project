import express from "express";
import {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
} from "../controllers/product.js";
import {
  getProductValidator,
  postProductValidator,
  putProductValidator,
} from "../utils/validator.js";

const router = express.Router();

// /product

router.get("/", getProducts);

router.get("/:productId", getProductValidator, getProduct);

router.post("/", postProductValidator, postProduct);

router.put("/:productId", putProductValidator ,updateProduct);
export default router;
