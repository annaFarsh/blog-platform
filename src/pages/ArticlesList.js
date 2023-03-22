import React, { useEffect, useState } from "react";
import { getArticles } from "../API/fetchRequestArticles";
import { useDispatch, useSelector } from "react-redux";
import Article from "../components/Article";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
function ArticlesList() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(getArticles({ limit: 5, offset: offset }));
  }, [dispatch, offset]);
  return (
    <div className="articles">
      {articles.map((article, index) => {
        return (
          <Link
            to={`/articles/${article.slug}`}
            key={`${new Date().toISOString()}1${index}1${article.slug}`}
            className="article--preview"
          >
            <Article article={article} />
          </Link>
        );
      })}
      {articles.length !== 0 && (
        <Pagination
          className="pagination"
          total={articlesCount * 2}
          onChange={(num) => {
            setOffset((num - 1) * 5);
          }}
        />
      )}
    </div>
  );
}
export default ArticlesList;
