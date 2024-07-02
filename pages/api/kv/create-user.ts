import { NextApiRequest, NextApiResponse } from "next";
import kv from "@vercel/kv";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { userId } = req.query as { userId: string };
  try {
    await kv.set(userId, { create: 0, read: 0 });
    res.status(200).json({ message: "User created successfuly" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
