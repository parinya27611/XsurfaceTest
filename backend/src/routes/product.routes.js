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

router.post(
  "/",
  (req, res, next) => {
    upload.array("images", 6)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  createProduct
);

router.put(
  "/:id",
  (req, res, next) => {
    upload.array("images", 6)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  updateProduct
);

router.delete("/:id", deleteProduct);

export default router;
