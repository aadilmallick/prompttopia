"use client";
import { SessionProvider as PR } from "next-auth/react";

import React from "react";

interface Props {
  children: React.ReactNode;
}
const AuthProvider = ({ children }: Props) => {
  return <PR>{children}</PR>;
};

export default AuthProvider;
