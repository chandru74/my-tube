import React, { useEffect, useState } from "react";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch } from "react-redux";
import { YOUTUBE_SEARCH_API } from "../utils/constants";

const Head = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      getSuggestions();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const getSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
  };

  const toggleSidebarhandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-4 shadow-lg w-full fixed bg-white z-10">
      <div className="flex col-span-1">
        <img
          className="h-8 cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/128/6015/6015685.png"
          alt="menu"
          onClick={() => toggleSidebarhandler()}
        />
        <img
          className="h-8 mx-4"
          src="https://cdn-icons-png.flaticon.com/128/725/725300.png"
          alt="logo"
        />
      </div>
      <div className="col-span-10">
        <div>
          <input
            className="w-1/2 border border-gray-300 px-4 py-2 rounded-l-full"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setShowSuggestion(false)}
          />
          <button className="p-2 bg-gray-300 rounded-r-full">Search</button>
        </div>
        {showSuggestion && (
          <div className="fixed bg-white w-2/5 px-4 py-2">
            {suggestions?.map((s) => (
              <p className="pt-2 hover:bg-gray-200">{s}</p>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-1 justify-self-end">
        <img
          className="h-8"
          src="https://cdn-icons-png.flaticon.com/128/64/64572.png"
          alt="user-icon"
        />
      </div>
    </div>
  );
};

export default Head;
