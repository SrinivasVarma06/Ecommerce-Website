import AdminLayout from '../components/admin/layout';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const userImage = session?.user?.image;

  if (!session) {
    return (
      <div className="px-5">
        <h2 className="text-xl font-bold">Welcome, Guest</h2>
        <button
          onClick={() => signIn()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 text-black">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        {userImage && (
          <Image
            src={userImage}
            alt="Profile Picture"
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-xl font-semibold">Welcome back, {userName} 👋</h3>
        <p className="text-sm mt-1">Manage your products and view orders using the navigation.</p>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
