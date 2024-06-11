import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ info }) => {
  console.log(info);
  if (!info) return;
  const { snippet, statistics, id } = info;
  const { thumbnails, title, channelTitle } = snippet;

  return (
    <div>
      <Link to={"/watch?v=" + id}>
        <div className="m-2 p-2 w-64">
          <img
            className="rounded-lg"
            src={thumbnails.medium.url}
            alt="thumbnails"
          />
          <ul>
            <li className="font-bold py-2">{title}</li>
            <li>{channelTitle}</li>
            <li>{statistics.viewCount} views</li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
