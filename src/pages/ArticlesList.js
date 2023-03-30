import React, { useEffect } from "react";
import { getArticles } from "../API/fetchRequestArticles";
import { useDispatch, useSelector } from "react-redux";
import Article from "../components/Article";
import { Pagination } from "antd";
import uuid from "react-uuid";
import { setCurrentPage } from "../store/articleSlice";
import { checkLogin } from "../store/userSlice";
function ArticlesList() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const loginChecked = useSelector((state) => state.articles.loginChecked);
  const currentPage = useSelector((state) => state.articles.currentPage);
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    dispatch(checkLogin());

    dispatch(
      getArticles({ limit: 5, offset: (currentPage - 1) * 5, token: token })
    );
  }, [dispatch, currentPage, token, loginChecked]);

  return (
    <div className="articles">
      {articles.map((article) => {
        return (
          <div key={uuid()} className="article--preview">
            {article && <Article article={article} />}
          </div>
        );
      })}
      {articles.length !== 0 && (
        <Pagination
          current={currentPage}
          className="pagination"
          total={articlesCount * 2}
          onChange={(num) => {
            dispatch(setCurrentPage(num));
          }}
        />
      )}
    </div>
  );
}
export default ArticlesList;
