import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Global } from "../helpers/Global";

//revisar
const initialState = {
  status: "",
  error: "",
  student: {
    id: "",
    name: "",
    email: "",
    image: "",
    bio: "",
    myHashtags: [],
    token: "",
  },
  activeStudent: {},
  followers: [],
  following: [],
  studentsList: {}, 
  allNotifications: [],
};

export const registerStudent = createAsyncThunk(
  "student/register",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${Global.url}student/register`, {
        ...values,
      });
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const loginStudent = createAsyncThunk(
  "student/login",
  async (values, { rejectWithValue }) => {
    // console.log(values)
    try {
      const { data } = await axios.post(`${Global.url}student/login`, {
        ...values,
      });
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "student/getProfile",
  async ({ token, studentId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Global.url}student/profile/${studentId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async ({ token, update }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${Global.url}student/update`,
        { name: update.name, bio: update.bio, image: update.image },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);
export const studentList = createAsyncThunk(
  "student/list",
  async ({ token }, { rejectWithValue }) => {
    try {
      // console.log(token)
      const response = await axios.get(
        `${Global.url}student/list`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const letsFollow = createAsyncThunk(
  "student/follow",
  async ({ token, followed }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Global.url}follow/save`,
        {followed},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const stopFollowing = createAsyncThunk(
  "student/unFollow",
  async ({ token, id }, { rejectWithValue }) => {
    // console.log(id)
    try {
      const response = await axios.delete(
        `${Global.url}follow/unFollow/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

// export const saveNotification = createAsyncThunk(
//   "student/notification",
//   async (values, { rejectWithValue }) => {
//     try {
//       const { token, category, fromStudent} = values;
//       console.log(values);
//       const { data } = await axios.post(
//         `${Global.url}notification/saveNotification`,
//         { category, fromStudent },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.error.message);
//     }
//   }
// )
// export const getAllNotifications = createAsyncThunk(
//   "student/getNotifications",
//   async (values, { rejectWithValue }) => {
//     try {
//       const { token} = values;
//       const { data } = await axios.get(
//         `${Global.url}notification/getAllNotifications`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.error.message);
//     }
//   }
// )
// export const deleteNotification = createAsyncThunk(
//   "student/deleteNotification",
//   async (values, { rejectWithValue }) => {
//     try {
//       const { token} = values;
//       const { data } = await axios.delete(
//         `${Global.url}notification/deleteNotification`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.error.message);
//     }
//   }
// )
// Cada clave en el objeto reducers representa el nombre de una acción y el valor es la función
// reductora que se ejecutará cuando esa acción sea despachada.
// Las funciones reductoras definidas aquí deben ser puras, lo que significa que no deben realizar
// efectos secundarios ni mutar el estado directamente, sino que deben devolver un nuevo estado basado en el
// estado actual y la acción.

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.student = {
        id: "",
        name: "",
        email: "",
        image: "",
        bio: "",
        myHashtags: [],
        token: "",
      };
    },
    setActiveStudent: (state, action) => {
      state.activeStudent = action.payload;
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  // Permite manejar múltiples acciones en una sección y proporciona una sintaxis más conveniente
  // para manejar el estado durante diferentes fases de operaciones asincrónicas (pendiente, cumplido, rechazado).
  extraReducers(builder) {
    builder
      .addCase(registerStudent.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.student = action.payload.student;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginStudent.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.student = action.payload.student;
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeStudent = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { name, image, bio } = action.payload.student;

        if (name) {
          state.student.name = name;
        }
        if (image) {
          state.student.image = image;
        }
        if (bio) {
          state.student.bio = bio;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(studentList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(studentList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentsList =  action.payload.students
        state.following = action.payload.student_following
        state.followers = action.payload.student_follow_me
      })
      .addCase(studentList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(letsFollow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(letsFollow.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.following.push(action.payload.follow.followed);

      })
      .addCase(letsFollow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(stopFollowing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(stopFollowing.fulfilled, (state, action) => {
        state.status = "succeeded";
         state.following = state.following.filter(id => id !== action.payload.unFollow.followed);

      })
      .addCase(stopFollowing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // .addCase(saveNotification.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(saveNotification.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   console.log(action.payload);
      //   console.log(state.notifications)
      //   // state.notifications = [...state.notifications, action.payload.notification];
      //   // console.log(state.notifications);
      // })
      // .addCase(saveNotification.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.payload;
      // });

  },
});

export const { logout, changeStatus, setActiveStudent } = studentSlice.actions;

export default studentSlice.reducer;
