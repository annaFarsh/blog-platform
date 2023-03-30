import { addFavorite, deleteFavorite } from "../API/fetchRequestArticles";
import { message } from "antd";
import HeartBlack from "../img/HeartBlack.svg";
import HeartRed from "../img/HeartRed.svg";
import { useDispatch, useSelector } from "react-redux";
function Likes({ slug, favorited, favoritesCount }) {
  const login = useSelector((state) => state.user.login);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  return (
    <label
      className="article-path__heart"
      onClick={() => {
        if (login) {
          if (favorited === false) {
            dispatch(addFavorite({ slug: slug, token, dispatch }));
          } else {
            dispatch(deleteFavorite({ slug: slug, token, dispatch }));
          }
        } else {
          message.warning("Sorry, you are not authorized");
        }
      }}
    >
      <img alt="heart" src={favorited === false ? HeartBlack : HeartRed} />
      <div className="article-path__heart-count">{favoritesCount}</div>
    </label>
  );
}
export default Likes;
