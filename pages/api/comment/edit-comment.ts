import docClient from "@blogshow/db/dynamo";
import { CommentEditProps } from "@blogshow/types/comment";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { content } = req.body as CommentEditProps;
  const { commentId } = req.query as { commentId: string };

  if (!commentId) {
    return res.status(400).json({ message: "Comment ID is required" });
  }

  if (!content) {
    return res.status(400).json({ message: "Comment content is required" });
  }

  const updateExpression = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, string> = {};

  updateExpression.push("#content = :content");
  expressionAttributeNames["#content"] = "content";
  expressionAttributeValues[":content"] = content;

  if (updateExpression.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const params = {
    TableName: "comment",
    Key: { id: commentId },
    UpdateExpression: `SET ${updateExpression.join(", ")}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
  };

  try {
    await docClient.send(new UpdateCommand(params));
    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
}
