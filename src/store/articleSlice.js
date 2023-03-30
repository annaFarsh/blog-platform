import { createSlice } from "@reduxjs/toolkit";
import {
  getArticles,
  getOneArticle,
  createArticle,
  addFavorite,
  deleteFavorite,
  updateArticle,
  deleteArticle,
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
    currentPage: 1,
    toggleFavorite: 1,
    articleWasDeleted: false,
    articleEdit: false,
    updateArticle: false,
    articleCreated: false,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setTag(state, action) {
      const value = action.payload.valueInput;
      const id = uuid();
      const tag = { value: value, id: id };
      state.tags = [...state.tags, tag];
    },
    deleteTag(state, action) {
      state.tags = [...state.tags.filter((tag) => tag.id !== action.payload)];
    },
    resetError(state) {
      state.error = "null";
    },
    addFavoriteArticle(state, action) {
      state.articles = [
        ...state.articles.map((art) => {
          if (art.slug === action.payload.slug) {
            art.favorited = true;
            art.favoritesCount += 1;
          }
          return art;
        }),
      ];
    },
    deleteFavoriteArticle(state, action, id) {
      state.articles = [
        ...state.articles.map((art) => {
          if (art.slug === action.payload.slug) {
            art.favorited = false;
            art.favoritesCount -= 1;
          }
          return art;
        }),
      ];
    },
  },
  extraReducers: {
    [getArticles.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [getArticles.fulfilled]: (state, action) => {
      state.articleEdit = false;
      state.articleWasDeleted = false;
      state.updateArticle = false;
      state.articleCreated = false;
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
      state.articleEdit = false;
      state.articleWasDeleted = false;
      state.updateArticle = false;
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
      state.articleCreated = true;
      state.tags = [];
    },
    [createArticle.rejected]: (state, action) => {
      state.status = "reject";
      state.error = action.payload;
    },
    [addFavorite.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [addFavorite.fulfilled]: (state) => {
      state.status = "ok";
      state.error = "null";
      state.toggleFavorite += 1;
    },
    [addFavorite.rejected]: (state, action) => {
      state.status = "reject";
      state.error = action.payload;
    },
    [deleteFavorite.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [deleteFavorite.fulfilled]: (state) => {
      state.status = "ok";
      state.error = "null";
      state.toggleFavorite += 1;
    },
    [deleteFavorite.rejected]: (state, action) => {
      state.status = "reject";

      state.error = action.payload;
    },
    [updateArticle.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [updateArticle.fulfilled]: (state) => {
      state.status = "ok";
      state.error = "null";
      state.updateArticle = true;
    },
    [updateArticle.rejected]: (state, action) => {
      state.status = "reject";
      state.error = action.payload;
    },
    [deleteArticle.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [deleteArticle.fulfilled]: (state) => {
      state.status = "ok";
      state.error = "null";
      state.articleWasDeleted = true;
    },
    [deleteArticle.rejected]: (state, action) => {
      state.status = "reject";
      state.error = action.payload;
    },
  },
});
export default articleSlice.reducer;
export const {
  setTag,
  deleteTag,
  setCurrentPage,
  resetError,
  addFavoriteArticle,
  deleteFavoriteArticle,
  changeAvatar,
} = articleSlice.actions;
