"use client";
import { Amplify, type ResourcesConfig } from "aws-amplify";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
    loginWith: {
      oauth: {
        domain: "blogshow.auth.us-east-1.amazoncognito.com",
        scopes: ["openid", "email", "profile"],
        redirectSignIn: ["http://localhost:3000/", "https://blogshow.vercel.app/"],
        redirectSignOut: ["http://localhost:3000/", "https://blogshow.vercel.app/"],
        responseType: "code",
        providers: ["Google"],
      },
    },
  },
};

Amplify.configure({ Auth: authConfig }, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}
