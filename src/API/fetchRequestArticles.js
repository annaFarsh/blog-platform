import { createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = `https://blog.kata.academy/api`;
const getArticles = createAsyncThunk(
  "articles/getArticles",
  async function ({ limit, offset, token }, { rejectWithValue }) {
    const res = await fetch(
      `https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) return rejectWithValue(res.status);
    return await res.json();
  }
);
const getOneArticle = createAsyncThunk(
  "articles/getOneArticle",
  async function ({ slug, token }, { rejectWithValue }) {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return rejectWithValue(res.status);
    return await res.json();
  }
);
const createArticle = createAsyncThunk(
  "article/createArticle",
  async function (
    { title, description, body, tags, token },
    { rejectWithValue }
  ) {
    const tagList = tags.map((tag) => tag.value);
    const newArticle = {
      article: {
        title: title,
        description: description,
        body: body,
        tagList: tagList,
      },
    };
    const res = await fetch(`${baseURL}/articles`, {
      method: "POST",
      body: JSON.stringify(newArticle),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return rejectWithValue(res.status);
    return await res.json();
  }
);
const addFavorite = createAsyncThunk(
  "articles/addFavorite",
  async function ({ slug, token }, { rejectWithValue }) {
    const res = await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) return rejectWithValue(res.status);
    return await res.json();
  }
);
const deleteFavorite = createAsyncThunk(
  "articles/deleteFavorite",
  async function ({ slug, token }, { rejectWithValue }) {
    const res = await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) return rejectWithValue(res.status);
    return await res.json();
  }
);
const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async function (
    { title, description, body, tags, token, slug },
    { rejectWithValue }
  ) {
    const tagList = tags.map((tag) => tag.value);
    const upArticle = {
      article: {
        title: title,
        description: description,
        body: body,
        tagList: tagList,
      },
    };
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "PUT",
      body: JSON.stringify(upArticle),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return rejectWithValue(res.status);
    return await res.json();
  }
);
const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async function ({ slug, token }, { rejectWithValue }) {
    try {
      const res = await fetch(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await res;
    } catch (err) {
      return rejectWithValue(err.status);
    }
  }
);
export {
  createArticle,
  getArticles,
  getOneArticle,
  addFavorite,
  deleteFavorite,
  updateArticle,
  deleteArticle,
};
