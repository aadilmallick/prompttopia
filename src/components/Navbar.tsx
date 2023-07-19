"use client";

import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  getSession,
} from "next-auth/react";
import { GradientOutlineButton } from "./Buttons";
import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import useCurrentUser from "@/hooks/useCurrentUser";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  // const [user, setUser] = useState<Session | null>(null);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const getUser = async () => {
  //     const session = await getSession();
  //     console.log("session", session);
  //     setUser(session);
  //     setLoading(false);
  //   };

  //   getUser();
  // }, []);
  const { loading, startLoading, stopLoading, user } = useCurrentUser();

  const AuthElements = () => {
    return (
      <>
        <Link href="/create-prompt">
          <GradientOutlineButton>Create Prompt</GradientOutlineButton>
        </Link>
        <GradientOutlineButton
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Sign Out
        </GradientOutlineButton>
        <ProfileButton
          onClick={() => setToggle((prev) => !prev)}
          visible={toggle}
          src={user?.image || ""}
        />
      </>
    );
  };

  const UnAuthElements = () => {
    return (
      <GradientOutlineButton onClick={signIn}>Sign In</GradientOutlineButton>
    );
  };

  const scrollClass = "bg-white/50 shadow-md backdrop-filter backdrop-blur-lg";

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      const nav = document.querySelector("nav");
      if (window.scrollY > 100) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });

    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-4 transition-colors ${
        isScrolling ? scrollClass : ""
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <button className="bg-none border-none orange-text-gradient text-4xl font-black tracking-[-2px] hover:blur-sm transition-all">
            PT
          </button>
        </Link>
        <div className="hidden space-x-2 md:flex items-center relative">
          {user && !loading && AuthElements()}
          {!user && !loading && UnAuthElements()}
          {loading && <h1 className="text-2xl font-bold">Loading...</h1>}
        </div>
        <div className="md:hidden">
          {user && !loading && (
            <ProfileButton
              onClick={() => setToggle((prev) => !prev)}
              visible={toggle}
              src={user?.image || ""}
            />
          )}
          {!user && !loading && (
            <ProfileButton
              onClick={() => setToggle((prev) => !prev)}
              visible={toggle}
              src={"/vercel.svg"}
            />
          )}
          {loading && <h1 className="text-2xl font-bold">Loading...</h1>}
        </div>
      </div>
    </nav>
  );
};

function Dropdown({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-[120%] bg-white p-4 rounded-lg">
      <ul className="list-none">
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/create-prompt">Create Prompt</Link>
        </li>
      </ul>
    </div>
  );
}

interface ProfileButtonProps {
  onClick: () => void;
  visible: boolean;
  src: string;
}
function ProfileButton({ onClick, visible, src }: ProfileButtonProps) {
  return (
    <>
      <div
        className="bg-white rounded-full shadow-lg w-12 h-12 hover:shadow-2xl hover:opacity-70 overflow-hidden transition-opacity relative"
        onClick={onClick}
      >
        <img
          src={src || "/vercel.svg"}
          alt="profile pic"
          className="w-full h-full object-cover"
        />
      </div>
      <Dropdown visible={visible} />
    </>
  );
}

export default Navbar;
