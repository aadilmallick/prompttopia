// import nextauth
import NextAuth, { NextAuthOptions } from "next-auth";
// import google provider
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const nextAuthConfig: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      // define email and password field
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      // this function does the signIn flow for a user.
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        // find the user with the email and password, and return them.
        // return null if user not found or if password is incorrect.
        const user = await User.findOne({
          email: credentials.email,
        });
        if (!user) {
          // create user
          const user = await User.create({
            email: credentials.email,
            password: bcrypt.hash(credentials.password, 10),
            image: "/vercel.svg",
          });
          console.log("user created");
          return user;
        }

        if (await bcrypt.compare(credentials.password, user.password)) {
          console.log("user found");
          return user;
        } else if (user) {
          // user exists, but incorrect password
          return null;
        }
        return null; // returning null will fail authentication
      },
    }),
  ],
  callbacks: {
    // runs on every sign in
    async signIn({ user, account, profile, email, credentials }) {
      await connectDB();
      try {
        const userInDB = await User.findOne({ email: user.email });
        if (!userInDB) {
          await User.create({
            email: user.email,
            image: user.image,
          });
        }
        return true;
      } catch (error) {
        console.error("error", error);
        throw error;
      }
    },
    async session({ session, user, token }) {
      const userDB = await User.findOne({ email: session.user.email });
      session.user.id = userDB?._id;
      return session;
    },
  },
};

type OptionalString = string | undefined | null;

interface IUser {
  name: OptionalString;
  email: string;
  image: string;
  id: string;
}

const handler = NextAuth(nextAuthConfig);

export { handler as GET, handler as POST };
