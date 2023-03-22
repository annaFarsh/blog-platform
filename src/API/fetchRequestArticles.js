import { createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = `https://blog.kata.academy/api`;
const getArticles = createAsyncThunk(
  "articles/getArticles",
  async function ({ limit, offset }, { rejectWithValue }) {
    const res = await fetch(
      `https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) return rejectWithValue(res.status);
    return await res.json();
  }
);
const getOneArticle = createAsyncThunk(
  "articles/getOneArticle",
  async function (slug, { rejectWithValue }) {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
export { createArticle, getArticles, getOneArticle };
