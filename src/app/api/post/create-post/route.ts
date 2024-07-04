import { NextRequest, NextResponse } from "next/server";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import docClient from "@blogshow/db/dynamo";
import { PostProps } from "@blogshow/types/post";
import { v4 as uuidv4 } from "uuid";
import { kvAPI } from "@blogshow/Api/kv/api";
import { MaxWriteLimit } from "@blogshow/utils/constants";

export async function POST(req: NextRequest) {
  try {
    const id = uuidv4();
    const { title, description, createdAt, author, authorId, category, videoUrl, imageUrl, authorImage } = (await req.json()) as PostProps;

    const userStatus = await kvAPI.CRUD.getUser(authorId);
    if (userStatus === null || userStatus.create >= MaxWriteLimit) {
      return NextResponse.json({ message: "User has reached the maximum post limit" }, { status: 403 });
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

    await docClient.send(new PutCommand(params));
    return NextResponse.json({ message: "Post created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating item", error }, { status: 500 });
  }
}
