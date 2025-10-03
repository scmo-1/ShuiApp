import axios from "axios";

const api = axios.create({
  baseURL: "https://j68ny3c8l8.execute-api.eu-north-1.amazonaws.com",
});

export const getAllNotes = async () => {
  const response = await api.get("/api/notes");
  return response.data;
};

export const deleteNoteById = async (query) => {
  const response = await api.delete(`/api/note/${query}`);
  return response.data || null;
};

export const getNoteByName = async (query) => {
  const response = await api.get(`/api/notes/user/${query}`);
  return response.data;
};

export const createNote = async (data) => {
  const response = await api.post("/api/note", data);
  return response.data;
};

export const updateNote = async (query, data) => {
  const response = await api.put(`/api/note/${query}`, { note: data });
  return response.data;
};
