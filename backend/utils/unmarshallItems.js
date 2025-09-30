import { unmarshall } from "@aws-sdk/util-dynamodb";

export const unmarshallItems = (items) => {
  if (!items || items.length === 0) {
    return [];
  }
  return items.map((i) => {
    const item = unmarshall(i);
    return {
      noteId: item.noteId,
      username: item.username,
      note: item.note,
      createdAt: item.createdAt,
    };
  });
};
