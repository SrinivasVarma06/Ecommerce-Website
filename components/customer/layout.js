// components/customer/layout.js
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function CustomerLayout({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="p-8 text-black">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
        <button
          onClick={() => signIn("google")}
          className="text-white bg-blue-600 px-4 py-2 rounded-md"
        >
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      <div className="w-60 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold mb-6">Customer Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/customer" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/customer/products" className="hover:text-blue-600">
            Browse Products
          </Link>
          <Link href="/customer/orders" className="hover:text-blue-600">
            My Orders
          </Link>
          <button
            onClick={() => signOut()}
            className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </div>
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
