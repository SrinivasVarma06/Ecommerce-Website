import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    try {
      if (req.query?.id) {
        const product = await Product.findById(req.query.id);
        return res.status(200).json(product);
      }
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  }

  else if (method === "POST") {
    try {
      const { title, description, price, imageUrl } = req.body;

      const newProduct = await Product.create({
        title,
        description,
        price,
        imageUrl,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: "Error creating product", error });
    }
  }

  else if (method === "PUT") {
    try {
      const { _id, title, description, price, imageUrl } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        _id,
        { title, description, price, imageUrl },
        { new: true }
      );

      return res.status(200).json(updatedProduct);
    } catch (err) {
      return res.status(500).json({ message: "Error updating product", err });
    }
  }

  else if (method === "DELETE") {
    try {
      const { id } = req.query;
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting product", err });
    }
  }

  else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
