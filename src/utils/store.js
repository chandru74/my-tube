import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import searchReducer from "./searchSlice"
import chatSlice from "./chatSlice";
import videosSlice from "./videosSlice";

const store = configureStore({
    reducer:{
        app: appReducer,
        search: searchReducer,
        chat: chatSlice,
        videos: videosSlice
    }
})

export default store;