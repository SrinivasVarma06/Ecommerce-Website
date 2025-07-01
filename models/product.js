import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: Number,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
