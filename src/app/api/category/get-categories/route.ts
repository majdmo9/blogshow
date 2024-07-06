import { NextResponse } from "next/server";
import { ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "@blogshow/db/dynamo";

export async function PUT() {
  const params: ScanCommandInput = {
    TableName: "category",
  };

  try {
    const data = await dynamoDB.send(new ScanCommand(params));
    return NextResponse.json({ data: data.Items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching posts", error }, { status: 500 });
  }
}
