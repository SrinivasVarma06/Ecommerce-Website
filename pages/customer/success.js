import CustomerLayout from "@/components/customer/layout";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/customer/orders"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            📦 View My Orders
          </Link>
          <Link
            href="/customer/products"
            className="text-blue-600 underline hover:text-blue-800"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

SuccessPage.getLayout = function getLayout(page) {
  return <CustomerLayout>{page}</CustomerLayout>;
};
