import type { NextApiRequest, NextApiResponse } from "next";
import { ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "@blogshow/db/dynamo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { limit, nextKey } = req.query as { limit: string; nextKey?: string };
  const limitInt = Number(limit);

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
