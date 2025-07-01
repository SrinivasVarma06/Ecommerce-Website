import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: String,
    customer: String,
    products: [
      {
        _id: String,
        title: String,
        price: Number,
        quantity: Number,
        imageUrl: String,
      },
    ],
    total: Number,
    status: {
      type: String,
      default: "PAID",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
