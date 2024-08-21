import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Global } from "../helpers/Global";

const initialState = {
  status: "",
  error: "",
  projects: [],
  activeProject: {},
  activeComment: {},
  projectsStudent: [],
  file: [],
  notifications: [],
};

export const saveProject = createAsyncThunk(
  "project/save",
  async (values, { rejectWithValue }) => {
    try {
      const { token, title, description, place, date, file } = values;
      const { data } = await axios.post(
        `${Global.url}project/save`,
        { title, description, place, date, file },
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
);

export const feed = createAsyncThunk(
  "project/feed",
  async (values, { rejectWithValue }) => {
    const { token, page } = values;
    try {
      const { data } = await axios.get(
        `${Global.url}project/feed/${page}`,
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
);

export const deleteProject = createAsyncThunk(
  "project/delete",
  async (data, { rejectWithValue }) => {
    try {
      const { token, projectId } = data;
      const { data: unlikedProject } = await axios.delete(
        `${Global.url}project/deleteProject/${projectId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return unlikedProject;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getProjectDetail = createAsyncThunk(
  "project/detail",
  async (values, { rejectWithValue }) => {
    try {
      const { token, projectId } = values;
      const { data } = await axios.get(
        `${Global.url}project/detailProject/${projectId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getProjectStudent = createAsyncThunk(
  "projects/student",
  async (values, { rejectWithValue }) => {
    try {
      const { token, id } = values;
      const { data } = await axios.get(
        `${Global.url}project/projectStudent/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);


// Acciones asíncronas para likes
export const likeProject = createAsyncThunk(
  "project/like",
  async (values, { rejectWithValue }) => {
    // console.log(values);
    try {
      const { token, projectId } = values;
      const { data } = await axios.post(
        `${Global.url}likeProject/likeProject/${projectId}`,
        {},
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
);

export const unlikeProject = createAsyncThunk(
  "project/unlike",
  async (values, { rejectWithValue }) => {
    try {
      const { token, projectId } = values;
      const { data } = await axios.delete(
        `${Global.url}likeProject/unlikeProject/${projectId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data;
      // console.log(data);
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

//ACIONES ASINCRONAS PARA LOS COMENTARIOS
export const saveComment = createAsyncThunk(
  "project/comment",
  async (values, { rejectWithValue }) => {
    try {
      const { token, projectId, text } = values;
      // console.log(text);
      const { data } = await axios.post(
        `${Global.url}commentProject/commentProject/${projectId}`,
        { text: text },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getComments = createAsyncThunk(
  "project/comments",
  async (values, { rejectWithValue }) => {
    try {
      const { token, projectId } = values;
      const { data } = await axios.get(
        `${Global.url}commentProject/getComments/${projectId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);
export const getComment = createAsyncThunk(
  "project/commenat",
  async (values, { rejectWithValue }) => {
    try {
      const { token, commentId } = values;
      // console.log(token, commentId);
      const { data } = await axios.get(
        `${Global.url}commentProject/getComment/${commentId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const deleteMeComment = createAsyncThunk(
  "project/deleteMeComment",
  async (values, { rejectWithValue }) => {
    try {
      const { token, commentId, projectId } = values;
      const { data } = await axios.delete(
        `${Global.url}commentProject/deleteComment/${commentId}/${projectId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const saveNotification = createAsyncThunk(
  "student/notification",
  async (values, { rejectWithValue }) => {
    try {
      const { token, category, fromStudent} = values;
      console.log(values);
      const { data } = await axios.post(
        `${Global.url}notification/saveNotification`,
        { category, fromStudent },
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
        `${Global.url}notification/getAllNotifications`,
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
export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setActiveProject: (state, action) => {
      state.activeConversation = action.payload;
    },
    addFiles: (state, action) => {
      state.file = [...state.file, action.payload];
    },
    clearFiles: (state, action) => {
      state.file = [];
    },
    removeFileFromFiles: (state, action) => {
      let index = action.payload;
      let files = [...state.file];
      let fileToRemove = [files[index]];
      state.file= files.filter((file) => !fileToRemove.includes(file));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(saveProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects.push(action.payload);
      })
      .addCase(saveProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProjectDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProjectDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.activeProject = action.payload.projectFound;
        // console.log(state.activePublication);
      })
      .addCase(getProjectDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(feed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(feed.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload)
        state.projects = action.payload.projects; // Actualizado para incluir las publicaciones en el estado
      })
      .addCase(feed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        const { deletedProjectId } = action.payload;
        const updatedProjects = state.projects.filter((pro) => {
          return pro._id !== deletedProjectId;
        });
        state.projects = updatedProjects;
        const updatedProjectsStudent = state.projectsStudent.filter((pro) => {
          return pro._id !== deletedProjectId;
        });
        state.projectsStudent = updatedProjectsStudent;


      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProjectStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProjectStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.projectsStudent = action.payload.projects;

      })
      .addCase(getProjectStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(likeProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likeProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        // console.log("state.publications", state.publications);
        const { project, student, id } = action.payload.likes;

        const updatedProjects = state.projects.map((pro) => {
          if (pro._id === project) {
            // Clona la publicación actual y agrega el id al array de "me gusta"

            // if (pub.likesCount==undefined) {
            //   pub.likesCount=0;
            //   return pub.likesCount
            // }
            // console.log(pub.likesCount);
            return {
              ...pro,
              likes: [...pro.likes, student],
              likesCount: (pro.likesCount || 0) + 1,
            };
          }
          return pro;
        });
        // console.log(updatedPublications);
        state.projects = updatedProjects;


        const updatedProjectsStudent = state.projectsStudent.map((pro) => {
          if (pro._id === project) {
            // Clona la publicación actual y agrega el id al array de "me gusta"

            // if (pub.likesCount==undefined) {
            //   pub.likesCount=0;
            //   return pub.likesCount
            // }
            // console.log(pub.likesCount);
            return {
              ...pro,
              likes: [...pro.likes, student],
              likesCount: (pro.likesCount || 0) + 1,
            };
          }
          return pro;
        });
        // console.log(updatedPublications);
        state.projectsStudent = updatedProjectsStudent;
      })
      .addCase(likeProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(unlikeProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(unlikeProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        // console.log("state.publications", state.publications);
        const { project, student, id } = action.payload;

        const updatedProjects = state.projects.map((pro) => {
          if (pro._id === project) {
            // Filtra los "likes" para eliminar el estudiante que dio "unlike"
            return {
              ...pro,
              likes: pro.likes.filter(
                (likedStudentId) => likedStudentId !== student
              ),
            };
          }
          return pro;
        });
        // console.log(updatedPublications);
        state.projects = updatedProjects;
        const updatedProjectsStudent = state.projectsStudent.map((pro) => {
          if (pro._id === project) {
            // Filtra los "likes" para eliminar el estudiante que dio "unlike"
            return {
              ...pro,
              likes: pro.likes.filter(
                (likedStudentId) => likedStudentId !== student
              ),
            };
          }
          return pro;
        });
        // console.log(updatedPublications);
        state.projectsStudent = updatedProjectsStudent;
      })
      .addCase(unlikeProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(saveComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        const { project, student, id } = action.payload.comment;
        const updatedProjects = state.projects.map((pub) => {
          if (pub._id === project) {
            // Filtra los "likes" para eliminar el estudiante que dio "unlike"
            return {
              ...pub,
              comments: [...pub.comments, action.payload.comment],
            };
          }
          return pub;
        });
        state.projects = updatedProjects;
        const updatedProjectsStudent = state.projectsStudent.map((pub) => {
          if (pub._id === project) {
            // Filtra los "likes" para eliminar el estudiante que dio "unlike"
            return {
              ...pub,
              comments: [...pub.comments, action.payload.comment],
            };
          }
          return pub;
        });
        state.projectsStudent = updatedProjectsStudent;
      })
      .addCase(saveComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
      })
      .addCase(getComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getComment.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(getComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteMeComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMeComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);

        const { projectId, student, commentId } = action.payload;

        // const { publication, student, id } = action.payload.comment;
        const updatedProjects = state.projects.map((pub) => {
          if (pub._id === projectId) {
            // Filtra los "likes" para eliminar el estudiante que dio "unlike"
            return {
              ...pub,
              comments: pub.comments.filter((comment) => comment !== commentId),
            };
          }
          return pub;
        });

        state.projects = updatedProjects;
        const updatedProjectsStudent = state.projectsStudent.map((pub) => {
          if (pub._id === projectId) {
            // Filtra los "likes" para eliminar el estudiante que dio "unlike"
            return {
              ...pub,
              comments: pub.comments.filter((comment) => comment !== commentId),
            };
          }
          return pub;
        });

        state.projectsStudent = updatedProjectsStudent;

        // console.log(updatedPublications);
      })
      .addCase(deleteMeComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(saveNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveNotification.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.notifications = [...state.notifications, action.payload.notification];
        console.log(state.notifications);
      })
      .addCase(saveNotification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const {
  setActiveProject,
  addFiles,
  clearFiles,
  removeFileFromFiles
} = projectSlice.actions;

export default projectSlice.reducer;
