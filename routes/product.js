import express from "express";
import { getProducts, getProduct, postProduct } from "../controllers/product.js";
import { getProductValidator, postProductValidator } from "../utils/validator.js";

const router = express.Router();

// /product

router.get("/", getProducts);

router.get("/:productId", getProductValidator, getProduct);

router.post("/", postProductValidator, postProduct);

export default router;
