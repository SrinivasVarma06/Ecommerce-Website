import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";
import { Product } from "@/models/product";

export default async function handler(req, res) {
  await mongooseConnect();

  try {
    const totalOrders = await Order.countDocuments();
    
    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      totalOrders,
      totalRevenue,
      totalProducts
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
}
