// pages/api/customer/place-order.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import mongoose from 'mongoose';
import Product from '@/models/product';
import { Order } from '@/models/order';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  const { productId } = req.body;

  await mongoose.connect(process.env.MONGO_URL);

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const total = product.price;

  // Generate custom order ID (e.g., ORD-123456)
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  await Order.create({
    orderId,
    customer: session.user.email,
    total,
    status: 'Pending',
  });

  return res.status(200).json({ message: 'Order placed successfully!' });
}
