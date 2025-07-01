import { mongooseConnect } from "@/lib/mongoose";
import Order from "@/models/order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await mongooseConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const orders = await Order.find({ customer: session.user.email }).sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (err) {
      console.error("Error fetching customer orders:", err);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
