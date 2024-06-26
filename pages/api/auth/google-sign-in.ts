import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const { NEXT_PUBLIC_COGNITO_DOMAIN, NEXT_PUBLIC_USER_POOL_CLIENT_ID } = process.env;

export default async function handler(request: NextRequest) {
  let authorizeParams = new URLSearchParams();
  const protocol = (request.headers as any)?.["x-forwarded-proto"] || "http";
  const host = (request.headers as any)?.host;

  const origin = `${protocol}://${host}`;

  if (!NEXT_PUBLIC_COGNITO_DOMAIN || !NEXT_PUBLIC_USER_POOL_CLIENT_ID) {
    return new NextResponse("Environment variables are not set", { status: 500 });
  }

  const state = crypto.randomBytes(16).toString("hex");

  authorizeParams.append("response_type", "code");
  authorizeParams.append("client_id", NEXT_PUBLIC_USER_POOL_CLIENT_ID as string);
  authorizeParams.append("redirect_uri", `${origin}/api/auth/callback`);
  authorizeParams.append("state", state);
  authorizeParams.append("identity_provider", "Google");
  authorizeParams.append("scope", "profile email openid");

  const redirectUrl = `${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/authorize?${authorizeParams.toString()}`;

  return NextResponse.redirect(redirectUrl);
}
