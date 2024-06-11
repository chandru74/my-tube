import React from "react";

const LiveComments = ({ name, message }) => {
  return (
    <div>
      <div className="flex items-center p-4">
        <img
          className="h-8"
          src="https://cdn-icons-png.flaticon.com/128/64/64572.png"
          alt="user-icon"
        />
        <span className="mx-2 font-bold">{name}</span>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default LiveComments;
