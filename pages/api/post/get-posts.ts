import type { NextApiRequest, NextApiResponse } from "next";
import { ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "@blogshow/db/dynamo";
import { kvAPI } from "@blogshow/Api/kv/api";
import { MaxReadLimit } from "@blogshow/utils/constants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { limit, nextKey, userId } = req.query as { limit: string; nextKey?: string; userId: string };
  const limitInt = Number(limit);

  const userStatus = await kvAPI.CRUD.getUser(userId);

  if (userStatus === null || userStatus.read > MaxReadLimit) {
    return res.status(403).end();
  }
  await kvAPI.CRUD.updateUser({ userId, create: userStatus.create, read: userStatus.read + 1 });

  if (limitInt < 1 || limitInt > 10) {
    return res.status(400).json({ message: "Limit must be between 1 and 10" });
  }

  const params: ScanCommandInput = {
    TableName: "post",
    Limit: limitInt,
  };

  if (nextKey) {
    params.ExclusiveStartKey = JSON.parse(nextKey);
  }

  try {
    const data = await dynamoDB.send(new ScanCommand(params));
    const nextKey = data.LastEvaluatedKey ? JSON.stringify(data.LastEvaluatedKey) : null;

    res.status(200).json({ data: data.Items, nextKey });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
}
