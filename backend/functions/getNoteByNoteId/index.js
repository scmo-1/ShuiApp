import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshallItems } from "../../utils/unmarshallItems.js";
import { dbClient } from "../../services/db.js";
import { response } from "../../utils/response.js";

export const handler = async (event) => {
  try {
    const { noteId } = event.pathParameters;

    const command = new QueryCommand({
      TableName: "ShuiNotesTable",
      KeyConditionExpression: "pk = :pk AND sk = :sk",
      ExpressionAttributeValues: {
        ":pk": { S: "NOTE#" },
        ":sk": { S: `ID#${noteId}` },
      },
    });

    const result = await dbClient.send(command);

    if (result.Count < 1) {
      return response(404, "Note with provided ID not found");
    }

    const note = unmarshallItems(result.Items);

    return response(200, "Notes fetched successfully", note);
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
