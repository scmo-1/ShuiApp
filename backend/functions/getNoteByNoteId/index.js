import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshallItems } from "../../utils/unmarshallItems.js";
import { dbClient } from "../../services/db.js";
import { response } from "../../utils/response.js";

export const handler = async (event) => {
  try {
    const { noteId } = event.pathParameters;
    if (!noteId) {
      return response(400, "No noteId provided");
    }
    const command = new QueryCommand({
      TableName: "ShuiNotesTable",
      KeyConditionExpression: "pk = :pk AND sk = :sk",
      ExpressionAttributeValues: {
        ":pk": { S: "NOTE#" },
        ":sk": { S: `ID#${noteId}` },
      },
    });

    const result = await dbClient(command);
    if (result.Count === 0) {
    }

    const note = unmarshallItems(result.items);
  } catch (error) {
    console.error("get note by noteId error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};
