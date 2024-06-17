import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closemenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import LiveComments from "./LiveComments";
import { addMessage, clearMessages } from "../utils/chatSlice";
import { generateRandomName, generateRandomText } from "../utils/helper";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [SearchParams] = useSearchParams();
  const chatMessages = useSelector((store) => store.chat.messages);
  const [liveMessage, setLiveMessage] = useState("");
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  useEffect(() => {
    dispatch(closemenu());
    dispatch(clearMessages())
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomText(20),
        })
      );
    }, 2000);

    return () => {
      clearInterval(i);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = () => {
    dispatch(
      addMessage({
        name: "Chandru",
        message: liveMessage,
      })
    );
    setLiveMessage("");
  };
  return (
    <>
      <div className="p-5 flex w-full">
        <div>
          <iframe
            width={isMenuOpen ? 900 : 1080}
            height="600"
            src={
              "https://www.youtube.com/embed/" +
              SearchParams.get("v") +
              "?autoplay=1"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex-col w-[25%]">
          <div className="flex mx-2 border border-gray-500 w-full rounded-lg h-[600px] overflow-y-scroll flex-col-reverse">
            {chatMessages?.map((c) => (
              <LiveComments name={c.name} message={c.message} />
            ))}
          </div>
          <form
            className="mx-2 border border-gray-500 w-full rounded-lg"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="w-4/5 outline-none px-2"
              type="text"
              placeholder="Enter your message"
              value={liveMessage}
              onChange={(e) => {
                setLiveMessage(e.target.value);
              }}
            />
            <button
              className="w-1/5 border border-black p-2 rounded-lg"
              onClick={() => handleSend()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default WatchPage;
