// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  // Use the MongoDB adapter for persistent storage
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Credentials provider (for email/password sign in)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to your database (using Mongoose or direct MongoDB queries)
        // Here, we use the existing User model (make sure you have created it)
        const user = await User.findOne({ email: credentials?.email });
        if (!user || !(await bcrypt.compare(credentials!.password, user.password))) {
          throw new Error("Invalid email or password");
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // You can switch to 'database' if preferred with the adapter
  },
  pages: {
    signIn: "/auth/signin",  // custom sign-in page
    error: "/auth/error",    // custom error page
  },
  callbacks: {
    async session({ session, token }) {
      // Add user id to session so it’s accessible client-side
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
