import { ResourcesConfig } from "aws-amplify";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
    loginWith: {
      oauth: {
        domain: "blogshow.auth.us-east-1.amazoncognito.com",
        scopes: ["openid", "email", "profile"],
        redirectSignIn: ["http://localhost:3000/", "https://blogshow.vercel.app/"],
        redirectSignOut: ["http://localhost:3000/login", "https://blogshow.vercel.app/login"],
        responseType: "code",
        providers: ["Google"],
      },
    },
  },
};
