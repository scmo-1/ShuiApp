import { unmarshall } from "@aws-sdk/util-dynamodb";

export const unmarshallItems = (items) => {
  if (!items || items.length === 0) {
    return [];
  } else {
    return items.map((i) => unmarshall(i));
  }
};
