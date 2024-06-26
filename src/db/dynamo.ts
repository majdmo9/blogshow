import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: String(process.env.AMPLIFY_AMAZON_REGION),
  credentials: {
    accessKeyId: String(process.env.AMPLIFY_AMAZON_CLIENT_ID),
    secretAccessKey: String(process.env.AMPLIFY_AMAZON_CLIENT_SECRET),
  },
});

const dynamoDB = DynamoDBDocumentClient.from(client);

export default dynamoDB;
