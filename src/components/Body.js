import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex relative top-[5vh] md:top-[10vh]">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Body;
