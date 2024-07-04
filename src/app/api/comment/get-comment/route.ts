import { NextRequest, NextResponse } from "next/server";
import { GetCommand, GetCommandInput } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "@blogshow/db/dynamo";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const params: GetCommandInput = { TableName: "comment", Key: { id } };
    const data = await dynamoDB.send(new GetCommand(params));

    if (data.Item) {
      return NextResponse.json(data.Item, { status: 200 });
    } else {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error fetching comment", error }, { status: 500 });
  }
}
