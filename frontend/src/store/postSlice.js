import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts.filter((post) => post._id !== action.payload._id);
    },
  },
});

export const { addPost, deletePost, getPosts } = postSlice.actions;

export default postSlice.reducer;
