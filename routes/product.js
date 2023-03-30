import express from "express";
import { getProducts, getProduct } from "../controllers/product.js";
import { productInputValidator } from "../utils/validator.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:productId", productInputValidator, getProduct);

export default router;
