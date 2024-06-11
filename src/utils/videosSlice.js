import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videoList: [],
  },
  reducers: {
    updateVideos: (state, action) => {
      state.videoList = action.payload;
    },
  },
});

export const { updateVideos } = videosSlice.actions;
export default videosSlice.reducer;
