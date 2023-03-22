import { createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = `https://blog.kata.academy/api`;

const registerNewUser = createAsyncThunk(
  "user/registerNewUser",
  async function ({ username, email, password }, { rejectWithValue }) {
    const newUser = {
      user: {
        username: username,
        email: email,
        password: password,
      },
    };
    const res = await fetch(`${baseURL}/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!res.ok) return rejectWithValue(res.status);
    return await res.json();
  }
);
const loginUser = createAsyncThunk(
  "user/loginUser",
  async function ({ email, password }, { rejectWithValue }) {
    const newUser = {
      user: {
        email: email,
        password: password,
      },
    };
    const res = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!res.ok) return rejectWithValue(res.status);
    return await res.json();
  }
);
const updateUser = createAsyncThunk(
  "user/updateUser",
  async function (
    { username, email, password, image, token },
    { rejectWithValue }
  ) {
    const updateUser = {
      user: {
        username: username,
        email: email,
        password: password,
        image: image,
      },
    };
    const res = await fetch(`${baseURL}/user`, {
      method: "PUT",
      body: JSON.stringify(updateUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return rejectWithValue(res.status);
    return await res.json();
  }
);

export { registerNewUser, loginUser, updateUser };
