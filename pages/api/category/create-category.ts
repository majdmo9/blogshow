import docClient from "@blogshow/db/dynamo";
import { CategoryProps } from "@blogshow/types/category";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, image, color } = req.body as CategoryProps & { color: string };

  const params = {
    TableName: "category",
    Item: { id, image, color },
  };

  try {
    await docClient.send(new PutCommand(params));
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
}
