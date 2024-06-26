import type { NextApiRequest, NextApiResponse } from "next";
import { QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "@blogshow/db/dynamo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { postId } = req.query as { postId: string };

  const params: QueryCommandInput = {
    TableName: "comment",
    IndexName: "post_id-index",
    KeyConditionExpression: "post_id = :post_id",
    ExpressionAttributeValues: {
      ":post_id": postId,
    },
  };
  try {
    const data = await dynamoDB.send(new QueryCommand(params));

    if (data.Items && data.Items.length > 0) {
      res.status(200).json(data.Items);
    } else {
      res.status(404).json({ message: "No comments for this blog!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment", error });
  }
}
