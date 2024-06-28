"use client";
import { convertKeysToCamelCase } from "@blogshow/utils/camelize";
import { getErrorMessage } from "@blogshow/utils/getErrorMessage";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type UserType = {
  username: string;
  userId: string;
  email: string;
  emailVerified: boolean;
  sub: string;
  picture: string;
  name: string;
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
        const { email, emailVerified, sub, picture, name } = convertKeysToCamelCase(
          session.tokens?.idToken?.payload as Omit<UserType, "username" | "userId">
        );
        const user = {
          ...(await getCurrentUser()),
          email,
          emailVerified,
          sub,
          picture,
          name,
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
