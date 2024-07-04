import { NextRequest, NextResponse } from "next/server";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import docClient from "@blogshow/db/dynamo";
import { PostEditProps } from "@blogshow/types/post";

export async function PUT(req: NextRequest) {
  try {
    const { title, description, videoUrl, imageUrl } = (await req.json()) as PostEditProps;
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
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
      return NextResponse.json({ message: "No fields to update" }, { status: 400 });
    }

    const params = {
      TableName: "post",
      Key: { id: postId },
      UpdateExpression: `SET ${updateExpression.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    };

    await docClient.send(new UpdateCommand(params));
    return NextResponse.json({ message: "Post updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating post", error }, { status: 500 });
  }
}
