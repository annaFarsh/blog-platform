import { formatDate } from "../services/formatDate";
import ReactMarkdown from "react-markdown";
import uuid from "react-uuid";
import { useSelector } from "react-redux";
import EditButtons from "../components/EditButtons";
import { useNavigate } from "react-router-dom";
import React from "react";
import Likes from "../components/Likes";
import Avatar from "../components/Avatar";
function Article({ article }) {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  const slug = article.slug;
  return (
    <>
      {article && (
        <div className="article">
          <div className="article-path">
            <div className="title-heart">
              <div
                className="article-path__title"
                onClick={() => {
                  navigate(`/articles/${slug}`);
                }}
              >
                {article.title}
              </div>
              <Likes
                slug={article.slug}
                favorited={article.favorited}
                favoritesCount={article.favoritesCount}
              />
            </div>
            <div className="article-path__tags">
              {article.tagList.slice(0, 20).map((tag) => {
                return (
                  <span key={uuid()} className="tag">
                    {tag}
                  </span>
                );
              })}
            </div>
            <div className="user-article">
              <div className="article-path__description">
                {article.description}
              </div>
            </div>
            <div className="article-path__text">
              <ReactMarkdown>{article.body}</ReactMarkdown>
            </div>
          </div>
          <div className="user-path">
            <div className="user-all">
              <div className="user-path-name-date">
                <div className="user-path__name">{article.author.username}</div>
                <div className="user-path__date">
                  {formatDate(article.createdAt)}
                </div>
              </div>
              <Avatar image={article.author.image} />
            </div>
            {article.author.username === username && (
              <EditButtons article={article} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default Article;
