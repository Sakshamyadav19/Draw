import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    name: "",
    totalPlayers:0,
  },
  reducers: {
    addName: (state, action) => {
      state.name = action.payload;
    },
    updateTotalPlayers:(state,action)=>{
      state.totalPlayers=action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { addName,updateTotalPlayers } = appSlice.actions;

export default appSlice.reducer;
