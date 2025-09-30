import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshallItems } from "../../utils/unmarshallItems.js";
import { dbClient } from "../../services/db.js";
import { response } from "../../utils/response.js";

export const handler = async (event) => {
  try {
    const command = new QueryCommand({
      TableName: "ShuiNotesTable",
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "NOTE#" },
      },
    });

    const result = await dbClient.send(command);
    const notes = unmarshallItems(result.Items);

    return response(200, "Notes fetched successfully", notes);
  } catch (error) {
    console.error("Error in getAllNotes:", error.message);
  }
};
