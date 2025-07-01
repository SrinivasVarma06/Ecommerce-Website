import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CustomerLayout from "@/components/customer/layout";

function CustomerOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status]);

  const fetchOrders = async () => {
    const res = await fetch("/api/customer/orders");
    const data = await res.json();
    setOrders(data);
  };

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/customer/delete-order?orderId=${orderId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Something went wrong while deleting the order.");
    }
  };

  if (status === "loading") return <p className="p-8">Loading...</p>;
  if (!session) return <p className="p-8">You must be logged in to view your orders.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow border">
              <p className="text-sm text-gray-500 mb-2">
                Order ID: <span className="font-mono">{order.orderId}</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {order.products.map((product, index) => (
                  <div key={index} className="border p-2 rounded">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-28 w-full object-cover rounded mb-1"
                    />
                    <p className="font-semibold">{product.title}</p>
                    <p>₹{product.price}</p>
                    <p>Qty: {product.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-gray-700">
                <div>
                  <span>Status: <strong>{order.status}</strong></span><br />
                  <span>Total: ₹{order.total.toFixed(2)}</span><br />
                  <span>Placed at: {new Date(order.createdAt).toLocaleString()}</span>
                </div>

                <button
                  onClick={() => handleDelete(order.orderId)}
                  className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white w-fit"
                >
                  🗑️ Delete Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CustomerOrdersPage.getLayout = function getLayout(page) {
  return <CustomerLayout>{page}</CustomerLayout>;
};

export default CustomerOrdersPage;
