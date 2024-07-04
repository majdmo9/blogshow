import { NextApiRequest, NextApiResponse } from "next";
import kv from "@vercel/kv";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { userId } = req.query as { userId: string };
  try {
    const user = await kv.get(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
