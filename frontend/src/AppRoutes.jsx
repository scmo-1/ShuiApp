import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NotesPage from "./pages/NotesPage";
import SingleNotePage from "./pages/SingleNotePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NotesPage />} />
        <Route path="note">
          <Route path=":id" element={<div>NOTE</div>} />
          <Route path="create" element={<SingleNotePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
