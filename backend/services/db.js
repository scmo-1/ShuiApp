import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const dbClient = new DynamoDBClient({ region: "eu-north-1" });

export { dbClient };
