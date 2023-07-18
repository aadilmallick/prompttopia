import { nextAuthConfig } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getSession, signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

async function signInEmailPassword(data: { email: string; password: string }) {
  const signInResponse = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });
  if (signInResponse?.error) {
    console.error(signInResponse.error);
    throw new Error("Error signing in");
  }
  return signInResponse;
}

async function signInWithGoogle() {
  return await signIn("google");
}

// client side
async function getUser() {
  const session = await getSession();
  return {
    email: session?.user?.email,
    name: session?.user?.name,
    image: session?.user?.image || "/vercel.svg",
  };
}

async function redirectUnauthenticatedUsersServer() {
  const session = await getServerSession(nextAuthConfig);
  if (!session) {
    return redirect("/");
  }
}

async function redirectUnauthenticatedUsersClient() {
  const session = await getSession();
  if (!session) {
    return redirect("/");
  }
}

export {
  signInEmailPassword,
  signInWithGoogle,
  getUser,
  redirectUnauthenticatedUsersServer,
  redirectUnauthenticatedUsersClient,
};
