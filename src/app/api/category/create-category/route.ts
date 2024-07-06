import { NextRequest, NextResponse } from "next/server";
import docClient from "@blogshow/db/dynamo";
import { CategoryProps } from "@blogshow/types/category";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export async function POST(req: NextRequest) {
  try {
    const { id, image, color } = (await req.json()) as CategoryProps & { color: string };

    const params = {
      TableName: "category",
      Item: { id, image, color },
    };
    await docClient.send(new PutCommand(params));
    return NextResponse.json({ message: "Category created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating category", error }, { status: 500 });
  }
}
