import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  image: string;
  id?: string;
}
const useCurrentUser = () => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      console.log("session", session);
      setUser(session?.user);
      setLoading(false);
    };

    getUser();
  }, []);

  return { user, loading, startLoading, stopLoading };
};

export default useCurrentUser;
