import docClient from "@blogshow/db/dynamo";
import { DeleteCommand, DeleteCommandInput } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { commentId } = req.query as { commentId: string };

  if (!commentId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  const params: DeleteCommandInput = {
    TableName: "comment",
    Key: { id: commentId },
  };

  try {
    await docClient.send(new DeleteCommand(params));
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
}
