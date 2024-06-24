import type { NextApiRequest, NextApiResponse } from "next";
import { ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "@/db/dynamo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const params: ScanCommandInput = {
    TableName: "category",
  };

  try {
    const data = await dynamoDB.send(new ScanCommand(params));
    res.status(200).json({ data: data.Items });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
}
