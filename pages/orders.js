import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../components/admin/layout"; 

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("/api/orders");
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-4 rounded-md shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold text-black mb-4 p-2">Orders</h2>
      <table className="w-full text-left bg-white rounded-md border border-gray-600">
        <thead className="border-b border-gray-600">
          <tr className="border-b border-gray-600">
            <th className="text-2xl text-black mb-4 p-2">Order ID</th>
            <th className="text-2xl font-semibold text-black mb-4 p-2">Customer</th>
            <th className="text-2xl font-semibold text-black mb-4 p-2">Total</th>
            <th className="text-2xl font-semibold text-black mb-4 p-2">Status</th>
          </tr>
        </thead>
        <tbody className="border-b border-gray-600">
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-gray-500 p-2">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-600">
                <td className="text-black p-2">{order._id}</td>
                <td className="text-black p-2">{order.customer}</td>
                <td className="text-black p-2">{order.total.toFixed(2)}</td>
                <td
                  className={`p-2 font-semibold ${
                    order.status === "Paid"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
OrdersPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
