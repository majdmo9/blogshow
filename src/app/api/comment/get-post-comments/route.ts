import { NextRequest, NextResponse } from "next/server";
import { QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "@blogshow/db/dynamo";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const params: QueryCommandInput = {
      TableName: "comment",
      IndexName: "post_id-index",
      KeyConditionExpression: "post_id = :post_id",
      ExpressionAttributeValues: {
        ":post_id": postId,
      },
    };

    const data = await dynamoDB.send(new QueryCommand(params));

    if (data.Items && data.Items.length > 0) {
      return NextResponse.json(data.Items, { status: 200 });
    } else {
      return NextResponse.json({ message: "No comments for this blog!" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error fetching comments", error }, { status: 500 });
  }
}
