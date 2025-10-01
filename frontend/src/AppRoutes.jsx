import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Home</div>} />
        <Route path="note">
          <Route path=":id" element={<div>NOTE</div>} />
          <Route path="create" element={<div>Create</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
