import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { dbClient } from "../../services/db.js";

export const handler = async (event) => {
  try {
    const command = new QueryCommand({
      TableName: "ShuiNotesTable",
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "NOTES#" },
      },
    });

    const result = await dbClient.send(command);
    const notes = result.Items.map((note) => unmarshall(note));

    return {
      statusCode: 200,
      body: JSON.stringify({
        notes: notes,
        message: "success",
      }),
    };
  } catch (error) {
    console.error("Error in getAllNotes:", error.message);
  }
};
