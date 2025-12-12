import { Router } from "express";
import upload from "../config/multer.js";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", upload.array("images", 6), createProduct);

router.put("/:id", upload.array("images", 6), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
