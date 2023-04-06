import express from "express";
import { getProducts, getProduct, postProduct } from "../controllers/product.js";
import { productInputValidator } from "../utils/validator.js";

const router = express.Router();

// /product

router.get("/", getProducts);

router.get("/:productId", productInputValidator, getProduct);

router.post("/", postProduct);

export default router;
