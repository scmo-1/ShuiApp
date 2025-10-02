import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Layout() {
  return (
    <>
      <Header />
      <main className="pt-40 px-3  flex flex-col items-center min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
