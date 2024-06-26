import docClient from "@blogshow/db/dynamo";
import { CommentProps } from "@blogshow/types/comment";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const id = uuid();
  const { content, createdAt, author, authorId, postId, authorImage } = req.body as CommentProps;

  const params = {
    TableName: "comment",
    Item: {
      id,
      content,
      created_at: createdAt,
      author,
      author_id: authorId,
      post_id: postId,
      author_image: authorImage,
    },
  };

  try {
    await docClient.send(new PutCommand(params));
    res.status(201).json({ message: "Comment posted!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong with posting your comment!", error });
  }
}
