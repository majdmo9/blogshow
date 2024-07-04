import kv from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (typeof userId !== "string") {
      return NextResponse.json({ message: "userId must be a type of string" }, { status: 415 });
    }
    const user = await kv.get(userId);
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }
}
