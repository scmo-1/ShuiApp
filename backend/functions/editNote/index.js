import { dbClient } from "../../services/db.js";
import { response } from "../../utils/response.js";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";

export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Success",
    }),
  };
};
