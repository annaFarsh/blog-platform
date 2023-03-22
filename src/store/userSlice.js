import { createSlice } from "@reduxjs/toolkit";
import { saveLoginLS, checkLoginLS } from "../services/functionForWorkWithLS";
import {
  registerNewUser,
  loginUser,
  updateUser,
} from "../API/fetchRequestUser";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    bio: "",
    token: "",
    image: "",
    error: null,
    status: "",
    login: false,
    register: "none",
  },
  reducers: {
    logoutUser(state) {
      state.login = false;
      state.username = "";
      state.email = "";
      state.bio = "";
      state.image = "";
      state.token = "";
    },
    checkLogin(state) {
      if (checkLoginLS() !== null) {
        let { username, email, token, image } = checkLoginLS();
        state.username = username;
        state.email = email;
        state.token = token;
        state.image = image;
        state.login = true;
      }
    },
  },
  extraReducers: {
    [registerNewUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [registerNewUser.fulfilled]: (state) => {
      state.status = "ok";
      state.error = null;
      state.register = "success";
    },
    [registerNewUser.rejected]: (state, action) => {
      state.status = "reject";
      state.error = action.payload;
    },
    [loginUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "ok";
      state.error = null;
      state.login = true;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.token = action.payload.user.token;
      state.image = action.payload.user.image;
      state.bio = action.payload.user.bio;
      saveLoginLS(
        state.username,
        state.email,
        state.token,
        state.image,
        state.bio
      );
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "reject";
      state.error = action.payload;
    },
    [updateUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = "ok";
      state.error = null;
      state.login = true;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.token = action.payload.user.token;
      state.image = action.payload.user.image;
      saveLoginLS(
        state.username,
        state.email,
        state.token,
        state.image,
        state.bio
      );
    },
    [updateUser.rejected]: (state, action) => {
      state.status = "reject";
      state.error = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;
