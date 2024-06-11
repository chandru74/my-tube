import React, { useEffect } from "react";
import { YOUTUBE_VIDEO_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { updateVideos } from "../utils/videosSlice";

const VideoContainer = () => {
  const videos = useSelector((store) => store.videos.videoList);

  const dispatch = useDispatch();
  useEffect(() => {
    if(!videos.length){
        getVideos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEO_API);
    const json = await data.json();
    dispatch(updateVideos(json.items));
  };
  return (
    <div className="flex flex-wrap justify-between">
      {videos?.map((video, index) => (
        <VideoCard key={index} info={video} />
      ))}
    </div>
  );
};

export default VideoContainer;
