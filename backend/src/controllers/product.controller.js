import Product from "../models/product.model.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET ALL
export async function getProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// GET BY ID
export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid product ID" });
  }
}

// CREATE
export async function createProduct(req, res) {
  try {
    const { name, code, price } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!code) return res.status(400).json({ error: "Code is required" });
    if (!price) return res.status(400).json({ error: "Price is required" });

    const priceNumber = Number(price);
    if (!Number.isFinite(priceNumber))
      return res.status(400).json({ error: "Invalid price" });

    const imagePaths = req.files?.map((file) => `/uploads/${file.filename}`) || [];
    if (imagePaths.length > 6)
      return res.status(400).json({ error: "Maximum 6 images allowed" });

    const product = await Product.create({
      name,
      code,
      price: priceNumber,
      images: imagePaths,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// UPDATE
export async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const { name, code, price, removedImages: removedImagesStr } = req.body;


    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!code) return res.status(400).json({ error: "Code is required" });
    if (!price) return res.status(400).json({ error: "Price is required" });
    
    const removedImages = removedImagesStr ? JSON.parse(removedImagesStr) : [];

    const priceNumber = Number(price);
    if (!Number.isFinite(priceNumber))
      return res.status(400).json({ error: "Invalid price" });

    const newImages = req.files?.map((file) => `/uploads/${file.filename}`) || [];

    // Load existing product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Remove selected images from disk and from existing images array
    let existingImages = Array.isArray(product.images) ? [...product.images] : [];
    for (const img of removedImages) {
      const filePath = path.join(__dirname, "../../uploads", path.basename(img));
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (e) {
        console.warn("Failed to delete image file:", filePath, e?.message || e);
      }
      existingImages = existingImages.filter((p) => p !== img);
    }

    // Merge existing images (after removal) with newly uploaded ones
    const mergedImages = [...existingImages, ...newImages];
    if (mergedImages.length > 6)
      return res.status(400).json({ error: "Maximum 6 images allowed" });

    // Update fields
    product.name = name ?? product.name;
    product.code = code ?? product.code;
    product.price = price !== undefined ? priceNumber : product.price;
    product.images = mergedImages;

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// DELETE
export async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    for (const img of product.images || []) {
      const filePath = path.join(__dirname, "../../uploads", path.basename(img));
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (e) {
        console.warn("Failed to delete image file:", filePath, e?.message || e);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
