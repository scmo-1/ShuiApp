import axios from "axios";

const api = axios.create({
  baseURL: "https://87ua2ygez2.execute-api.eu-north-1.amazonaws.com",
});

export const getAllNotes = async () => {
  const response = await api.get("/api/notes");
  return response.data;
};
