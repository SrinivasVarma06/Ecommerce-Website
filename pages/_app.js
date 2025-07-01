// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <AuthRedirectWrapper>
        {getLayout(<Component {...pageProps} />)}
      </AuthRedirectWrapper>
    </SessionProvider>
  );
}

function AuthRedirectWrapper({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    if (status === "authenticated") {
      const isAdmin = session.user.email === adminEmail;

      if (router.pathname === "/" && !isAdmin) {
        router.replace("/customer");
      }

      if (router.pathname.startsWith("/customer") && isAdmin) {
        router.replace("/");
      }
    }
  }, [session, status, router]);

  return children;
}
