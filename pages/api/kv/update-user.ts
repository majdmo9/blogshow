import { NextApiRequest, NextApiResponse } from "next";
import kv from "@vercel/kv";
import { KVUser } from "@blogshow/types/kvUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { userId, create, read } = req.body as KVUser;
  try {
    await kv.set(userId, { create, read });
    res.status(200).json({ message: "User updated successfuly" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
