import { formatDate } from "../services/formatDate";
import UserAvatar from "../img/UserAvatar.svg";
import ReactMarkdown from "react-markdown";
import uuid from "react-uuid";
import HeartBlack from "../img/HeartBlack.svg";
import HeartRed from "../img/HeartRed.svg";
import { useDispatch, useSelector } from "react-redux";
import EditButtons from "../components/EditButtons";
import {
  addFavorite,
  deleteFavorite,
} from "../API/fetchRequestArticles";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
function Article({ article }) {
  const navigate = useNavigate();

  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.username);

  const {
    author,
    body,
    description,
    createdAt,
    tagList,
    title,
    favorited,
    favoritesCount,
    slug,
  } = article;

  return (
    <div className="article">
      <div className="article-path">
        <div className="title-heart">
          <div
            className="article-path__title"
            onClick={() => {
              navigate(`/articles/${article.slug}`);
            }}
          >
            {title}
          </div>
          <label
            className="article-path__heart"
            onClick={() => {
              if (login) {
                if (favorited === false) {
                  dispatch(addFavorite({ slug, token }));
                } else {
                  dispatch(deleteFavorite({ slug, token }));
                }
              } else {
                message.warning("Sorry, you are not authorized");
              }
            }}
          >
            <img
              alt="heart"
              src={favorited === false ? HeartBlack : HeartRed}
            />
            <div className="article-path__heart-count">{favoritesCount}</div>
          </label>
        </div>
        <div className="article-path__tags">
          {tagList.slice(0, 20).map((tag) => {
            return (
              <span key={uuid()} className="tag">
                {tag}
              </span>
            );
          })}
        </div>
        <div className="user-article">
          <div className="article-path__description">{description}</div>
        </div>
        <div className="article-path__text">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
      <div className="user-path">
        <div className="user-all">
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
        {author.username === username && <EditButtons article={article} />}
      </div>
    </div>
  );
}
export default Article;
