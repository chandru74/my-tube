import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) return;

  return (
    <div className="w-48 shadow-lg p-5">
      <ul className="">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>Shorts</li>
        <li>Subscriptions</li>
      </ul>
      <h1 className="font-bold mt-2 ">Explore</h1>
      <ul className="">
        <li>Trending</li>
        <li>Music</li>
        <li>Sports</li>
        <li>Movies</li>
        <li>Shopping</li>
        <li>News</li>
      </ul>
    </div>
  );
};

export default Sidebar;
