import { Routes, Route, Navigate } from "react-router-dom";
import NewArticle from "../pages/NewArticle";
import ArticlesList from "../pages/ArticlesList";
import { Layout } from "./Layout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import SingleArticle from "../pages/SingleArticle";
import PrivateAuth from "./hoc/PrivateAuth";
import { useEffect } from "react";
import { checkLoginLS } from "../services/functionForWorkWithLS";
function App() {
  useEffect(() => {
    checkLoginLS();
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="articles" />}></Route>
          <Route path="articles" element={<ArticlesList />}></Route>
          <Route path="articles/:slug" element={<SingleArticle />}></Route>
          <Route path="sign-in" element={<SignIn />}></Route>
          <Route path="sign-up" element={<SignUp />}></Route>
          <Route
            path="new-article"
            element={
              <PrivateAuth>
                <NewArticle />
              </PrivateAuth>
            }
          ></Route>
          <Route
            path="profile"
            element={
              <PrivateAuth>
                <Profile />
              </PrivateAuth>
            }
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
