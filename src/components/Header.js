import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteLoginLS } from "../services/functionForWorkWithLS";
import { logoutUser } from "../store/userSlice";
import UserAvatar from "../img/UserAvatar.svg";

function Header() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.user.login);
  const username = useSelector((state) => state.user.username);
  const avatar = useSelector((state) => state.user.image);

  function logout() {
    deleteLoginLS();
    dispatch(logoutUser());
  }
  return (
    <header className="header">
      <div className="header__text header-link">
        <Link to="articles">Realworld Blog</Link>
      </div>

      {login === false && (
        <div className="header__info-panel">
          <div className="link sign-in-link header-link">
            <Link to="sign-in">Sign In</Link>
          </div>
          <div className="link sign-up-link header-link link--green">
            <Link to="sign-up">Sign Up</Link>
          </div>
        </div>
      )}
      {login === true && (
        <div className="login-header">
          <div className="header-link link create-article-link link--green">
            <Link to="new-article">Create article</Link>
          </div>
          <Link to="profile">
            <label className="header__username">
              {username}
              <div className="header__avatar">
                <img
                  alt="аватар"
                  src={avatar}
                  width="46px"
                  height="46px"
                  onError={(e) => (e.target.src = UserAvatar)}
                />
              </div>
            </label>
          </Link>
          <div>
            <button
              className="button header__button button--logout"
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
