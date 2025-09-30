import { dbClient } from "../../services/db.js";
import { response } from "../../utils/response.js";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";

export const handler = async (event) => {
  try {
    const { noteId } = event.pathParameters;

    if (!event.body) {
      return response(400, "Request must include body");
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (error) {
      return response(400, "Invalid JSON format");
    }

    const { note } = body;
    if (!note) {
      return response(400, "Note must be provided");
    }
    if (note.trim().length < 3) {
      return response(400, "Note must inlcude more than 3 characters");
    }

    const command = new UpdateItemCommand({
      TableName: "ShuiNotesTable",
      Key: {
        pk: { S: "NOTE#" },
        sk: { S: `ID#${noteId}` },
      },
      UpdateExpression: "SET #note = :note",
      ExpressionAttributeNames: {
        "#note": "note",
      },
      ExpressionAttributeValues: {
        ":note": { S: note },
      },
      ConditionExpression: "attribute_exists(sk)",
    });

    await dbClient.send(command);
    return response(200, "Note updated successfully");
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      return response(404, "Note not found");
    }
    console.log("Edit note error:", error);
    return response(500, "Internal Server Error");
  }
};
