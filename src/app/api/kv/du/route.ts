import { cookies } from "next/headers";
import { getCurrentUser } from "aws-amplify/auth/server";

import { runWithAmplifyServerContext } from "@blogshow/lib/amplify-server-utils";
import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function DELETE(req: Request) {
  if (req.method !== "DELETE") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const deleteUserId = searchParams.get("userId");
    const user = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: contextSpec => getCurrentUser(contextSpec),
    });
    if (user.userId !== String(process.env.OWNER_USER_ID)) {
      return NextResponse.json({ message: "Not permitted" }, { status: 405 });
    }
    if (typeof deleteUserId !== "string") {
      return NextResponse.json({ message: "userId must be type of string" }, { status: 415 });
    }
    await kv.del(deleteUserId);
    return NextResponse.json({ message: "UDS" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }
}
