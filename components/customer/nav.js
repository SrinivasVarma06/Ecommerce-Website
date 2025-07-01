import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function CustomerNav() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-700">SmartCart</div>
      <div className="space-x-4">
        <Link href="/customer">Dashboard</Link>
        <Link href="/customer/shop">Shop</Link>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
