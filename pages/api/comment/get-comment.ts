import type { NextApiRequest, NextApiResponse } from "next";
import { GetCommand, GetCommandInput } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "@blogshow/db/dynamo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query as { id: string };

  const params: GetCommandInput = { TableName: "comment", Key: { id } };
  try {
    const data = await dynamoDB.send(new GetCommand(params));

    if (data.Item) {
      res.status(200).json(data.Item);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment", error });
  }
}
