import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Global } from "../helpers/Global";

const initialState = {
  status: "",
  error: "",
  publications: [],
  activePublication: {},
  activeComment:{},
  publicationsStudent: [],
};

export const savePublication = createAsyncThunk(
  "publication/save",
  async (values, { rejectWithValue }) => {
    try {
      const { token, text } = values;
      const { data } = await axios.post(
        `${Global.url}publication/save`,
        { text },
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
  "publication/feed",
  async (values, { rejectWithValue }) => {
    const { token } = values;
    // console.log(token)
    try {
      const { data } = await axios.get(
        `${Global.url}publication/feed`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const deletePub = createAsyncThunk(
  "publication/delete",
  async (data, { rejectWithValue }) => {
    try {
      const { token, publicationId } = data;
      const { data: unlikedPublication } = await axios.delete(
        `${Global.url}publication/deletePublication/${publicationId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return unlikedPublication;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getPublicationDetail = createAsyncThunk(
  "publication/detail",
  async (values, { rejectWithValue }) => {
    try {
      const { token, publicationId } = values;
      const { data } = await axios.get(
        `${Global.url}publication/detailPublication/${publicationId}`,
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

export const getPublicationStudent = createAsyncThunk(
  "publications/student",
  async (values, { rejectWithValue }) => {
    try {
      const { token, id } = values;
      const { data } = await axios.get(
        `${Global.url}publication/publicationStudent/${id}`,
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
export const likePublication = createAsyncThunk(
  "publication/like",
  async (values, { rejectWithValue }) => {
    // console.log(values);
    try {
      const { token, publicationId } = values;
      const { data } = await axios.post(
        `${Global.url}like/likePublication/${publicationId}`,
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

export const unlikePublication = createAsyncThunk(
  "publication/unlike",
  async (values, { rejectWithValue }) => {
    try {
      const { token, publicationId } = values;
      const { data } = await axios.delete(
        `${Global.url}like/unlikePublication/${publicationId}`,
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
  "publication/comment",
  async (values, { rejectWithValue }) => {
    try {
      const { token, publicationId, text } = values;
      // console.log(text);
      const { data } = await axios.post(
        `${Global.url}comment/commentPublication/${publicationId}`,
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
  "publication/comments",
  async (values, { rejectWithValue }) => {
    try {
      const { token, publicationId } = values;
      const { data } = await axios.get(
        `${Global.url}comment/getComments/${publicationId}`,
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
  "publication/commenat",
  async (values, { rejectWithValue }) => {
    try {
      const { token, commentId } = values;
      // console.log(token, commentId);
      const { data } = await axios.get(
        `${Global.url}comment/getComment/${commentId}`,
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
  "publication/deleteMeComment",
  async (values, { rejectWithValue }) => {
    try {
      const { token, commentId, publicationId } = values;
      const { data } = await axios.delete(
        `${Global.url}comment/deleteComment/${commentId}/${publicationId}`,
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

export const publicationSlice = createSlice({
  name: "publication",
  initialState,
  reducers: {
    setActivePublication: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(savePublication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(savePublication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.publications = [
          ...state.publications,
          { ...action.payload, likesCount: 0 },
        ];
      })
      .addCase(savePublication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getPublicationDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPublicationDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.activePublication = action.payload.publicationFound;
        // console.log(state.activePublication);
      })
      .addCase(getPublicationDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(feed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(feed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.publications = action.payload.publications; 
      })
      .addCase(feed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deletePub.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePub.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        const {deletedPublicationId} = action.payload;
        // console.log(deletedPublicationId)
        const updatedPublicationsStudent= state.publicationsStudent.filter((pub) => {
          return pub._id !== deletedPublicationId;
        });
        const updatedPublications = state.publications.filter((pub) => {
          return pub._id !== deletedPublicationId;
        });
        // console.log(updatedPublications);
        state.publications = updatedPublications;

        state.publicationsStudent = updatedPublicationsStudent;


      })
      .addCase(deletePub.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getPublicationStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPublicationStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.publicationsStudent = action.payload.publications;

      })
      .addCase(getPublicationStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(likePublication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likePublication.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        // console.log("state.publications", state.publications);
        const { publication, student, id } = action.payload.likes;

        const updatedPublications = state.publications.map((pub) => {
          if (pub._id === publication) {
            // Clona la publicación actual y agrega el id al array de "me gusta"

            // if (pub.likesCount==undefined) {
            //   pub.likesCount=0;
            //   return pub.likesCount
            // }
            // console.log(pub.likesCount);
            return {
              ...pub,
              likes: [...pub.likes, student],
              likesCount: (pub.likesCount || 0) + 1,
            };
          }
          return pub;
        });
        const updatedPublicationsStudent = state.publicationsStudent.map((pub) => {
          if (pub._id === publication) {
            // Clona la publicación actual y agrega el id al array de "me gusta"

            // if (pub.likesCount==undefined) {
            //   pub.likesCount=0;
            //   return pub.likesCount
            // }
            // console.log(pub.likesCount);
            return {
              ...pub,
              likes: [...pub.likes, student],
              likesCount: (pub.likesCount || 0) + 1,
            };
          }
          return pub;
        });
        // console.log(updatedPublications);
        state.publications = updatedPublications;

        state.publicationsStudent = updatedPublicationsStudent;
      })
      .addCase(likePublication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(unlikePublication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(unlikePublication.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        // console.log("state.publications", state.publications);
        const { publication, student, id } = action.payload;

        const updatedPublications = state.publications.map((pub) => {
          if (pub._id === publication) {
            // Filtra los "likes" para eliminar el estudiante que dio "unlike"
            return {
              ...pub,
              likes: pub.likes.filter(
                (likedStudentId) => likedStudentId !== student
              ),
            };
          }
          return pub;
        });
        // console.log(updatedPublications);
        state.publications = updatedPublications;
        const updatedPublicationsStudent = state.publicationsStudent.map((pub) => {
          if (pub._id === publication) {
            // Filtra los "likes" para eliminar el estudiante que dio "unlike"
            return {
              ...pub,
              likes: pub.likes.filter(
                (likedStudentId) => likedStudentId !== student
              ),
            };
          }
          return pub;
        });
        // console.log(updatedPublications);
        state.publicationsStudent = updatedPublicationsStudent;
      })
      .addCase(unlikePublication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(saveComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        const { publication, student, id } = action.payload.comment;
        const updatedPublications = state.publications.map((pub) => {
          if (pub._id === publication) {
            // Filtra los "likes" para eliminar el estudiante que dio "unlike"
            return {
              ...pub,
              comments: [...pub.comments, action.payload.comment],
            };
          }
          return pub;
        });
        state.publications = updatedPublications;
        const updatedPublicationsStudent = state.publicationsStudent.map((pub) => {
          if (pub._id === publication) {
            // Filtra los "likes" para eliminar el estudiante que dio "unlike"
            return {
              ...pub,
              comments: [...pub.comments, action.payload.comment],
            };
          }
          return pub;
        });
        state.publicationsStudent = updatedPublicationsStudent;
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

        const { publicationId, student, commentId } = action.payload;

        // const { publication, student, id } = action.payload.comment;
        const updatedPublications = state.publications.map((pub) => {
          if (pub._id === publicationId) {
            // Filtra los "likes" para eliminar el estudiante que dio "unlike"
            return {
              ...pub,
              comments: pub.comments.filter((comment) => comment !== commentId),
            };
          }
          return pub;
        });

        state.publications = updatedPublications;
        const updatedPublicationsStudent = state.publicationsStudent.map((pub) => {
          if (pub._id === publicationId) {
            // Filtra los "likes" para eliminar el estudiante que dio "unlike"
            return {
              ...pub,
              comments: pub.comments.filter((comment) => comment !== commentId),
            };
          }
          return pub;
        });

        state.publicationsStudent = updatedPublicationsStudent;
        // console.log(updatedPublications);
      })
      .addCase(deleteMeComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setActivePublication } = publicationSlice.actions;

export default publicationSlice.reducer;
