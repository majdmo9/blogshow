import { NextRequest, NextResponse } from "next/server";
import { GetCommand, GetCommandInput } from "@aws-sdk/lib-dynamodb";
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
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (!id || !userId) {
      return NextResponse.json({ message: "Both 'id' and 'userId' are required" }, { status: 400 });
    }

    const userStatus = await kvAPI.CRUD.getUser(userId);

    if (userStatus === null || userStatus.read > MaxReadLimit) {
      return NextResponse.json({ message: "User has exceeded maximum read limit" }, { status: 403 });
    }

    if (user.userId !== String(process.env.OWNER_USER_ID)) {
      await kvAPI.CRUD.updateUser({ userId, create: userStatus.create, read: userStatus.read + 1 });
    }

    const params: GetCommandInput = { TableName: "post", Key: { id } };
    const data = await dynamoDB.send(new GetCommand(params));

    if (data.Item) {
      return NextResponse.json(data.Item, { status: 200 });
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error fetching post", error }, { status: 500 });
  }
}
