import type { NextApiRequest, NextApiResponse } from "next";
import { GetCommand, GetCommandInput } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "@blogshow/db/dynamo";
import { kvAPI } from "@blogshow/Api/kv/api";
import { MaxReadLimit } from "@blogshow/utils/constants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, userId } = req.query as { id: string; userId: string };

  const userStatus = await kvAPI.CRUD.getUser(userId);

  if (userStatus === null || userStatus.read > MaxReadLimit) {
    return res.status(403).end();
  }
  await kvAPI.CRUD.updateUser({ userId, create: userStatus.create, read: userStatus.read + 1 });

  const params: GetCommandInput = { TableName: "post", Key: { id } };
  try {
    const data = await dynamoDB.send(new GetCommand(params));

    if (data.Item) {
      res.status(200).json(data.Item);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
}
