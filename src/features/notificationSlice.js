import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Global } from "../helpers/Global";

//revisar
const initialState = {
  status: "",
  error: "",
  notifications: [],
  countNotification: 0,
};

export const saveNotification = createAsyncThunk(
  "student/notification",
  async (values, { rejectWithValue }) => {
    try {
      const { token, category, fromStudent, project} = values;
      const { data } = await axios.post(
        `${Global.url}notification/saveNotification`,
        { category, fromStudent, project },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
)
export const getAllNotifications = createAsyncThunk(
  "student/getNotifications",
  async (values, { rejectWithValue }) => {
    try {
      const { token} = values;
      const { data } = await axios.get(
        `${Global.url}notification/getNotifications`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
)
export const deleteNotification = createAsyncThunk(
  "student/deleteNotification",
  async (values, { rejectWithValue }) => {
    try {
      const { token} = values;
      const { data } = await axios.delete(
        `${Global.url}notification/deleteNotification`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
)

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers:{
    updateNotificationCount: (state, action) => {
      console.log(action.payload)
      state.countNotification = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(saveNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveNotification.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        // console.log(state.notifications)
        state.notifications = [ action.payload.notification, ...state.notifications];
        state.countNotification = state.countNotification + 1;
        // console.log(state.notifications);
      })
      .addCase(saveNotification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

  },
});
export const { updateNotificationCount } = notificationSlice.actions;

export default notificationSlice.reducer;
