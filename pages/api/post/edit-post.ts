import docClient from "@/db/dynamo";
import { PostEditProps } from "@/types/post";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { title, description, videoUrl, imageUrl } = req.body as PostEditProps;
  const { postId } = req.query as { postId: string };

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  const updateExpression = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, string> = {};

  if (title) {
    updateExpression.push("#title = :title");
    expressionAttributeNames["#title"] = "title";
    expressionAttributeValues[":title"] = title;
  }
  if (description) {
    updateExpression.push("#description = :description");
    expressionAttributeNames["#description"] = "description";
    expressionAttributeValues[":description"] = description;
  }

  if (videoUrl) {
    updateExpression.push("#videoUrl = :videoUrl");
    expressionAttributeNames["#videoUrl"] = "video_url";
    expressionAttributeValues[":videoUrl"] = videoUrl;
  }
  if (imageUrl) {
    updateExpression.push("#imageUrl = :imageUrl");
    expressionAttributeNames["#imageUrl"] = "image_url";
    expressionAttributeValues[":imageUrl"] = imageUrl;
  }

  if (updateExpression.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const params = {
    TableName: "post",
    Key: { id: postId },
    UpdateExpression: `SET ${updateExpression.join(", ")}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
  };

  try {
    await docClient.send(new UpdateCommand(params));
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
}
