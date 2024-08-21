import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Global } from "../helpers/Global";

const initialState = {
  status: "",
  error: "",
  activeComment: {},
};



export const commetSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
      setActiveComment: (state, action) => {
        // console.log(action.payload);
        state.activeComment = action.payload;
      },
    },
})


export const {
  setActiveComment,
} = commetSlice.actions;

export default commetSlice.reducer;
