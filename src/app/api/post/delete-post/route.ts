import { NextRequest, NextResponse } from "next/server";
import { DeleteCommand, DeleteCommandInput } from "@aws-sdk/lib-dynamodb";
import docClient from "@blogshow/db/dynamo";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const params: DeleteCommandInput = {
      TableName: "post",
      Key: { id: postId },
    };

    await docClient.send(new DeleteCommand(params));
    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting post", error }, { status: 500 });
  }
}
