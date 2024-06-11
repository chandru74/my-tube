import React from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateVideos } from "../utils/videosSlice";

const Button = ({ name }) => {
  const dispatch = useDispatch();

  const handleSuggestionClick = (name) => {
    handleSearch(name);
  };

  const handleSearch = async (name) => {
    const data = await fetch(YOUTUBE_SEARCH_API + name);
    const json = await data.json();
    dispatch(updateVideos(json.items));
  };
  return (
    <div>
      <button
        className="px-5 py-2 m-2 bg-gray-200 rounded-lg"
        onClick={() => handleSuggestionClick(name)}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
