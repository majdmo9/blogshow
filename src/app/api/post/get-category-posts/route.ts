import { NextRequest, NextResponse } from "next/server";
import { QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "@blogshow/db/dynamo";
import { kvAPI } from "@blogshow/Api/kv/api";
import { MaxReadLimit } from "@blogshow/utils/constants";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") as string;
    const nextKey = searchParams.get("nextKey") as string | undefined;
    const userId = searchParams.get("userId") as string;
    const category = searchParams.get("category") as string;
    const limitInt = Number(limit);

    const userStatus = await kvAPI.CRUD.getUser(userId);

    if (userStatus === null || userStatus.read > MaxReadLimit) {
      return NextResponse.json({ message: "User has exceeded maximum read limit" }, { status: 403 });
    }

    await kvAPI.CRUD.updateUser({ userId, create: userStatus.create, read: userStatus.read + 1 });

    if (limitInt < 1 || limitInt > 10) {
      return NextResponse.json({ message: "Limit must be between 1 and 10" }, { status: 400 });
    }

    const params: QueryCommandInput = {
      TableName: "post",
      IndexName: "category-index",
      KeyConditionExpression: "category = :category",
      ExpressionAttributeValues: { ":category": category },
      Limit: limitInt,
    };

    if (nextKey) {
      params.ExclusiveStartKey = JSON.parse(nextKey);
    }

    const data = await dynamoDB.send(new QueryCommand(params));
    const nextKeyResponse = data.LastEvaluatedKey ? JSON.stringify(data.LastEvaluatedKey) : null;

    return NextResponse.json({ data: data.Items, nextKey: nextKeyResponse }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching posts", error }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
