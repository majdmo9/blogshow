"use client";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { fetchAuthSession, fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type UserType = {
  username: string;
  userId: string;
  email: string;
  email_verified: boolean;
  sub: string;
  picture: string;
};

export default function useAuthUser() {
  const [user, setUser] = useState<Record<string, any>>();
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      try {
        await getCurrentUser();

        const session = await fetchAuthSession();
        if (!session.tokens) {
          return;
        }
        const user = {
          ...(await getCurrentUser()),
          ...(await fetchUserAttributes()),
        };
        setUser(user);
      } catch (err) {
        setUser(undefined);
        console.log(getErrorMessage(err));
      }
    };

    getUser();
  }, [pathname]);

  return user as UserType;
}
