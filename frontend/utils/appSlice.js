import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    name: "",
    chats: [],
  },
  reducers: {
    addName: (state, action) => {
      state.name = action.payload;
    },
    addChat: (state, action) => {
      state.chats.unshift(action.payload);
    },
    clearChat: (state) => {
      state.chats = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addName, addChat, clearChat } = appSlice.actions;

export default appSlice.reducer;
