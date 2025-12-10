import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    images: {
      type: [String],
      validate: [(arr) => arr.length <= 6, "Maximum 6 images"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
