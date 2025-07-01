import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Welcome to ShopEase</h1>
          <p className="text-sm text-gray-600 mt-2">Sign in to continue shopping</p>
        </div>

        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name} className="mt-6">
              <button
                onClick={() => signIn(provider.id)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                <img
                  src="/google-icon.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
