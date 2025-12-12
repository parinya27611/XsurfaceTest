import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

function getPublicId(url) {
  const parts = url.split("/");
  const file = parts.pop();
  const folder = parts.pop();
  const publicId = `${folder}/${file.split(".")[0]}`;
  return publicId;
}

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

    const imageUrls = req.files?.map((file) => file.path) || [];

    if (imageUrls.length > 6)
      return res.status(400).json({ error: "Maximum 6 images allowed" });

    const product = await Product.create({
      name,
      code,
      price: priceNumber,
      images: imageUrls,
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

    const newImageUrls = req.files?.map((file) => file.path) || [];

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    for (const imgUrl of removedImages) {
      const publicId = getPublicId(imgUrl);
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.warn("Cloudinary delete error:", publicId, err.message);
      }
    }

    const remainingImages = product.images.filter(
      (img) => !removedImages.includes(img)
    );

    const mergedImages = [...remainingImages, ...newImageUrls];

    if (mergedImages.length > 6)
      return res.status(400).json({ error: "Maximum 6 images allowed" });

    product.name = name;
    product.code = code;
    product.price = priceNumber;
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

    for (const imgUrl of product.images || []) {
      const publicId = getPublicId(imgUrl);
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.warn("Failed delete:", publicId, err.message);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
