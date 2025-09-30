import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { dbClient } from "../../services/db.js";
import { response } from "../../utils/response.js";
import { unmarshallItems } from "../../utils/unmarshallItems.js";

export const handler = async (event) => {
  try {
    const { username } = event.pathParameters;
    if (!username) {
      return response(400, "Username must be provided");
    }

    const command = new QueryCommand({
      TableName: "ShuiNotesTable",
      IndexName: "usernameIndex",
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": { S: username },
      },
    });
    const result = await dbClient.send(command);

    if (result.Count < 1) {
      return response(404, "No notes found for the given username");
    }

    const notes = unmarshallItems(result.Items);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Success",
        data: notes,
      }),
    };
  } catch (error) {
    console.error("get not by user error", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};
