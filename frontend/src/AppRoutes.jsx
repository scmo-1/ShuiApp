import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NotesPage from "./pages/NotesPage";
import CreateNotePage from "./pages/CreateNotePage";
import EditNotePage from "./pages/EditNotePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NotesPage />} />
        <Route path="note">
          <Route path=":id" element={<EditNotePage />} />
          <Route path="create" element={<CreateNotePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
