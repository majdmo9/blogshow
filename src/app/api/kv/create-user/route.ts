import kv from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (typeof userId !== "string") {
    return NextResponse.json({ message: "userId must be a type of string" }, { status: 415 });
  }
  try {
    await kv.set(userId, { create: 0, read: 0 });
    return NextResponse.json({ message: "User created successfuly" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }
}
