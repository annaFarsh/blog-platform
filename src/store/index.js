import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./articleSlice";
import userReducer from "./userSlice";
export default configureStore({
  reducer: {
    articles: articleReducer,
    user: userReducer,
  },
});
