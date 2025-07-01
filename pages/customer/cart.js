import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const increaseQuantity = (id) => {
  const updated = cartItems.map((item) => {
    if (item._id === id) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });

  setCartItems(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};

  const removeFromCart = (id) => {
    const updated = cartItems
      .map((item) => {
        if (item._id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null; // remove item completely if quantity === 1
          }
        }
        return item;
      })
      .filter(Boolean); // remove null entries

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty.");
      return;
    }
    localStorage.setItem("buynow", JSON.stringify(cartItems));
    router.push("/customer/checkout");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
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
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      ₹{item.price} × {item.quantity}
                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="px-2 py-1 text-green-600 border border-green-600 rounded hover:bg-green-600 hover:text-white text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="text-right mt-6 font-semibold text-lg">
              Total: ₹{total}
            </div>
            <div className="text-right mt-4">
              <button
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
