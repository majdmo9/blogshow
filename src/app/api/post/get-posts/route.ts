import { NextRequest, NextResponse } from "next/server";
import { ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "@blogshow/db/dynamo";
import { kvAPI } from "@blogshow/Api/kv/api";
import { MaxReadLimit } from "@blogshow/utils/constants";
import { runWithAmplifyServerContext } from "@blogshow/lib/amplify-server-utils";
import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const user = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: contextSpec => getCurrentUser(contextSpec),
    });

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") as string;
    const limit = searchParams.get("limit") as string;
    const nextKey = searchParams.get("nextKey") as string | undefined;

    const limitInt = Number(limit);

    const userStatus = await kvAPI.CRUD.getUser(userId);

    if (userStatus === null || userStatus.read > MaxReadLimit) {
      return NextResponse.json({ message: "User has exceeded maximum read limit" }, { status: 403 });
    }

    if (user.userId !== String(process.env.OWNER_USER_ID)) {
      await kvAPI.CRUD.updateUser({ userId, create: userStatus.create, read: userStatus.read + 1 });
    }

    if (limitInt < 1 || limitInt > 10) {
      return NextResponse.json({ message: "Limit must be between 1 and 10" }, { status: 400 });
    }

    const params: ScanCommandInput = {
      TableName: "post",
      Limit: limitInt,
    };

    if (nextKey) {
      params.ExclusiveStartKey = JSON.parse(nextKey);
    }

    const data = await dynamoDB.send(new ScanCommand(params));
    const nextKeyResponse = data.LastEvaluatedKey ? JSON.stringify(data.LastEvaluatedKey) : null;

    return NextResponse.json({ data: data.Items, nextKey: nextKeyResponse }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching posts", error }, { status: 500 });
  }
}
