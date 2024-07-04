import kv from "@vercel/kv";
import { KVUser } from "@blogshow/types/kvUser";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  if (req.method !== "PUT") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }
  const { userId, create, read } = (await req.json()) as KVUser;
  try {
    await kv.set(userId, { create, read });
    return NextResponse.json({ message: "User updated successfuly" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }
}
