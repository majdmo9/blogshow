import { NextRequest, NextResponse } from "next/server";
import { DeleteCommand, DeleteCommandInput } from "@aws-sdk/lib-dynamodb";
import docClient from "@blogshow/db/dynamo";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get("commentId");

  if (!commentId) {
    return NextResponse.json({ message: "Comment ID is required" }, { status: 400 });
  }

  const params: DeleteCommandInput = {
    TableName: "comment",
    Key: { id: commentId },
  };

  try {
    await docClient.send(new DeleteCommand(params));
    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting comment", error }, { status: 500 });
  }
}
