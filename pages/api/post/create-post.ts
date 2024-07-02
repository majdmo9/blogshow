import docClient from "@blogshow/db/dynamo";
import { PostProps } from "@blogshow/types/post";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";
import { kvAPI } from "@blogshow/Api/kv/api";
import { MaxWriteLimit } from "@blogshow/utils/constants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const id = uuid();

  const { title, description, createdAt, author, authorId, category, videoUrl, imageUrl, authorImage } = req.body as PostProps;

  const userStatus = await kvAPI.CRUD.getUser(authorId);
  if (userStatus === null || userStatus.create >= MaxWriteLimit) {
    return res.status(403).end();
  }
  await kvAPI.CRUD.updateUser({ userId: authorId, read: userStatus.read, create: userStatus.create + 1 });

  const params = {
    TableName: "post",
    Item: {
      id,
      title,
      description,
      created_at: createdAt,
      author,
      author_id: authorId,
      author_image: authorImage,
      category,
      image_url: imageUrl,
      ...(videoUrl ? { video_url: videoUrl } : {}),
    },
  };

  try {
    await docClient.send(new PutCommand(params));
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error });
  }
}
