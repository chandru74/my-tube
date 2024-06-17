import React, { useEffect, useState } from "react";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { YOUTUBE_SEARCH_API, YOUTUBE_SUGGESTION_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { updateVideos } from "../utils/videosSlice";

const Head = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const getSuggestions = async () => {
    const data = await fetch(YOUTUBE_SUGGESTION_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleSidebarhandler = () => {
    dispatch(toggleMenu());
  };

  const handleSuggestionClick = (s) => {
    setSearchQuery(s);
    setShowSuggestion(false);
    handleSearch();
  };

  const handleSearch = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    dispatch(updateVideos(json.items));
    setShowSuggestion(false);
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
        <a href="/"> <img
          className="h-8 mx-4"
          src="https://cdn-icons-png.flaticon.com/128/725/725300.png"
          alt="logo"
        /></a>
      </div>
      <div className="col-span-10">
        <div>
          <input
            className="w-1/2 border border-gray-300 px-4 py-2 rounded-l-full"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            // onBlur={() => setShowSuggestion(false)}
          />
          <button
            className="p-2 bg-gray-300 rounded-r-full"
            onClick={() => handleSearch()}
          >
            Search
          </button>
        </div>
        {showSuggestion && (
          <div className="fixed bg-white w-2/5 px-4 py-2">
            {suggestions?.map((s) => (
              <div
                key={s}
                className="pt-2 hover:bg-gray-200"
                onClick={() => handleSuggestionClick(s)}
              >
                {s}
              </div>
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
