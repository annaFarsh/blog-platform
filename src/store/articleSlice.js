import { createSlice } from "@reduxjs/toolkit";
import {
  getArticles,
  getOneArticle,
  createArticle,
} from "../API/fetchRequestArticles";
import uuid from "react-uuid";

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    status: "",
    error: null,
    articlesCount: 0,
    article: null,
    tags: [],
  },
  reducers: {
    setTag(state, action) {
      const value = action.payload.valueInput;
      const id = uuid();
      const tag = { value: value, id: id };
      state.tags = [...state.tags, tag];
    },
    deleteTag(state, action) {
      state.tags = [...state.tags.filter((tag) => tag.id !== action.payload)];
    },
  },
  extraReducers: {
    [getArticles.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [getArticles.fulfilled]: (state, action) => {
      state.status = "ok";
      state.error = "null";
      state.articles = [...action.payload.articles];
      state.articlesCount = action.payload.articlesCount;
    },
    [getArticles.rejected]: (state, action) => {
      state.status = "reject";
      state.error = action.payload;
    },
    [getOneArticle.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [getOneArticle.fulfilled]: (state, action) => {
      state.status = "ok";
      state.error = "null";
      state.article = action.payload.article;
    },
    [getOneArticle.rejected]: (state, action) => {
      state.status = "reject";
      state.error = action.payload;
    },
    [createArticle.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [createArticle.fulfilled]: (state) => {
      state.status = "ok";
      state.error = "null";
    },
    [createArticle.rejected]: (state, action) => {
      state.status = "reject";
      state.error = action.payload;
    },
  },
});
export default articleSlice.reducer;
export const { setTag, deleteTag } = articleSlice.actions;
