import { NextRequest, NextResponse } from "next/server";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import docClient from "@blogshow/db/dynamo";
import { CommentEditProps } from "@blogshow/types/comment";

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("commentId");
    const { content } = (await req.json()) as CommentEditProps;

    if (!commentId) {
      return NextResponse.json({ message: "Comment ID is required" }, { status: 400 });
    }

    if (!content) {
      return NextResponse.json({ message: "Comment content is required" }, { status: 400 });
    }

    const updateExpression = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, string> = {};

    updateExpression.push("#content = :content");
    expressionAttributeNames["#content"] = "content";
    expressionAttributeValues[":content"] = content;

    if (updateExpression.length === 0) {
      return NextResponse.json({ message: "No fields to update" }, { status: 400 });
    }

    const params = {
      TableName: "comment",
      Key: { id: commentId },
      UpdateExpression: `SET ${updateExpression.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    };

    await docClient.send(new UpdateCommand(params));
    return NextResponse.json({ message: "Comment updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating comment", error }, { status: 500 });
  }
}
