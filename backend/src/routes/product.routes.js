import { Router } from "express";
import multer from "multer";

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop();
    cb(null, `${unique}.${ext}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.array("images", 6), createProduct);

router.put("/:id", upload.array("images", 6), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
