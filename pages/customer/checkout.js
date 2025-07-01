import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CheckoutPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const buynow = JSON.parse(localStorage.getItem("buynow")) || [];
    setItems(buynow);
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (items.length === 0) return alert("No items to checkout.");

    setLoading(true);

    try {
      const res = await axios.post("/api/customer/checkout", {
        products: items,
        total,
        status:"PAID",
      });

      if (res.data.success) {
        localStorage.removeItem("buynow");
        localStorage.removeItem("cart");
        router.push("/customer/success");
      } else {
        alert("Order failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        {items.length === 0 ? (
          <p className="text-gray-600">No items to checkout.</p>
        ) : (
          <>
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-4 border-b pb-2"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-right mt-6 font-semibold text-lg">
              Total: ₹{total}
            </div>
            <div className="text-right mt-4">
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
