import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { dbClient } from "../../services/db.js";
import { response } from "../../utils/response.js";

export const handler = async (event) => {
  try {
    const { noteId } = event.pathParameters;

    if (!noteId) {
      return response(400, "No noteId provided");
    }

    const command = new DeleteItemCommand({
      TableName: "ShuiNotesTable",
      Key: {
        pk: { S: "NOTE#" },
        sk: { S: `ID#${noteId}` },
      },
      ConditionExpression: "attribute_exists(sk)",
    });

    await dbClient.send(command);

    return response(200, "Note deleted successfully");
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      return response(404, "Note with provided ID not found");
    }
    console.error("Delete note error:", error);
    return response(500, "Internal Server Error");
  }
};
