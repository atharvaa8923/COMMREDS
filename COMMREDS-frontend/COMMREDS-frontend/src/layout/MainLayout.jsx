import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* <-- This renders the child routes */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
