import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closemenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [SearchParams] = useSearchParams();
  console.log(SearchParams.get('v'))
  useEffect(() => {
    dispatch(closemenu());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-5">
      <iframe
        width="1080"
        height="600"
        src={"https://www.youtube.com/embed/" + SearchParams.get("v") + "?autoplay=1"}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default WatchPage;
