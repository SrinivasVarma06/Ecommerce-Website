import CustomerLayout from "@/components/customer/layout";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CustomerHome() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (!session || session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return <div className="text-center mt-10 text-red-500">Unauthorized</div>;
  }

  const name = session.user.name;

  return (
    <div className="text-black">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-semibold">Hello, {name} 👋</h2>
        <p className="text-sm mt-1">Welcome to our store. What would you like to do today?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link
          href="/customer/products"
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg border hover:border-blue-500 transition"
        >
          <h4 className="text-lg font-semibold mb-2 text-blue-600">🛍️ Browse Products</h4>
          <p className="text-sm text-gray-600">Explore our full product catalog and add items to your cart.</p>
        </Link>

        <Link
          href="/customer/orders"
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg border hover:border-green-500 transition"
        >
          <h4 className="text-lg font-semibold mb-2 text-green-600">📦 View My Orders</h4>
          <p className="text-sm text-gray-600">Check your order history and track ongoing deliveries.</p>
        </Link>

        <Link
          href="/customer/profile"
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg border hover:border-purple-500 transition"
        >
          <h4 className="text-lg font-semibold mb-2 text-purple-600">👤 My Profile</h4>
          <p className="text-sm text-gray-600">Manage your account details and preferences.</p>
        </Link>
      </div>
    </div>
  );
}

CustomerHome.getLayout = function getLayout(page) {
  return <CustomerLayout>{page}</CustomerLayout>;
};
