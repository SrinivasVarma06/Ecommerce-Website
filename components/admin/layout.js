// components/admin/layout.js
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "./nav";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (status === "loading") {
    return <div className="p-8 text-white">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-800">
        <button
          onClick={() => signIn("google")}
          className="text-white bg-blue-600 px-4 py-2 rounded-md"
        >
          Login with Google
        </button>
      </div>
    );
  }

  const isAdmin = session.user.email === adminEmail;

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-white text-gray-900">
        <h2 className="text-2xl font-bold mb-4">Unauthorized Access</h2>
        <p className="mb-4">You are not authorized to view this admin panel.</p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout and Re-login
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-800 text-black">
      <div className="w-64 bg-gray-900 text-white">
        <Nav />
      </div>
      <main className="flex flex-col flex-grow bg-white p-6 overflow-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
