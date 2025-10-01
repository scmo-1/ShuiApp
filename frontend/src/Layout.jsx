import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div>Header</div>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
