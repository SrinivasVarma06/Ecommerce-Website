import { mongooseConnect } from "@/lib/mongoose";
import Order from "@/models/order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await mongooseConnect();

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user?.email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { products: rawProducts, total } = req.body;

    if (!rawProducts || !Array.isArray(rawProducts) || rawProducts.length === 0) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    const products = rawProducts.map((item) => ({
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl, // ✅ important!
    }));

    const newOrder = await Order.create({
      orderId: `ORD-${Date.now()}`,
      customer: session.user.email,
      products,
      total,
    });

    return res.status(200).json({ success: true, orderId: newOrder.orderId });
  } catch (error) {
    console.error("Checkout failed:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
