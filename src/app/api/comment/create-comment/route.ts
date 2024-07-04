import { NextRequest, NextResponse } from "next/server";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import docClient from "@blogshow/db/dynamo";
import { CommentProps } from "@blogshow/types/comment";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { content, createdAt, author, authorId, postId, authorImage } = (await req.json()) as CommentProps;

    const id = uuidv4();

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

    await docClient.send(new PutCommand(params));
    return NextResponse.json({ message: "Comment posted!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong with posting your comment!", error }, { status: 500 });
  }
}
