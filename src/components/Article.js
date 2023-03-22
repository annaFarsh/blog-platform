import { formatDate } from "../services/formatDate";
import UserAvatar from "../img/UserAvatar.svg";
import ReactMarkdown from "react-markdown";
import uuid from "react-uuid";
function Article({ article }) {
  const { author, body, description, createdAt, tagList, title } = article;
  return (
    <div className="article">
      <div className="article-path">
        <div className="article-path__title">{title}</div>

        <div className="article-path__tags">
          {tagList.slice(0, 20).map((tag) => {
            return (
              <span key={uuid()} className="tag">
                {tag}
              </span>
            );
          })}
        </div>
        <div className="article-path__description">{description}</div>
        <div className="article-path__text">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
      <div className="user-path">
        <div className="user-path-name-date">
          <div className="user-path__name">{author.username}</div>
          <div className="user-path__date">{formatDate(createdAt)}</div>
        </div>
        <div className="user-path__avatar">
          <img
            alt="аватар"
            src={author.image}
            width="46px"
            height="46px"
            onError={(e) => (e.target.src = UserAvatar)}
          />
        </div>
      </div>
    </div>
  );
}
export default Article;
