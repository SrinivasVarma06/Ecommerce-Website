import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb"
console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
const authOptions={
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    adapter:MongoDBAdapter(clientPromise),
    secret:process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt"
    },
    pages: {
    signIn: "/signin",
  },
};

export default NextAuth(authOptions);