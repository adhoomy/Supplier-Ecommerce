import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

const client = new MongoClient(process.env.MONGODB_URI!);

// Helper function to verify admin authentication
export async function verifyAdminAuth(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { isAdmin: false, error: "Not authenticated" };
    }
    
    if (session.user.role !== "admin") {
      return { isAdmin: false, error: "Insufficient privileges" };
    }
    
    return { isAdmin: true, user: session.user };
  } catch (error) {
    return { isAdmin: false, error: "Authentication error" };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await client.connect();
          const db = client.db();
          const user = await db.collection("users").findOne({
            email: credentials.email,
          });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || "user",
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Automatically detect URL in production
  url: process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined),
}; 