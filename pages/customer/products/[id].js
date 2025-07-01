import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/products?id=${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  const addToCart = () => {
    if (!product || !product._id) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        _id: product._id,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  const handleBuyNow = () => {
    if (!product || !product._id) return;

    const productToBuy = {
      _id: product._id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    };

    localStorage.setItem("buynow", JSON.stringify([productToBuy]));
    router.push("/customer/checkout");
  };

  if (!product) return <div className="p-6 text-gray-600">Loading product...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full md:w-64 h-64 object-cover rounded border"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-semibold text-green-600">₹{product.price}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={addToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
