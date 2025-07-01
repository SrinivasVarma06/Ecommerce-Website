import CustomerLayout from "@/components/customer/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function CustomerProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-6">Explore Our Products</h1>
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-2xl font-bold text-gray-800">Need to checkout?</h1>
        <Link
          href="/customer/cart"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          🛒 View Cart
        </Link>
      </div>
      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg p-4 border border-gray-200 hover:border-blue-400 transition flex flex-col items-center"
            >
              <div className="w-full h-48 relative mb-4 rounded-md overflow-hidden">
                <Image
                  src={product.imageUrl || "/placeholder.jpg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
                  priority={true}
                />
              </div>

              <h2 className="text-lg font-semibold text-center">{product.title}</h2>

              <p className="text-blue-600 font-bold text-lg mt-2 text-center">₹{product.price}</p>

              <Link
                href={`/customer/products/${product._id}`}
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CustomerProducts.getLayout = function getLayout(page) {
  return <CustomerLayout>{page}</CustomerLayout>;
};
