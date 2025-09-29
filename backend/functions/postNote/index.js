import { dbClient } from "../../services/db.js";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { response } from "../../utils/response.js";
import { v4 as uuid } from "uuid";

export const handler = async (event) => {
  const nameRegex = /^[a-zA-ZåäöÅÄÖ\s-]+$/;
  try {
    if (!event.body) {
      return response(400, "Body must be provided");
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (error) {
      return response(400, "Invalid JSON format");
    }
    const { username, note } = body;

    if (!username || !note) {
      return response(400, "Both name and note must be provided");
    }
    if (username.trim().length < 2) {
      return response(400, "Name must be at least 2 characters long");
    }
    if (!nameRegex.test(username)) {
      return response(400, "Note contains invalid characters");
    }
    if (note.trim().length < 3) {
      return response(400, "Note must be atleast 3 characters long");
    }

    const noteId = uuid().substring(0, 7);

    const command = new PutItemCommand({
      TableName: "ShuiNotesTable",
      Item: {
        pk: { S: "NOTE#" },
        sk: { S: `ID#${noteId}` },
        username: { S: username },
        note: { S: note },
        createdAt: { S: new Date().toISOString() },
        noteId: { S: noteId },
      },
    });

    await dbClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Note created successfully",
      }),
    };
  } catch (error) {
    console.error("Post new note error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};
